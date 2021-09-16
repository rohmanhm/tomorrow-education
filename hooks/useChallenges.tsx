import { useEffect } from "react";
import useFetch, { CachePolicies } from "use-http";

import { Challenge } from "@/types/dataset";
import { APIResponse } from "@/types/api";

const useChallenges = () => {
  const request = useFetch<APIResponse<Challenge[]>>("/api/challenge/all", {
    cachePolicy: CachePolicies.NETWORK_ONLY,
  });

  return request;
};

export default useChallenges;
