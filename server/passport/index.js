const passport = require('passport')
const local = require('./local')
const {User} = require('../models')
module.exports = ()=>{
  passport.serializeUser((user, done)=>{
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done)=>{ //위의 아이디(done(userId))를 받아와, 서버요청시마다 DB와 통신
    try{
      const user = await User.findOne({ where: {id}});
      done(null, user)
    } catch (err){
      done(err)
    }
  });
  local()
}