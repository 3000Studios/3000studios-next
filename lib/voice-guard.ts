<<<<<<< HEAD
export function validateCommand(payload: any) {
    if (!payload) {
        throw new Error("Invalid command: empty payload");
    }
    
    // Basic safety checks
    const forbidden = ["rm -rf", "drop table", "delete from"];
    if (payload.code && typeof payload.code === "string") {
        for (const term of forbidden) {
            if (payload.code.toLowerCase().includes(term)) {
                throw new Error("Command contains forbidden terms");
            }
        }
    }
    
    // Additional validation logic can be added here
    return true;
=======
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
>>>>>>> 9a2262fa502744d6d6f2d5b774e4a8dd1b48bb38
}
