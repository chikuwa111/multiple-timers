import styled from 'styled-components';

export const BottomNavigation = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2rem;
  border-top: 2px solid;
  display: flex;
  justify-content: center;
`;

type BottomNavItemProps = {
  active: boolean;
};

export const BottomNavItem = styled.a<BottomNavItemProps>`
  cursor: ${props => (props.active ? 'default' : 'pointer')};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.active ? 'white' : 'gainsboro')};
  color: ${props => (props.active ? 'black' : 'gray')};

  & + & {
    border-left: 2px solid black;
  }
`;
