#!/usr/bin/env python3
"""
Extract the last 5 composite card sheets from the JSONL session file
and crop each into 20 individual card PNGs.
"""

import json
import base64
import os
from io import BytesIO
from PIL import Image

JSONL_PATH = "/root/.claude/projects/-home-user-Kuran-Arapcasi/80780bc5-cc06-4bc2-89cc-94ad6b6322a0.jsonl"
OUTPUT_DIR = "/home/user/Kuran-Arapcasi/public/cards"

# Grid parameters
TOP    = 203
BOTTOM = 1242
LEFT   = 13
RIGHT  = 1042
COLS   = 4
ROWS   = 5

CELL_W = (RIGHT - LEFT) / COLS    # 257.25
CELL_H = (BOTTOM - TOP) / ROWS    # 207.8

# Output resolution (2x upscale)
OUT_W = 514
OUT_H = 416

# Slug names per sheet, reading order (left→right, top→bottom)
SLUGS = {
    "paket3": [
        "rasul",    "nabi",     "malak",    "shaytan",
        "qawm",     "ahl",      "ibn",      "bint",
        "ab",       "umm",      "akh",      "zawj",
        "walad",    "rajul",    "imraah",   "nisa",
        "mumin",    "kafir",    "muslim",   "ibad",
    ],
    "paket4": [
        "yawm",     "layl",     "nahar",    "shahr",
        "sanah",    "saah",     "bada",     "qabla",
        "inda",     "maa-with", "bayna",    "hatta",
        "thumma",   "aw",       "bal",      "hal",
        "man",      "mata",     "ayna",     "kayfa",
    ],
    "paket7": [
        "alim",     "ghafur",   "rahim",    "aziz",
        "karim",    "qadir",    "qawiyy",   "kabir",
        "azim",     "qarib",    "baid",     "salih",
        "tayyib",   "khabith",  "hayy",     "mayyit",
        "hakim",    "basir",    "sami",     "quddus",
    ],
    "paket8": [
        "quran",    "kitab",    "qalam",    "sahifah",
        "burhan",   "bayyinah", "sultan",   "amr",
        "ahd",      "mithaq",   "hadith",   "qawl",
        "kalimah",  "lisan",    "qalb",     "ayn",
        "udhun",    "yad",      "wajh",     "nafs",
    ],
    "paket9": [
        "kana",     "yakunu",   "jaa",      "zahaba",
        "rajaa",    "dakhala",  "kharaja",  "nazala",
        "rafaa",    "akhadha",  "aata",     "jaala",
        "faala",    "amila",    "kataba",   "qaraa",
        "samia",    "raa",      "nazara",   "arafa",
    ],
}

SHEET_ORDER = ["paket3", "paket4", "paket7", "paket8", "paket9"]


def extract_last5_images(jsonl_path):
    """Parse JSONL and return base64 data for the last 5 user image blocks."""
    images = []
    with open(jsonl_path, 'r') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                continue
            msg = obj.get('message', obj)
            role = msg.get('role', '')
            content = msg.get('content', [])
            if isinstance(content, list):
                for block in content:
                    if isinstance(block, dict) and block.get('type') == 'image':
                        src = block.get('source', {})
                        if src.get('type') == 'base64':
                            images.append(src.get('data', ''))
    # Return only the last 5
    return images[-5:]


def crop_sheet(pil_image, sheet_name, output_dir):
    """Crop a sheet into 20 cards and save them."""
    slugs = SLUGS[sheet_name]
    created = []
    skipped = []

    for row in range(ROWS):
        for col in range(COLS):
            idx = row * COLS + col
            slug = slugs[idx]
            out_path = os.path.join(output_dir, f"{slug}.png")

            if os.path.exists(out_path):
                skipped.append(slug)
                continue

            x0 = LEFT + col * CELL_W
            y0 = TOP  + row * CELL_H
            x1 = x0 + CELL_W
            y1 = y0 + CELL_H

            # Use integer rounding for crop box
            crop_box = (round(x0), round(y0), round(x1), round(y1))
            card = pil_image.crop(crop_box)

            # Upscale to 2× (514×416)
            card_resized = card.resize((OUT_W, OUT_H), Image.LANCZOS)
            card_resized.save(out_path, "PNG")
            created.append(slug)

    return created, skipped


def main():
    print("Extracting last 5 images from JSONL...")
    b64_list = extract_last5_images(JSONL_PATH)
    print(f"Found {len(b64_list)} images to process.")

    all_created = []
    all_skipped = []

    for i, b64_data in enumerate(b64_list):
        sheet_name = SHEET_ORDER[i]
        print(f"\n--- {sheet_name} (image {i+1}/5) ---")

        img_bytes = base64.b64decode(b64_data)
        pil_img = Image.open(BytesIO(img_bytes)).convert("RGBA")
        print(f"  Sheet size: {pil_img.size}")

        created, skipped = crop_sheet(pil_img, sheet_name, OUTPUT_DIR)
        print(f"  Created: {len(created)} cards: {created}")
        if skipped:
            print(f"  Skipped (already exist): {len(skipped)}: {skipped}")
        all_created.extend(created)
        all_skipped.extend(skipped)

    print(f"\n=== SUMMARY ===")
    print(f"Total new cards created: {len(all_created)}")
    print(f"Total cards skipped (already existed): {len(all_skipped)}")
    print(f"\nAll created files:")
    for slug in all_created:
        path = os.path.join(OUTPUT_DIR, f"{slug}.png")
        size = os.path.getsize(path)
        print(f"  {slug}.png ({size} bytes)")


if __name__ == "__main__":
    main()
