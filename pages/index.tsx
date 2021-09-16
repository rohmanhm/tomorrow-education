import Head from "next/head";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Button,
  HStack,
  Box,
  Text,
  Heading,
} from "@chakra-ui/react";

import ChallengeItem from "@/components/ChallengeItem";
import ChallengeItemLoader from "@/components/ChallengeItem/Loader";

import useChallenges from "@/hooks/useChallenges";
import useStudents from "@/hooks/useStudents";

import { scrollToTop } from "@/utils/window";

export default function Home() {
  const router = useRouter();
  const studentsRequest = useStudents();
  const challengesRequest = useChallenges();

  const students = studentsRequest.data?.data;
  const reviewerOptions = useMemo(
    () =>
      students?.map((student) => ({
        label: student.name,
        value: student.id,
      })),
    [students]
  );
  const challenges = challengesRequest.data;

  const handleRefetch = () => {
    challengesRequest.get(`?&page=${challenges?.page || 1}`);
  };

  const handleNext = () => {
    scrollToTop();
    router.push({ query: { page: challenges?.page + 1 } });
  };

  const handlePrev = () => {
    scrollToTop();
    router.push({ query: { page: challenges?.page - 1 } });
  };

  useEffect(() => {
    if (router.query?.page) {
      challengesRequest.get(`?&page=${router.query?.page}`);
    }
  }, [router.query]);

  useEffect(() => {
    if (!window?.location.search) {
      challengesRequest.get();
    }

    studentsRequest.get();
  }, []);

  return (
    <Box mb="6">
      <Head>
        <title>Tomorrow Education Staff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Box mt="10">
          <Heading>Welcome Tomorrow Education Staff</Heading>
        </Box>

        <Box mt="4">
          <Heading as="h3" size="md">
            Student Challenges
          </Heading>

          {!challenges && challengesRequest.loading && <ChallengeItemLoader />}

          {challenges?.data?.length === 0 && (
            <Text p="10" textAlign="center" fontSize="lg">
              No data to display.
            </Text>
          )}

          {challenges?.data?.map((challenge) => (
            <ChallengeItem
              key={challenge.id}
              {...challenge}
              reviewerOptions={reviewerOptions}
              onRefetch={handleRefetch}
            />
          ))}
        </Box>

        <HStack mt="4" justifyContent="space-between">
          <Button disabled={challenges?.page < 2} onClick={handlePrev}>
            Prev
          </Button>
          <Button
            disabled={challenges?.page * challenges?.limit >= challenges?.total}
            onClick={handleNext}
          >
            Next
          </Button>
        </HStack>
      </Container>
    </Box>
  );
}
