"use client";
import "./page.css";
import { useEffect, useState } from "react";




export default function Join() {
    // useState
    const [ email, setEmail ] = useState('');
    const [ emailInputState, setEmailInputState ] = useState(true);
    const [ emailSendBtnState, setEmailSendBtnState ] = useState(false);
    const [ emailInfoState, setEmailInfoState ] = useState("");

    const [ expiresAt, setExpiresAt ] = useState('');
    const [ timeLeft, setTimeLeft ] = useState(0);
    const [ emailCode, setEmailCode ] = useState('');
    const [ emailCodeInputState, setEmailCodeInputState ] = useState(true);
    const [ emailCodeVerifyBtnState, setEmailCodeVerifyBtnState ] = useState(false);
    const [ emailCodeInfoState, setEmailCodeInfoState ] = useState("");


    const [ password, setPassword ] = useState('');
    const [ passwordInfoState, setPasswordInfoState ] = useState("");

    const [ name, setName ] = useState('');

    const [ emailState, setEmailState ] = useState(false);
    const [ passwordState, setPasswordState ] = useState(false);
    

    /**
     * send mail()
     * 인증코드 전송
     */
    async function sendMail() {
        const res = await fetch("/api/login/join/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email
            })
        });

        if (!res.ok) {
            // todo 나중에 팝업 띄우기
            return;
        }
        
        const data = await res.json();
        if (data.success) {
            const expires = new Date(data.expires_at).getTime();
            const now = new Date().getTime();
            const diff = Math.max(0, Math.ceil((expires - now) / 1000));

            setTimeLeft(diff);
            setExpiresAt(data.expires_at);
            setEmailSendBtnState(false);
            setEmailInputState(false);
            setEmailInfoState('');
            setEmailCodeInfoState('');
        } else {
            setEmailInfoState(data.message);
        }
    }


    /**
     * verify code()
     * 인증코드 확인
     */
    async function verifyCode() {
        if (timeLeft <= 0) {
            setEmailCodeInfoState("인증코드를 다시 요청해주세요.");
            return;
        }
        
        const res = await fetch("/api/login/join/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                code: emailCode
            })
        });

        if (!res.ok) {
            // todo 나중에 popup 띄우기
            return;
        }
        
        const data = await res.json();
        if (data.success) {
            setEmailCodeInputState(false);
            setEmailCodeVerifyBtnState(false);
            setEmailCodeInfoState("인증이 완료되었습니다.");
            setTimeLeft(0);
            setExpiresAt('');
            setEmailState(true);
            
        } else {
            setEmailCodeInfoState(data.message);
        }
    }
    
    
    /**
     * password onfocusout()
     * 비밀번호 체크
     * @param e 
     */
    function passwordOnFocusout(e: React.InputEvent) {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    }
    
    
    async function join(e: React.SubmitEvent) {
        e.preventDefault();
    }


    /**
     * useEffect()
     * 인증코드 타이머
     * [expiredAt]
     */
    useEffect(() => {
        if (!expiresAt) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const end = new Date(expiresAt).getTime();
            const diff = Math.max(0, Math.ceil((end - now) / 1000));

            setTimeLeft(diff);

            if (diff === 0) {
                clearInterval(interval);
                setEmailSendBtnState(true);
                setEmailInputState(true);
                setEmailCodeInfoState("인증코드 시간이 만료되었습니다. 다시 요청해주세요.");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt]);


    /**
     * 타이머 화면 표시()
     * @param seconds 
     * @returns 
     */
    function formatTime(seconds: number) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    }
    
    
    // RETURN
    return (
        <form id="form" onSubmit={join}>
            <div id="inputs">
                <div className="input-wrapper">
                    <div className="input-info">
                        <span className="main">* 이메일 입력</span>

                        <button
                            id="email-send-btn"
                            type="button"
                            disabled={!emailSendBtnState}
                            onClick={sendMail}
                        >
                            인증코드 전송
                        </button>
                    </div>
                    
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        value={email}
                        readOnly={!emailInputState}
                        onChange={e => {
                            const value = e.target.value;
                            setEmail(value);
                            setEmailSendBtnState(value.length > 0);
                        }}
                        required
                    />

                    <p className="info-text">
                        {emailInfoState}
                    </p>
                </div>

                <div className="input-wrapper">
                    <div className="input-info">
                        <p className="main">
                            * 인증코드 입력

                            <span id="timer" className={timeLeft < 60 ? "red" : ""}>
                                {expiresAt ? `${formatTime(timeLeft)}`: ''}
                            </span>
                        </p>

                        <button
                            id="email-send-btn"
                            type="button"
                            disabled={!emailCodeVerifyBtnState}
                            onClick={verifyCode}
                        >
                            인증코드 확인
                        </button>
                    </div>
                    
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        value={emailCode}
                        readOnly={!emailCodeInputState}
                        onChange={e => {
                            const value = e.target.value;
                            setEmailCode(value);
                            setEmailCodeVerifyBtnState(value.length > 0);
                        }}
                        required
                    />

                    <p className={emailState ? "info-text verified" : "info-text"}>
                        {emailCodeInfoState}
                    </p>
                </div>

                <div className="input-wrapper">
                    <p className="input-info">
                        <span className="main">* 비밀번호 입력</span>
                    </p>
                    
                    <input
                        className="input"
                        type="password"
                        autoComplete="off"
                        placeholder="영문, 숫자, 특수문자를 포합한 8자리 이상"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <p className="info-text">

                    </p>
                </div>

                <div className="input-wrapper">
                    <p className="input-info">
                        <span className="main">이름 입력</span>
                    </p>
                    
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
            </div>
            
            <button
                id="join-btn"
                type="submit"
                disabled={!emailState || !passwordState}
            >
                계정 생성
            </button>
        </form>
    );
}