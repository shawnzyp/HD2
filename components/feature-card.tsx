import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  items?: string[];
}

export default function FeatureCard({ icon, title, description, items }: FeatureCardProps) {
  return (
    <Box
      bg="whiteAlpha.100"
      borderWidth="1px"
      borderColor="whiteAlpha.200"
      borderRadius="xl"
      p={6}
      transition="all 0.3s ease"
      _hover={{ transform: "translateY(-4px)", borderColor: "brand.400", shadow: "lg" }}
    >
      <Flex align="center" gap={3} mb={4}>
        <Box color="brand.300" fontSize="2xl">
          {icon}
        </Box>
        <Heading as="h3" size="md">
          {title}
        </Heading>
      </Flex>
      <Text color="gray.300" mb={items && items.length ? 4 : 0}>
        {description}
      </Text>
      {items && items.length ? (
        <Box as="ul" pl={4} color="gray.200" display="grid" gap={1} fontSize="sm">
          {items.map((item) => (
            <Box as="li" key={item}>
              {item}
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}
