import {Link} from 'react-router-dom';
import img1 from '../assets/img1.png';
import {Header, IMG, MoveButton, Section} from '../style/styleComponents';

function MainPage() {
  return (
    <div>
      <Header>보운이의 로그인</Header>
      <Section>
        <IMG src={img1} alt="image" />
        <div>
          <Link to={'/login'}>
            <MoveButton>로그인</MoveButton>
          </Link>
          <Link to={'/signup'}>
            <MoveButton>회원가입</MoveButton>
          </Link>
        </div>
      </Section>
    </div>
  );
}

export default MainPage;
