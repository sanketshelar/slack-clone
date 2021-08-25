import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { StarBorderOutlined, InfoOutlined } from '@material-ui/icons';
import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';
import Headers from '../components/Header';

const Chat = () => {
  const chatRef = useRef(null);
  const id = useSelector((state) => state.app.roomId);
  //   console.log(id);

  const [roomDetails] = useDocument(id && db.collection('rooms').doc(id));

  const [roomMessages, loading] = useCollection(
    id &&
      db
        .collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [id, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Headers />
          <Header>
            <HeaderLeft>
              <h4>
                <strong>
                  {roomDetails ? `#${roomDetails?.data().name}` : '#room-name'}
                </strong>
                <StarBorderOutlined />
              </h4>
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
          </ChatMessages>

          <ChatBottom ref={chatRef} />

          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={id}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatBottom = styled.div`
  padding-bottom: 130px;
`;

const ChatMessages = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 20px;
  border-bottom: 1px solid lightgray;
  height: 70px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    margin-left: 20px;
  }

  > h4 > .MuiSvgIcon-root {
    font-size: 18;
    margin-left: 18px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  > p {
    display: flex;
    margin-right: 20px;
    font-size: 14px;
    align-items: center;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 1;
  overflow-y: scroll;
`;
