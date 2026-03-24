import { read, write } from "../db/db";





interface EmailVerifications {
    email: string;
    token: string;
    expires_at: Date;
    verified: boolean;
}


/**
 * 데이터 생성
 * @param email 
 * @param code 
 * @param expires_at 
 * @returns 
 */
export async function reg(
    email: string,
    code: string,
    expires_at: Date
) {
    await write(
        `
            insert into email_verifications
            (email, code, expires_at)
            values
            (?, ?, ?)
        `,
        [
            email,
            code,
            expires_at
        ]
    );
}


/**
 * 데이터 가져오기
 * @param email 
 */
export async function get(
    email: string
) {
    return await read<EmailVerifications>(
        `
            select * from email_verifications
            where email = ?
        `,
        [
            email
        ]
    );
}