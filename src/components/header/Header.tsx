import styled from '@emotion/styled';
import { Button, Dropdown, Menu } from 'antd';
import { ReactComponent as AppLogo } from 'assets/software-logo.svg';
import ButtonNoPadding from 'components/buttonNoPadding/ButtonNoPadding';
import ProjectPopover from 'components/projectPopover/ProjectPopover';
import Row from 'components/row/Row';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { resetRoute } from 'utils';

const Header = (props: { projectButton: JSX.Element }) => {
  const { logout, user } = useAuth();

  return (
    <HeaderContainer between={true}>
      <HeaderLeft gap={true}>
        {/* import svg as a component to styling */}
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <AppLogo width={'18rem'} color={'rgb(38,132,255)'} />
        </ButtonNoPadding>
        <ProjectPopover {...props} />
        {/* <img src={appLogo} alt="jira" /> */}

        <span>User</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </HeaderContainer>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={'logout'}>
            <Button type={'link'} onClick={logout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={'link'} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const HeaderContainer = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

export default Header;
