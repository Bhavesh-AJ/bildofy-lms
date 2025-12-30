import os
from collections import defaultdict

# -----------------------------
# CONFIG
# -----------------------------
# Define exactly which folders to include
INCLUDE_FOLDERS = [
    r"frontend/bildofy-lms-lovable/src",
]

OUTPUT_FILE = "combined_code_lovable.md"

# Allowed code extensions ONLY
VALID_EXTENSIONS = {
    ".py", ".ts", ".tsx", ".js", ".jsx",
    ".json", ".css", ".html",
    ".yml", ".yaml", ".md"
}

# Folders that MUST be excluded (explicit)
EXCLUDED_FOLDERS = {
    "node_modules", "lms_venv", "venv", ".venv",
    "__pycache__", "dist", "build", ".next"
}


def is_excluded_folder(folder_name):
    """Return True if folder should be skipped entirely."""
    if folder_name in EXCLUDED_FOLDERS:
        return True
    
    # Auto-skip ANY folder with env/venv in its name
    lowered = folder_name.lower()
    if "env" in lowered or "venv" in lowered:
        return True
    
    return False


def collect_files(start_folder):
    """Collect all valid code files from a given folder."""
    files = []
    for dirpath, dirnames, filenames in os.walk(start_folder):

        # Remove excluded folders dynamically
        dirnames[:] = [d for d in dirnames if not is_excluded_folder(d)]

        for name in filenames:
            ext = os.path.splitext(name)[1].lower()

            if ext not in VALID_EXTENSIONS:
                continue

            full_path = os.path.join(dirpath, name)
            rel_path = os.path.relpath(full_path, start_folder)

            files.append((name, rel_path, full_path))

    return files


def group_by_filename(files):
    groups = defaultdict(list)
    for name, rel_path, full_path in files:
        groups[name].append((rel_path, full_path))
    return groups


def write_markdown(groups, output_file):
    with open(output_file, "w", encoding="utf-8") as md:
        md.write("# Combined Project Code\n\n")

        for filename, file_list in groups.items():
            duplicate = len(file_list) > 1

            for rel_path, full_path in file_list:

                # Use full relative path when duplicates exist
                label = rel_path if duplicate else filename

                md.write("\n---\n\n")
                md.write(f"### `{label}`\n\n")
                md.write(f"```{get_language(full_path)}\n")

                try:
                    with open(full_path, "r", encoding="utf-8") as f:
                        md.write(f.read())
                except Exception as e:
                    md.write(f"ERROR READING FILE: {e}")

                md.write("\n```\n")


def get_language(path):
    ext = os.path.splitext(path)[1].lower()
    return {
        ".py": "python",
        ".ts": "ts",
        ".tsx": "tsx",
        ".js": "javascript",
        ".jsx": "jsx",
        ".json": "json",
        ".css": "css",
        ".html": "html",
        ".yml": "yaml",
        ".yaml": "yaml",
        ".md": "markdown",
    }.get(ext, "")


if __name__ == "__main__":
    all_files = []

    print("Starting scan...\n")

    # Scan only the selected folders
    for folder in INCLUDE_FOLDERS:
        if os.path.exists(folder):
            print(f"Scanning folder: {folder}")
            all_files.extend(collect_files(folder))
        else:
            print(f"WARNING: Folder not found → {folder}")

    print(f"\nTotal code files collected: {len(all_files)}")

    groups = group_by_filename(all_files)

    print("Writing markdown output...")
    write_markdown(groups, OUTPUT_FILE)

    print(f"\nDone! Markdown file saved as: {OUTPUT_FILE}")
