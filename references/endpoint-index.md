# Endpoint Index (67 active endpoints)

Note: OpenAPI spec contains 75 total paths. Excluded from this skill: 7 V3 (offline), 1 non-Twitter (`/plants`).

## READ (31 endpoints)
| # | Method | Path | Category |
|---|--------|------|----------|
| 1 | GET | `/twitter/article` | tweet |
| 2 | GET | `/twitter/community/get_tweets_from_all_community` | community |
| 3 | GET | `/twitter/community/info` | community |
| 4 | GET | `/twitter/community/members` | community |
| 5 | GET | `/twitter/community/moderators` | community |
| 6 | GET | `/twitter/community/tweets` | community |
| 7 | GET | `/twitter/get_dm_history_by_user_id` | dm |
| 8 | GET | `/twitter/list/followers` | list |
| 9 | GET | `/twitter/list/members` | list |
| 10 | GET | `/twitter/list/tweets` | list |
| 11 | GET | `/twitter/list/tweets_timeline` | list |
| 12 | GET | `/twitter/spaces/detail` | other |
| 13 | GET | `/twitter/trends` | trend |
| 14 | GET | `/twitter/tweet/advanced_search` | tweet |
| 15 | GET | `/twitter/tweet/quotes` | tweet |
| 16 | GET | `/twitter/tweet/replies` | tweet |
| 17 | GET | `/twitter/tweet/replies/v2` | tweet |
| 18 | GET | `/twitter/tweet/retweeters` | tweet |
| 19 | GET | `/twitter/tweet/thread_context` | tweet |
| 20 | GET | `/twitter/tweets` | tweet |
| 21 | GET | `/twitter/user/batch_info_by_ids` | user |
| 22 | GET | `/twitter/user/check_follow_relationship` | user |
| 23 | GET | `/twitter/user/followers` | user |
| 24 | GET | `/twitter/user/followings` | user |
| 25 | GET | `/twitter/user/info` | user |
| 26 | GET | `/twitter/user/last_tweets` | user |
| 27 | GET | `/twitter/user/mentions` | user |
| 28 | GET | `/twitter/user/search` | user |
| 29 | GET | `/twitter/user/tweet_timeline` | user |
| 30 | GET | `/twitter/user/verifiedFollowers` | user |
| 31 | GET | `/twitter/user_about` | other |

## WRITE (28 endpoints)
| # | Method | Path | Category |
|---|--------|------|----------|
| 32 | POST | `/twitter/bookmark_tweet_v2` | action |
| 33 | POST | `/twitter/bookmarks_v2` | action |
| 34 | POST | `/twitter/create_community_v2` | community |
| 35 | POST | `/twitter/create_tweet` | action |
| 36 | POST | `/twitter/create_tweet_v2` | action |
| 37 | POST | `/twitter/delete_community_v2` | community |
| 38 | POST | `/twitter/delete_tweet_v2` | action |
| 39 | POST | `/twitter/follow_user_v2` | action |
| 40 | POST | `/twitter/join_community_v2` | community |
| 41 | POST | `/twitter/leave_community_v2` | community |
| 42 | POST | `/twitter/like_tweet` | action |
| 43 | POST | `/twitter/like_tweet_v2` | action |
| 44 | POST | `/twitter/list/add_member` | list |
| 45 | POST | `/twitter/list/remove_member` | list |
| 46 | POST | `/twitter/login_by_2fa` | action |
| 47 | POST | `/twitter/login_by_email_or_username` | action |
| 48 | POST | `/twitter/retweet_tweet` | action |
| 49 | POST | `/twitter/retweet_tweet_v2` | action |
| 50 | POST | `/twitter/send_dm_to_user` | dm |
| 51 | POST | `/twitter/unbookmark_tweet_v2` | action |
| 52 | POST | `/twitter/unfollow_user_v2` | action |
| 53 | POST | `/twitter/unlike_tweet_v2` | action |
| 54 | PATCH | `/twitter/update_avatar_v2` | action |
| 55 | PATCH | `/twitter/update_banner_v2` | action |
| 56 | PATCH | `/twitter/update_profile_v2` | action |
| 57 | POST | `/twitter/upload_image` | action |
| 58 | POST | `/twitter/upload_media_v2` | action |
| 59 | POST | `/twitter/user_login_v2` | action |

## WEBHOOK + STREAM (8 endpoints)
| # | Method | Path | Category |
|---|--------|------|----------|
| 60 | GET | `/oapi/my/info` | other |
| 61 | POST | `/oapi/tweet_filter/add_rule` | webhook |
| 62 | DELETE | `/oapi/tweet_filter/delete_rule` | webhook |
| 63 | GET | `/oapi/tweet_filter/get_rules` | webhook |
| 64 | POST | `/oapi/tweet_filter/update_rule` | webhook |
| 65 | POST | `/oapi/x_user_stream/add_user_to_monitor_tweet` | stream |
| 66 | GET | `/oapi/x_user_stream/get_user_to_monitor_tweet` | stream |
| 67 | POST | `/oapi/x_user_stream/remove_user_to_monitor_tweet` | stream |
