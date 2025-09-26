import manifest from "../hd2_wiki_manifest.json";
import SectionHeading from "@/components/section-heading";
import NextLink from "next/link";
import {
  Badge,
  Box,
  Container,
  Divider,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text
} from "@chakra-ui/react";

type ManifestRecord = typeof manifest;
type ManifestEntry = ManifestRecord[keyof ManifestRecord];

type NormalizedEntry = {
  name: string;
  primaryUrl?: string;
  supportingLinks: { label: string; url: string }[];
  examples: string[];
};

const manifestEntries: NormalizedEntry[] = Object.entries(manifest)
  .map(([name, raw]) => normalizeEntry(name, raw))
  .sort((a, b) => a.name.localeCompare(b.name));

function normalizeEntry(name: string, raw: ManifestEntry): NormalizedEntry {
  const supportingLinks: { label: string; url: string }[] = [];
  const examples: string[] = [];
  let primaryUrl: string | undefined;

  const preferredPrimaryKeys = new Set([
    "index",
    "hub",
    "category",
    "category_link",
    "main",
    "primary",
    "primary_category"
  ]);

  const pushSupporting = (keyPath: string[], url: string) => {
    const label = titleize(keyPath.join(" "));
    if (!supportingLinks.some((link) => link.url === url)) {
      supportingLinks.push({ label, url });
    }
  };

  const processValue = (keyPath: string[], value: unknown) => {
    if (typeof value === "string") {
      if (!value.startsWith("http")) {
        return;
      }

      const key = keyPath[keyPath.length - 1] ?? "";
      if (!primaryUrl && (preferredPrimaryKeys.has(key) || key.endsWith("_index") || key.endsWith("_hub"))) {
        primaryUrl = value;
        return;
      }

      pushSupporting(keyPath, value);
      return;
    }

    if (Array.isArray(value)) {
      const links = value.filter((item): item is string => typeof item === "string" && item.startsWith("http"));
      if (!links.length) {
        return;
      }

      const key = keyPath[keyPath.length - 1] ?? "";
      if (key === "examples") {
        links.forEach((link) => {
          if (!examples.includes(link)) {
            examples.push(link);
          }
        });
        return;
      }

      links.forEach((link) => pushSupporting(keyPath, link));
      return;
    }

    if (value && typeof value === "object") {
      Object.entries(value as Record<string, unknown>).forEach(([childKey, childValue]) => {
        processValue([...keyPath, childKey], childValue);
      });
    }
  };

  Object.entries(raw as Record<string, unknown>).forEach(([key, value]) => {
    processValue([key], value);
  });

  if (!primaryUrl && supportingLinks.length) {
    const [first, ...rest] = supportingLinks;
    primaryUrl = first.url;
    supportingLinks.splice(0, supportingLinks.length, ...rest);
  }

  return {
    name: titleize(name),
    primaryUrl,
    supportingLinks,
    examples
  };
}

function titleize(value: string): string {
  return value
    .split(/[\s_]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase())
    .join(" ");
}

function labelFromUrl(url: string): string {
  const slug = decodeURIComponent(url.split("/").pop() ?? "");
  return titleize(slug.replace(/-/g, " "));
}

function formatExamples(examples: string[]): { visible: string[]; remainder: number } {
  const maxVisible = 4;
  return {
    visible: examples.slice(0, maxVisible),
    remainder: Math.max(examples.length - maxVisible, 0)
  };
}

export default function WikiManifestSection() {
  return (
    <Box py={{ base: 16, md: 24 }}>
      <Container maxW="6xl">
        <Stack spacing={12}>
          <SectionHeading
            eyebrow="Data Foundations"
            title="Authoritative wiki sources for our intelligence systems"
            description="Every major gameplay system is backed by curated index pages from helldivers.wiki.gg. These entry points guide our crawler and keep the companion's database accurate."
          />
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
            {manifestEntries.map((entry) => {
              const { visible, remainder } = formatExamples(entry.examples);
              return (
                <Box
                  key={entry.name}
                  borderWidth="1px"
                  borderColor="whiteAlpha.200"
                  borderRadius="xl"
                  p={6}
                  bg="whiteAlpha.50"
                  display="flex"
                  flexDirection="column"
                  gap={5}
                >
                  <Stack spacing={3} flex={1}>
                    <Stack spacing={1}>
                      <Text fontSize="lg" fontWeight="semibold">
                        {entry.name}
                      </Text>
                      {entry.primaryUrl ? (
                        <Link as={NextLink} href={entry.primaryUrl} color="brand.200" fontSize="sm" isExternal>
                          Primary index
                        </Link>
                      ) : null}
                    </Stack>
                    {entry.supportingLinks.length ? (
                      <Stack spacing={2} fontSize="sm">
                        <Text color="gray.300">Supporting hubs</Text>
                        <Stack spacing={1}>
                          {entry.supportingLinks.map((link) => (
                            <Link key={link.url} as={NextLink} href={link.url} isExternal color="gray.200">
                              {link.label}
                            </Link>
                          ))}
                        </Stack>
                      </Stack>
                    ) : null}
                  </Stack>
                  {visible.length ? (
                    <Stack spacing={3}>
                      <Divider borderColor="whiteAlpha.300" />
                      <Stack spacing={2}>
                        <Text fontSize="sm" color="gray.300">
                          Example entries
                        </Text>
                        <HStack spacing={2} flexWrap="wrap">
                          {visible.map((example) => (
                            <Badge key={example} colorScheme="purple" variant="subtle" px={3} py={1} borderRadius="full">
                              {labelFromUrl(example)}
                            </Badge>
                          ))}
                          {remainder > 0 ? (
                            <Badge colorScheme="purple" variant="outline" px={3} py={1} borderRadius="full">
                              +{remainder} more
                            </Badge>
                          ) : null}
                        </HStack>
                      </Stack>
                    </Stack>
                  ) : null}
                </Box>
              );
            })}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
