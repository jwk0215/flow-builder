import { sendMail } from "../mail/mail";
import { get, reg, update, updateVerified } from "../repositories/emailVerifications.repository";




/**
 * 인증코드 전송
 * @param email 
 * @returns 
 */
export async function sendVerificationMail(
    email: string
) {
    const [ data ] = await get(email);
    const code = Math.floor(100000 + Math.random() * 900000);
    const expires_at = new Date(Date.now() + 1000 * 60 * 1.5);    // 1.5분

    if (data) {
        await update(
            data.email,
            code,
            expires_at,
            false
        );
    } else {
        await reg(
            email,
            code,
            expires_at
        );
    }

    await sendMail(
        email,
        code
    );
    
    return {
        success: true,
        expires_at
    }
}


/**
 * 인증코드 확인
 * @param email 
 * @param code 
 * @returns 
 */
export async function verifyCode(
    email: string,
    code: number
) {
    const [ data ] = await get(email);
    if (!data) return {
        success: false,
        message: "해당 Email에 대한 데이터가 없습니다."
    };
    
    const now = Date.now();
    const expireTime = new Date(data.expires_at).getTime();

    if (now > expireTime) return {
        success: false,
        message: "만료되었습니다. 다시 시도해주세요."
    };

    if (data.code !== code) return {
        success: false,
        message: "잘못된 인증코드입니다. 확인 후 다시 시도해주세요."
    };

    await updateVerified(
        data.email,
        true
    );

    return { success: true };
}