import Image from "next/image";
import "./page.css";




export default function Home() {
    return (
        <div id="home">
            <div id="limit">
                <h1 id="title">
                    <div id="title-icon">
                        <Image
                            src={"/globe.svg"}
                            alt="icon"
                            fill
                            loading="eager"
                            style={{ objectFit: "contain" }}
                        />
                    </div>

                    FLOW BUILDER
                </h1>

                <section id="intro">
                    <div id="temp-img"></div>

                    <p id="intro-text">
                            <span>사용자 행동 기반 UX 플로우 빌더</span>
                            <span>트리거와 조건을 연결해 UI를 자동으로 제어합니다.</span>
                    </p>
                </section>

                <section id="btns">
                    <a href="/login" className="btn">시작하기</a>
                    <a href="/doc" className="btn">설명서</a>
                </section>
            </div>
        </div>
    );
}