// Auth (HOC)
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';

/*
  SpecificComponent   string  컴포넌트
  option              null - 아무나 출입이 가능한 페이지
                      true - 로그인한 유저만 출입이 가능한 페이지 
                      false - 로그인한 유저는 출입 불가능한 페이지 
  adminRoute          null - 아무나 출입이 가능한 페이지 
*/
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(response => {
        console.log(response)

        if(!response.payload.isAuth) {
          // 로그인 하지 않은 상태 
          if(option) {
            // 로그인한 회원만 진입 가능한 페이지 
            props.history.push('/login');
          } 
        } else {
          //로그인 한 상태 
          if(adminRoute && !response.payload.isAdmin) {
            // 로그인한 회원은 진입 못하는 페이지 
            props.history.push('/')
          } else {
            if(option === false) {
              // 관리자만 진입 가능한 페이지 
              props.history.push('/')
            }
          }
        }
      })
    }, [])

    return (
      <SpecificComponent />
    )
  }
  return AuthenticationCheck;
}