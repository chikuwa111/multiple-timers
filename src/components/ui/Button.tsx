import styled from 'styled-components';

type Props = {
  primary?: boolean;
  color?: string;
};

const Button = styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
  border: 2px solid;
  border-color: ${props => props.color || 'inherit'};
  padding: 0.25rem 0.5rem;
  background: ${props =>
    props.primary ? props.color || 'transparent' : 'white'};
  color: ${props => (props.primary ? 'white' : props.color || 'inherit')};
`;
export default Button;

export const FullWidthButton = styled(Button)`
  width: 100%;
`;
