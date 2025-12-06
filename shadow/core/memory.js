// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import fs from "fs";
import crypto from "crypto";

const MEMFILE = "C:/Shadow/memory.db";
const KEY = crypto.scryptSync("CHAMP-KEY-3000", "salt", 32);

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-ctr", KEY, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return { iv: iv.toString("hex"), data: encrypted.toString("hex") };
}

function decrypt(payload) {
  const iv = Buffer.from(payload.iv, "hex");
  const decipher = crypto.createDecipheriv("aes-256-ctr", KEY, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(payload.data, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString();
}

export default {
  write(key, value) {
    let db = {};
    if (fs.existsSync(MEMFILE)) {
      db = JSON.parse(decrypt(JSON.parse(fs.readFileSync(MEMFILE))));
    }
    db[key] = value;
    fs.writeFileSync(MEMFILE, JSON.stringify(encrypt(JSON.stringify(db))));
  },

  read(key) {
    if (!fs.existsSync(MEMFILE)) return null;
    const db = JSON.parse(decrypt(JSON.parse(fs.readFileSync(MEMFILE))));
    return db[key] ?? null;
  },

  all() {
    if (!fs.existsSync(MEMFILE)) return {};
    return JSON.parse(decrypt(JSON.parse(fs.readFileSync(MEMFILE))));
  },
};
