const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳 
  // 클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;

  // 쿠키에 있는 토큰을 복호화 한후 mongoDB 에서 해당 유저를 찾는다
  User.findByToken(token, (err, user) => {
    // 에러 발생 
    if(err) throw err;
    // 로그인 실패 - user 가 없을 경우  
    if(!user) return res.json({ isAuth: false, error: true })

    // 유저가 있을 경우 token, user 정보 넣어줌   
    req.token = token;
    req.user = user;  

    // next 안써주면 middle에 갇힘  
    next();
  })
  
  // 유저가 있으면 인증 OK

  // 유저가 없으면 인증 NO
}

module.exports = { auth };