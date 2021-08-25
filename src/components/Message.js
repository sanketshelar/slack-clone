import React from 'react';
import styled from 'styled-components';

const Message = ({ message, timestamp, user, userImage }) => {
  return (
    <MessageContainer>
      <img src={userImage} alt='' />

      <MessageInfo>
        <h4>
          {user}
          <span className='date'>
            {timestamp && new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  object-fit: contain;

  > img {
    height: 50px;
    border-radius: 5px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;

  .date {
    color: gray;
    font-weight: 300px;
    margin-left: 4px;
    font-size: 10px;
  }
`;
