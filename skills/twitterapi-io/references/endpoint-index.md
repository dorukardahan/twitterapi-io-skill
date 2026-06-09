# Public Read Endpoint Index (31 API-key-only endpoints)

This bundled Hermes reference intentionally lists only public/API-key read endpoints. It excludes write/action endpoints, webhook mutations, login/cookie/proxy flows, and cookie-based DM history so agent installs remain read-only by default.

For complete all-endpoints documentation, use the repository root `references/` files for manual/non-agent review.

## Public READ endpoints
| # | Method | Path | Category |
|---|--------|------|----------|
| 1 | GET | `/twitter/article` | tweet |
| 2 | GET | `/twitter/community/get_tweets_from_all_community` | community |
| 3 | GET | `/twitter/community/info` | community |
| 4 | GET | `/twitter/community/members` | community |
| 5 | GET | `/twitter/community/moderators` | community |
| 6 | GET | `/twitter/community/tweets` | community |
| 7 | GET | `/twitter/list/followers` | list |
| 8 | GET | `/twitter/list/members` | list |
| 9 | GET | `/twitter/list/tweets` | list |
| 10 | GET | `/twitter/list/tweets_timeline` | list |
| 11 | GET | `/twitter/spaces/detail` | other |
| 12 | GET | `/twitter/trends` | trend |
| 13 | GET | `/twitter/tweet/advanced_search` | tweet |
| 14 | GET | `/twitter/tweet/quotes` | tweet |
| 15 | GET | `/twitter/tweet/replies` | tweet |
| 16 | GET | `/twitter/tweet/replies/v2` | tweet |
| 17 | GET | `/twitter/tweet/retweeters` | tweet |
| 18 | GET | `/twitter/tweet/thread_context` | tweet |
| 19 | GET | `/twitter/tweets` | tweet |
| 20 | GET | `/twitter/user/batch_info_by_ids` | user |
| 21 | GET | `/twitter/user/check_follow_relationship` | user |
| 22 | GET | `/twitter/user/followers` | user |
| 23 | GET | `/twitter/user/followings` | user |
| 24 | GET | `/twitter/user/info` | user |
| 25 | GET | `/twitter/user/last_tweets` | user |
| 26 | GET | `/twitter/user/mentions` | user |
| 27 | GET | `/twitter/user/search` | user |
| 28 | GET | `/twitter/user/tweet_timeline` | user |
| 29 | GET | `/twitter/user/verifiedFollowers` | user |
| 30 | GET | `/twitter/user/followers_ids` | user |
| 31 | GET | `/twitter/user_about` | other |

## Excluded from the Hermes bundle

- Write/action endpoints: tweet, reply, quote, like, retweet, follow/unfollow, bookmark, media upload, profile update, community mutation.
- Login/cookie/proxy endpoints and fields: `login_cookies`, `auth_token`, `ct0`, password, proxy credentials.
- Cookie-based private DM history endpoint: `/twitter/get_dm_history_by_user_id`.
- Webhook/stream mutation endpoints under `/oapi/`.
