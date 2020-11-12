const express = require('express') // npm install express --save 로 다운받았던 express
const app = express() // express app create  
const port = 5000 // back server  

// app 경로가 http://localhost:5000 일때 스크린에 노출되는 코드 
app.get('/', (req, res) => {
  res.send('Hello World! node js! ')
})

// app 이 5000 서버 연결이 되면 실행하는 코드 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})