# Endpoint Index (67 active endpoints)

Note: OpenAPI spec contains 75 total paths. Excluded from this skill: 7 V3 (offline), 1 non-Twitter (`/plants`).

## READ (31 endpoints)
| # | Method | Path | Category |
|---|--------|------|----------|
| 1 | GET | `/oapi/my/info` | other |
| 2 | GET | `/twitter/article` | tweet |
| 3 | GET | `/twitter/community/get_tweets_from_all_community` | community |
| 4 | GET | `/twitter/community/info` | community |
| 5 | GET | `/twitter/community/members` | community |
| 6 | GET | `/twitter/community/moderators` | community |
| 7 | GET | `/twitter/community/tweets` | community |
| 8 | GET | `/twitter/get_dm_history_by_user_id` | dm |
| 9 | GET | `/twitter/list/followers` | list |
| 10 | GET | `/twitter/list/members` | list |
| 11 | GET | `/twitter/list/tweets` | list |
| 12 | GET | `/twitter/list/tweets_timeline` | list |
| 13 | GET | `/twitter/spaces/detail` | other |
| 14 | GET | `/twitter/trends` | trend |
| 15 | GET | `/twitter/tweet/advanced_search` | tweet |
| 16 | GET | `/twitter/tweet/quotes` | tweet |
| 17 | GET | `/twitter/tweet/replies` | tweet |
| 18 | GET | `/twitter/tweet/replies/v2` | tweet |
| 19 | GET | `/twitter/tweet/retweeters` | tweet |
| 20 | GET | `/twitter/tweet/thread_context` | tweet |
| 21 | GET | `/twitter/tweets` | tweet |
| 22 | GET | `/twitter/user/batch_info_by_ids` | user |
| 23 | GET | `/twitter/user/check_follow_relationship` | user |
| 24 | GET | `/twitter/user/followers` | user |
| 25 | GET | `/twitter/user/followings` | user |
| 26 | GET | `/twitter/user/info` | user |
| 27 | GET | `/twitter/user/last_tweets` | user |
| 28 | GET | `/twitter/user/mentions` | user |
| 29 | GET | `/twitter/user/search` | user |
| 30 | GET | `/twitter/user/tweet_timeline` | user |
| 31 | GET | `/twitter/user/verifiedFollowers` | user |
| 32 | GET | `/twitter/user_about` | other |

## WRITE (28 endpoints)
| # | Method | Path | Category |
|---|--------|------|----------|
| 33 | POST | `/twitter/bookmark_tweet_v2` | action |
| 34 | POST | `/twitter/bookmarks_v2` | action |
| 35 | POST | `/twitter/create_community_v2` | community |
| 36 | POST | `/twitter/create_tweet` | action |
| 37 | POST | `/twitter/create_tweet_v2` | action |
| 38 | POST | `/twitter/delete_community_v2` | community |
| 39 | POST | `/twitter/delete_tweet_v2` | action |
| 40 | POST | `/twitter/follow_user_v2` | action |
| 41 | POST | `/twitter/join_community_v2` | community |
| 42 | POST | `/twitter/leave_community_v2` | community |
| 43 | POST | `/twitter/like_tweet` | action |
| 44 | POST | `/twitter/like_tweet_v2` | action |
| 45 | POST | `/twitter/list/add_member` | list |
| 46 | POST | `/twitter/list/remove_member` | list |
| 47 | POST | `/twitter/login_by_2fa` | action |
| 48 | POST | `/twitter/login_by_email_or_username` | action |
| 49 | POST | `/twitter/retweet_tweet` | action |
| 50 | POST | `/twitter/retweet_tweet_v2` | action |
| 51 | POST | `/twitter/send_dm_to_user` | dm |
| 52 | POST | `/twitter/unbookmark_tweet_v2` | action |
| 53 | POST | `/twitter/unfollow_user_v2` | action |
| 54 | POST | `/twitter/unlike_tweet_v2` | action |
| 55 | PATCH | `/twitter/update_avatar_v2` | action |
| 56 | PATCH | `/twitter/update_banner_v2` | action |
| 57 | PATCH | `/twitter/update_profile_v2` | action |
| 58 | POST | `/twitter/upload_image` | action |
| 59 | POST | `/twitter/upload_media_v2` | action |
| 60 | POST | `/twitter/user_login_v2` | action |

## WEBHOOK + STREAM (8 endpoints)
| # | Method | Path | Category |
|---|--------|------|----------|
| 61 | POST | `/oapi/tweet_filter/add_rule` | webhook |
| 62 | DELETE | `/oapi/tweet_filter/delete_rule` | webhook |
| 63 | GET | `/oapi/tweet_filter/get_rules` | webhook |
| 64 | POST | `/oapi/tweet_filter/update_rule` | webhook |
| 65 | POST | `/oapi/x_user_stream/add_user_to_monitor_tweet` | stream |
| 66 | GET | `/oapi/x_user_stream/get_user_to_monitor_tweet` | stream |
| 67 | POST | `/oapi/x_user_stream/remove_user_to_monitor_tweet` | stream |
