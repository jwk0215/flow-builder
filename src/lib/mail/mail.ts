import nodemailer from "nodemailer";




const transporter = nodemailer.createTransport({
    host: "smtp.naver.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});


/**
 * send mail()
 * 이메일 보내기
 * @param to 
 * @param code 
 */
export async function sendMail(to: string, code: number) {
    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to,
        subject: "Flow Builder 이메일 인증 코드",
        text: `인증 코드: ${code}`
    });
}