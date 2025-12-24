import os
import re

def fix_conflicts(root_dir):
    # Regex to find conflict blocks and keep the "incoming" part (after =======)
    # Matches: ...
    # Captures the content between ======= and >>>>>>>
    conflict_pattern = re.compile(r'\s*([\s\S]*?)

    # Fallback for when HEAD is the incoming (e.g. rebase) - but here we assume HEAD is local/old

    for dirpath, dirnames, filenames in os.walk(root_dir):
        if 'node_modules' in dirpath or '.git' in dirpath:
            continue

        for filename in filenames:
            filepath = os.path.join(dirpath, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                if '<<<<<<< HEAD' in content:
                    print(f"Fixing conflicts in: {filepath}")
                    new_content = conflict_pattern.sub(r'\1', content)

                    # Check if any markers remain (e.g. non-standard ones)
                    if '<<<<<<< HEAD' in new_content:
                        print(f"  WARNING: Could not resolve all conflicts in {filepath}")

                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
            except Exception as e:
                print(f"Error processing {filepath}: {e}")

if __name__ == "__main__":
    fix_conflicts('.')
