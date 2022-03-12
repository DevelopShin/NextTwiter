exports.isLogin = (req, res, next) =>{
  if(req.isAuthenticated()) {
    console.log( 'isAuth:  ',req.isAuthenticated())
    next();
  } else {
    res.status(401).json({msg:'로그인이필요합니다.'})
  }
}

exports.isNotLogin = (req, res, next) =>{
  console.log( 'isAuth:  ',req.isAuthenticated())

  if(!req.isAuthenticated()) {
    next();

  } else {
    res.status(401).json({msg:'이미 로그인 되었습니다.'})
  }
}