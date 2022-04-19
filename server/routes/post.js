const express = require('express')
const db = require('../models')
const router = express.Router();
const path = require('path')
const multer = require('multer');
const { isLogin } = require('../config/isAuth');
const fs = require('fs')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const dotenv = require('dotenv')
dotenv.config()


const useDev = process.env.NODE_ENV !=='production'


AWS.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
  region: 'ap-northeast-2'
})

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'tweeter-aws',
    key(req, file, cb) {
      cb(null, `uploads/${Date.now()}_${path.basename(file.originalname)}`)
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20MB
})

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload_dev = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads')
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname) //확장자 추출
      const baseName = path.basename(file.originalname, ext)
      done(null, baseName + new Date().getTime() + ext)
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20MB
})


router.post('/addpost', useDev 
  ? upload_dev.array('image')
  : upload.array('image'), async (req, res, next) => {

  try {
    if (!req.user.id) { return res.status(403).json({ msg: '로그인이 필요합니다.' }) }

    const hashtag = req.body.content.match(/#[^\s#]+/g)

    const post = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id
    });

    if (hashtag) {
      const tagValue = await Promise.all(hashtag.map((tag) =>
        db.Hashtag.findOrCreate({
          where: { name: tag.slice(1).toLowerCase() }
        })))
      await post.addHashtags(tagValue.map((tag) => tag[0]))
    }


    if (req.files) {
      await Promise.all(req.files.map((image) => db.Image.create({
        src: useDev ? image.filename :image.location,
        PostId: post.id
      })))

    }

    const fullPost = await db.Post.findOne({
      where: { id: post.id },
      include: [
        { model: db.Image, }, //이미지
        { model: db.User, attributes: ['id', 'nickname'] }, //유저 정보
        { model: db.Comment }, //댓글,

        { model: db.User, as: 'Likers', attributes: ['id', 'nickname'] }, //좋아요 누른사람
        {
          model: db.Post,
          as: 'Retweet',
          include: [
            { model: db.Image }, //원본글의 이미지
            { model: db.User, attributes: ['id', 'nickname'] }, //원본유저,
            // {module: db.User, as: 'Likers', attributes:['id','nickname']} // 원본글의 좋아요 누른유저(원본글)

          ],
        }
      ]
    })
    return res.status(201).json(fullPost)
  } catch (err) {
    console.log(err)
    next(err)
  }
})


router.patch('/editpost', useDev 
  ? upload_dev.array('image')
  : upload.array('image'), async (req, res, next) => {

  try {
    if (!req.user.id) { return res.status(403).json({ msg: '로그인이 필요합니다.' }) }

    const hashtag = req.body.content.match(/#[^\s#]+/g)

    await db.Post.update({
      content: req.body.content
    },
      {
        where: {
          id: req.body.PostId,
          UserId: req.user.id
        }
      },
    );

    const post = await db.Post.findOne({ where: { id: req.body.PostId } });

    if (hashtag) {
      const tagValue = await Promise.all(hashtag.map((tag) =>
        db.Hashtag.findOrCreate({
          where: { name: tag.slice(1).toLowerCase() }
        })))
      await post.addHashtags(tagValue.map((tag) => tag[0]))
    }

    if(req.body.rmImageId){
      await Promise.all(req.body.rmImageId.map((id)=>db.Image.destroy({
        where:{id:id}
      })))
    }

    if (req.files) {
      await Promise.all(req.files.map((image) => db.Image.create({
        src: useDev ? image.filename :image.location,
        PostId: post.id
      })))

    }

    const Images = await db.Image.findAll({
      where: { PostId: req.body.PostId },
    })
    return res.status(201).json({ PostId: post.id, Images: Images, content: post.content })
  } catch (err) {
    console.log(err)
    next(err)
  }
})
router.post('/report', async (req,res, next)=>{
  try{
    if (!req.user.id) { return res.status(403).json({ msg: '로그인이 필요합니다.' }) }
    const post = await db.Post.findOne({
      where: { id: req.body.PostId },
    })
    if(!post){
      return res.status(403).json({msg:'존재하지 않는 글입니다.'})
    }
    return res.status(201).json(null)
  }catch(err){
    console.log(err)
    next(err)
  }
})


router.post('/comment', async (req, res, next) => {
  try {
    if (!req.user.id) { return res.status(403).json({ msg: '로그인이 필요합니다.' }) }

    const comment = await db.Comment.create({
      content: req.body.content,
      PostId: req.body.PostId,
      UserId: req.user.id
    });

    const fullComment = await db.Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname']
        }
      ]
    })
    res.status(201).json(fullComment)


  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.post('/likepost', async (req, res, next) => {
  try {
    if (!req.user.id) { return res.status(403).json({ msg: '로그인이 필요합니다.' }) }
    const body = req.body
    const post = await db.Post.findOne({ where: { id: body.PostId } })
    if (body.type === 'LIKE') {
      await post.addLikers(req.user.id)
      return res.status(200).json({ PostId: post.id, UserId: req.user.id })
    }
    else {
      await post.removeLikers(req.user.id)
      return res.status(200).json({ PostId: post.id, UserId: req.user.id })
    }

  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.post('/delete', async (req, res, next) => {
  try {
    if (!req.user.id) { return res.status(403).json({ msg: '로그인이 필요합니다.' }) }
    const body = req.body
    const post = await db.Post.findOne({
      where: { id: body.PostId },
      include: [{ model: db.User, attributes: ['id'] }]
    })

    if (post.User.id === req.user.id) {
      await db.Post.destroy({ where: { id: body.PostId } })
      return res.status(200).json({ PostId: body.PostId, UserId: req.user.id })
    } else {
      return res.status(201).json({ msg: '잘못된 접근입니다.' })
    }

  } catch (err) {
    console.log('에러', err)
    next(err)
  }
})

router.get('/:PostId/retweet', async (req, res, next) => {
  console.log(req.headers.cookie)
  try {
    if (!req.user.id) { return res.status(403).json({ msg: '로그인이 필요합니다.' }) }

    const PostId = req.params.PostId
    const post = await db.Post.findOne({
      where: { id: PostId },
      include: [{
        model: db.Post,
        as: 'Retweet'
      }]
    })

    if (!post) { return res.status(403).json({ msg: '존재하지않는 포스트입니다.' }) }
    if (post.UserId === req.user.id || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).json({ msg: '자신의포스트는 리트윗 불가능합니다.' })
    }

    const retweet = await db.Post.create({
      UserId: req.user.id,
      RetweetId: post.RetweetId ? post.RetweetId : PostId,
      content: '삭제된 계시글입니다.'
    })

    const fullRetweetPost = await db.Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: db.Post,
          as: 'Retweet',
          include: [
            { model: db.Image }, //원본글의 이미지
            { model: db.User, attributes: ['id', 'nickname'] }, //원본유저,
            // {module: db.User, as: 'Likers', attributes:['id','nickname']} // 원본글의 좋아요 누른유저(원본글)

          ],
        },
        { model: db.User, attributes: ['id', 'nickname'] },
        {
          model: db.Comment,
          include: [{ model: db.User, attributes: ['id', 'nickname'] }] //리트윗한글의 댓글 (내포스트)
        },
        { model: db.User, as: 'Likers', attributes: ['id', 'nickname'] }, //리트윗한글에 좋아요 누른유저(내포스트)
        { model: db.Image } //빈리스트(리트윗글에 이미지 추가안함)
      ]
    })
    return res.status(200).json(fullRetweetPost)

  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router

