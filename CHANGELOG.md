# Changelog

## 3.8.1

- fix: sync endpoint category counts to 67 active endpoints (31 read, 28 write, 8 webhook/stream)
- docs: add missing curl examples for legacy and bookmark endpoints

All notable changes to this skill will be documented in this file.

## [3.8.0] - 2026-04-10

### Added
- Added 9 active OpenAPI endpoints previously missing from the skill: `bookmark_tweet_v2`, `bookmarks_v2`, `unbookmark_tweet_v2`, `login_by_email_or_username`, `login_by_2fa`, `upload_image`, `create_tweet`, `like_tweet`, `retweet_tweet`

### Changed
- Total endpoint count: 58 → 67

## [3.7.2] - 2026-03-22

### Fixed
- Removed outdated "not in the official OpenAPI spec" notes from `tweet_timeline` and `tweets_timeline` — both are now in the live OpenAPI spec
- Updated endpoint-index.md header note: corrected total OpenAPI path count from 70 to 72

## [3.7.1] - 2026-03-21

### Fixed
- SKILL.md: read endpoint count corrected from 34 to 33
- Added missing curl example for `/oapi/my/info` in read-endpoints.md
- Added curl examples for `join_community_v2` and `leave_community_v2`
- `delete_rule`: `rule_id` marked as required (was incorrectly "optional")
- `spaces/detail`: `space_id` marked as required (was incorrectly "optional")
- `list/add_member` and `list/remove_member`: added note about V1 `auth_session` auth with no V2 alternative
- `remove_user_to_monitor_tweet`: added note about confusing `_to_` in path name
- `get_dm_history_by_user_id`: added credential exposure warning (login_cookies in GET query param)

## [3.7.0] - 2026-03-21

### Removed
- Removed all V3 endpoints (offline, confirmed by TwitterAPI.io team). V3 was taken down due to Twitter actively blocking third-party posting. Recommend official Twitter API for write-heavy use cases.

## [3.6.0] - 2026-03-20

### Changed
- Documentation refresh before the March 2026 write-path rollback.

## [3.5.3] - 2026-03-17

### Fixed
- `tweet/quotes`: added missing `sinceTime`, `untilTime`, `includeReplies` params (from OpenAPI spec)
- `user/search`: added missing `cursor` param
- `send_dm_to_user`: corrected body param from `receiver_id` to `user_id`, added `media_ids` and `reply_to_message_id` params
- `create_community_v2`: added missing required `description` param
- `delete_community_v2`: corrected to use `login_cookie` (singular) per OpenAPI, added missing `community_name` param
- `remove_user_to_monitor_tweet`: corrected body param from `x_user_name` to `id_for_user` (ID from get_user_to_monitor_tweet response)
- SKILL.md title version now matches frontmatter version

## [3.5.4] - 2026-03-17

### Fixed (audit-driven, 3 independent auditors: Opus + Codex + Kimi)
- REVERTED fabricated fix: `delete_community_v2` back to `login_cookies` (plural) — cron had incorrectly changed to `login_cookie` singular
- `list/followers` and `list/members`: param name `listId` → `list_id` (matches OpenAPI spec)
- `tweet/advanced_search`: `queryType` marked as required (was incorrectly shown as optional)
- `user/tweet_timeline`: `userId` marked as optional (was incorrectly shown as required)
- `user/search`: `query` marked as optional (per OpenAPI spec)
- `check_follow_relationship`: added params line, `target_user_name` marked as optional
- `spaces/detail`: added params line, `space_id` marked as optional
- `update_rule`: `is_effect` corrected to optional integer (0/1), was shown as required boolean
- `delete_rule`: `rule_id` corrected to optional

## [3.5.2] - 2026-03-17

### Fixed
- `update_avatar_v2` and `update_banner_v2`: corrected from JSON `image_url` to `multipart/form-data` binary `file` upload (matches OpenAPI spec)
- `update_profile_v2`: added missing `url` parameter, added char limits for all fields
- `update_profile_v2`: documented known backend bug (`output.buffer.transfer is not a function`) — twitterapi.io server-side issue, no client-side fix

## [3.5.1] - 2026-03-17

### Fixed
- Community read endpoints: corrected param name from `communityId` to `community_id` (matches OpenAPI spec) in all 5 community GET endpoints
- `get_tweets_from_all_community`: added missing required params `query` and `queryType` (was documented as cursor-only, but actually requires a search query)
- Endpoint index: added note about 6 V1 legacy endpoints still in OpenAPI (excluded from skill, deprecated in favor of V2)

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
