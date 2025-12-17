import { openai } from "./openai";

export const agents = {
  router: openai("gpt-5-mini"),
  coder: openai("gpt-5.1-codex"),
  researcher: openai("gpt-5"),
  writer: openai("gpt-5-mini"),
  system: openai("gpt-5"),
};
