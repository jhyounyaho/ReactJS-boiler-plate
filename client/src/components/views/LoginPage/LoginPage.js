import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';

function LoginPage(props) {
  const dispatch = useDispatch();

  // useState 를 사용한 상태관리 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // email handler
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  }

  // password handler
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  // form submit handler 
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // 유효성 검사 필요시 여기서 작성 ex) 비밀번호 길이, 조합 등등  

    let body = {
      email,
      password
    }

    dispatch(loginUser(body))
    .then(response => {
      if (response.payload.loginSuccess) {
        // 로그인 성공시 LandingPage 이동 
        props.history.push('/')
      } else {
        alert('Error˝')
      }
    })
  }

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh' }}>
      <form 
        style={{ display:'flex', flexDirection:'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type='email' value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type='password' value={password} onChange={onPasswordHandler} />
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage;