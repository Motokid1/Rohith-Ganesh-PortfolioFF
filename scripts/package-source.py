"""Create a source ZIP without traversing dependency and build directories."""

import os
import sys
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

PROJECT = Path(__file__).resolve().parents[1]
EXCLUDED = {".git", "node_modules", ".next", "out", ".sites-local", ".resume-preview", "__pycache__"}


def package_source(destination: Path) -> None:
    with ZipFile(destination, "w", ZIP_DEFLATED) as archive:
        for directory, subdirectories, filenames in os.walk(PROJECT):
            subdirectories[:] = sorted(name for name in subdirectories if name not in EXCLUDED)
            for name in sorted(filenames):
                file = Path(directory) / name
                if name.endswith((".tsbuildinfo", ".pyc")) or (
                    name.startswith(".env") and name != ".env.example"
                ):
                    continue
                archive.write(file, Path(PROJECT.name) / file.relative_to(PROJECT))


if __name__ == "__main__":
    target = Path(sys.argv[1]) if len(sys.argv) > 1 else PROJECT.parent / "Builders-DNA-V4-Source.zip"
    package_source(target.resolve())
    print(f"Source archive ready: {target.name}")
