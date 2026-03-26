import { sendVerificationMail } from "@/lib/services/join.service";
import dns from "dns/promises";
import { NextResponse } from "next/server";




/**
 * 이메일 인증코드 전송 요청
 * @param req 
 * @returns 
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;
        
        const check = await (async () => {
            const domain = email.split("@")[1];
            
            try {
                const mx = await dns.resolveMx(domain);
                if (mx.length > 0) return true;
    
                const a = await dns.resolve(domain);
                return a.length > 0;
            } catch {
                return false;
            }
        })();
    
        if (!check) {
            return NextResponse.json({
                success: false,
                message: "올바른 이메일 형식이 아닙니다."
            });
        }
    
        const result = await sendVerificationMail(email);
    
        if (result.success) {
            return NextResponse.json({
                success: true,
                expires_at: result.expires_at?.toISOString()
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "확인 후 다시 시도해주세요."
            });
        }
        
    } catch (error) {
        return NextResponse.json(
            { error: "서버 에러" },
            { status: 400 }
        );
    }
}