#!/usr/bin/env python3
"""Trace assets/img/lab-logo.png into a small vector SVG.

Requires potrace (brew install potrace) and Pillow (pip install Pillow).

Usage:
    python3 scripts/logo_to_svg.py
    python3 scripts/logo_to_svg.py --input path/to/logo.png --output path/to/logo.svg --size 64
"""

import argparse
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_INPUT = REPO_ROOT / "assets" / "img" / "lab-logo.png"
DEFAULT_OUTPUT = REPO_ROOT / "assets" / "img" / "lab-logo.svg"
DEFAULT_SIZE = 64  # output SVG width/height in px
DEFAULT_THRESHOLD = 128  # 0-255 black/white cutoff for anti-aliased edges


def png_to_pbm(png_path: Path, pbm_path: Path, threshold: int) -> None:
    img = Image.open(png_path).convert("RGBA")
    # flatten onto white so transparent pixels trace as background, not shape
    white_bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
    flattened = Image.alpha_composite(white_bg, img).convert("L")
    bilevel = flattened.point(lambda p: 255 if p >= threshold else 0, mode="1")
    bilevel.save(pbm_path)


def trace_to_svg(pbm_path: Path, svg_path: Path, size: int) -> None:
    subprocess.run(
        [
            "potrace",
            "--svg",
            "--tight",
            "-W", f"{size}pt",
            "-H", f"{size}pt",
            "-o", str(svg_path),
            str(pbm_path),
        ],
        check=True,
    )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT, help="source PNG logo")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT, help="destination SVG path")
    parser.add_argument("--size", type=int, default=DEFAULT_SIZE, help="output SVG width/height in px")
    parser.add_argument("--threshold", type=int, default=DEFAULT_THRESHOLD, help="black/white cutoff (0-255)")
    args = parser.parse_args()

    if shutil.which("potrace") is None:
        sys.exit("potrace not found on PATH. Install it with: brew install potrace")

    if not args.input.exists():
        sys.exit(f"input file not found: {args.input}")

    with tempfile.TemporaryDirectory() as tmp:
        pbm_path = Path(tmp) / "logo.pbm"
        png_to_pbm(args.input, pbm_path, args.threshold)
        trace_to_svg(pbm_path, args.output, args.size)

    print(f"wrote {args.output}")


if __name__ == "__main__":
    main()
