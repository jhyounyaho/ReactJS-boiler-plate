const express = require('express') // npm install express --save 로 다운받았던 express
const app = express() // express app create  
const port = 5000 // back server  
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const config = require('./config/key');

// application/x-www-form=urlencoded 형태를 분석해서 가져옴
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 형태를 분석해서 가져옴 
app.use(bodyParser.json());

const mongoose = require('mongoose');
const { mongoURI } = require('./config/dev');
// 몽고DB 연결  
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('MongoDB Connected ...')) // 성공시 터미널에 노출되는 내용
  .catch((error) => console.log(error)); // 실패시 터미널에 노출되는 내용

// app 경로가 http://localhost:5000 일때 스크린에 노출되는 코드 
app.get('/', (req, res) => {
  res.send('Hello World! node js! nodemon! ')
})

// 회원가입을 위한 router 
app.post('/register', (req, res) => {
  // 회원 가입 할때 필요한 정보들을 bodyParser를 이용하여 client에서 JSON형식으로 가져오면 DB에 넣어준다.
  const user = new User(req.body);

  // save - mongoDB method 
  user.save((err, doc) => {
    // json 형식으로 보내준다.
    if (err) return res.json({ success: false, err })

    return res.status(200).json({ success: true })
  });
})

// 로그인을 위한 router 
app.post('/login', (req, res) => {
  // DB에서 요청한 e-mail(key) 찾기
  // findOne() - mongoDB method 
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 email에 해당하는 유저가 없습니다.'
      })
    }
    // DB에서 요청한 e-mail 이 있다면 pwd 같은지 확인
    user.comparePassword(res.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          messange: '비밀번호가 틀렸습니다.'
        })
      }

      // pwd까지 같다면 Token 생성  
      user.generateToken((err, user) => {

      })
    })
  })


})

// app 이 5000 서버 연결이 되면 실행하는 코드 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})