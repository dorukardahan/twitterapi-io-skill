---
name: twitterapi-io
version: 3.0.0
description: >-
  Use Twitter/X API via TwitterAPI.io. 52 live endpoints — search, post, like,
  retweet, follow, DM, communities, webhooks, lists, spaces, profile management.
  No Twitter developer account needed. Works with any LLM.
homepage: https://twitterapi.io
---

# TwitterAPI.io — Complete Twitter/X API Reference

Use Twitter/X through [TwitterAPI.io](https://twitterapi.io). This file contains everything you need to construct working API calls.

## Quick Start

```bash
# 1. Search tweets (read-only, no login needed)
curl 'https://api.twitterapi.io/twitter/tweet/advanced_search?query=bitcoin&queryType=Latest' \
  -H 'x-api-key: YOUR_KEY'

# 2. Login (required for write actions)
curl -X POST 'https://api.twitterapi.io/twitter/user_login_v2' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"user_name":"USER","password":"PASS","email":"EMAIL","totp_secret":"2FA_SECRET","proxy":"http://user:pass@host:port"}'

# 3. Post tweet (needs login_cookies from step 2)
curl -X POST 'https://api.twitterapi.io/twitter/tweet' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"login_cookies":"COOKIES_FROM_LOGIN","tweet_text":"Hello world!","proxy":"http://user:pass@host:port"}'
```

---

## Base URL

```
https://api.twitterapi.io
```

## Authentication

Every request requires the `x-api-key` header:

```
x-api-key: YOUR_API_KEY
```

Get your key: https://twitterapi.io/dashboard ($0.10 free credits, no credit card needed)

## Pricing

| Operation | Cost per call | Notes |
|-----------|--------------|-------|
| Tweet search (per page) | $0.00015 | ~20 tweets/page |
| User profile lookup | $0.00018 | Per user |
| Followers/following list | $0.00015 | Per page |
| User tweets/mentions | $0.00015 | Per page |
| Tweet by ID | $0.00015 | Comma-separated batch supported |
| Tweet replies | $0.00015 | Per page |
| Post tweet | $0.003 | Requires login |
| Delete tweet | $0.002 | Requires login |
| Like/Unlike tweet | $0.002 | Requires login |
| Retweet | $0.002 | Requires login |
| Follow/Unfollow | $0.002 | Requires login |
| Send DM | $0.003 | Requires login |
| Upload media | $0.003 | multipart/form-data |
| Update profile/avatar/banner | $0.003 | Requires login |
| Login | $0.003 | Returns cookies |
| Get article | 100 credits | Long-form Twitter articles |
| Verified followers | $0.0003 | Per page |
| Communities | $0.002 | Write actions |
| Webhooks | Varies | See endpoint details |

Minimum charge: $0.00015 per request, even if no data returned.

## Rate Limits

| Plan | QPS (queries/sec) |
|------|--------------------|
| Free tier | 1 req / 5 seconds |
| $10/mo | 3/s |
| $50/mo | 6/s |
| $100/mo | 10/s |
| $500/mo | 20/s |

Rate limits are per API key, across all endpoints.

## Pagination

Most list endpoints use cursor-based pagination:

```json
{
  "has_next_page": true,
  "next_cursor": "DAABCgABGRT..."
}
```

To get the next page, pass `cursor=<next_cursor>` as a query parameter. Continue until `has_next_page` is `false` or `next_cursor` is empty.

Page sizes vary by endpoint (typically 20 items).

## Error Handling

All responses include `status` and `msg` (or `message`) fields:

```json
{"status": "success", "msg": ""}
{"status": "error", "msg": "Invalid API key"}
```

| HTTP Status | Meaning | Action |
|-------------|---------|--------|
| 200 | Success | Parse response body |
| 401 | Invalid/expired API key | Check your key |
| 403 | Account restricted or forbidden | Check account status |
| 429 | Rate limited | Wait and retry (respect QPS limits) |
| 500 | Server error | Retry with exponential backoff |

For write actions, also check `status` field in response body — HTTP 200 with `"status": "error"` means the action failed (e.g., expired cookies, banned account).

## Login (Required for Write Actions)

All write endpoints (post, like, retweet, follow, DM, profile, communities) require `login_cookies` obtained from the login endpoint.

### Login Flow

```bash
curl -X POST 'https://api.twitterapi.io/twitter/user_login_v2' \
  -H 'x-api-key: YOUR_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "user_name": "your_twitter_handle",
    "email": "your_email@example.com",
    "password": "your_password",
    "totp_secret": "YOUR_2FA_SECRET",
    "proxy": "http://user:pass@host:port"
  }'
```

**Parameters:**
- `user_name` (required): Twitter username
- `email` (required): Account email
- `password` (required): Account password
- `proxy` (required): Residential proxy URL — format `http://user:pass@host:port`
- `totp_secret` (optional but strongly recommended): 2FA TOTP secret key. Without it, cookies may be unreliable. To get it: enable 2FA on Twitter → select "can't scan QR code" → Twitter gives you a 10+ character string.

**Response:**
```json
{
  "status": "success",
  "login_cookies": "BASE64_ENCODED_COOKIES_STRING"
}
```

**Cookie lifetime:** With residential proxies and healthy accounts, cookies remain valid indefinitely. Re-login if you get auth errors from write endpoints.

**Important:** Always use the same proxy for login and subsequent write actions.

## Auth Field Reference

All v2 write endpoints use the same auth pattern:

| Field | Value | Source |
|-------|-------|--------|
| `login_cookies` | String from login response | `POST /twitter/user_login_v2` |
| `proxy` | `http://user:pass@host:port` | Your proxy provider |

Communities endpoints also use `login_cookies` (not `login_cookie` — always plural).

---

## Response Schemas

### Tweet Object
Returned by search, get-by-id, replies, quotes, thread endpoints:

```json
{
  "type": "tweet",
  "id": "1234567890",
  "url": "https://x.com/user/status/1234567890",
  "text": "Tweet content here",
  "source": "Twitter Web App",
  "retweetCount": 5,
  "replyCount": 2,
  "likeCount": 10,
  "quoteCount": 1,
  "viewCount": 500,
  "bookmarkCount": 3,
  "createdAt": "Wed Feb 12 10:00:00 +0000 2026",
  "lang": "en",
  "isReply": false,
  "inReplyToId": null,
  "conversationId": "1234567890",
  "inReplyToUserId": null,
  "inReplyToUsername": null,
  "author": { "...User Object..." },
  "entities": {
    "hashtags": [{"text": "bitcoin", "indices": [0, 8]}],
    "urls": [{"display_url": "...", "expanded_url": "...", "url": "..."}],
    "user_mentions": [{"id_str": "...", "name": "...", "screen_name": "..."}]
  },
  "quoted_tweet": null,
  "retweeted_tweet": null
}
```

### User Object
Returned by user lookup, followers, following, search-user endpoints:

```json
{
  "type": "user",
  "id": "1234567890",
  "userName": "example_user",
  "name": "Example User",
  "url": "https://x.com/example_user",
  "profilePicture": "https://pbs.twimg.com/...",
  "coverPicture": "https://pbs.twimg.com/...",
  "description": "Bio text here",
  "location": "New York",
  "followers": 1000,
  "following": 500,
  "statusesCount": 2500,
  "favouritesCount": 5000,
  "mediaCount": 100,
  "createdAt": "Mon Jan 01 00:00:00 +0000 2020",
  "isBlueVerified": true,
  "verifiedType": "Business",
  "canDm": true,
  "isAutomated": false,
  "automatedBy": null,
  "pinnedTweetIds": ["1234567890"],
  "possiblySensitive": false
}
```

### Write Action Response
Returned by post, like, retweet, follow, delete, DM endpoints:

```json
{
  "status": "success",
  "msg": ""
}
```

Some write endpoints return additional fields:
- `create_tweet_v2`: `"tweet_id": "1234567890"`
- `upload_media_v2`: `"media_id": "1234567890"`
- `send_dm_v2`: `"message_id": "1234567890"`

---

## Endpoints

### Search & Read

#### Tweet Advanced Search
`GET /twitter/tweet/advanced_search`

Search tweets using Twitter search operators. Returns ~20 tweets per page.

| Param | Required | Description |
|-------|----------|-------------|
| `query` | Yes | Search query (supports operators: `from:`, `to:`, `lang:`, `min_faves:`, `since:`, `until:`, `-filter:replies`, etc.) |
| `queryType` | No | `Top` (default) or `Latest`. **Note:** Some operators like `min_faves:` only work with `queryType=Latest` |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/tweet/advanced_search?query=(from:elonmusk)%20lang:en&queryType=Latest' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "tweets": [Tweet, ...], "has_next_page": true, "next_cursor": "..." }`

#### Get Tweet By IDs
`GET /twitter/tweets`

Fetch one or more tweets by ID.

| Param | Required | Description |
|-------|----------|-------------|
| `tweet_ids` | Yes | Comma-separated tweet IDs |

```bash
curl 'https://api.twitterapi.io/twitter/tweets?tweet_ids=1234567890,9876543210' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "tweets": [Tweet, ...] }`

#### Get Tweet Replies
`GET /twitter/tweet/replies`

Get replies to a tweet. Ordered by reply time desc. ~20 per page.

| Param | Required | Description |
|-------|----------|-------------|
| `tweetId` | Yes | Tweet ID |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/tweet/replies?tweetId=1234567890' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "replies": [Tweet, ...], "has_next_page": true, "next_cursor": "..." }`

#### Get Tweet Replies V2
`GET /twitter/tweet/replies/v2`

V2 replies with sorting. ~20 per page.

| Param | Required | Description |
|-------|----------|-------------|
| `tweetId` | Yes | Tweet ID |
| `sort` | No | `Relevance` (default), `Latest`, or `Likes` |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/tweet/replies/v2?tweetId=1234567890&sort=Latest' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "replies": [Tweet, ...], "has_next_page": true, "next_cursor": "..." }`

#### Get Tweet Quotes
`GET /twitter/tweet/quotes`

Get quote tweets. 20 per page, ordered by quote time desc.

| Param | Required | Description |
|-------|----------|-------------|
| `tweetId` | Yes | Tweet ID |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/tweet/quotes?tweetId=1234567890' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "quotes": [Tweet, ...], "has_next_page": true, "next_cursor": "..." }`

#### Get Tweet Retweeters
`GET /twitter/tweet/retweeters`

Get users who retweeted a tweet.

| Param | Required | Description |
|-------|----------|-------------|
| `tweetId` | Yes | Tweet ID |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/tweet/retweeters?tweetId=1234567890' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "users": [User, ...], "has_next_page": true, "next_cursor": "..." }`

#### Get Tweet Thread Context
`GET /twitter/tweet/thread_context`

Get full thread context for a tweet (ancestors + descendants).

| Param | Required | Description |
|-------|----------|-------------|
| `tweetId` | Yes | Tweet ID |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/tweet/thread_context?tweetId=1234567890' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "tweets": [Tweet, ...], "has_next_page": true, "next_cursor": "..." }`

#### Get Trends
`GET /twitter/trends`

Get current trending topics.

```bash
curl 'https://api.twitterapi.io/twitter/trends' \
  -H 'x-api-key: YOUR_KEY'
```

#### Get Article
`GET /twitter/tweet/article`

Get a long-form Twitter article. Cost: 100 credits per call.

| Param | Required | Description |
|-------|----------|-------------|
| `tweetId` | Yes | Tweet ID of the article |

```bash
curl 'https://api.twitterapi.io/twitter/tweet/article?tweetId=1234567890' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "article": { "title": "...", "preview_text": "...", "content": "...", "author": User, ... } }`

---

### Users

#### Get User By Username
`GET /twitter/user/info`

| Param | Required | Description |
|-------|----------|-------------|
| `userName` | Yes | Twitter username (without @) |

```bash
curl 'https://api.twitterapi.io/twitter/user/info?userName=elonmusk' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "data": User, "status": "success" }`

#### Batch Get Users By IDs
`GET /twitter/user/batch_info_by_ids`

| Param | Required | Description |
|-------|----------|-------------|
| `userIds` | Yes | Comma-separated user IDs |

```bash
curl 'https://api.twitterapi.io/twitter/user/batch_info_by_ids?userIds=44196397,1234567' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "users": [User, ...] }`

#### Get User About
`GET /twitter/user/about`

Get extended user profile info (highlights, affiliates, etc.).

| Param | Required | Description |
|-------|----------|-------------|
| `userName` | Yes | Twitter username |

```bash
curl 'https://api.twitterapi.io/twitter/user/about?userName=elonmusk' \
  -H 'x-api-key: YOUR_KEY'
```

#### Get User Followers
`GET /twitter/user/followers`

| Param | Required | Description |
|-------|----------|-------------|
| `userName` | Yes | Twitter username |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/user/followers?userName=elonmusk' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "followers": [User, ...], "has_next_page": true, "next_cursor": "..." }`

#### Get User Verified Followers
`GET /twitter/user/verified_followers`

| Param | Required | Description |
|-------|----------|-------------|
| `userName` | Yes | Twitter username |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/user/verified_followers?userName=elonmusk' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "followers": [User, ...], "has_next_page": true, "next_cursor": "..." }`

#### Get User Following
`GET /twitter/user/followings`

| Param | Required | Description |
|-------|----------|-------------|
| `userName` | Yes | Twitter username |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/user/followings?userName=elonmusk' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "followings": [User, ...], "has_next_page": true, "next_cursor": "..." }`

#### Get User Last Tweets
`GET /twitter/user/last_tweets`

Get a user's recent tweets.

| Param | Required | Description |
|-------|----------|-------------|
| `userName` | Yes | Twitter username |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/user/last_tweets?userName=elonmusk' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "tweets": [Tweet, ...], "has_next_page": true, "next_cursor": "..." }`

#### Get User Mentions
`GET /twitter/user/mentions`

| Param | Required | Description |
|-------|----------|-------------|
| `userName` | Yes | Twitter username |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/user/mentions?userName=elonmusk' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "tweets": [Tweet, ...], "has_next_page": true, "next_cursor": "..." }`

#### Search Users
`GET /twitter/user/search`

| Param | Required | Description |
|-------|----------|-------------|
| `query` | Yes | Search query |

```bash
curl 'https://api.twitterapi.io/twitter/user/search?query=bitcoin' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "users": [User, ...] }`

#### Check Follow Relationship
`GET /twitter/user/check_follow`

⚠️ Known issue: This endpoint may return internal server errors from the API side.

| Param | Required | Description |
|-------|----------|-------------|
| `source_user_name` | Yes | Username checking if they follow |
| `target_user_name` | Yes | Username being checked |

```bash
curl 'https://api.twitterapi.io/twitter/user/check_follow?source_user_name=user1&target_user_name=user2' \
  -H 'x-api-key: YOUR_KEY'
```

#### Get My Account Info
`GET /twitter/user/my_info`

Get info about the logged-in account. Requires login cookies as query parameter.

| Param | Required | Description |
|-------|----------|-------------|
| `login_cookies` | Yes | Login cookies from login endpoint |

```bash
curl 'https://api.twitterapi.io/twitter/user/my_info?login_cookies=COOKIES' \
  -H 'x-api-key: YOUR_KEY'
```

---

### Tweet Actions (Write — require login)

#### Create Tweet V2
`POST /twitter/tweet`

| Body Field | Required | Description |
|------------|----------|-------------|
| `login_cookies` | Yes | From login endpoint |
| `tweet_text` | Yes | Tweet content (max 280 chars, or longer with `is_note_tweet: true` + Twitter Premium) |
| `proxy` | Yes | Proxy URL |
| `reply_to_tweet_id` | No | Tweet ID to reply to |
| `attachment_url` | No | URL to attach (for quote tweets: use original tweet URL) |
| `community_id` | No | Community ID to post in |
| `is_note_tweet` | No | `true` for long tweets (Premium only). **Default: false. Always send `false` explicitly if not using notes.** |
| `media_ids` | No | Array of media IDs from upload endpoint |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/tweet' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{
    "login_cookies": "COOKIES",
    "tweet_text": "Hello from the API!",
    "proxy": "http://user:pass@host:port",
    "is_note_tweet": false
  }'
```

**Response:** `{ "status": "success", "tweet_id": "1234567890" }`

**Quote tweet:** Set `attachment_url` to the URL of the tweet you want to quote:
```json
{
  "login_cookies": "COOKIES",
  "tweet_text": "Great thread!",
  "attachment_url": "https://x.com/user/status/1234567890",
  "proxy": "http://user:pass@host:port"
}
```

**Reply:** Set `reply_to_tweet_id`:
```json
{
  "login_cookies": "COOKIES",
  "tweet_text": "I agree!",
  "reply_to_tweet_id": "1234567890",
  "proxy": "http://user:pass@host:port"
}
```

#### Delete Tweet V2
`POST /twitter/tweet/delete`

| Body Field | Required | Description |
|------------|----------|-------------|
| `login_cookies` | Yes | From login endpoint |
| `tweet_id` | Yes | Tweet ID to delete |
| `proxy` | Yes | Proxy URL |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/tweet/delete' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"login_cookies":"COOKIES","tweet_id":"1234567890","proxy":"http://user:pass@host:port"}'
```

**Response:** `{ "status": "success" }`

#### Like Tweet V2
`POST /twitter/tweet/like`

| Body Field | Required | Description |
|------------|----------|-------------|
| `login_cookies` | Yes | From login endpoint |
| `tweet_id` | Yes | Tweet ID to like |
| `proxy` | Yes | Proxy URL |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/tweet/like' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"login_cookies":"COOKIES","tweet_id":"1234567890","proxy":"http://user:pass@host:port"}'
```

#### Unlike Tweet V2
`POST /twitter/tweet/unlike`

Same body as Like Tweet V2.

```bash
curl -X POST 'https://api.twitterapi.io/twitter/tweet/unlike' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"login_cookies":"COOKIES","tweet_id":"1234567890","proxy":"http://user:pass@host:port"}'
```

#### Retweet Tweet V2
`POST /twitter/tweet/retweet`

| Body Field | Required | Description |
|------------|----------|-------------|
| `login_cookies` | Yes | From login endpoint |
| `tweet_id` | Yes | Tweet ID to retweet |
| `proxy` | Yes | Proxy URL |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/tweet/retweet' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"login_cookies":"COOKIES","tweet_id":"1234567890","proxy":"http://user:pass@host:port"}'
```

#### Upload Media V2
`POST /twitter/tweet/upload_media`

**Content-Type: multipart/form-data** (not JSON!)

| Form Field | Required | Description |
|------------|----------|-------------|
| `file` | Yes | Media file (image, video) |
| `login_cookies` | Yes | From login endpoint |
| `proxy` | Yes | Proxy URL |
| `is_long_video` | No | `true` for videos >2:20 (Premium only) |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/tweet/upload_media' \
  -H 'x-api-key: YOUR_KEY' \
  -F 'file=@image.jpg' \
  -F 'login_cookies=COOKIES' \
  -F 'proxy=http://user:pass@host:port'
```

**Response:** `{ "status": "success", "media_id": "1234567890" }`

Use `media_id` in `create_tweet_v2`'s `media_ids` array.

---

### Account Actions (Write — require login)

#### Follow User V2
`POST /twitter/user/follow`

| Body Field | Required | Description |
|------------|----------|-------------|
| `login_cookies` | Yes | From login endpoint |
| `user_id` | Yes | User ID to follow (not username — get ID from user lookup first) |
| `proxy` | Yes | Proxy URL |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/user/follow' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"login_cookies":"COOKIES","user_id":"44196397","proxy":"http://user:pass@host:port"}'
```

#### Unfollow User V2
`POST /twitter/user/unfollow`

Same body as Follow User V2.

```bash
curl -X POST 'https://api.twitterapi.io/twitter/user/unfollow' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"login_cookies":"COOKIES","user_id":"44196397","proxy":"http://user:pass@host:port"}'
```

---

### Direct Messages (Write — require login)

#### Send DM V2
`POST /twitter/dm/send`

⚠️ Only works if recipient has DMs enabled (`canDm: true` in user profile). May fail intermittently — retry on failure.

| Body Field | Required | Description |
|------------|----------|-------------|
| `login_cookies` | Yes | From login endpoint |
| `user_id` | Yes | Recipient user ID |
| `text` | Yes | Message text |
| `proxy` | Yes | Proxy URL |
| `media_ids` | No | Array of media IDs |
| `reply_to_message_id` | No | Message ID to reply to |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/dm/send' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"login_cookies":"COOKIES","user_id":"44196397","text":"Hello!","proxy":"http://user:pass@host:port"}'
```

**Response:** `{ "status": "success", "message_id": "1234567890" }`

#### Get DM History
`GET /twitter/dm/history`

| Param | Required | Description |
|-------|----------|-------------|
| `login_cookies` | Yes | Login cookies |
| `user_id` | Yes | User ID to get DM history with |

```bash
curl 'https://api.twitterapi.io/twitter/dm/history?login_cookies=COOKIES&user_id=44196397' \
  -H 'x-api-key: YOUR_KEY'
```

---

### Profile Management (Write — require login)

#### Update Profile V2
`PATCH /twitter/user/update_profile`

| Body Field | Required | Description |
|------------|----------|-------------|
| `login_cookies` | Yes | From login endpoint |
| `proxy` | Yes | Proxy URL |
| `name` | No | Display name (max 50 chars) |
| `description` | No | Bio (max 160 chars) |
| `location` | No | Location (max 30 chars) |
| `url` | No | Website URL |

```bash
curl -X PATCH 'https://api.twitterapi.io/twitter/user/update_profile' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"login_cookies":"COOKIES","proxy":"http://user:pass@host:port","name":"New Name","description":"New bio"}'
```

**Response:** `{ "status": "success", "message": "Profile updated successfully" }`

#### Update Avatar V2
`PATCH /twitter/user/update_avatar`

**Content-Type: multipart/form-data**

| Form Field | Required | Description |
|------------|----------|-------------|
| `file` | Yes | Image file for avatar |
| `login_cookies` | Yes | From login endpoint |
| `proxy` | Yes | Proxy URL |

```bash
curl -X PATCH 'https://api.twitterapi.io/twitter/user/update_avatar' \
  -H 'x-api-key: YOUR_KEY' \
  -F 'file=@avatar.jpg' \
  -F 'login_cookies=COOKIES' \
  -F 'proxy=http://user:pass@host:port'
```

#### Update Banner V2
`PATCH /twitter/user/update_banner`

Same format as Update Avatar V2.

```bash
curl -X PATCH 'https://api.twitterapi.io/twitter/user/update_banner' \
  -H 'x-api-key: YOUR_KEY' \
  -F 'file=@banner.jpg' \
  -F 'login_cookies=COOKIES' \
  -F 'proxy=http://user:pass@host:port'
```

---

### Lists

#### Get List Members
`GET /twitter/list/members`

| Param | Required | Description |
|-------|----------|-------------|
| `list_id` | Yes | Twitter list ID |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/list/members?list_id=1234567890' \
  -H 'x-api-key: YOUR_KEY'
```

**Response:** `{ "members": [User, ...], "has_next_page": true, "next_cursor": "..." }`

#### Get List Followers
`GET /twitter/list/followers`

| Param | Required | Description |
|-------|----------|-------------|
| `list_id` | Yes | Twitter list ID |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/list/followers?list_id=1234567890' \
  -H 'x-api-key: YOUR_KEY'
```

---

### Spaces

#### Get Space Detail
`GET /twitter/space/detail`

| Param | Required | Description |
|-------|----------|-------------|
| `spaceId` | Yes | Twitter Space ID |

```bash
curl 'https://api.twitterapi.io/twitter/space/detail?spaceId=1234567890' \
  -H 'x-api-key: YOUR_KEY'
```

---

### Communities (Write actions require login)

#### Create Community V2
`POST /twitter/community/create`

| Body Field | Required | Description |
|------------|----------|-------------|
| `login_cookies` | Yes | From login endpoint |
| `proxy` | Yes | Proxy URL |
| `name` | Yes | Community name |
| `description` | No | Community description |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/community/create' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"login_cookies":"COOKIES","proxy":"http://user:pass@host:port","name":"My Community"}'
```

#### Delete Community V2
`POST /twitter/community/delete`

| Body Field | Required | Description |
|------------|----------|-------------|
| `login_cookies` | Yes | From login endpoint |
| `proxy` | Yes | Proxy URL |
| `community_id` | Yes | Community ID |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/community/delete' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"login_cookies":"COOKIES","proxy":"http://user:pass@host:port","community_id":"1234567890"}'
```

#### Join Community V2
`POST /twitter/community/join`

Same body pattern (login_cookies, proxy, community_id).

#### Leave Community V2
`POST /twitter/community/leave`

Same body pattern (login_cookies, proxy, community_id).

#### Get Community By ID
`GET /twitter/community/info`

| Param | Required | Description |
|-------|----------|-------------|
| `community_id` | Yes | Community ID |

```bash
curl 'https://api.twitterapi.io/twitter/community/info?community_id=1234567890' \
  -H 'x-api-key: YOUR_KEY'
```

#### Get Community Tweets
`GET /twitter/community/tweets`

| Param | Required | Description |
|-------|----------|-------------|
| `community_id` | Yes | Community ID |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/community/tweets?community_id=1234567890' \
  -H 'x-api-key: YOUR_KEY'
```

#### Get All Community Tweets
`GET /twitter/community/tweets/all`

Same params as Get Community Tweets. Returns tweets from all communities.

#### Get Community Members
`GET /twitter/community/members`

| Param | Required | Description |
|-------|----------|-------------|
| `community_id` | Yes | Community ID |
| `cursor` | No | Pagination cursor |

```bash
curl 'https://api.twitterapi.io/twitter/community/members?community_id=1234567890' \
  -H 'x-api-key: YOUR_KEY'
```

#### Get Community Moderators
`GET /twitter/community/moderators`

| Param | Required | Description |
|-------|----------|-------------|
| `community_id` | Yes | Community ID |

```bash
curl 'https://api.twitterapi.io/twitter/community/moderators?community_id=1234567890' \
  -H 'x-api-key: YOUR_KEY'
```

---

### Webhooks

#### Add Webhook Rule
`POST /twitter/webhook/rule/add`

| Body Field | Required | Description |
|------------|----------|-------------|
| `query` | Yes | Twitter search query to monitor |
| `webhook_url` | Yes | URL to receive webhook events |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/webhook/rule/add' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"query":"from:elonmusk","webhook_url":"https://your-server.com/webhook"}'
```

#### Update Webhook Rule
`POST /twitter/webhook/rule/update`

| Body Field | Required | Description |
|------------|----------|-------------|
| `rule_id` | Yes | Rule ID to update |
| `query` | No | New query |
| `webhook_url` | No | New webhook URL |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/webhook/rule/update' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"rule_id":"RULE_ID","query":"from:elonmusk lang:en"}'
```

#### Delete Webhook Rule
`POST /twitter/webhook/rule/delete`

| Body Field | Required | Description |
|------------|----------|-------------|
| `rule_id` | Yes | Rule ID to delete |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/webhook/rule/delete' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"rule_id":"RULE_ID"}'
```

#### Get Webhook Rules
`GET /twitter/webhook/rules`

List all your webhook rules.

```bash
curl 'https://api.twitterapi.io/twitter/webhook/rules' \
  -H 'x-api-key: YOUR_KEY'
```

---

### Tweet Monitoring

#### Add User to Monitor
`POST /twitter/tweet/monitor/add`

Monitor a user's tweets in real-time via webhook.

| Body Field | Required | Description |
|------------|----------|-------------|
| `user_id` | Yes | Twitter user ID to monitor |
| `webhook_url` | Yes | URL to receive events |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/tweet/monitor/add' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"user_id":"44196397","webhook_url":"https://your-server.com/webhook"}'
```

#### Remove User from Monitor
`POST /twitter/tweet/monitor/remove`

| Body Field | Required | Description |
|------------|----------|-------------|
| `user_id` | Yes | User ID to stop monitoring |

```bash
curl -X POST 'https://api.twitterapi.io/twitter/tweet/monitor/remove' \
  -H 'x-api-key: YOUR_KEY' -H 'Content-Type: application/json' \
  -d '{"user_id":"44196397"}'
```

#### Get Monitored Users
`GET /twitter/tweet/monitor/list`

List all users you're monitoring.

```bash
curl 'https://api.twitterapi.io/twitter/tweet/monitor/list' \
  -H 'x-api-key: YOUR_KEY'
```

---

## Common Workflows

### Post a tweet with image
```
1. POST /twitter/user_login_v2 → get login_cookies
2. POST /twitter/tweet/upload_media → get media_id
3. POST /twitter/tweet → { login_cookies, tweet_text, media_ids: [media_id], proxy }
```

### Quote tweet
```
1. POST /twitter/tweet → { login_cookies, tweet_text: "My comment", attachment_url: "https://x.com/user/status/TWEET_ID", proxy }
```

### Reply to a tweet
```
1. POST /twitter/tweet → { login_cookies, tweet_text: "My reply", reply_to_tweet_id: "TWEET_ID", proxy }
```

### Search and like top tweets
```
1. GET /twitter/tweet/advanced_search?query=bitcoin&queryType=Latest → get tweet IDs
2. POST /twitter/tweet/like → { login_cookies, tweet_id, proxy } (for each tweet)
```

### Follow users who tweet about a topic
```
1. GET /twitter/tweet/advanced_search?query=bitcoin → get author IDs from tweets
2. GET /twitter/user/info?userName=AUTHOR → get user_id
3. POST /twitter/user/follow → { login_cookies, user_id, proxy }
```

### Re-login on auth failure
```
If any write endpoint returns { "status": "error" } with auth-related message:
1. POST /twitter/user_login_v2 → get fresh login_cookies
2. Retry the failed request with new cookies
```

---

## Notes

- **Proxy is required** for all write actions. Use residential proxies for best reliability. Always use the same proxy for login and subsequent actions.
- **2FA is strongly recommended** for login. Without it, cookies may be unreliable.
- **`is_note_tweet: false`** should always be sent explicitly when posting normal tweets. Omitting it may cause errors.
- **Response body `null`** on some write endpoints (like retweet) with HTTP 200 = success.
- **Search operators** only work with `queryType=Latest`. Operators include: `from:`, `to:`, `lang:`, `min_faves:`, `min_retweets:`, `since:`, `until:`, `-filter:replies`, `filter:links`, etc.
- **Community endpoints** use `login_cookies` (plural), same as all other v2 endpoints.
- **Rate limits** are global per API key. Spread requests across time to avoid 429 errors.
- **Minimum charge** of $0.00015 applies even to requests that return no data.

---

*Source: [docs.twitterapi.io](https://docs.twitterapi.io) — Last verified: February 2026*
