import fs from "fs";
import path from "path";

export type CsvCoverageEntry = {
  category: string;
  indexOrHub?: string;
  categoryLink?: string;
  imageBuckets: ResourceLink[];
  iconBuckets: ResourceLink[];
  examples: string[];
  notes?: string;
};

export type ResourceLink = {
  label: string;
  url: string;
};

const CSV_FILENAME = "hd2_wiki_manifest.csv";

export function loadCsvCoverage(): CsvCoverageEntry[] {
  const manifestPath = path.join(process.cwd(), CSV_FILENAME);
  const csvContent = fs.readFileSync(manifestPath, "utf8");
  const [headerLine, ...lines] = csvContent.trim().split(/\r?\n/);
  const headers = headerLine.split(",");

  return lines
    .map((line) => normalizeRow(parseRow(line, headers)))
    .filter((entry): entry is CsvCoverageEntry => Boolean(entry.category));
}

function parseRow(line: string, headers: string[]): Record<string, string> {
  const values = splitCsvLine(line, headers.length);
  return headers.reduce<Record<string, string>>((acc, header, index) => {
    acc[header] = values[index] ?? "";
    return acc;
  }, {});
}

function splitCsvLine(line: string, expectedColumns: number): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === "\"") {
      if (inQuotes && line[i + 1] === "\"") {
        current += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (current.length || line.endsWith(",")) {
    result.push(current.trim());
  }

  while (result.length < expectedColumns) {
    result.push("");
  }

  return result;
}

function normalizeRow(row: Record<string, string>): CsvCoverageEntry | undefined {
  const category = row["category"]?.trim();
  if (!category) {
    return undefined;
  }

  return {
    category,
    indexOrHub: cleanValue(row["index_or_hub"]),
    categoryLink: cleanValue(row["category_link"]),
    imageBuckets: parseResourceLinks(row["images_or_icons"]),
    iconBuckets: parseResourceLinks(row["icons"]),
    examples: parseList(row["examples"]),
    notes: cleanValue(row["notes"])
  };
}

function cleanValue(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function parseList(value?: string): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseResourceLinks(value?: string): ResourceLink[] {
  if (!value) {
    return [];
  }

  return value
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const urlStart = item.indexOf("https://");
      const fallbackUrlStart = item.indexOf("http://");
      const startIndex = urlStart >= 0 ? urlStart : fallbackUrlStart;

      if (startIndex > 0) {
        const label = item.slice(0, startIndex).replace(/[:_-]+$/, "").trim();
        const url = item.slice(startIndex).trim();
        return {
          label: label ? titleize(label) : labelFromUrl(url),
          url
        };
      }

      return {
        label: labelFromUrl(item),
        url: item
      };
    });
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

export type CoverageHighlights = {
  trackedCategories: number;
  withIndexOrHub: number;
  withCategoryLink: number;
  withVisualLibraries: number;
};

export function createCoverageHighlights(entries: CsvCoverageEntry[]): CoverageHighlights {
  const trackedCategories = entries.length;
  const withIndexOrHub = entries.filter((entry) => Boolean(entry.indexOrHub)).length;
  const withCategoryLink = entries.filter((entry) => Boolean(entry.categoryLink)).length;
  const withVisualLibraries = entries.filter(
    (entry) => entry.imageBuckets.length > 0 || entry.iconBuckets.length > 0
  ).length;

  return {
    trackedCategories,
    withIndexOrHub,
    withCategoryLink,
    withVisualLibraries
  };
}
