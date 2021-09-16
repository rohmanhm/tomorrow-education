import useFetch, { CachePolicies } from "use-http";

import { Challenge } from "@/types/dataset";
import { APIResponse } from "@/types/api";

const useChallenge = (challengeId?: string) => {
  const request = useFetch<APIResponse<Challenge[]>>(
    `/api/challenge${challengeId ? `/${challengeId}` : ""}`,
    { cachePolicy: CachePolicies.NETWORK_ONLY }
  );
  return request;
};

export default useChallenge;
