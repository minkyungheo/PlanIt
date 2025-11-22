import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${props => {
    if (props.primary) {
      return `
        background-color: ${props.theme.colors.cobaltBlue};
        color: ${props.theme.colors.white};
        &:hover {
          background-color: ${props.theme.colors.cobaltBlueHover};
        }
      `;
    }
    if (props.danger) {
      return `
        background-color: ${props.theme.colors.error};
        color: ${props.theme.colors.white};
        &:hover {
          background-color: #B71C1C;
        }
      `;
    }
    return `
      background-color: ${props.theme.colors.gray};
      color: ${props.theme.colors.textPrimary};
      &:hover {
        background-color: ${props.theme.colors.grayDark};
        color: ${props.theme.colors.white};
      }
    `;
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${props => props.block && 'width: 100%;'}
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.cobaltBlue};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  font-family: inherit;
  resize: vertical;

  &::-webkit-resizer {
    display: none;
  }
  &::-moz-resizer {
    display: none;
  }
    resize: none;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.cobaltBlue};
  }
`;

export const Card = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const PageTitle = styled.h1`
  color: ${props => props.theme.colors.cobaltBlue};
  margin-bottom: 30px;
  font-size: 32px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    color: ${props => props.theme.colors.textPrimary};
    font-weight: 500;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 50px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 18px;
`;


