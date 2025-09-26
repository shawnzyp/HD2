import { Heading, HStack, Text, VStack } from "@chakra-ui/react";

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <VStack align="start" spacing={2} maxW="3xl">
      <Text textTransform="uppercase" letterSpacing="0.3em" fontSize="xs" color="brand.300">
        {eyebrow}
      </Text>
      <Heading as="h2" size="xl" lineHeight={1.2}>
        {title}
      </Heading>
      <Text fontSize="lg" color="gray.300">
        {description}
      </Text>
    </VStack>
  );
}
