export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface Challenge {
  id: string;
  studentId: string;
  name: string;
  googleDriveFolder?: string;
  gradingStatus: "UNSUBMITTED" | "SUBMITTED" | "GRADE_PASSED" | "GRADE_FAILED";
  grade?: number;
  reviewerId?: string;
}

export interface ChallengeWithRelations extends Challenge {
  student?: Student;
  reviewer?: Student;
}
