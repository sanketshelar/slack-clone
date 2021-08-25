import React from 'react';
import styled from 'styled-components';
import { auth, provider } from '../firebase';

import { Button } from '@material-ui/core';

const Login = () => {
  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  return (
    <LoginContainer>
      <LoginContainerInner>
        <img
          src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
          alt=''
        />
        <h1>Login to Slack Clone</h1>
        <p>slack.clone.com</p>

        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginContainerInner>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginContainerInner = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    height: 100px;
    object-fit: contain;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit;
    background-color: #0a8d48;
    color: white;

    :hover {
      background-color: #0a8d48;
      color: white;
    }
  }
`;
