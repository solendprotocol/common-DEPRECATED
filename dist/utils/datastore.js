"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolendRedisClient = void 0;
const redis_1 = require("redis");
const models_1 = require("./models");
const keys_1 = require("./keys");
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
    getInstructionsSinceDate(obligationID, since) {
        return new Promise((resolve, reject) => {
            const key = this.redisKeys.instructionKey(obligationID);
            this.client.zrangebyscore(key, models_1.dateToScore(since, 0), "+inf", (err, redisData) => {
                if (err) {
                    return reject(err);
                }
                let instructions = [];
                for (let data of redisData) {
                    instructions.push(models_1.Instruction.fromRedisData(data));
                }
                resolve(instructions);
            });
        });
    }
    writeInstruction(instruction) {
        const key = this.redisKeys.instructionKey(instruction.obligationID);
        this.client.zremrangebyscore(key, instruction.score(), instruction.score());
        return this.client.zadd(key, instruction.score(), instruction.toRedisData());
    }
}
exports.SolendRedisClient = SolendRedisClient;
