import { useEffect } from "react";
import useFetch from "use-http";

import { Student } from "@/types/dataset";
import { APIResponse } from "@/types/api";

const useStudents = () => {
  const request = useFetch<APIResponse<Student[]>>("/api/students");
  return request;
};

export default useStudents;
