import { ClientOpts, RedisClient } from 'redis'
import { FarmScore } from './models'
import { RedisKeys } from './keys'


// Wrapper around RedisClient
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
}
