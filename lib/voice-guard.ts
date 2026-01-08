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
}
