# twitterapi-io-skill

**Make any LLM use Twitter/X.** 67 active endpoints via [TwitterAPI.io](https://twitterapi.io) — search, post, like, retweet, follow, DM, communities, webhooks, profile management.

No Twitter developer account needed. Works with any AI assistant.

## How it works

`SKILL.md` is a single file that teaches an LLM how to use the Twitter API. It contains:

- Every endpoint with method, path, and curl example
- Required and optional query parameters for each endpoint
- Request body schemas for all POST endpoints
- Authentication, pricing, rate limits, pagination patterns
- Login flow for write actions (tweet, like, retweet, follow)

Drop it into your AI tool's context and it can start making real Twitter API calls.

## Use with OpenClaw

```bash
mkdir -p ~/.openclaw/workspace/skills/twitterapi-io
curl -o ~/.openclaw/workspace/skills/twitterapi-io/SKILL.md \
  https://raw.githubusercontent.com/dorukardahan/twitterapi-io-skill/main/SKILL.md
```

Or install via ClawHub:
```
/install twitterapi-io
```

## Use with Claude Code / Codex

Add to your project context:
```bash
curl -o SKILL.md https://raw.githubusercontent.com/dorukardahan/twitterapi-io-skill/main/SKILL.md
```

Then: "Read SKILL.md and search recent tweets about Bitcoin"

## Use with ChatGPT / Gemini / any LLM

Paste the contents of `SKILL.md` into your conversation or system prompt. The LLM will understand how to construct curl commands for any Twitter operation.

## Endpoints (67 total)

| Category | Count | Examples |
|----------|-------|---------|
| **Read** | 31 | Search, tweets, users, lists, communities, trends, spaces, account info |
| **Write** | 28 | Login, tweet, like, retweet, follow, profile updates, DM, media, communities |
| **Webhook + Stream** | 8 | Add/update/delete rules, monitor users |

## Requirements

- [TwitterAPI.io](https://twitterapi.io) API key (free tier available)

## Related

- [twitterapi-io-mcp](https://github.com/dorukardahan/twitterapi-io-mcp) — MCP server version (for Claude Desktop, Cursor, Windsurf)
- [TwitterAPI.io docs](https://docs.twitterapi.io)

## License

MIT
