import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';
import styled from 'styled-components';
import Chat from './components/Chat';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './components/Login';
import Spinner from 'react-spinkit';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
            alt=''
          />
          <Spinner name='wordpress' color='purple' fadeIn='none' />
          {/* <Spinner name='ball-spin-fade-loader' color='purple' fadeIn='none' /> */}
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <div className='App'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Fragment>
            <Header />
            <AppBody>
              <SideBar />
              <Switch>
                <Route path='/'>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </Fragment>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
