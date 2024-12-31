import { config } from "dotenv";
import { cleanEnv, port, str } from "envalid";
config();

export default cleanEnv(process.env, {
  MONGO_URI: str(),
  PORT: port(),
  NODE_ENV: str() || "development",
  FRONTEND_URL: str() || "http://localhost:5173",
});

export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
