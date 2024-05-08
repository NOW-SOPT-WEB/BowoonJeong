import styled from 'styled-components';

export default function LevelButtons() {
  return (
    <LevelBtnsBox>
      <LevelBtn>easy</LevelBtn>
      <LevelBtn>normal</LevelBtn>
      <LevelBtn>Hard</LevelBtn>
    </LevelBtnsBox>
  );
}
const LevelBtnsBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;
const LevelBtn = styled.p`
  padding: 10px;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
`;
