export function validateCommand(cmd: any) {
  const blocked = [
    "rm -rf",
    "delete repo",
    "wipe",
    "format",
    "drop database"
  ];

  const text = JSON.stringify(cmd).toLowerCase();

  for (const bad of blocked) {
    if (text.includes(bad)) {
      throw new Error("Blocked destructive command");
    }
  }

  if (!cmd.action) throw new Error("Missing action");
  return true;
}
