import {Area, HelpP, IMG, Input, InputContaier, InputSort, MoveButton, Title} from '../style/styleComponents';
import signUpImg from '../assets/img3.jpg';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../assets/base-url';
import {useRef} from 'react';

export default function SignupPage() {
    const navi = useNavigate();
    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    const nicknameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    function checkEachInput(props: React.RefObject<HTMLInputElement>) {
        if (!props.current?.value) {
            document.getElementById(`${props.current?.id}`)!.style.borderColor = 'red';
            //포커스 맞추기
            document.getElementById(`${props.current?.id}`)!.focus();
            return false;
        } else {
            document.getElementById(`${props.current?.id}`)!.style.borderColor = '';
            return true;
        }
    }

    const handleSignUp = async () => {
        if (checkEachInput(idRef) && checkEachInput(pwRef) && checkEachInput(nicknameRef) && checkEachInput(phoneRef)) {
            //만약 모두가 값이 있다면
            try {
                await axios
                    .post(`${BASE_URL}/member/join`, {
                        authenticationId: idRef.current?.value,
                        password: pwRef.current?.value,
                        nickname: nicknameRef.current?.value,
                        phone: phoneRef.current?.value,
                    })
                    .then((res) => {
                        alert(res.data.message);
                        //to login page
                        navi('/login');
                    })
                    .catch((error) => alert(error.response.data.message));
            } catch {
                //error
            }
        }
    };

    const handleGoBack = () => {
        navi(-1);
    };
    return (
        <div>
            <Area>
                <Title>Sign Up</Title>
                <IMG src={signUpImg} alt="signUpImg" />

                <InputContaier>
                    <InputSort>ID</InputSort>
                    <Input ref={idRef} id="idInput" type="text" />
                </InputContaier>
                <InputContaier>
                    <InputSort>비밀번호</InputSort>
                    <div style={{width: '100%'}}>
                        <Input ref={pwRef} id="pwInput" type="password" />
                        <HelpP>비밀번호 형식은 8자이상, 숫자, 특수문자, 영어 알파벳이 포함되어야 합니다.</HelpP>
                    </div>
                </InputContaier>
                <InputContaier>
                    <InputSort>닉네임</InputSort>
                    <Input ref={nicknameRef} id="nicknameInput" type="text" />
                </InputContaier>
                <InputContaier>
                    <InputSort>전화번호</InputSort>
                    <div style={{width: '100%'}}>
                        <Input ref={phoneRef} id="phoneInput" type="text" placeholder="010-xxxx-xxxx" />
                        <HelpP>전화번호 형식은 010-****-****입니다.</HelpP>
                    </div>
                </InputContaier>

                <div>
                    <MoveButton id="signUpButton" onClick={handleSignUp}>
                        회원가입
                    </MoveButton>
                    <MoveButton onClick={handleGoBack}>뒤로가기</MoveButton>
                </div>
            </Area>
        </div>
    );
}
