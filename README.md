# twitterapi-io-skill

**Make any LLM use Twitter/X.** 68 active endpoints via [TwitterAPI.io](https://twitterapi.io) - search, post, like, retweet, follow, DM, communities, webhooks, profile management.

No Twitter developer account needed. Works with any AI assistant.

## How it works

`SKILL.md` teaches an LLM how to use the TwitterAPI.io API. Detailed endpoint examples are split into `references/*.md` so agents can load the exact read/write/webhook reference only when needed. The skill contains:

- Every endpoint with method, path, and curl example
- Required and optional query parameters for each endpoint
- Request body schemas for all POST endpoints
- Authentication, pricing, rate limits, pagination patterns
- Login flow for write actions (tweet, like, retweet, follow)

Install the whole skill directory when your agent supports multi-file skills. If your tool only accepts a single context file, use the root `SKILL.md` as the overview and consult the files in `references/` for endpoint-level details.

## Use with Hermes Agent

Install the bundled multi-file read-only skill so public read endpoint references are available through `skill_view`:

```bash
hermes skills install dorukardahan/twitterapi-io-skill/skills/twitterapi-io --force
```

Then start a fresh session or run `/reset` before relying on the updated skill context.

The Hermes bundle intentionally excludes write/login/cookie/proxy reference files so community-skill safety scanning keeps the install safe. The repository root still includes the complete all-endpoints documentation for manual/non-agent review.

## Use with OpenClaw

```bash
skill_dir=~/.openclaw/workspace/skills/twitterapi-io
base_url=https://raw.githubusercontent.com/dorukardahan/twitterapi-io-skill/main
mkdir -p "$skill_dir/references"
curl --fail --location --output "$skill_dir/SKILL.md" "$base_url/SKILL.md"
for file in endpoint-index read-endpoints webhook-stream-endpoints write-endpoints; do
  curl --fail --location \
    --output "$skill_dir/references/$file.md" \
    "$base_url/references/$file.md"
done
```

Or install via ClawHub:

```text
/install twitterapi-io
```

## Use with Claude Code / Codex

Add the overview to your project context. Download `references/` too when your
agent supports multi-file skills.

```bash
curl -o SKILL.md https://raw.githubusercontent.com/dorukardahan/twitterapi-io-skill/main/SKILL.md
```

Then: "Read SKILL.md and search recent tweets about Bitcoin"

## Use with ChatGPT / Gemini / any LLM

Paste the contents of `SKILL.md` into your conversation or system prompt. The LLM will understand how to construct curl commands for any Twitter operation.

## Endpoints (68 total)

Counting by HTTP method from the live OpenAPI: **35 GET**, **33 POST/PATCH/PUT/DELETE**, with **8 `/oapi/` webhook/stream endpoints** overlapping those method totals (3 GET + 5 write).

| Category | Count | Examples |
|----------|-------|---------|
| **Read** | 35 | Search, tweets, users, lists, communities, trends, spaces, account info, `/oapi/my/info`, get rules, monitored users |
| **Write** | 33 | Login, tweet, like, retweet, follow, profile updates, DM, media, communities, webhook rule changes, monitor user changes |
| **Webhook + Stream** | 8 | Add/update/delete rules, monitor users |

## Requirements

- [TwitterAPI.io](https://twitterapi.io) API key (free tier available)

## Related

- [twitterapi-io-mcp](https://github.com/dorukardahan/twitterapi-io-mcp) - MCP server version (for Claude Desktop, Cursor, Windsurf)
- [TweetClaw](https://github.com/Xquik-dev/tweetclaw) - OpenClaw plugin for Xquik-backed X search, publishing, monitoring, webhooks, and giveaway workflows.
- [TwitterAPI.io docs](https://docs.twitterapi.io)

## License

MIT

Xquik is an independent third-party service. Not affiliated with X Corp.
"Twitter" and "X" are trademarks of X Corp.
