import nodemailer, { Transporter } from 'nodemailer';

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    text: string;
    attachments?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter: Transporter;

    constructor(
        mailerService: string,
        mailerEmail: string,
        senderEmailPassword: string,
    ) {
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: senderEmailPassword,
            },
        })
    }

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments, text } = options;

        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
                text: text
            })

            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}