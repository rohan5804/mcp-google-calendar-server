import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();
const envSchema = z.object({
    GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
    GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
    GOOGLE_REDIRECT_URI: z.string().url().default("http://localhost:3000/oauth2callback"),
    GOOGLE_REFRESH_TOKEN: z.string().min(1, "GOOGLE_REFRESH_TOKEN is required"),
    USER_EMAIL: z.string().email().default("rohankeskar10@gmail.com"),
    DEFAULT_TIMEZONE: z.string().default("UTC"),
});
const result = envSchema.safeParse(process.env);
if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.format());
    process.exit(1);
}
export const env = result.data;
//# sourceMappingURL=env.js.map