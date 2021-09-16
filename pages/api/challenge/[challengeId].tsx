import { NextApiRequest, NextApiResponse } from "next";

import { UpdateChallengeBody, UpdateChallengeQuery } from "@/types/apibody";
import { ChallengeWithRelations } from "@/types/dataset";

import { mockChallenges, mapChallenge } from "../mocks";

const DEFAULT_PAGE_LIMIT = 5;
const DEFAULT_PAGE_NUMBER = 0;

function getChallenges(req: NextApiRequest, res: NextApiResponse) {
  const { limit = DEFAULT_PAGE_LIMIT, page = DEFAULT_PAGE_NUMBER } = req.query;
  const limitNum = parseInt(limit as string, 10);
  let pageNum = parseInt(page as string, 10);

  const data = [];
  // To keep page 1 as the first page instead of 0.
  const start = (pageNum > 0 ? pageNum - 1 : pageNum) * limitNum;
  for (let i = start; i < start + limitNum; i++) {
    // Prevent crashed caused out of index.
    // And stoped the uneeded looping process.
    if (i >= mockChallenges.length) break;

    const challenge = mockChallenges[i] as ChallengeWithRelations;

    mapChallenge(challenge);

    data.push(challenge);
  }

  res.status(200).json({
    data,
    limit: limitNum,
    page: pageNum <= 1 ? 1 : pageNum,
    total: mockChallenges.length,
  });
}

function updateChallenge(req: NextApiRequest, res: NextApiResponse) {
  const { challengeId } = req.query as UpdateChallengeQuery;
  const { reviewerId, grade } = req.body as UpdateChallengeBody;

  const challenge = mockChallenges.find(
    (c) => c.id === challengeId
  ) as ChallengeWithRelations;

  if (reviewerId) {
    challenge.reviewerId = reviewerId;
  }

  if (grade) {
    challenge.grade = grade;

    if (grade === 5) {
      challenge.gradingStatus = "GRADE_FAILED";
    } else if (grade >= 1 && grade <= 4) {
      challenge.gradingStatus = "GRADE_PASSED";
    }
  }

  mapChallenge(challenge as ChallengeWithRelations);

  res.status(200).json({ data: challenge });
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { challengeId } = req.query as UpdateChallengeQuery;

  switch (req.method) {
    case "PATCH":
      updateChallenge(req, res);
      break;

    case "GET":
      if (challengeId === "all") {
        getChallenges(req, res);
      }
      break;

    default:
      res.status(500).json({
        message: "Internal server error.",
      });
      break;
  }
};
