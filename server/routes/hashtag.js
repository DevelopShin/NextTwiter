const express = require('express')
const db = require('../models')
const router = express.Router();
const path = require('path')
const multer = require('multer');
const { route } = require('./user');


router.get('/post', async (req, res, next) => {
  try {
    // const where = {};
    // if (parseInt(req.body.lastId, 10)) { // 초기 로딩이 아닐 때
    //   where.id = { [Op.lt]: parseInt(req.body.lastId, 10)}
    // } 
    const hashtag = decodeURIComponent(req.query.hashtag)

    const posts = await db.Post.findAll({
      // where,
      limit: 10,
      order: [['createdAt', 'DESC'], [db.Comment, 'createdAt', 'DESC'],],

      include: [
        {
          model: db.Hashtag, where: { name: hashtag }, attributes:['id','name'],
          // include: [{model: db.Post}, {model:db.User},{model:db.Image}]
        },
        { model: db.Image, },
        {
          model: db.User,
          attributes: ['id', 'nickname']
        },
        {
          model: db.Comment,
          include: [{
            model: db.User, //댓글 유저
            attributes: ['id', 'nickname']
          }]
        },
        {
          model: db.User, //좋아요 누른사람
          as: 'Likers',
          attributes: ['id']
        },

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
    return res.status(201).json(posts)

  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.post('/length', async (req, res, next) => {
  const post = await db.Post.findAll({
    where:{RetweetId:135},
    include: [
      {
        model: db.Post,
        as: 'Retweet',
      }
    ]
  })
  return res.status(201).json(post)
})

module.exports = router