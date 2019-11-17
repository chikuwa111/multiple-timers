import styled from 'styled-components';

export const TextBox = styled.div`
  border-radius: 3px;
  border: 2px solid;
  box-shadow: 1px 1px 1px lightgray;
  padding: 0.25rem 0.5rem;

  & + & {
    margin-top: 1rem;
  }
`;

export const Text = styled.p`
  margin: 0;
`;

export const LargeText = styled(Text)`
  font-size: 1.25rem;
`;
