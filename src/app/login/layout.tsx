import "./layout.css";
import Image from "next/image";





export default function LoginLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div id="login-layout">
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
                <span hidden>FLOW BUILDER</span>
                <a href="/"></a>
            </h1>

            {children}
        </div>
    )
}