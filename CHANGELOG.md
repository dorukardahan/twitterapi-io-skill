# Changelog

All notable changes to this skill will be documented in this file.

## [3.5.0] - 2026-03-16

### Added
- `GET /twitter/list/tweets` endpoint — list tweets with sinceTime/untilTime filtering and includeReplies param (different from tweets_timeline)
- `GET /twitter/get_dm_history_by_user_id` endpoint — DM conversation history (requires login_cookies)
- `POST /twitter/list/add_member` endpoint — add member to list (uses auth_session/V1 auth, $0.001/call)
- `POST /twitter/list/remove_member` endpoint — remove member from list (uses auth_session/V1 auth, $0.001/call)

### Changed
- Total endpoint count: 54 → 58
- Read endpoints: 31 → 33, Write endpoints: 17 → 19

### Notes
- 7 new V3 endpoints detected in OpenAPI (user_login_v3, send_tweet_v3, like_tweet_v3, retweet_v3, update_profile_v3, get_my_x_account_detail_v3, delete_my_x_account_v3). V3 uses async username-based auth instead of login_cookies. Not yet added to skill — monitoring for stability.
- V1 legacy endpoints (create_tweet, like_tweet, retweet_tweet, login_by_email_or_username, login_by_2fa, upload_image) still present in OpenAPI but remain excluded (deprecated in favor of V2).

## [3.4.2] - 2026-03-16

### Fixed
- `get_user_timeline`: added missing `includeReplies` and `includeParentTweet` parameters (from OpenAPI spec)

## [3.4.1] - 2026-03-16

### Fixed
- `get_user_mentions`: corrected parameter from `userId` to `userName` (matches live API docs), added `sinceTime`/`untilTime` params, updated curl example
- `get_user_last_tweets`: added missing `includeReplies` (boolean) and `userId` (alternative) parameters
- `get_user_followers`: added missing `pageSize` (integer) parameter
- `get_user_followings`: added missing `pageSize` (integer) parameter
- SKILL.md common workflows: removed incorrect "mentions" from user ID lookup requirement (mentions uses userName directly)
- SKILL.md pricing table: added community info endpoint cost (20 credits)

## [3.4.0] - 2026-03-15

### Added
- `list_timeline` endpoint (GET /twitter/list/tweets_timeline)
- `get_user_timeline` endpoint (GET /twitter/user/tweet_timeline)

### Removed
- 6 deprecated V1 endpoints (create_tweet, like_tweet, retweet_tweet, login_by_email_or_username, login_by_2fa, upload_tweet_image)
- `get_dm_history_by_user_id` (removed from live API docs)
- `references/deprecated-v1.md` file
- V1 vs V2 comparison table from SKILL.md

### Changed
- Total endpoints: 59 → 54 (31 READ + 17 WRITE + 6 WEBHOOK/STREAM)
- Replaced V1/V2 comparison with single API version note

## [3.3.0] - 2026-03-08

### Added
- Platform advisory: Twitter search operator changes (since:/until: disabled)
- Workarounds: `since_time:UNIX` / `until_time:UNIX` format
- `within_time:Nh` relative time filter documentation

## [3.2.0] - 2026-02-21

### Changed
- Version bump to align with MCP server v1.0.22

## [3.1.0] - 2026-02-12

### Changed
- Comprehensive rewrite for LLM usability
- 4-model pipeline validation
- Live-scraped endpoint documentation

## [3.0.0] - 2026-02-12

### Changed
- Complete rewrite — new structure with references/ directory
- Split endpoints into read, write, webhook-stream categories
- Added pricing table, QPS limits, response schemas
