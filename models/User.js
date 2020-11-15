const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 암호화하는 salt 자릿수  

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

// index.js save하기 전에 실행하는 함수 - save하기 전에 bcrypt로 pwd 암호화   
userSchema.pre('save', function(next) {
  const user = this;
  // password 값이 변경될때만 암호화 진행 
  if(user.isModified('password')) {
    // Salt 생성 
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err);
      // user.password 암호화되기 전 pwd 
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err);
        // 암호화된 비밀번호 hash 값을 넣어준다.
        user.password = hash
        next()
      });
    })
  }
})

// 스키마를 모델로 감싸준다.
const User = mongoose.model('User', userSchema);

// 다른 파일에서도 사용 할 수 있도록 모듈을 export 해준다. 
module.exports = { User }