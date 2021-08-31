import { ClientOpts, RedisClient } from 'redis'
import { FarmScore, Instruction, getInstructionScore } from './models'
import { RedisKeys } from './keys'


export class SolendRedisClient {
  private client: RedisClient;
  private redisKeys: RedisKeys;

  constructor(host: string, port: number) {
    const redisConfig: ClientOpts = {
      host: host,
      port: port,
    };
    this.client = new RedisClient(redisConfig);
    this.redisKeys = new RedisKeys();
  }

  getFarmScore(obligationID: string): Promise<FarmScore> {
    return new Promise((resolve, reject) => {
      const key = this.redisKeys.farmScoreKey(obligationID);
      this.client.hgetall(key, (err: any, redisData: { [key: string]: string; }) => {
      if (err) {
        return reject(err);
      }
      resolve(FarmScore.fromRedisData(obligationID, redisData));
      });
    });
  }

  writeFarmScore(farmScore: FarmScore): boolean {
    const key = this.redisKeys.farmScoreKey(farmScore.obligationID);
    return this.client.hmset(key, farmScore.toRedisData());
  }

  getInstructionsSinceSlot(obligationID: string, slot: number): Promise<Instruction[]> {
    return new Promise((resolve, reject) => {
      const key = this.redisKeys.instructionKey(obligationID);
      this.client.zrangebyscore(key, getInstructionScore(slot, 0), "+inf", 
        (err: any, redisData: string[]) => {
          if (err) {
            return reject(err);
          }
          let instructions: Instruction[] = [];
          for (let data of redisData) {
            instructions.push(Instruction.fromRedisData(data));
          }
          resolve(instructions);
        });
    });
  }

  writeInstruction(instruction: Instruction) {
    const key = this.redisKeys.instructionKey(instruction.obligationID);
    this.client.zremrangebyscore(key, instruction.score(), instruction.score());
    return this.client.zadd(key, instruction.score(), instruction.toRedisData());
  }
}
