import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
  const dispatch = useDispatch();

  // useState 를 사용한 상태관리 
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // email handler
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  }

  // name handler
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  }

  // password handler
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  // confirm password handler
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  }

  // form submit handler 
  const onSubmitHandler = (e) => {
    e.preventDefault();

    // 유효성 검사 필요시 여기서 작성 ex) 비밀번호 길이, 조합 등등  
    if (password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let body = {
      email,
      name,
      password
    }

    // dispatch를 이용하여 action 날림
    dispatch(registerUser(body))
    .then(response => {
      if (response.payload.success) {
        // 회원가입 성공시 LandingPage 이동 
        alert('welcome!')
        props.history.push('/login')
      } else {
        alert('Failed to sign up')
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

        <label>Name</label>
        <input type='text' value={name} onChange={onNameHandler} />

        <label>Password</label>
        <input type='password' value={password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input type='password' value={confirmPassword} onChange={onConfirmPasswordHandler} />

        <br />
        <button type='submit'>Sign up</button>
      </form>
    </div>
  )
}

export default withRouter(RegisterPage);