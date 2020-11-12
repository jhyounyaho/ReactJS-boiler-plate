const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, // space 없애주는 역할 
    unique:1
  },
  password: {
    type: String,
    minlength: 5
  },
  role: {
    type: Number, // 1 = 관리자, 0 = 일반유저 
    default: 0
  },
  image: String,
  token: {
    type: String // 유효성 관리
  },
  tokenExp: {
    type: Number // 토큰 유효기간
  }
})

// 스키마를 모델로 감싸준다.
const User = mongoose.model('User', userSchema);

// 다른 파일에서도 사용 할 수 있도록 모듈을 export 해준다. 
module.exports = { User }