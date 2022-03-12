const express = require('express')
const router = express.Router();
const { User, Post } = require('../models')
const bcrypt = require('bcryptjs')
const passport = require('passport');
const { isLogin, isNotLogin } = require('../config/isAuth');
const db = require('../models');

// const {Post,User} = require('../models');
const salt = 10

router.get('/userinfo/:userId', async (req, res, next) => {
  try {

    const fullUser = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password']
      },
      include: [
        {
          model: Post,
          attributes: ['id']

        }, {
          model: User,
          as: 'Followers',
          attributes: ['id', 'nickname'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id', 'nickname']
        }, {
          model: Post,
          as: 'Liked',
          attributes: ['id'] //포스트아이디
        },
      ]
    })

    if (fullUser) {
      return res.status(200).json(fullUser)
    }
    else {

      return res.status(403).json({ msg: '존재하지 않는 사용자입니다.' })
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.get('/myinfo', async (req, res, next) => {
  try {
    if (req.user) {

      const fullUser = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [
          {
            model: Post,
            attributes: ['id']

          }, {
            model: User,
            as: 'Followers',
            attributes: ['id', 'nickname'],
          }, {
            model: User,
            as: 'Followings',
            attributes: ['id', 'nickname']
          }, {
            model: Post,
            as: 'Liked',
            attributes: ['id'] //포스트아이디
          },
        ]
      })

      return res.status(200).json(fullUser)
    }
    else {

      return res.status(200).json(null)
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.post('/signup', isNotLogin, async (req, res, next) => {

  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    })

    if (exUser) {
      return res.status(403).json({ msg: '사용중', succsess: false })
    }
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const mailId = req.body.email.split(/(@[^\s@]+)/)[0]
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      mailId: mailId,
      password: hashPassword,
    })

    return res.status(201).json({ msg: '회원가입성공', succsess: true })
  } catch (err) {
    console.log(err)

    next(err)
  }
})

router.post('/login', isNotLogin, (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err) {

      console.log('서버에러:  ', err)
      next(err)
    }
    if (info) {
      console.log('info err:: :  ', err)
      return res.status(401).send(info)
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.log(loginErr)
        next(loginErr)
      }

      const fullUser = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [
          {
            model: Post,
            attributes: ['id']

          }, {
            model: User,
            as: 'Followers',
            attributes: ['id', 'nickname']
          }, {
            model: User,
            as: 'Followings',
            attributes: ['id', 'nickname']

          }, {
            model: Post,
            as: 'Liked',
            attributes: ['id']
          }
        ]
      })
      return res.status(201).json(fullUser)
    })
  })(req, res, next)

})

router.post('/logout', isLogin, (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.status(201).send('로그아웃 완료')
})
///////////////////////////////////////////////////////////////////////팔로
router.patch('/follow', async (req, res, next) => {
  try {
    if (req.user.id) {//로그인 확인

      const user = await User.findOne({ where: { id: req.body.UserId, } })

      if (user) {
        await user.addFollowers(req.user.id)
        // await me.addFollowings(req.body.UserId)
        return res.status(200).json({ id: user.id, nickname: user.nickname })

      } else { return res.status(403).json({ msg: '없는회원이거나 탈퇴유저입니다.' }) }
    } else { return res.status(403).json({ msg: 'try login' }) }


  } catch (err) {
    console.log(err)

    next(err)
  }
})

router.delete('/unfollow', async (req, res, next) => {

  const userId = parseInt(req.query.userId)
  try {
    if (!req.user.id) { return res.status(403).json({ msg: '로그인이 필요합니다.' }) }
    if (req.user.id) {//로그인 확인
      // const me = await User.findOne({ where: { id: parseInt(req.query.userId )} })

      const user = await User.findOne({ where: { id: userId} })

      if (user) {
        await user.removeFollowers(req.user.id)
        // await me.removeFollowings(req.body.UserId)
        return res.status(200).json({ id: user.id, nickname: user.nickname })

      } else { return res.status(403).json({ msg: '없는회원이거나 탈퇴유저입니다.' }) }
    } else { return res.status(403).json({ msg: 'try login' }) }


  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.patch('/newname', async (req, res, next) => {
  try {
    if (req.user.id && (req.body.nickname || req.body.descrip)) {
      if (req.body.nickname) {
        await User.update(
          { nickname: req.body.nickname },
          { where: { id: req.user.id } },
        )
      }
      if (req.body.descrip) {
        await User.update(
          { descrip: req.body.descrip },
          { where: { id: req.user.id } },
        )
      }
      return res.status(200).json(req.body)
    } else { return res.status(403).json({ msg: 'Non Text' }) }

  } catch (err) {
    console.log(err)
    next(err)
  }
}

)

router.get('/userpost/:userId', async (req, res, next) => {
  const userId = req.params.userId
  const post = await db.Post.findAll({
    where: { UserId: userId },
    order: [['createdAt', 'DESC']],
    include: [
      { model: db.User, attributes: ['nickname', 'id'] },
      {
        model: db.User, //좋아요 누른사람
        as: 'Likers',
        attributes: ['id']
      },
      { model: db.Image, attributes: ['id', 'src'] },

      {
        model: db.Post,
        as: 'Retweet',
        include: [
          { model: db.Image, attributes: ['id', 'src'] }, //원본글의 이미지
          { model: db.User, attributes: ['id', 'nickname'] }, //원본유저,
          // {module: db.User, as: 'Likers', attributes:['id','nickname']} // 원본글의 좋아요 누른유저(원본글)

        ]
      },
      {
        model: db.Comment,
        include: [{
          model: db.User, //댓글 유저
          attributes: ['id', 'nickname']
        }]
      },]
  })
  return res.status(201).json(post)
})
module.exports = router


