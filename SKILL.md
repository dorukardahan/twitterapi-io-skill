---
name: twitterapi-io
description: Interact with Twitter/X via TwitterAPI.io — search tweets, get user info, post tweets, like, retweet, follow, send DMs, and more. Covers all 67 active endpoints. Use when the user wants to read or write Twitter data.
metadata:
  version: 3.8.1
  updated: 2026-04-10
  author: dorukardahan
---

# TwitterAPI.io skill v3.8.1

Access Twitter/X data and perform actions via [TwitterAPI.io](https://twitterapi.io) REST API.
Use TwitterAPI.io REST API for read, write, webhook, and stream operations.

Docs: https://docs.twitterapi.io | Dashboard: https://twitterapi.io/dashboard

---

## Setup

1. Get API key: https://twitterapi.io/dashboard ($0.10 free credits, no CC)
2. Store the key in a `.env` file or your shell's secure config (do not use raw `export` with the actual key in the terminal -- it gets saved to shell history).
3. For write actions, you also need `login_cookies` from v2 login + residential `proxy`.

Base URL: `https://api.twitterapi.io`
Auth header: `X-API-Key: $TWITTERAPI_IO_KEY` (all requests)

---

## Pricing (credit-based, 1 USD = 100,000 credits)

| Resource | Credits | Approx $/1K |
|----------|---------|-------------|
| Tweets (per returned tweet) | 15 | $0.15 |
| Profiles (per returned profile) | 18 | $0.18 |
| Profiles batch 100+ (per profile) | 10 | $0.10 |
| Followers (per returned follower) | 15 | $0.15 |
| Verified followers (per follower) | 30 | $0.30 |
| Minimum per API call | 15 | $0.00015 |
| List endpoint calls | 150 | $0.0015 |
| Check follow relationship | 100 | $0.001 |
| Get article | 100 | $0.001 |
| Community info | 20 | $0.0002 |
| Write actions (tweet, like, RT, follow) | 200-300 | $0.002-0.003 |
| Login | 300 | $0.003 |

Note: If the API returns 0 or 1 item, you are still charged the minimum (15 credits).

---

## QPS (rate limits) -- balance-based

| Account Balance (Credits) | QPS Limit |
|---------------------------|-----------|
| < 1,000 (free tier) | 1 req / 5 sec |
| >= 1,000 | 3 |
| >= 5,000 | 6 |
| >= 10,000 | 10 |
| >= 50,000 | 20 |

---

## API Notes

OpenAPI now also exposes several legacy auth/write paths alongside V2 endpoints. Prefer V2 where available.
V3 endpoints were taken offline by TwitterAPI.io in March 2026. Use V2 for write operations. For mission-critical tweet posting, consider Twitter's official API.

### login_cookie vs login_cookies -- API Inconsistency

The API has an inconsistency in naming:
- `user_login_v2` **response** returns the field as `login_cookie` (singular)
- All v2 **action** endpoints expect the field as `login_cookies` (plural)

**Always use `login_cookies` (plural) in request bodies.** The value is the same string.

---

## Response schemas

### Tweet object (from search, replies, etc.)
```json
{
  "type": "tweet",
  "id": "1234567890",
  "url": "https://x.com/user/status/1234567890",
  "text": "Tweet content...",
  "source": "Twitter Web App",
  "retweetCount": 5,
  "replyCount": 2,
  "likeCount": 42,
  "quoteCount": 1,
  "viewCount": 1500,
  "bookmarkCount": 3,
  "createdAt": "Sun Feb 08 12:00:00 +0000 2026",
  "lang": "en",
  "isReply": false,
  "inReplyToId": null,
  "inReplyToUserId": null,
  "inReplyToUsername": null,
  "conversationId": "1234567890",
  "displayTextRange": [0, 280],
  "isLimitedReply": false,
  "author": { "...User Object..." },
  "entities": {
    "hashtags": [{ "text": "AI", "indices": [10, 13] }],
    "urls": [{ "display_url": "example.com", "expanded_url": "https://example.com", "url": "https://t.co/xxx" }],
    "user_mentions": [{ "id_str": "123", "name": "Someone", "screen_name": "someone" }]
  },
  "quoted_tweet": null,
  "retweeted_tweet": null
}
```

### User object
```json
{
  "type": "user",
  "id": "999888777",
  "userName": "elonmusk",
  "name": "Elon Musk",
  "url": "https://x.com/elonmusk",
  "isBlueVerified": true,
  "verifiedType": "none",
  "profilePicture": "https://pbs.twimg.com/...",
  "coverPicture": "https://pbs.twimg.com/...",
  "description": "Bio text...",
  "location": "Mars",
  "followers": 200000000,
  "following": 800,
  "canDm": false,
  "favouritesCount": 50000,
  "mediaCount": 2000,
  "statusesCount": 30000,
  "createdAt": "Tue Jun 02 20:12:29 +0000 2009",
  "pinnedTweetIds": ["1234567890"],
  "isAutomated": false,
  "possiblySensitive": false,
  "profile_bio": {
    "description": "Bio text...",
    "entities": {
      "description": { "urls": [] },
      "url": { "urls": [{ "display_url": "example.com", "expanded_url": "https://example.com" }] }
    }
  }
}
```

### Paginated list response
```json
{
  "tweets": [ "...array of Tweet Objects..." ],
  "has_next_page": true,
  "next_cursor": "cursor_string...",
  "status": "success",
  "msg": null
}
```

---

## Endpoint reference

For detailed endpoint documentation with curl examples, consult the reference files:

- For READ endpoint documentation (31 endpoints), consult `references/read-endpoints.md`
- For WRITE endpoint documentation (28 endpoints), consult `references/write-endpoints.md`
- For Webhook and Stream endpoint documentation (8 endpoints), consult `references/webhook-stream-endpoints.md`
- For the complete endpoint index table (all 67 endpoints), consult `references/endpoint-index.md`

---

## X/Twitter platform degradation notice (March 2026)

**CRITICAL**: Around March 5, 2026, Twitter/X disabled or degraded several advanced search features due to high platform usage. This affects ALL Twitter API providers (not just TwitterAPI.io) because TwitterAPI.io proxies Twitter's own search infrastructure.

### What's broken

| Feature | Status | Impact |
|---------|--------|--------|
| `since:DATE` / `until:DATE` in search | **DEGRADED** | Returns incomplete results (often only 7-20 tweets per query regardless of actual volume) |
| Search pagination | **BROKEN** | Cursor-based pagination returns the SAME page of results repeatedly instead of advancing |
| `since_time:UNIX` / `until_time:UNIX` | **WORKS** | Alternative date format using Unix timestamps -- returns correct date range |
| `within_time:Nh` | **WORKS** | Relative time filter (e.g., `within_time:72h`) |
| `get_user_last_tweets` pagination | **WORKS** | User timeline cursor pagination is unaffected |
| `get_user_mentions` sinceTime/untilTime | **WORKS** | Server-side Unix timestamp parameters (not search operators) |
| Webhook filter rules | **WORKS** | Real-time collection unaffected (but webhook URL may be lost during API key rotation) |

### Workarounds for date-range queries

**Instead of** (broken):
```
$BTC since:2026-03-06_00:00:00_UTC until:2026-03-07_00:00:00_UTC
```

**Use** (working):
```
$BTC since_time:1741219200 until_time:1741305600
```

Convert dates to Unix timestamps: `date -d "2026-03-06T00:00:00Z" +%s` or use Python: `int(datetime(2026,3,6,tzinfo=timezone.utc).timestamp())`

**Pagination workaround**: Since pagination is broken, use **hourly time windows** instead of paginating through a large result set. Each 1-hour window returns a unique set of ~7-16 tweets (page 1 only). This gives ~250 unique tweets per coin per day across 24 windows.

**For user timelines**: Use `GET /twitter/user/last_tweets` with cursor pagination (works normally). Paginate backwards through the user's timeline, then client-side filter by `createdAt` date. This completely bypasses search operators.

### Webhook URL gotcha

When a TwitterAPI.io API key is rotated (e.g., after account data reset), the webhook filter rules may be restored but the **webhook URL is NOT automatically restored**. You must manually re-set the webhook URL in the dashboard at https://twitterapi.io/tweet-filter-rules after any key rotation event.

**Monitoring tip**: Check that `collection_type='webhook'` tweets are still arriving. If rules are active but zero webhook tweets arrive for 30+ minutes, verify the webhook URL is configured.

---

## Twitter search syntax (for `query` param in advanced_search)

| Operator | Example | Description | Status (Mar 2026) |
|----------|---------|-------------|-------------------|
| `from:` | `from:elonmusk` | Tweets by user | Working |
| `to:` | `to:elonmusk` | Replies to user | Working |
| `"..."` | `"exact phrase"` | Exact match | Working |
| `OR` | `cat OR dog` | Either term | Working |
| `-` | `-spam` | Exclude term | Working |
| `since:` / `until:` | `since:2026-01-01_00:00:00_UTC` | Date range (UTC) | **DEGRADED** -- use `since_time:` instead |
| `since_time:` / `until_time:` | `since_time:1741219200` | Date range (Unix timestamp) | **Working** |
| `within_time:` | `within_time:24h` | Relative time window | **Working** |
| `min_faves:` | `min_faves:100` | Min likes | Working |
| `min_retweets:` | `min_retweets:50` | Min RTs | Working |
| `filter:media` | `filter:media` | Has media | Working |
| `filter:links` | `filter:links` | Has links | Working |
| `lang:` | `lang:en` | Language | Working |
| `is:reply` | `is:reply` | Only replies | Working |
| `-is:retweet` | `-is:retweet` | Exclude RTs | Working |

More examples: https://github.com/igorbrigadir/twitter-advanced-search

---

## Pagination

Most list endpoints return:
```json
{ "has_next_page": true, "next_cursor": "cursor_string..." }
```
Pass `cursor=NEXT_CURSOR` to get next page. First page: omit cursor or `cursor=""`.

**Known issues (March 2026)**:
- `advanced_search` pagination is **broken** -- returns the same results on every page. Use hourly time windows (1 page per window) instead of deep pagination.
- `get_user_last_tweets` pagination **works normally** -- cursor advances through the user's timeline chronologically.
- `has_next_page` may return `true` even when no more data exists (Twitter API limitation). If a subsequent request returns empty or identical results, stop paginating.

---

## Error handling

```json
{ "status": "error", "msg": "Error message" }
```

| Error | Cause | Fix |
|-------|-------|-----|
| Invalid API key | Wrong or missing `X-API-Key` header | Check key in dashboard |
| Invalid login_cookie | Expired or faulty cookie | Re-login via `user_login_v2` with valid `totp_secret` |
| 400 on v2 actions | Faulty cookie from login without proper `totp_secret` | Re-login with 16-char string `totp_secret` |
| Proxy error | Bad proxy format or dead proxy | Format: `http://user:pass@host:port`, use residential |
| Rate limited | Exceeded QPS for your balance tier | Back off, add balance for higher QPS |
| Account suspended | Twitter account banned | Use different account |
| 404 on endpoint | Wrong path | Check correct path in this doc |

---

## Common workflows

### Get user ID from username (needed for follow, DM)
1. `GET /twitter/user/info?userName=TARGET` -> extract `data.id`
2. Use that numeric ID in follow/DM calls
Note: `get_user_mentions` accepts `userName` directly -- no ID lookup needed.

### Post tweet with image
1. Upload: `POST /twitter/upload_media_v2` -> get `media_id`
2. Tweet: `POST /twitter/create_tweet_v2` with `media_ids: ["media_id"]`

### Reply to a tweet
`POST /twitter/create_tweet_v2` with `tweet_text` + `reply_to_tweet_id`

### Quote tweet
`POST /twitter/create_tweet_v2` with `tweet_text` + `attachment_url` (full tweet URL)

### Post to community
`POST /twitter/create_tweet_v2` with `tweet_text` + `community_id`

### Monitor accounts for new tweets (cheapest method)
Use Stream endpoints instead of polling `/twitter/user/last_tweets`:
1. `POST /oapi/x_user_stream/add_user_to_monitor_tweet` for each account
2. Set up webhook to receive notifications

---

## MCP server

```bash
claude mcp add twitterapi-io -- npx -y twitterapi-io-mcp
```
npm: https://www.npmjs.com/package/twitterapi-io-mcp
GitHub: https://github.com/dorukardahan/twitterapi-io-mcp

Also available: `twitterapi-docs` MCP server for querying this documentation programmatically.

---

## Important notes

- **Read endpoints** need only API key. No Twitter account needed.
- **Write endpoints** need `login_cookies` from v2 login + residential proxy.
- **V3 endpoints are offline. Only V2 write endpoints are available.**
- **2FA strongly recommended** -- use 16-character string `totp_secret` for reliable login.
- **Proxy mandatory** for all write actions. Use high-quality residential proxies.
- **Credits never expire** once recharged. Bonus credits valid 30 days.
