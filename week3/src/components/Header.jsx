import styled from 'styled-components';

export default function Header({ score }) {
  console.log(score);
  return (
    <InnerHeader>
      <h1>미니언즈 짝 맞추기</h1>
      <Score>{score + '/ 7'}</Score>
    </InnerHeader>
  );
}

const InnerHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fae06d;
  color: #4c82c9;
`;
const Score = styled.p`
  font-size: 2rem;
`;

//아 function export하면 {}이거 없이 임포트 받아야함
