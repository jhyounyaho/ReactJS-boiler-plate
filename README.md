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
npx create-react-app . // client directory 에 설치

## 디렉토리

client # frontend // create-react-app  
└── src  
 ├── \_actions # Redux를 위한 폴더  
 ├── \_reducer # Redux를 위한 폴더  
 ├── components # components
├── views # page들  
 ├── Sections # 해당 page에 관련된 css파일이나, component 들을 넣는다.
├── App.js # Routing 관련 일을 처리한다.
├── Config.js # 환경 변수같은 것들을 정하는 곳  
 ├── hoc # Higher Order Component의 약자
└── utils # 여러군데에서 쓰일 수 있는 것들을 이곳에 넣어둬서 어디서든 쓸수 있게 해줌  
server # backend

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

## boiler-plate 개발 관련 이론

### create-react-app

원래 리액트 앱을 처음 실행 하기 위해선 webpack이나 babel같은 것을 설정하기위해서 많은 시간이 걸렸다. 하지만 이제는 create-react-app Command로 바로 시작할수있다.

### Babel

최신 js 문법을 지원하지 않는 브라우저들을 위해서
최신 js 문법을 구형 브라우저에서도 돌수있게 변환 시켜줌

### webpack

모듈들을 번들링해줌.
./client/src 웹팩이 관리해주는 부분
-> img 추가시 src 디렉토리에 넣어줄것

### npm

Node package manager

1. repository library를 담고 있는 역할
2. npm install
   Local ./node_modules/.bin
   Global npm install -g window

### npx

npx가 npm registry 에서 create-react-app 을 찾아서 '다운로드 없이 실행'시켜준다.
npx 장점

1. Disk Space를 낭비하지 않을 수 있다.
2. 항상 최신 버전을 사용할수 있다.
