import React from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { getRoomId } from '../features/appSlice';

function SidebarOptions({ id, Icon, title, addChannelOptions }) {
  const dispatch = useDispatch();

  const addChannel = () => {
    const channelName = prompt('Enter the name of channel');

    if (channelName) {
      db.collection('rooms').add({
        name: channelName,
      });
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(
        getRoomId({
          roomId: id,
        })
      );
    }
  };

  return (
    <SidebarOptionsContainer
      onClick={addChannelOptions ? addChannel : selectChannel}
    >
      {Icon && <Icon style={{ padding: '2px', margin: '0px 10px' }} />}

      {Icon ? (
        <p>{title}</p>
      ) : (
        <SidebarOptionsChannel>
          <span style={{ padding: '2px', margin: '0px 14px' }}>#</span> {title}
        </SidebarOptionsChannel>
      )}
    </SidebarOptionsContainer>
  );
}

export default SidebarOptions;

const SidebarOptionsContainer = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  color: gray;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }
`;
const SidebarOptionsChannel = styled.div`
  margin-top: 10px;
`;
