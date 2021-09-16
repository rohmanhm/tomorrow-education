interface BaseQuery {
  [key: string]: string | string[];
}

export interface UpdateChallengeBody {
  reviewerId?: string;
  grade?: number;
}

export interface UpdateChallengeQuery extends BaseQuery {
  challengeId: string;
}
