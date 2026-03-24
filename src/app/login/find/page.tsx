"use client";
import "./page.css";
import { useState } from "react";




export default function Find() {
    const [ email, setEmail ] = useState("");
    
    
    return (
        <form id="form">
            <div className="input-wrapper">
                <p className="input-info">
                    <span className="main">이메일</span>
                    <span className="sub">찾으시려는 계정의 이메일 주소를 입력해주세요.</span>
                </p>
                
                <input
                    className="input"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </div>

            <button
                id="send-btn"
                className={email.length <= 0 ? "disabled" : ""}
                type="submit"
            >
                메일 보내기
            </button>
        </form>
    );
}