import styled from 'styled-components';
import Input from '../ui/Input';

export const TimeWrapper = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: center;
`;

type TimeTextProps = {
  isOver: boolean;
};
export const TimeText = styled.span<TimeTextProps>`
  color: ${props => (props.isOver ? 'firebrick' : 'inherit')};
`;

export const TimeInput = styled(Input)`
  display: inline-block;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
