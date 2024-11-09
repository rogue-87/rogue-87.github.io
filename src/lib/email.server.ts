import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
	host: undefined,
	port: 587,
	secure: false, // true for port 465, false for other ports
	auth: {
		user: undefined,
		pass: undefined
	}
});

transporter.verify((error, success) => {
	if (error) {
		console.error(error);
	} else {
		console.log("success!");
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
