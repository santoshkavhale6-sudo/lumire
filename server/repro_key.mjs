
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const envPath = path.resolve(process.cwd(), '.env');
console.log("CWD:", process.cwd());
console.log("Env Path:", envPath);
console.log("Env Exists:", fs.existsSync(envPath));

const result = dotenv.config({ path: envPath });
console.log("Dotenv Result Error:", result.error);
console.log("GOOGLE_API_KEY Length:", process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY.length : "None");
