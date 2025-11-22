import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Container, Card, PageTitle, Button, Input, FormGroup } from '../styles/CommonComponents';

const MyPageCard = styled(Card)`
  margin-bottom: 30px;
  
  h2 {
    color: ${props => props.theme.colors.cobaltBlue};
    margin-bottom: 20px;
    font-size: 24px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InfoItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray};
  
  &:last-child {
    border-bottom: none;
  }
  
  strong {
    color: ${props => props.theme.colors.textPrimary};
    margin-right: 10px;
  }
`;

const DangerZone = styled(MyPageCard)`
  border: 2px solid ${props => props.theme.colors.error};
`;

const DangerText = styled.p`
  color: ${props => props.theme.colors.error};
  margin-bottom: 20px;
  line-height: 1.6;
`;

const Message = styled.div`
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  background-color: ${props => props.success ? '#E8F5E9' : '#FFEBEE'};
  color: ${props => props.success ? props.theme.colors.success : props.theme.colors.error};
`;

const MyPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
    }
  }, [user]);

  const handleUpdateNickname = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.put('/api/user/nickname', { nickname });
      setMessage('닉네임이 성공적으로 변경되었습니다');
      // Refresh user data
      const response = await axios.get('/api/user/me');
      // Note: You might want to update the AuthContext here
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.error || '닉네임 변경에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }

    if (!window.confirm('마지막 확인입니다. 정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      await axios.delete('/api/user/delete');
      logout();
      navigate('/login');
      alert('계정이 삭제되었습니다');
    } catch (error) {
      alert(error.response?.data?.error || '계정 삭제에 실패했습니다');
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <Container>
          <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container>
        <PageTitle>마이페이지</PageTitle>

        <MyPageCard>
          <h2>계정 정보</h2>
          <UserInfo>
            <InfoItem>
              <strong>사용자명:</strong> {user.username}
            </InfoItem>
            <InfoItem>
              <strong>닉네임:</strong> {user.nickname}
            </InfoItem>
            <InfoItem>
              <strong>가입일:</strong> {new Date(user.createdAt).toLocaleString('ko-KR')}
            </InfoItem>
          </UserInfo>
        </MyPageCard>

        <MyPageCard>
          <h2>닉네임 변경</h2>
          {message && (
            <Message success={message.includes('성공')}>
              {message}
            </Message>
          )}
          <form onSubmit={handleUpdateNickname}>
            <FormGroup>
              <label htmlFor="nickname">새 닉네임</label>
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
            <Button type="submit" primary disabled={loading}>
              {loading ? '변경 중...' : '닉네임 변경'}
            </Button>
          </form>
        </MyPageCard>

        <DangerZone>
          <h2>계정 삭제</h2>
          <DangerText>
            계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
          </DangerText>
          <Button onClick={handleDeleteAccount} danger>
            계정 삭제
          </Button>
        </DangerZone>
      </Container>
    </>
  );
};

export default MyPage;
