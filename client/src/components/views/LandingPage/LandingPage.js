import React, { useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {
  useEffect(() => {
    // server request, port: server 5000, client 3000 
    axios.get('/api/hello')
      .then(response => console.log(response.data))
  }, []) 

  const onClickHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if(response.data.success) {
          props.history.push('/login')
        } else {
          alert('logout fail!')
        }
      })
  }

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh' }}>
      <h2>시작 페이지</h2>

      <br />
      <button onClick={onClickHandler}>log out</button>
    </div>
  )
}

export default withRouter(LandingPage);