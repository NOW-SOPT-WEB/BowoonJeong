import {Area, HelpP, IMG, Input, InputContaier, InputSort, MoveButton, Title} from '../style/styleComponents';
import loginImg from '../assets/img2.jpg';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../assets/base-url';

export default function LoginPage() {
    const navi = useNavigate();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const handleLogin = async () => {
        if (id && pw) {
            //만약 모두가 값이 있다면
            try {
                await axios
                    .post(`${BASE_URL}/member/login`, {
                        authenticationId: id,
                        password: pw,
                    })
                    .then((res) => {
                        //location Header에 있는 게 이거 맞나..?
                        //useParam을 어떻게 활용하지....?
                        const memberId = res.headers.location;
                        console.log(memberId);
                        //아 이걸 useParam써서 메인으로 보내자

                        alert(res.data.message);
                        //to main page
                        navi(`/${memberId}`);
                    })
                    .catch((error) => alert(error.response.data.message));
            } catch {
                //error
            }
        }
    };

    return (
        <Area>
            <Title>Login</Title>
            <IMG src={loginImg} alt="loginImg" />
            <InputContaier>
                <InputSort>ID</InputSort>
                <div style={{width: '100%'}}>
                    <Input
                        onChange={(e) => setId(e.currentTarget.value)}
                        type="text"
                        placeholder="아이디를 입력하세요"
                    />
                    {!id && <HelpP>아이디를 입력하세요</HelpP>}
                </div>
            </InputContaier>
            <InputContaier>
                <InputSort>PW</InputSort>
                <div style={{width: '100%'}}>
                    <Input
                        onChange={(e) => setPw(e.currentTarget.value)}
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                    />
                    {!pw && <HelpP>비밀번호를 입력해주세요 제발</HelpP>}
                </div>
            </InputContaier>
            <div>
                <MoveButton onClick={handleLogin}>로그인</MoveButton>
                <Link to={'/signup'}>
                    <MoveButton>회원가입</MoveButton>
                </Link>
            </div>
        </Area>
    );
}
