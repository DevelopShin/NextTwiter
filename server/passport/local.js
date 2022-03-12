const passport = require('passport')
const {Strategy: LocalStrategy} = require('passport-local')
const {User} = require('../models')
const bcrypt = require('bcryptjs')

module.exports =()=>{
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true, // 세션에 저장 여부
    passReqToCallback: false,
  }, 
  
  async(email, password, done)=>{
    
    try {
      const user = await User.findOne({
        where: {'email': email}
      })
      if (!user) {
        return done(null, false, {msg: '존재하지않는 메일입니다.'})
      }
  
      let v =  await bcrypt.compare(password, user.password)

      if(v){
        return done(null, user)
      } else{
        return done(null, false, {msg: '비밀번호가 일치하지 않습니다.'})
      }

    }catch(err){
      return done(err)
    }


  }));
}