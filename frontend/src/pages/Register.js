import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Button, Input, FormGroup } from '../styles/CommonComponents';

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.cobaltBlue} 0%, ${props => props.theme.colors.cobaltBlueLight} 100%);
  padding: 20px;
`;

const AuthCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 10px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AuthTitle = styled.h1`
  color: ${props => props.theme.colors.cobaltBlue};
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
`;

const ErrorMessage = styled.div`
  background-color: #FFEBEE;
  color: ${props => props.theme.colors.error};
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
`;

const AuthLink = styled.p`
  text-align: center;
  margin-top: 20px;
  color: ${props => props.theme.colors.textSecondary};
  
  a {
    color: ${props => props.theme.colors.cobaltBlue};
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/register', {
        username,
        password,
        nickname,
      });

      login(response.data.token, response.data.user);
      navigate('/todos');
    } catch (err) {
      setError(err.response?.data?.error || '회원가입에 실패했습니다');
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthTitle>회원가입</AuthTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="username">사용자명</label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              maxLength={20}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">비밀번호</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="nickname">닉네임</label>
            <Input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              minLength={2}
              maxLength={20}
            />
          </FormGroup>
          <Button type="submit" primary block style={{ marginTop: '10px' }}>
            회원가입
          </Button>
        </form>
        <AuthLink>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </AuthLink>
      </AuthCard>
    </AuthContainer>
  );
};

export default Register;
