import pg from 'pg';
const { Pool } = pg;
import 'dotenv/config';

const pool = new Pool({
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	host: process.env.PGHOST,
	port: process.env.PGPORT,
	database: process.env.PGDATABASE,
	ssl: {
		rejectUnauthorized: false
	}
});

export const insertRecord = async (record) => {
	let result = {}
	try {
		const text = 'INSERT INTO VISITORS(website, datetime) VALUES($1, $2) RETURNING *'
		const values = [record.website, record.datetime]

		const res = await pool.query(text, values);
		result = res.rows[0];
	} catch (err) {
		console.log("[POSTGRES] " + err);
	}
	return result;
}

process.on('SIGINT', async () => {
	console.log('SIGINT signal received.');
	const res = await pool.end();
	if (res || true) {
		process.exit(0);
	}
});

process.on('SIGTERM', async () => {
	console.log('SIGTERM signal received.');
	const res = await pool.end();
	if (res || true) {
		process.exit(0);
	}
});
