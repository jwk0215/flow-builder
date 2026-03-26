import { verifyCode } from "@/lib/services/join.service";
import { NextResponse } from "next/server";




/**
 * 이메일 인증코드 인증
 * @param req 
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, code } = body;

        if (!Number(code)) {
            return NextResponse.json({
                success: false,
                message: "잘못된 코드 형식입니다."
            });
        }
        
        const result = await verifyCode(email, Number(code));
    
        if (result.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({
                success: false,
                message: result.message
            });
        }
        
    } catch (error) {
        return NextResponse.json(
            { error: "서버 에러" },
            { status: 400 }
        );
    }
}