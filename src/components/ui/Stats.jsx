import {
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Flex,
  Icon,
  Stack,
} from "@chakra-ui/react";

import PropTypes from "prop-types";

const Stats = ({ label, icon, value }) => {
  return (
    <Stack
      direction="column"
      rounded="md"
      boxShadow={useColorModeValue(
        "0 4px 6px rgba(160, 174, 192, 0.6)",
        "2px 4px 6px rgba(9, 17, 28, 0.9)"
      )}
      w="100%"
      textAlign="left"
      align="start"
      spacing={0}
      role="group"
      overflow="hidden"
    >
      <HStack
        py={6}
        px={5}
        spacing={4}
        bg={useColorModeValue("white", "white")}
        w="100%"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          rounded="lg"
          p={2}
          bg="blue.400"
          position="relative"
          w={12}
          h={12}
          overflow="hidden"
          lineHeight={0}
          boxShadow="inset 0 0 1px 1px rgba(0, 0, 0, 0.015)"
        >
          {icon && <Icon as={icon} w={6} h={6} color="white" />}
        </Flex>
        <VStack spacing={0} align="start" maxW="lg" h="100%">
          <Text as="h3" fontSize="md" noOfLines={2} color="gray.800">
            {label}
          </Text>
          <HStack spacing={2}>
            <Text as="h2" fontSize="lg" fontWeight="extrabold">
              {value}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Stack>
  );
};

Stats.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  value: PropTypes.string.isRequired,
};

export default Stats;
