import { EMAIL, PASS } from "$env/static/private";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // true for port 465, false for other ports
	auth: {
		user: EMAIL,
		pass: PASS
	}
});

transporter.verify((error, success) => {
	if (error) {
		console.error(error);
	} else {
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
