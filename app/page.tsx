import FeatureCard from "@/components/feature-card";
import SectionHeading from "@/components/section-heading";
import WikiManifestSection from "@/components/wiki-manifest-section";
import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";

const featureClusters = [
  {
    eyebrow: "Command Center",
    title: "Total War Awareness",
    description:
      "Stay ahead of the galactic conflict with a live 3D war table, real-time strategic updates, and critical alerts tailored to your squad.",
    cards: [
      {
        title: "War Table",
        description: "Zoom from sector overviews to mission nodes with live liberation progress and enemy presence heatmaps.",
        icon: "🛰️",
        items: ["3D planetary renders", "Dynamic enemy forecasting", "Major order timers"]
      },
      {
        title: "Operation Feed",
        description: "Digestible activity feed blending official orders, community milestones, and developer dispatches.",
        icon: "🪐",
        items: ["Live progress widgets", "Liberation push alerts", "Community spotlights"]
      },
      {
        title: "Priority Alerts",
        description: "Custom notifications for squad invites, arsenal rotations, and planet thresholds you care about.",
        icon: "⚠️",
        items: ["Planet watchlist", "Squad summon beacons", "Rotation reminders"]
      }
    ]
  },
  {
    eyebrow: "Squad Ops",
    title: "Coordinate With Surgical Precision",
    description:
      "Form squads, plan missions, and sync stratagems with tools that respect every Helldiver's time and playstyle.",
    cards: [
      {
        title: "Squad Lobby",
        description: "Persistent rooms for your crew with chat, voice, and calendar syncing to lock in the next drop.",
        icon: "🛡️",
        items: ["Presence and status", "Voice drop-in", "Schedule planner"]
      },
      {
        title: "Mission Builder",
        description: "Define objectives, set difficulty, attach intel, and assign responsibilities before you hit deploy.",
        icon: "🎯",
        items: ["Objective templates", "Role assignments", "Intel attachments"]
      },
      {
        title: "Loadout Sync",
        description: "Collaborative gear selection with stratagem cooldown tracking and conflict warnings in real time.",
        icon: "⏱️",
        items: ["Squad loadout grid", "Conflict detection", "Stratagem cooldowns"]
      }
    ]
  },
  {
    eyebrow: "Mastery",
    title: "Evolve Your Arsenal & Intel",
    description:
      "Study weapons, stratagems, and enemy intel through rich databases, AR visualizations, and adaptive recommendations.",
    cards: [
      {
        title: "Arsenal Codex",
        description: "Deep weapon encyclopedia with side-by-side comparisons and recommended mods for every mission type.",
        icon: "🗄️",
        items: ["Stat breakdowns", "Unlock guidance", "Community meta notes"]
      },
      {
        title: "Stratagem Decks",
        description: "Craft and share stratagem decks, rehearse call-in sequences, and track global cooldown timers.",
        icon: "📡",
        items: ["Mini-game practice", "Synergy scoring", "Cooldown monitoring"]
      },
      {
        title: "Enemy Intel",
        description: "3D foe profiles, encounter tactics, and threat forecasting to prepare for any planetary incursion.",
        icon: "👾",
        items: ["AR weak point viewer", "Patch change logs", "24h threat predictions"]
      }
    ]
  }
];

export default function HomePage() {
  return (
    <Box as="main" pb={24}>
      <Box
        position="relative"
        overflow="hidden"
        borderBottomWidth="1px"
        borderColor="whiteAlpha.200"
        bgGradient="linear(180deg, rgba(22,32,77,0.4) 0%, rgba(6,8,28,0.9) 100%)"
      >
        <Container maxW="6xl" py={{ base: 20, md: 32 }}>
          <Stack spacing={10} align="flex-start">
            <Badge
              variant="outline"
              colorScheme="purple"
              px={4}
              py={1}
              borderRadius="full"
              textTransform="uppercase"
              letterSpacing="0.3em"
            >
              Super Earth Command
            </Badge>
            <VStack align="flex-start" spacing={6} maxW="3xl">
              <Text fontSize={{ base: "4xl", md: "5xl" }} lineHeight={1.1} fontWeight="700">
                Your Helldivers 2 companion for total war readiness.
              </Text>
              <Text fontSize="xl" color="gray.300">
                Monitor the front lines, coordinate with your squad, and optimize every drop with a tactical assistant built by
                veterans for veterans.
              </Text>
              <HStack spacing={4} flexWrap="wrap">
                <Button colorScheme="purple" size="lg">Request Access</Button>
                <Button size="lg" variant="outline" colorScheme="purple">
                  View Experience Principles
                </Button>
              </HStack>
            </VStack>
          </Stack>
        </Container>
      </Box>

      <Container maxW="6xl" mt={24}>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={16} alignItems="start">
          <GridItem>
            <SectionHeading
              eyebrow="Mission Snapshot"
              title="Always-on status across every warfront"
              description="Pull intelligence from live ops, community activity, and your personal progression to know exactly where to deploy next."
            />
          </GridItem>
          <GridItem>
            <Stack spacing={6} color="gray.300" fontSize="md">
              <Text>
                Built on a federated GraphQL core, the companion syncs war tables, squad states, and arsenal data in milliseconds. Offline caches keep your intel ready even when you’re planetside without a signal.
              </Text>
              <Text>
                Notifications, widgets, and second-screen overlays keep the most critical updates in reach without overwhelming your focus.
              </Text>
            </Stack>
          </GridItem>
        </Grid>
      </Container>

      <Stack spacing={24} mt={24}>
        {featureClusters.map((cluster) => (
          <Container key={cluster.title} maxW="6xl">
            <Stack spacing={12}>
              <SectionHeading eyebrow={cluster.eyebrow} title={cluster.title} description={cluster.description} />
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                {cluster.cards.map((card) => (
                  <FeatureCard
                    key={card.title}
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                    items={card.items}
                  />
                ))}
              </SimpleGrid>
            </Stack>
          </Container>
        ))}
      </Stack>

      <WikiManifestSection />

      <Container maxW="6xl" mt={24}>
        <Box
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          borderRadius="2xl"
          bgGradient="linear(120deg, rgba(91,125,255,0.16) 0%, rgba(10,15,46,0.9) 100%)"
          p={{ base: 8, md: 12 }}
        >
          <Stack direction={{ base: "column", md: "row" }} spacing={10} align="center" justify="space-between">
            <VStack align="flex-start" spacing={3}>
              <Badge colorScheme="purple" variant="solid" borderRadius="md">
                Incoming Transmission
              </Badge>
              <Text fontSize="3xl" fontWeight="bold">
                Join the first strike teams shaping the Helldivers 2 companion.
              </Text>
              <Text color="gray.300">
                Request early access, connect your game account, and help us tune mission planners, arsenal optimizers, and AR drills before full deployment.
              </Text>
            </VStack>
            <Button colorScheme="purple" size="lg" alignSelf="flex-start">
              Enlist for Beta
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
