export class MinedLiquidity {
  obligationID: string;
  balance: number;
  debt: number;
  score: number;

  constructor(obligationID: string, balance: number, debt: number, score: number) {
    this.obligationID = obligationID;
    this.balance = balance;
    this.debt = debt;
    this.score = score;
  }

  static fromRedisData(obligationID: string, redisData: {[key: string]: string}) {
    let balance = 0;
    let debt = 0;
    let score = 0;
    if (redisData) {
      balance = Number(redisData["balance"]!);
      debt = Number(redisData["debt"]!);
      score= Number(redisData["score"]!);
    }
    return new MinedLiquidity(obligationID, balance, debt, score);
  }

  toRedisData(): {[key: string]: string} {
    return {
      "obligationID": this.obligationID,
      "balance": this.balance.toString(),
      "debt": this.debt.toString(),
      "score": this.score.toString(),
    }
  }
}
