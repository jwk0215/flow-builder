import { sendMail } from "../mail/mail";
import { get, reg } from "../repositories/emailVerifications.repository";





export async function sendVerificationMail(
    email: string
) {
    try {
        const data = await get(email);
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expires_at = new Date(Date.now() + 1000 * 60 * 3);    // 3분

        console.log(data);

        return {
            success: true,
            expires_at
        };
        
        
        await reg(
            email,
            code,
            expires_at
        );
    
        await sendMail(
            email,
            code
        );
        
        return {
            success: true,
            expires_at
        }
    } catch (error) {
        console.log(error);
        
        return {
            success: false
        }
    }
}