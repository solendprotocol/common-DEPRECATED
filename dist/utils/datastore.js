"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolendRedisClient = void 0;
const redis_1 = require("redis");
const models_1 = require("./models");
const keys_1 = require("./keys");
// Wrapper around RedisClient
class SolendRedisClient {
    constructor(host, port) {
        const redisConfig = {
            host: host,
            port: port,
        };
        this.client = new redis_1.RedisClient(redisConfig);
        this.redisKeys = new keys_1.RedisKeys();
    }
    getFarmScore(obligationID) {
        return new Promise((resolve, reject) => {
            const key = this.redisKeys.farmScoreKey(obligationID);
            this.client.hgetall(key, (err, redisData) => {
                if (err) {
                    return reject(err);
                }
                resolve(models_1.FarmScore.fromRedisData(obligationID, redisData));
            });
        });
    }
    writeFarmScore(farmScore) {
        const key = this.redisKeys.farmScoreKey(farmScore.obligationID);
        return this.client.hmset(key, farmScore.toRedisData());
    }
}
exports.SolendRedisClient = SolendRedisClient;
