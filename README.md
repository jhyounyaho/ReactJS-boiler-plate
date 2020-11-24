# boiler-plate

NodeJS 와 ReactJS 를 사용하여 회원가입, 로그인 페이지 기능 구현

## 라이브러리

npm init  
npm install express --save  
npm install mongoose --save  
npm install body-parser --save  
npm install nodemon --save-dev  
npm install bcrypt --save  
npm install jsonwebtoken --save  
npm install cookie-parser --save  
npm run start // node로 index.js 실행  
npm run backend // nodemon으로 index.js 실행

## Bcrypt 로 비밀번호 암호화

Bcrypt를 이용하여 비밀번호를 암호화 해줘서 DB에 저장해줘야 한다.
유저 정보들(Account, Password 등등)을 DB에 저장하기 전에가 암호화 할 타이밍

## DB

monghDB

## API
### 회원가입 API
![registerAPI](https://user-images.githubusercontent.com/42309919/100058288-59a0fb00-2e6c-11eb-8954-ff36fdec920f.PNG)
-> 회원가입시 계정 생성 확인 (postman으로 test)                       
                
### 로그인 API
![로그인api](https://user-images.githubusercontent.com/42309919/100057898-ae904180-2e6b-11eb-8e40-224b05887366.PNG)                         
-> 로그인시 token 생성 확인 (postman으로 test)             

### 로그아웃 API 
![logout](https://user-images.githubusercontent.com/42309919/100091225-ae0da000-2e97-11eb-97c2-9b7f111513db.PNG)             
-> 로그아웃시 token = '' 확인 (postman으로 test)                        

