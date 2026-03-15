# Changelog

All notable changes to this skill will be documented in this file.

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
