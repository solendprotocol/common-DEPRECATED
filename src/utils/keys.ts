export class RedisKeys {
  farmScoreKey(obligationID: string): string {
    return `farm_score_${obligationID}`;
  }
}
