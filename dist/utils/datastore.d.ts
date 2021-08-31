import { FarmScore, Instruction } from './models';
export declare class SolendRedisClient {
    private client;
    private redisKeys;
    constructor(host: string, port: number);
    getFarmScore(obligationID: string): Promise<FarmScore>;
    writeFarmScore(farmScore: FarmScore): boolean;
    getInstructionsSinceSlot(obligationID: string, slot: number): Promise<Instruction[]>;
    writeInstruction(instruction: Instruction): boolean;
}
