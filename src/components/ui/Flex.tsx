import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
`;

export const FlexStartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

export const FlexComponent = styled.div`
  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 2rem;

  @media screen and (min-width: 481px) {
    width: 46%;
    margin-left: 2%;
    margin-right: 2%;
  }

  @media screen and (min-width: 1024px) {
    width: 21%;
    margin-left: 2%;
    margin-right: 2%;
  }
`;
