import {Link, useParams} from 'react-router-dom';
import {Header, MoveButton, Section} from '../style/styleComponents';
import ReactPlayer from 'react-player';

function MainPage() {
    const {memberId} = useParams<string>();

    console.log(memberId);
    return (
        <div>
            <Header>보운이의 로그인</Header>
            <Section>
                <ReactPlayer url={'/videos/고양이.mp4'} playing={true} loop={true} muted={true} />
                <div>
                    {memberId ? (
                        <Link to={`/mypage/${memberId}`}>
                            <MoveButton>내 정보</MoveButton>
                        </Link>
                    ) : (
                        <Link to={'/login'}>
                            <MoveButton>로그인</MoveButton>
                        </Link>
                    )}
                    <Link to={'/signup'}>
                        <MoveButton>회원가입</MoveButton>
                    </Link>
                </div>
            </Section>
        </div>
    );
}

export default MainPage;
