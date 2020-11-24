const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 암호화하는 salt 자릿수  
const jwt = require('jsonwebtoken');

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
  if (user.isModified('password')) {
    // Salt 생성 
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      // user.password 암호화되기 전 pwd 
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        // 암호화된 비밀번호 hash 값을 넣어준다.
        user.password = hash;
        next();
      });
    })
  } else {
    next();
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
  /*
    plainPassword = 12345  
    mongoDB 암호화된 pwd $2b$10$QU.OS0aLcWyEEVEKc93ciOUc0arDw3aPd5z29ll4S820jUx/pWQWS
    가 같은지 비교하기 위해서는 plainPassword를 암호화시켜 암호화된 pwd와 비교해줘야한다.
    -> 암호화 된 pwd를 복호화 할 수 없다. 
  */
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if(err) return cb(err)
    cb(null, isMatch)
  })
}

// callback function 1개 = user 
userSchema.methods.generateToken = function(cb) {
  const user = this;
  /*
    jsonwebtoken을 이용해서 token 생성하기 
    token 형태 
    user._id + 'secretToken' = token;
    user.token = token; 
  */
  let token = jwt.sign(user._id.toHexString(), 'secretToken');
  // user token 값 저장 (값있을 경우=로그인, 비어있을경우=로그아웃)
  user.token = token;
  user.save(function(err, user){
    if(err) return cb(err)
    cb(null, user)
  })
}

/*
  methods 에서의 this 호출한애  // 여기선 userSchema
  statics 에서의 this 모델 그 자체 // 여기선 mongoose 모델  
*/
// 복호화
userSchema.statics.findByToken = function(token, cb) {
  const user = this;
  // 토큰을 decode 한다. 
  // user._id + '' = token; 형태 
  jwt.verify(token, 'secretToken', function(err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에 
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    // findOne mongoDB method 
    user.findOne({ '_id': decoded, 'token': token}, function(err, user) {
      // 에러 있을 경우 error 콜백 
      if(err) return cb(err);
      // 에러 없을 경우 user 정보 콜백함수로 보내줌
      cb(null, user)
    })
  })
}

// 스키마를 모델로 감싸준다.
const User = mongoose.model('User', userSchema);

// 다른 파일에서도 사용 할 수 있도록 모듈을 export 해준다. 
module.exports = { User }