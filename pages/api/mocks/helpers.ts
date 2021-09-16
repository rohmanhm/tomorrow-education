import { ChallengeWithRelations } from "@/types/dataset";
import { mockStudents } from ".";

export const mapChallenge = (challenge: ChallengeWithRelations) => {
  // Populate the challenge data with student.
  const studentChallenge = mockStudents.find(
    (student) => student.id === challenge.studentId
  );
  if (studentChallenge) {
    challenge.student = studentChallenge;
  }

  // Populate the challenge data with reviewer.
  const reviewerChallenge = mockStudents.find(
    (student) => student.id === challenge.reviewerId
  );
  if (reviewerChallenge) {
    challenge.reviewer = reviewerChallenge;
  }
};
