# twitterapi-io-skill

**Make any LLM use Twitter/X.** 55 endpoints via [TwitterAPI.io](https://twitterapi.io) — search, post, like, retweet, follow, DM, communities, webhooks.

No Twitter developer account needed. Works with any AI assistant.

## How it works

`SKILL.md` is a single file that teaches an LLM how to use the Twitter API. Drop it into your AI tool's context and it can start making Twitter API calls.

## Use with OpenClaw

```bash
mkdir -p ~/.openclaw/workspace/skills/twitterapi-io
curl -o ~/.openclaw/workspace/skills/twitterapi-io/SKILL.md \
  https://raw.githubusercontent.com/dorukardahan/twitterapi-io-skill/main/SKILL.md
```

## Use with Claude Code

Add to your project's context:
```bash
curl -o SKILL.md https://raw.githubusercontent.com/dorukardahan/twitterapi-io-skill/main/SKILL.md
```

Then tell Claude: "Read SKILL.md and use TwitterAPI.io to search tweets about Bitcoin"

## Use with any LLM

Paste the contents of `SKILL.md` into your system prompt or conversation context. The LLM will know how to make curl requests to TwitterAPI.io.

## What's inside

- **55 endpoints** with curl examples ready to copy-paste
- Auth guide, pricing, rate limits, pagination
- Login flow for write actions
- 9 categories: Search, Users, Tweet Actions, Account Actions, DMs, Communities, Webhooks, Spaces, Legacy

## Requirements

- [TwitterAPI.io](https://twitterapi.io) API key (free tier available)

## Related

- [twitterapi-io-mcp](https://github.com/dorukardahan/twitterapi-io-mcp) — MCP server version (for Claude Desktop, Cursor, Windsurf)
- [TwitterAPI.io docs](https://docs.twitterapi.io)

## License

MIT
