"use client";
import "./page.css";
import { useState } from "react";




export default function Login() {
    // useState
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");


    /**
     * login logic
     * @param e React.SubmitEvent
     */
    async function login(e: React.SubmitEvent) {
        e.preventDefault();
    }
    
    
    // RETURN
    return (
        <>
            <form id="form" onSubmit={login}>
                <div id="inputs">
                    <div className="input-wrapper">
                        <p className="input-info">이메일</p>

                        <input
                            className="input"
                            type="text"
                            autoComplete="off"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="input-wrapper">
                        <p className="input-info">
                            비밀번호
                            <a href="/login/find">비밀번호 찾기</a>
                        </p>

                        <input
                            className="input"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button
                    id="login-btn"
                    className={email.length <= 0 || password.length <= 0 ? "disabled" : ""}
                    type="submit"
                >
                    로그인
                </button>
            </form>

            <div className="line"></div>

            <div id="oauth-wrapper">
                <button className="oauth-btn" style={{backgroundColor: "#fff", color: "#000"}}>
                    <svg className="oauth-icon" aria-label="Google logo" width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                        </g>
                    </svg>
                    Google 로그인
                </button>
            </div>

            <div id="etc-wrapper">
                <a href="/login/join" className="etc">계정 생성</a>
            </div>
        </>
    );
}