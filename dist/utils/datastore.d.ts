import { MinedLiquidity } from './models';
export declare class SolendRedisClient {
    private client;
    private redisKeys;
    constructor(host: string, port: number);
    getMinedLiquidity(obligationID: string): Promise<MinedLiquidity>;
    writeMinedLiquidity(minedLiquidity: MinedLiquidity): boolean;
}
