import React, { FC, memo, useMemo, useCallback } from "react";
import Select, { OptionsType } from "react-select";
import { Box, Heading, Text, Tag, Badge, Flex } from "@chakra-ui/react";

import GradingButton from "@/components/GradingButton";
import { ChallengeWithRelations, Student } from "@/types/dataset";
import useChallenge from "@/hooks/useChallenge";

interface Props extends ChallengeWithRelations {
  reviewerOptions: OptionsType<any>;
  onRefetch?: () => void;
}
const ChallengeItem: FC<Props> = ({
  id,
  name,
  student,
  studentId,
  reviewerId,
  reviewer,
  grade,
  reviewerOptions,
  onRefetch,
}) => {
  const assignRequest = useChallenge();
  const gradeRequest = useChallenge();

  // Prevent staff to assign the reviewer to the challenge author.
  const reviewersWithDisabled = useMemo(() => {
    return reviewerOptions?.map((reviewer) => {
      if (reviewer?.value === studentId) {
        reviewer = { ...reviewer, isDisabled: true };
      }

      return reviewer;
    });
  }, [reviewerOptions, studentId]);

  const handleAssignReviewer = useCallback(
    async (reviewerId: string) => {
      await assignRequest.patch(`/${id}`, { reviewerId });
      onRefetch?.();
    },
    [id]
  );

  const handleChangeGrade = useCallback(
    async (grade: number) => {
      await gradeRequest.patch(`/${id}`, { grade });
      onRefetch?.();
    },
    [id]
  );

  return (
    <Box
      my="4"
      boxShadow="0px 2px 5px rgba(0,0,0,0.1)"
      borderRadius={5}
      border="1px solid"
      borderColor="gray.300"
    >
      <Box p="4">
        <Box mb="2">
          {grade === 5 && <Badge colorScheme="red">Failed</Badge>}

          {grade >= 1 && grade <= 4 && (
            <Badge colorScheme="green">Completed</Badge>
          )}
        </Box>

        <Heading as="h3" size="md">
          {name}
        </Heading>

        <Box>
          {student?.name} <Tag>{student?.email}</Tag>
        </Box>
      </Box>

      <Flex
        p="4"
        pt="2"
        backgroundColor="gray.100"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box width="200px" maxWidth="100%">
          <Text mb="1" fontSize="md">
            Assign a reviewer
          </Text>
          <Select
            options={reviewersWithDisabled}
            value={
              reviewerId ? { value: reviewerId, label: reviewer?.name } : null
            }
            isLoading={assignRequest.loading}
            isDisabled={assignRequest.loading}
            onChange={(val) => handleAssignReviewer(val.value)}
          />
        </Box>

        <Box mt="2">
          <Text mb="1" fontSize="md">
            Put your grade
          </Text>

          <GradingButton
            isLoading={gradeRequest.loading}
            value={grade}
            onChange={handleChangeGrade}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default memo(ChallengeItem);
