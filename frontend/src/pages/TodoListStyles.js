import styled from 'styled-components';
import { Card } from '../styles/CommonComponents';

export const GuestNotice = styled(Card)`
  margin-bottom: 20px;
  background-color: #E3F2FD;
  border: 1px solid ${props => props.theme.colors.cobaltBlue};
  
  p {
    margin: 0;
    color: ${props => props.theme.colors.cobaltBlue};
  }
`;

export const TodoFormCard = styled(Card)`
  h2 {
    color: ${props => props.theme.colors.cobaltBlue};
    margin-bottom: 20px;
    font-size: 24px;
  }
`;

export const TodosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const TodoCard = styled(Card)`
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  ${props => props.completed && `
    opacity: 0.7;
    background-color: ${props.theme.colors.grayLight};
  `}
`;

export const TodoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
`;

export const TodoCheckbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const TodoTitle = styled.h3`
  color: ${props => props.theme.colors.textPrimary};
  font-size: 20px;
  margin: 0;
  
  ${props => props.completed && `
    text-decoration: line-through;
    color: ${props.theme.colors.textSecondary};
  `}
`;

export const TodoContent = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin: 10px 0;
  line-height: 1.6;
`;

export const TodoFooter = styled.div`
  display: flex;
  gap: 20px;
  margin: 15px 0;
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
`;

export const TodoActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

export const TodoEditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

