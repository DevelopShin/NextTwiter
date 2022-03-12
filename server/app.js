const express = require('express');
const db = require('./models')
const app = express();
const cors = require('cors')
const cookieParser = require("cookie-parser");
const passportConfig = require('./passport')
const session = require('express-session')
const passport = require('passport');
const morgan = require('morgan')
const path = require('path')
const dotenv = require('dotenv')
const hpp = require('hpp')
const helmet = require('helmet');

// const FRONT_URL = 'http://3.37.225.248' //실제 front server

dotenv.config()

app.use('/',express.static(path.join(__dirname,'uploads')))

if(process.env.NODE_ENV ==='production'){
  app.use(morgan('combined')) //요청갯수
  app.use(hpp())
  app.use(helmet())
  app.use(cors(
    {
      origin: ['http://tweeter.ga','http://www.tweeter.ga'],
      credentials:true,
    }
  ))
} else{
  app.use(cors(
    {
      origin: ['http://localhost:3000'],
      credentials:true,
    }
  ))
  app.use(morgan('dev')) //요청갯수
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }))


passportConfig()
app.get('/', (req, res) => {
  res.send('hello tweeter.ga api');
});

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  cookie:{
    expires: 1000*60*60*2, // limit : 2 hours
    httpOnly: true,
    secure:false,
    domain: process.env.NODE_ENV ==='production' && '.tweeter.ga',
  }
}))
app.use(passport.initialize())
app.use(passport.session())

app.listen(80, () => {
  console.log('서버성공')
})

db.sequelize.sync()
  .then(() => {
    console.log('==============================================')

    console.log('DB연결 성공')
  })
  .catch('DBERR=====', console.error)


app.use('/api/user', require('./routes/user'))

app.use('/api/post', require('./routes/post'))

app.use('/api/posts', require('./routes/posts'))

app.use('/api/hashtag', require('./routes/hashtag'))

