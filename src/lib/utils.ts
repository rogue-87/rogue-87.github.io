type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(date: string, dateStyle: DateStyle = 'long', locales = 'en') {
	// damn you safari
	const properDate = new Date(date.replaceAll('-', '/'));
	const dateFmt = new Intl.DateTimeFormat(locales, { dateStyle });

	return dateFmt.format(properDate);
}
