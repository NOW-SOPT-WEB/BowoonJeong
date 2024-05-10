import {Area, IMG, Input, InputContaier, InputSort, MoveButton, Title} from '../style/styleComponents';
import loginImg from '../assets/img2.jpg';
import {Link} from 'react-router-dom';

export default function LoginPage() {
    return (
        <Area>
            <Title>Login</Title>
            <IMG src={loginImg} alt="loginImg" />
            <InputContaier>
                <InputSort>ID</InputSort>
                <Input type="text" placeholder="아이디를 입력하세요"></Input>
            </InputContaier>
            <InputContaier>
                <InputSort>PW</InputSort>
                <Input type="password" placeholder="비밀번호를 입력하세요"></Input>
            </InputContaier>
            <div>
                <MoveButton>로그인</MoveButton>
                <Link to={'/signup'}>
                    <MoveButton>회원가입</MoveButton>
                </Link>{' '}
            </div>
        </Area>
    );
}
