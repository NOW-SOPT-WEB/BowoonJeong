import axios from 'axios';
import {useRef} from 'react';
import {BASE_URL} from '../assets/base-url';
import {Info, Input, MoveButton, OneLine} from '../style/styleComponents';

export default function (props: any) {
    const oldPwRef = useRef<HTMLInputElement>(null);
    const newPwRef = useRef<HTMLInputElement>(null);
    const newAgainPwRef = useRef<HTMLInputElement>(null);

    function handleEditPw() {
        if (oldPwRef.current?.value && newPwRef.current?.value && newAgainPwRef.current?.value) {
            axios
                .patch(
                    `${BASE_URL}/member/password`,
                    {
                        previousPassword: oldPwRef.current?.value,
                        newPassword: newPwRef.current?.value,
                        newPasswordVerification: newAgainPwRef.current?.value,
                    },
                    {
                        headers: {
                            memberId: props.props,
                        },
                    }
                )
                .then((res) => {
                    alert(res.data.message);
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
        }
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <section>
                <OneLine>
                    <Info>기존 비밀번호</Info>
                    <Input ref={oldPwRef} type="text" />
                </OneLine>
                <OneLine>
                    <Info>새로운 비밀번호</Info>
                    <Input ref={newPwRef} type="text" />
                </OneLine>
                <OneLine>
                    <Info>비밀번호 확인</Info>
                    <Input ref={newAgainPwRef} type="text" />
                </OneLine>
            </section>
            <MoveButton onClick={handleEditPw}>비밀번호 변경</MoveButton>
        </div>
    );
}
