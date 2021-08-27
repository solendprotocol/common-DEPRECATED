export class RedisKeys {
  farmScoreKey(obligationID: string): string {
    return `farm_score_${obligationID}`;
  }

  instructionKey(obligationID: string): string{
    return `instructions_${obligationID}`;
  }
}
