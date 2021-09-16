import { HStack } from "@chakra-ui/react";
import {
  Skeleton,
  SkeletonText,
  Box,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";

const ChallengeItemLoader = () => {
  return (
    <Box
      my="4"
      boxShadow="0px 2px 5px rgba(0,0,0,0.1)"
      borderRadius={5}
      border="1px solid"
      borderColor="gray.300"
    >
      <Box p="4">
        <SkeletonText noOfLines={2} />
      </Box>

      <Flex
        p="4"
        pt="2"
        backgroundColor="gray.100"
        justifyContent="space-between"
        alignItems="center"
      ></Flex>
    </Box>
  );
};

export default ChallengeItemLoader;
