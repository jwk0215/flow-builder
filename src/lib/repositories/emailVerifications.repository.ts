import { read, write } from "../db/db";





interface EmailVerifications {
    email: string;
    code: number;
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
    code: number,
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
 * 데이터 업데이트 (만료시간 포함)
 * @param email 
 * @param code 
 * @param expires_at 
 */
export async function update(
    email: string,
    code: number,
    expires_at: Date,
    verified: boolean
) {
    await write(
        `
            update email_verifications
            set email = ?, code = ?, expires_at = ?, verified = ?
            where email = ?
        `,
        [
            email,
            code,
            expires_at,
            verified,
            email
        ]
    );
}


/**
 * 인증상태 업데이트
 * @param email 
 * @param verified 
 */
export async function updateVerified(
    email: string,
    verified: boolean
) {
    await write(
        `
            update email_verifications
            set email = ?, verified = ?
            where email = ?
        `,
        [
            email,
            verified,
            email
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