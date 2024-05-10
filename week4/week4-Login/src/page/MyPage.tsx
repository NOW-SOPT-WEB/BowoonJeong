import {useEffect, useState} from 'react';
import {Area, Info, MoveButton, OneLine, PwEditBtn, ShowORNot} from '../style/styleComponents';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../assets/base-url';
import PwEditComp from './PwEditComp';

type Info = {
    id: string;
    nickname: string;
    phone: string;
};

export default function MyPage() {
    const {memberId} = useParams<string>();
    const [info, setInfo] = useState<Info>();

    useEffect(() => {
        //memberId로
        try {
            axios
                .get(`${BASE_URL}/member/info`, {
                    headers: {
                        memberId: memberId,
                    },
                })
                .then((res) => {
                    const myInfo: Info = {
                        id: res.data.data.authenticationId,
                        nickname: res.data.data.nickname,
                        phone: res.data.data.phone,
                    };
                    setInfo(myInfo);
                    console.log(myInfo);
                })
                .catch((error) => {
                    alert(error.response.data.message);
                    console.log(error);
                });
        } catch {
            //error
        }
    }, []);

    function handleShowPw() {
        const nowState = document.getElementById('showornot')!.style.visibility;
        if (nowState == 'hidden') {
            //숨겨뒀다가 열려고 누름 -> 보여야함
            document.getElementById('showornot')!.style.visibility = 'visible';
        } else {
            document.getElementById('showornot')!.style.visibility = 'hidden';
        }
    }

    return (
        <>
            <Area>
                <h1>마이페이지</h1>
                <section>
                    <OneLine>
                        <Info>ID</Info>
                        <Info>{info?.id}</Info>
                    </OneLine>
                    <OneLine>
                        <Info>닉네임</Info>
                        <Info>{info?.nickname}</Info>
                    </OneLine>
                    <OneLine>
                        <Info>전화번호</Info>
                        <Info>{info?.phone}</Info>
                    </OneLine>
                </section>
                <section>
                    <div style={{display: 'flex', gap: '1rem'}}>
                        <p>비밀번호 변경</p>
                        <PwEditBtn onClick={handleShowPw}>{'>'}</PwEditBtn>
                    </div>
                    <ShowORNot id="showornot">
                        <PwEditComp props={memberId!} />
                    </ShowORNot>
                </section>
                <Link to={`/${memberId}`}>
                    <MoveButton>홈으로</MoveButton>
                </Link>
            </Area>
        </>
    );
}
