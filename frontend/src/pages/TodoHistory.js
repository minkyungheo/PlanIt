import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Container, Card, PageTitle, Button, EmptyState } from '../styles/CommonComponents';

const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const HistoryCard = styled(Card)`
  border-left: 4px solid ${props => props.theme.colors.cobaltBlue};
`;

const HistoryHeaderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${props => props.theme.colors.gray};
`;

const HistoryActionType = styled.span`
  color: ${props => props.theme.colors.white};
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${props => props.bgColor || props.theme.colors.textSecondary};
`;

const HistoryDate = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`;

const HistoryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const HistoryField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  
  strong {
    color: ${props => props.theme.colors.textPrimary};
    margin-bottom: 5px;
  }
`;

const HistoryChange = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: ${props => props.theme.colors.grayLight};
  border-radius: 5px;
`;

const HistoryOld = styled.span`
  color: ${props => props.theme.colors.error};
  text-decoration: line-through;
`;

const HistoryNew = styled.span`
  color: ${props => props.theme.colors.success};
  font-weight: 500;
`;

const TodoHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [id]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`/api/todos/${id}/history`);
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
      alert(error.response?.data?.error || '수정이력을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const getActionTypeLabel = (type) => {
    const labels = {
      CREATE: '생성',
      UPDATE: '수정',
      DELETE: '삭제',
    };
    return labels[type] || type;
  };

  const getActionTypeColor = (type) => {
    const colors = {
      CREATE: '#388E3C',
      UPDATE: '#0047AB',
      DELETE: '#D32F2F',
    };
    return colors[type] || '#757575';
  };

  if (loading) {
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
        <HistoryHeader>
          <Button onClick={() => navigate('/todos')}>
            ← 목록으로
          </Button>
          <PageTitle>수정이력 상세보기</PageTitle>
        </HistoryHeader>

        {history.length === 0 ? (
          <EmptyState>수정이력이 없습니다.</EmptyState>
        ) : (
          <HistoryContainer>
            {history.map((item) => (
              <HistoryCard key={item.id}>
                <HistoryHeaderItem>
                  <HistoryActionType bgColor={getActionTypeColor(item.actionType)}>
                    {getActionTypeLabel(item.actionType)}
                  </HistoryActionType>
                  <HistoryDate>
                    {new Date(item.changedAt).toLocaleString('ko-KR')}
                  </HistoryDate>
                </HistoryHeaderItem>

                {item.actionType === 'CREATE' && (
                  <HistoryContent>
                    <HistoryField>
                      <strong>제목:</strong> {item.newTitle}
                    </HistoryField>
                    {item.newContent && (
                      <HistoryField>
                        <strong>내용:</strong> {item.newContent}
                      </HistoryField>
                    )}
                    <HistoryField>
                      <strong>완료 상태:</strong> {item.newCompleted ? '완료' : '미완료'}
                    </HistoryField>
                  </HistoryContent>
                )}

                {item.actionType === 'UPDATE' && (
                  <HistoryContent>
                    {(item.oldTitle !== item.newTitle || item.oldContent !== item.newContent) && (
                      <>
                        {item.oldTitle !== item.newTitle && (
                          <HistoryField>
                            <strong>제목 변경:</strong>
                            <HistoryChange>
                              <HistoryOld>{item.oldTitle}</HistoryOld>
                              <span>→</span>
                              <HistoryNew>{item.newTitle}</HistoryNew>
                            </HistoryChange>
                          </HistoryField>
                        )}
                        {item.oldContent !== item.newContent && (
                          <HistoryField>
                            <strong>내용 변경:</strong>
                            <HistoryChange>
                              <HistoryOld>{item.oldContent || '(없음)'}</HistoryOld>
                              <span>→</span>
                              <HistoryNew>{item.newContent || '(없음)'}</HistoryNew>
                            </HistoryChange>
                          </HistoryField>
                        )}
                      </>
                    )}
                    {item.oldCompleted !== item.newCompleted && (
                      <HistoryField>
                        <strong>완료 상태 변경:</strong>
                        <HistoryChange>
                          <HistoryOld>{item.oldCompleted ? '완료' : '미완료'}</HistoryOld>
                          <span>→</span>
                          <HistoryNew>{item.newCompleted ? '완료' : '미완료'}</HistoryNew>
                        </HistoryChange>
                      </HistoryField>
                    )}
                  </HistoryContent>
                )}

                {item.actionType === 'DELETE' && (
                  <HistoryContent>
                    <HistoryField>
                      <strong>삭제된 제목:</strong> {item.oldTitle}
                    </HistoryField>
                    {item.oldContent && (
                      <HistoryField>
                        <strong>삭제된 내용:</strong> {item.oldContent}
                      </HistoryField>
                    )}
                    <HistoryField>
                      <strong>완료 상태:</strong> {item.oldCompleted ? '완료' : '미완료'}
                    </HistoryField>
                  </HistoryContent>
                )}
              </HistoryCard>
            ))}
          </HistoryContainer>
        )}
      </Container>
    </>
  );
};

export default TodoHistory;
