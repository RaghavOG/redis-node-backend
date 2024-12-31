import Redis from "ioredis";
import chalk from "chalk";

const redisClient = new Redis({
    host: "127.0.0.1",
    port: 6379,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    },
    maxRetriesPerRequest: 3,
    enableOfflineQueue: true,
    connectTimeout: 30000,
});

// Function to monitor Redis client connection status
const connectRedis = () => {
    return new Promise((resolve, reject) => {
        redisClient.on("connect", () => {
            console.log(chalk.bgGreen.black("Connected to Redis"));
            resolve(redisClient); // Resolves only when the connection is established
        });

        redisClient.on("ready", () => {
            console.log(chalk.bgYellow.black("Redis client is ready"));
        });

        redisClient.on("error", (err) => {
            console.error(chalk.bgRed.white("Redis connection error:"), err);
            reject(err); // Reject the promise on error
        });

        redisClient.on("reconnecting", () => {
            console.log(chalk.bgYellow.black("Redis reconnecting..."));
        });

        redisClient.on("end", () => {
            console.log(chalk.bgRed.white("Redis connection ended"));
        });
    });
};

export { redisClient, connectRedis };
