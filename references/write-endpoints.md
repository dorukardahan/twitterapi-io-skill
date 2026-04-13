# WRITE Endpoints V2

All v2 write endpoints require:
1. **login_cookies** -- from `POST /twitter/user_login_v2`
2. **proxy** -- residential proxy URL: `http://user:pass@host:port`

## Authentication

**Login V2** `POST /twitter/user_login_v2` (300 credits)
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/user_login_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "user_name": "USERNAME",
    "email": "EMAIL",
    "password": "PASSWORD",
    "proxy": "http://user:pass@host:port",
    "totp_secret": "2FA_SECRET_16CHAR"
  }'
```
Response: `{ "login_cookie": "...", "status": "success", "msg": "..." }`

Important:
- `totp_secret` must be a **16-character string** (not numbers). Without it, login may succeed but the cookie will be faulty, causing 400 errors on all v2 action endpoints.
- Cookie stays valid indefinitely with residential proxies + good-standing account.
- Response field is `login_cookie` (singular) but use `login_cookies` (plural) in action requests.

## Tweet Actions

**Create Tweet** `POST /twitter/create_tweet_v2` (300 credits)
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/create_tweet_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "login_cookies": "COOKIE",
    "tweet_text": "Hello world!",
    "proxy": "http://user:pass@host:port"
  }'
```
Optional: `reply_to_tweet_id`, `attachment_url` (quote tweet URL), `community_id`, `is_note_tweet` (Premium only, >280 chars), `media_ids` (array)
Response: `{ "tweet_id": "1234...", "status": "success", "msg": "..." }`

**Delete Tweet** `POST /twitter/delete_tweet_v2` (200 credits)
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/delete_tweet_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "tweet_id": "ID", "proxy": "PROXY" }'
```

**Like Tweet** `POST /twitter/like_tweet_v2` (200 credits)
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/like_tweet_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "tweet_id": "ID", "proxy": "PROXY" }'
```

**Unlike Tweet** `POST /twitter/unlike_tweet_v2` (200 credits)
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/unlike_tweet_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "tweet_id": "ID", "proxy": "PROXY" }'
```

**Retweet** `POST /twitter/retweet_tweet_v2` (200 credits)
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/retweet_tweet_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "tweet_id": "ID", "proxy": "PROXY" }'
```

## User Actions

**Follow User** `POST /twitter/follow_user_v2` (200 credits)
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/follow_user_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "user_id": "NUMERIC_USER_ID", "proxy": "PROXY" }'
```
Needs numeric `user_id`. Get from `GET /twitter/user/info` first.

**Unfollow User** `POST /twitter/unfollow_user_v2` (200 credits)
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/unfollow_user_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "user_id": "NUMERIC_USER_ID", "proxy": "PROXY" }'
```

## List Actions

**Add Member to List** `POST /twitter/list/add_member`
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/list/add_member" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "auth_session": "SESSION",
    "list_id": "LIST_ID",
    "user_name": "USERNAME",
    "proxy": "http://user:pass@host:port"
  }'
```
Body: `auth_session` (required, from login_by_2fa), `list_id` (required), `user_id` OR `user_name` (at least one required), `proxy` (required)
Note: Uses `auth_session` (V1 login flow via `login_by_2fa`), not `login_cookies` (V2). No V2 alternative exists for list member management. Cost: $0.001/call.

**Remove Member from List** `POST /twitter/list/remove_member`
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/list/remove_member" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "auth_session": "SESSION",
    "list_id": "LIST_ID",
    "user_name": "USERNAME",
    "proxy": "http://user:pass@host:port"
  }'
```
Body: `auth_session` (required), `list_id` (required), `user_id` OR `user_name` (at least one required), `proxy` (required)
Note: Uses `auth_session` (V1 login flow via `login_by_2fa`), not `login_cookies` (V2). No V2 alternative exists for list member management. Cost: $0.001/call.

## DM Actions

**Send DM** `POST /twitter/send_dm_to_user` (300 credits)
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/send_dm_to_user" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "user_id": "USER_ID", "text": "Hello!", "proxy": "PROXY" }'
```
Optional: `media_ids` (array), `reply_to_message_id` (string, for threaded replies)
Note: Body param is `user_id` (not `receiver_id`). Can only DM users who have DMs enabled. May fail intermittently -- retry on failure.

## Media

**Upload Media** `POST /twitter/upload_media_v2` (300 credits) -- **multipart/form-data**, not JSON!
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/upload_media_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -F "file=@/path/to/image.jpg" \
  -F "login_cookies=COOKIE" \
  -F "proxy=PROXY"
```
Optional: `is_long_video` (boolean, Premium only -- videos >2:20)
Returns: `{ "media_id": "...", "status": "success" }` -- use in `create_tweet_v2`'s `media_ids` array.

## Profile Updates (PATCH)

**Update Avatar** `PATCH /twitter/update_avatar_v2` (300 credits) -- **multipart/form-data**, not JSON!
```bash
curl -s -X PATCH "https://api.twitterapi.io/twitter/update_avatar_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -F "file=@/path/to/avatar.jpg" \
  -F "login_cookies=COOKIE" \
  -F "proxy=PROXY"
```
Image: JPG/PNG, 400x400px recommended, max 700KB. Uses binary file upload (not URL).

**Update Banner** `PATCH /twitter/update_banner_v2` (300 credits) -- **multipart/form-data**, not JSON!
```bash
curl -s -X PATCH "https://api.twitterapi.io/twitter/update_banner_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -F "file=@/path/to/banner.jpg" \
  -F "login_cookies=COOKIE" \
  -F "proxy=PROXY"
```
Image: JPG/PNG, 1500x500px recommended, max 2MB. Uses binary file upload (not URL).

**Update Profile** `PATCH /twitter/update_profile_v2` (300 credits)
```bash
curl -s -X PATCH "https://api.twitterapi.io/twitter/update_profile_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "login_cookies": "COOKIE",
    "name": "Display Name",
    "description": "Bio text (max 160 chars)",
    "location": "City (max 30 chars)",
    "url": "https://example.com",
    "proxy": "PROXY"
  }'
```
Optional fields: `name` (max 50 chars), `description` (max 160 chars), `location` (max 30 chars), `url` (website).

> **⚠️ KNOWN BUG (2026-03-17):** `update_profile_v2` returns `"output.buffer.transfer is not a function"` for all requests. This is a **twitterapi.io backend bug** (Node.js `Buffer.transfer()` API issue on their server). No client-side fix possible.

## Community Actions (POST, v2)

**Create Community** `POST /twitter/create_community_v2` (300 credits)
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/create_community_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "name": "My Community", "description": "Community description", "proxy": "PROXY" }'
```
Body: `login_cookies` (required), `name` (required), `description` (required), `proxy` (required)

**Join Community** `POST /twitter/join_community_v2` (300 credits)
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/join_community_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "community_id": "ID", "proxy": "http://user:pass@host:port" }'
```
Body: `login_cookies` (required), `community_id` (required), `proxy` (required)

**Leave Community** `POST /twitter/leave_community_v2` (300 credits)
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/leave_community_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "community_id": "ID", "proxy": "http://user:pass@host:port" }'
```
Body: `login_cookies` (required), `community_id` (required), `proxy` (required)

**Delete Community** `POST /twitter/delete_community_v2` (300 credits)
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/delete_community_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "community_id": "ID", "community_name": "NAME", "proxy": "http://user:pass@host:port" }'
```
Body: `login_cookies` (required), `community_id` (required), `community_name` (required), `proxy` (required)


## Legacy Auth + Write Paths (still active in OpenAPI)

**Login by Email or Username** `POST /twitter/login_by_email_or_username`
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/login_by_email_or_username"   -H "X-API-Key: $TWITTERAPI_IO_KEY"   -H "Content-Type: application/json"   -d '{ "username_or_email": "USERNAME_OR_EMAIL", "password": "PASSWORD", "proxy": "PROXY" }'
```
Body: `username_or_email` (required), `password` (required), `proxy` (required)

**Login by 2FA** `POST /twitter/login_by_2fa`
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/login_by_2fa"   -H "X-API-Key: $TWITTERAPI_IO_KEY"   -H "Content-Type: application/json"   -d '{ "login_data": "LOGIN_DATA", "2fa_code": "123456", "proxy": "PROXY" }'
```
Body: `login_data` (required), `2fa_code` (required), `proxy` (required)

**Create Tweet (legacy)** `POST /twitter/create_tweet`
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/create_tweet" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "auth_session": "SESSION", "tweet_text": "Hello", "proxy": "PROXY" }'
```
Body: `auth_session` (required), `tweet_text` (required), `proxy` (required). Optional: `quote_tweet_id`, `in_reply_to_tweet_id`, `media_id`.

**Like Tweet (legacy)** `POST /twitter/like_tweet`
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/like_tweet" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "auth_session": "SESSION", "tweet_id": "ID", "proxy": "PROXY" }'
```
Body: `auth_session` (required), `tweet_id` (required), `proxy` (required)

**Retweet (legacy)** `POST /twitter/retweet_tweet`
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/retweet_tweet" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "auth_session": "SESSION", "tweet_id": "ID", "proxy": "PROXY" }'
```
Body: `auth_session` (required), `tweet_id` (required), `proxy` (required)

**Upload Image (legacy)** `POST /twitter/upload_image`
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/upload_image" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "auth_session": "SESSION", "list_id": "LIST_ID", "proxy": "PROXY", "image_url": "https://example.com/image.jpg" }'
```
Body in OpenAPI currently marks `auth_session`, `list_id`, `proxy` as required and also exposes optional `image_url`. This appears inconsistent, so use the spec literally.

**Get Bookmarks** `POST /twitter/bookmarks_v2`
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/bookmarks_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "proxy": "PROXY", "count": 20 }'
```
Body: `login_cookies` (required), `proxy` (required), optional `count`, `cursor`

**Bookmark Tweet** `POST /twitter/bookmark_tweet_v2`
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/bookmark_tweet_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "tweet_id": "ID", "proxy": "PROXY" }'
```
Body: `login_cookies` (required), `tweet_id` (required), `proxy` (required)

**Unbookmark Tweet** `POST /twitter/unbookmark_tweet_v2`
```bash
curl -s -X POST "https://api.twitterapi.io/twitter/unbookmark_tweet_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "login_cookies": "COOKIE", "tweet_id": "ID", "proxy": "PROXY" }'
```
Body: `login_cookies` (required), `tweet_id` (required), `proxy` (required)
