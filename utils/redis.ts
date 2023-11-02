import { createClient } from "redis";

let redisClient: any;

(async () => {
  redisClient = createClient();

  redisClient.on("connect", () => {
    console.log("Redis Connected");
  });

  redisClient.on("error", (error: any) => {
    console.log(`Error : ${error}`);
  });

  redisClient.on("end", () => {
    console.log("Connection ended");
  });

  await redisClient.connect();
})();

export { redisClient };
