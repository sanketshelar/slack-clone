import React from 'react';
import styled from 'styled-components';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import CreateIcon from '@material-ui/icons/Create';
import SidebarOptions from './SidebarOptions';
import {
  AppsOutlined,
  BookmarkBorderOutlined,
  DraftsOutlined,
  ExpandLessOutlined,
  ExpandMoreOutlined,
  FileCopyOutlined,
  InboxOutlined,
  InsertCommentOutlined,
  PeopleAltOutlined,
} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const SideBar = () => {
  const [channels, loading, error] = useCollection(db.collection('rooms'));
  const [user] = useAuthState(auth);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <SidebarInfoLeft>
            <h3>{user?.displayName}</h3>
            <ArrowDropDownOutlinedIcon />
          </SidebarInfoLeft>

          <SidebarInfoRight>
            <CreateIcon />
          </SidebarInfoRight>
        </SidebarInfo>
      </SidebarHeader>

      <SidebarOptions Icon={InsertCommentOutlined} title='Threads' />
      <SidebarOptions Icon={InboxOutlined} title='Mentions & reactions' />
      <SidebarOptions Icon={DraftsOutlined} title='Saved items' />
      <SidebarOptions Icon={BookmarkBorderOutlined} title='Channel browser' />
      <SidebarOptions Icon={PeopleAltOutlined} title='People & user groups' />
      <SidebarOptions Icon={AppsOutlined} title='Apps' />
      <SidebarOptions Icon={FileCopyOutlined} title='File browser' />
      <SidebarOptions Icon={ExpandLessOutlined} title='Show less' />

      <hr />
      <SidebarOptions Icon={ExpandMoreOutlined} title='Channels' />
      <hr />

      <SidebarOptions Icon={AddIcon} addChannelOptions title='Add Channel' />

      {channels?.docs.map((doc) => (
        <SidebarOptions key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
};

export default SideBar;

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  height: 100vh;
  border-top: 1px solid #49274b;
  max-width: 260px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
  @media only screen and (max-width: 700px) {
    visibility: hidden;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  border-bottom: 1px solid #49274b;
  padding: 15px 10px;
`;

const SidebarInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SidebarInfoLeft = styled.div`
  display: flex;
  font-weight: 900;

  > h3 {
    cursor: pointer;
  }
`;
const SidebarInfoRight = styled.div`
  margin-right: 10px;
`;
