import pg from 'pg';
const { Client } = pg;
import 'dotenv/config';

const pgClient = new Client({
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	host: process.env.PGHOST,
	port: process.env.PGPORT,
	database: process.env.PGDATABASE,
	ssl: {
		rejectUnauthorized: false
	}
});

await pgClient.connect();

await pgClient.query(`
    CREATE TABLE VISITOR_INFO(
        website VARCHAR(255),
        datetime VARCHAR(255),
	description TEXT
    )
`);

await pgClient.end();
