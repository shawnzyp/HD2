Helldivers 2 Wiki Manifest Export
=================================

What this is:
- A single JSON file (hd2_wiki_manifest.json) mapping each requested category to the best index pages on helldivers.wiki.gg.
- A CSV (hd2_wiki_manifest.csv) flat summary to drive a simple link crawler.

How to use:
1) Build a crawler that, for each row, loads the index_or_hub URL, follows any item-table or list links in the main content area, and visits each item page.
2) On each item page, parse the infobox for canonical stats and the first paragraph for description.
3) For images, prefer the matching images_or_icons or icons category. Visit each file page and resolve the "Original" image URL.
4) Save per-item JSON with fields: name, type, subcategory, description, stats, unlock, cost, faction, biome, effects, source_url, images{icon_url, image_url}.
5) Respect wiki licensing and carry the file-page attribution in your app's credits or in each asset's metadata.

Notes:
- This export does not include scraped content or images. It is a manifest of authoritative entry points to drive your scraper.
- If you want me to deliver first 100 items per category with image URLs in CSV/JSON, ask for a "resolved export" and I will generate it.
