import React, { FC } from "react";
import { HStack, Button, Box } from "@chakra-ui/react";

interface Props {
  value?: number;
  isLoading?: boolean;
  onChange?: (value: number) => void;
}
const GradingButton: FC<Props> = ({ value, onChange, isLoading }) => {
  return (
    <Box opacity={isLoading ? 0.5 : 1}>
      <HStack>
        {[1, 2, 3, 4, 5].map((grade) => (
          <Button
            disabled={isLoading}
            key={grade}
            onClick={() => onChange?.(grade)}
            colorScheme={value === grade ? "linkedin" : "blackAlpha"}
          >
            {grade}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default GradingButton;
