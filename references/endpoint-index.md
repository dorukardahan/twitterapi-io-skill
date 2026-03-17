# Endpoint Index (58 active + 6 V1 legacy = 64 total in OpenAPI)

Note: 6 V1 legacy endpoints exist in OpenAPI but are excluded from this skill (deprecated, use V2 instead): `create_tweet`, `like_tweet`, `retweet_tweet`, `upload_image`, `login_by_email_or_username`, `login_by_2fa`.

## READ (33 endpoints)
| # | Method | Path | Category |
|---|--------|------|----------|
| 1 | GET | `/twitter/tweet/advanced_search` | tweet |
| 2 | GET | `/twitter/tweets` | tweet |
| 3 | GET | `/twitter/tweet/replies` | tweet |
| 4 | GET | `/twitter/tweet/replies/v2` | tweet |
| 5 | GET | `/twitter/tweet/quotes` | tweet |
| 6 | GET | `/twitter/tweet/retweeters` | tweet |
| 7 | GET | `/twitter/tweet/thread_context` | tweet |
| 8 | GET | `/twitter/article` | tweet |
| 9 | GET | `/twitter/user/info` | user |
| 10 | GET | `/twitter/user_about` | user |
| 11 | GET | `/twitter/user/batch_info_by_ids` | user |
| 12 | GET | `/twitter/user/last_tweets` | user |
| 13 | GET | `/twitter/user/tweet_timeline` | user |
| 14 | GET | `/twitter/user/followers` | user |
| 15 | GET | `/twitter/user/followings` | user |
| 16 | GET | `/twitter/user/verifiedFollowers` | user |
| 17 | GET | `/twitter/user/mentions` | user |
| 18 | GET | `/twitter/user/search` | user |
| 19 | GET | `/twitter/user/check_follow_relationship` | user |
| 20 | GET | `/twitter/list/followers` | list |
| 21 | GET | `/twitter/list/members` | list |
| 22 | GET | `/twitter/list/tweets` | list |
| 23 | GET | `/twitter/list/tweets_timeline` | list |
| 24 | GET | `/twitter/get_dm_history_by_user_id` | dm |
| 25 | GET | `/twitter/community/info` | community |
| 26 | GET | `/twitter/community/members` | community |
| 27 | GET | `/twitter/community/moderators` | community |
| 28 | GET | `/twitter/community/tweets` | community |
| 29 | GET | `/twitter/community/get_tweets_from_all_community` | community |
| 30 | GET | `/twitter/trends` | trend |
| 31 | GET | `/twitter/spaces/detail` | other |
| 32 | GET | `/oapi/my/info` | account |
| 33 | GET | `/oapi/x_user_stream/get_user_to_monitor_tweet` | stream |

## WRITE V2 (19 endpoints)
| # | Method | Path | Category |
|---|--------|------|----------|
| 34 | POST | `/twitter/user_login_v2` | auth |
| 35 | POST | `/twitter/create_tweet_v2` | action |
| 36 | POST | `/twitter/delete_tweet_v2` | action |
| 37 | POST | `/twitter/like_tweet_v2` | action |
| 38 | POST | `/twitter/unlike_tweet_v2` | action |
| 39 | POST | `/twitter/retweet_tweet_v2` | action |
| 40 | POST | `/twitter/follow_user_v2` | action |
| 41 | POST | `/twitter/unfollow_user_v2` | action |
| 42 | POST | `/twitter/upload_media_v2` | media |
| 43 | PATCH | `/twitter/update_avatar_v2` | profile |
| 44 | PATCH | `/twitter/update_banner_v2` | profile |
| 45 | PATCH | `/twitter/update_profile_v2` | profile |
| 46 | POST | `/twitter/send_dm_to_user` | dm |
| 47 | POST | `/twitter/list/add_member` | list |
| 48 | POST | `/twitter/list/remove_member` | list |
| 49 | POST | `/twitter/create_community_v2` | community |
| 50 | POST | `/twitter/delete_community_v2` | community |
| 51 | POST | `/twitter/join_community_v2` | community |
| 52 | POST | `/twitter/leave_community_v2` | community |

## WEBHOOK + STREAM (6 endpoints)
| # | Method | Path | Category |
|---|--------|------|----------|
| 53 | POST | `/oapi/tweet_filter/add_rule` | webhook |
| 54 | GET | `/oapi/tweet_filter/get_rules` | webhook |
| 55 | POST | `/oapi/tweet_filter/update_rule` | webhook |
| 56 | DELETE | `/oapi/tweet_filter/delete_rule` | webhook |
| 57 | POST | `/oapi/x_user_stream/add_user_to_monitor_tweet` | stream |
| 58 | POST | `/oapi/x_user_stream/remove_user_to_monitor_tweet` | stream |
