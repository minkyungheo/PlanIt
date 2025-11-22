import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { Button } from '../styles/CommonComponents';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.cobaltBlue};
  color: ${props => props.theme.colors.white};
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavBrand = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.white};
  text-decoration: none;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  font-size: 16px;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const NavUser = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NavUsername = styled.span`
  color: ${props => props.theme.colors.white};
  font-weight: 500;
`;

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/todos');
  };

  return (
    <Nav>
      <NavContainer>
        <NavBrand to="/todos">Todo List</NavBrand>
        <NavMenu>
          <NavLink to="/todos">메인</NavLink>
          {user ? (
            <>
              <NavLink to="/mypage">마이페이지</NavLink>
              <NavUser>
                <NavUsername>{user.nickname || user.username}</NavUsername>
                <Button onClick={handleLogout}>로그아웃</Button>
              </NavUser>
            </>
          ) : (
            <NavUser>
              <Button as={Link} to="/login" style={{ marginRight: '10px' }}>
                로그인
              </Button>
              <Button as={Link} to="/register" primary>
                회원가입
              </Button>
            </NavUser>
          )}
        </NavMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
