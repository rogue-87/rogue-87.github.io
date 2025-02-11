import { PASS } from "$env/static/private";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
	host: "smtp.resend.com",
	secure: true,
	port: 465,
	auth: {
		user: "resend",
		pass: PASS
	}
});

transporter.verify((error, success) => {
	if (error) {
		console.error(`Mailer Service: ${error}`);
	} else {
		console.log(`Mailer Service: ${success}`);
	}
});

export default async function sendEmail(message: Mail.Options) {
	await new Promise((resolve, reject) => {
		transporter.sendMail(message, (error, info) => {
			if (error) {
				console.error(error);
				reject(error);
			} else {
				resolve(info);
			}
		});
	});
}
