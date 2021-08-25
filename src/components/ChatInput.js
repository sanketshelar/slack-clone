import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { db } from '../firebase';
import firebase from 'firebase';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatInput = ({ channelId, channelName, chatRef }) => {
  const [msg, setMsg] = useState('');
  const [userInfo] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection('rooms').doc(channelId).collection('messages').add({
      message: msg,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: userInfo?.displayName,
      userImage: userInfo?.photoURL,
    });

    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
    setMsg('');
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          value={msg}
          placeholder={channelName ? `Message ${channelName}` : 'Message #ROOM'}
          onChange={(e) => setMsg(e.target.value)}
        />

        <Button hidden type='submit' onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    width: 60%;
    position: fixed;
    outline: none;
    bottom: 30px;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    color: black;
  }

  > form > Button {
    display: none;
  }
`;
