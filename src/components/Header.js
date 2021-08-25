import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { AccessTime } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <HeaderContainer>
      {/* Header Left */}
      <HeaderLeft>
        <AccessTime />
      </HeaderLeft>

      {/* Header Middle */}
      <HeaderSearch className='header'>
        <input type='text' placeholder={`Search ${user.displayName}`} />
        <SearchIcon />
      </HeaderSearch>

      {/* Header Right */}
      <HeaderRight>
        <HelpOutlineOutlinedIcon />
        <HeaderAvatar
          onClick={() => auth.signOut()}
          alt={user?.displayName}
          src={user?.photoURL}
        />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 0px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 0.3;
  justify-content: flex-end;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    cursor: pointer;
    margin-right: 35px;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  flex: 0.4;
  opacity: 1;
  background-color: #421f44;
  text-align: center;
  color: gray;
  border: 1px solid gray;
  border-radius: 6px;
  padding: 2px 5px;

  > input {
    width: 100%;

    color: white;
    background-color: transparent;
    border: none;
    outline: none;
  }

  > .MuiSvgIcon-root {
    color: white;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0.3;

  > .MuiSvgIcon-root {
    cursor: pointer;
    margin-left: 35px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  margin-right: 35px;

  :hover {
    opacity: 0.8;
  }
`;
