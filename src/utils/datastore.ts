import { ClientOpts, RedisClient } from 'redis'
import { MinedLiquidity } from './models'
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

  getMinedLiquidity(obligationID: string): Promise<MinedLiquidity> {
    const key = this.redisKeys.minedLiquidityKey(obligationID);
    return new Promise((resolve, reject) => {
      const key = this.redisKeys.minedLiquidityKey(obligationID);
      this.client.hgetall(key, (err: any, redisData: { [key: string]: string; }) => {
      if (err) {
        return reject(err);
      }
      resolve(MinedLiquidity.fromRedisData(obligationID, redisData));
      });
    });
  }

  writeMinedLiquidity(minedLiquidity: MinedLiquidity): boolean {
    const key = this.redisKeys.minedLiquidityKey(minedLiquidity.obligationID);
    return this.client.hmset(key, minedLiquidity.toRedisData());
  }
}
