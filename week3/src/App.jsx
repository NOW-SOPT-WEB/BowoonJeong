import styled, {ThemeProvider} from 'styled-components';
import './style/App.css';
import theme from './style/theme';
import {useEffect, useState} from 'react';
import {CARDS} from './constants/cardData';
import Header from './components/Header';
import LevelButtons from './components/levelButton';

function App() {
  const [success, setSuccess] = useState(false);
  const [score, setScore] = useState(0);

  //filpedId의 값이 각 사진의 id == 배열에 id가 있으면 뒤집힌거 순서대로!!
  const [filpedId, setFilpedId] = useState([]);
  const [prevOpenedId, setPrevOpenedId] = useState(null);

  const [shuffledCards, setShuffledCards] = useState([]);
  useEffect(() => setShuffledCards([...CARDS].sort(() => Math.random() - 0.5)), [success]);

  function handleFilp(item) {
    //여기에 item이 아니라 event로 보내서 했는데 그러니까 반영이 안되지!!!
    //useState상태변경을 위해선 item자체를 보내야함!!!

    //만약 filped 길이가 홀수개면 -> 하나 열린거 있느거임
    //그럼 지금 열린게 같은 sort인지 확인후 추가
    //만약 열린게 같은 sort가 아니라면 이 전거 pop,이번꺼 추가 안함

    //만약 짝수개라면 그냥 열기
    //만약 길이가 13이라면 축하합니다 !

    //전에 오픈했던데 틀렸다면 둘다 닫혀야 함
    if (prevOpenedId !== null) {
      setFilpedId((prev) =>
        prev.filter((each) => each.sort !== prevOpenedId.sort && each !== filpedId[filpedId.length - 2])
      );
      setPrevOpenedId(null);
    }

    const len = filpedId.length;

    if (len % 2 !== 0) {
      //홀수
      if (filpedId[len - 1].sort !== item.sort) {
        //다른 종류!!!
        setPrevOpenedId(item);
      } else {
        setScore(score + 1);
      }
    }

    if (len >= 13) {
      setSuccess(true);
    }
  }

  function handleReTry() {
    setFilpedId([]);
    setPrevOpenedId(null);
    setSuccess(false);
    setScore(0);
  }

  return (
    <ThemeProvider theme={theme}>
      <Header score={score} />

      <main>
        <LevelButtons />

        <Container>
          {shuffledCards.map((item) => {
            return (
              <CardItem key={item.id}>
                {filpedId.includes(item) ? (
                  <Image src={item.src} alt={item.alt} />
                ) : (
                  <Image
                    src="src/assets/cover.png"
                    alt={item.id}
                    onClick={() => {
                      setFilpedId([...filpedId, item]);
                      handleFilp(item);
                    }}
                  />
                )}
              </CardItem>
            );
          })}
        </Container>
      </main>

      {success && (
        <CongratModal>
          !추카포카!
          <button onClick={handleReTry}>게임 다시하기</button>
        </CongratModal>
      )}
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  position: absolute;
  left: 20%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  max-width: 80%;
  gap: 1rem;
  color: black;
`;

const CardItem = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 10rem;
  height: 12rem;
  border-radius: 10%;
`;

const CongratModal = styled.div`
  position: absolute;
  left: 42%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 10rem;
  gap: 1rem;
  border-radius: 5rem;
  color: ${({theme}) => theme.colors.blue};
  background-color: ${({theme}) => theme.colors.yellow};
  font-size: 2rem;
`;
