---
name: twitterapi-io
version: 2.1.0
description: >-
  Use Twitter/X API via TwitterAPI.io. 59 endpoints — search, post, like,
  retweet, follow, DM, communities, webhooks, profile management. No Twitter dev account needed.
homepage: https://twitterapi.io
---

# TwitterAPI.io — Twitter/X API for AI

You can use Twitter/X through TwitterAPI.io. This file teaches you how.

## Base URL

`https://api.twitterapi.io`

## Auth

Every request needs the `x-api-key` header:

```
x-api-key: YOUR_TWITTERAPI_KEY
```

Get your key: https://twitterapi.io/dashboard

## Cost

| Operation | Cost |
|-----------|------|
| Read 1 tweet | $0.00015 |
| Read 1 profile | $0.00018 |
| Post tweet | $0.003 |
| Like/unlike | $0.002 |
| Retweet | $0.002 |
| Follow/unfollow | $0.002 |
| Search (per page) | $0.00015 |

## Rate Limits

| Plan | QPS |
|------|-----|
| Free | 1 req/5s |
| $10/mo | 3/s |
| $50/mo | 6/s |
| $100/mo | 10/s |
| $500/mo | 20/s |

## Pagination

List endpoints return:
```json
{ "has_next_page": true, "next_cursor": "abc123" }
```
Pass `cursor=abc123` to get next page.

## Login (required for write actions)

Before posting, liking, retweeting, etc., you need login cookies:

```bash
curl -X POST https://api.twitterapi.io/twitter/user_login_v2 \
  -H "x-api-key: $KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "user_name": "USERNAME",
    "password": "PASSWORD",
    "email": "EMAIL",
    "totp_secret": "TOTP_SECRET_IF_2FA",
    "proxy": "http://user:pass@host:port"
  }'
```

Response: `{ "status": "success", "login_cookies": "..." }`

Save `login_cookies` — use it in all write endpoints.
Cookies expire after ~45 minutes. Re-login when you get auth errors.
Proxy is recommended for write actions to avoid IP bans.


---

## Search & Read

### Tweet Advanced Search
Advanced search for tweets. Each page returns up to 20 replies(Sometimes less than 20,because we will filter out ads or other not  tweets). Use cursor for pagination.

`GET /twitter/tweet/advanced_search`

> **Params:** `query` (required, supports Twitter search operators), `queryType` (Top/Latest, default Top). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/tweet/advanced_search \
  --header 'X-API-Key: $KEY'
```

### Get Tweet By Ids
get tweet by tweet ids

`GET /twitter/tweets`

> **Params:** `tweet_ids` (required, comma-separated)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/tweets \
  --header 'X-API-Key: $KEY'
```

### Get Tweet Reply
get tweet replies by tweet id. Each page returns up to 20 replies(Sometimes less than 20,because we will filter out ads or other not  tweets). Use cursor for pagination. Order by reply time desc

`GET /twitter/tweet/replies`

> **Params:** `tweet_id` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/tweet/replies \
  --header 'X-API-Key: $KEY'
```

### Get Tweet Replies V2
Get tweet replies by tweet id (V2). Each page returns up to 20 replies. Use cursor for pagination. Supports sorting by Relevance, Latest, or Likes.

`GET /twitter/tweet/replies/v2`

> **Params:** `tweet_id` (required). Optional: `cursor`, `sort` (Relevance/Latest/Likes)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/tweet/replies/v2 \
  --header 'X-API-Key: $KEY'
```

### Get Tweet Quote
get tweet quotes by tweet id. Each page returns exactly 20 quotes. Use cursor for pagination. Order by quote time desc

`GET /twitter/tweet/quotes`

> **Params:** `tweet_id` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/tweet/quotes \
  --header 'X-API-Key: $KEY'
```

### Get Tweet Thread Context
Get the thread context of a tweet. Suppose a tweet thread consists of t1, t2 (replying to t1), t3 (replying to t2), and t4, t5, t6 (all replying to t3). If we provide an API where you input t3 and receive t1, t2, t3, t4, t5, t6. Pagination is supported. The pagination size cannot be set (due to Twitter's limitations), and the data returned per page is not fixed.

`GET /twitter/tweet/thread_context`

> **Params:** `tweet_id` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/tweet/thread_context \
  --header 'X-API-Key: $KEY'
```

### Get Tweet Retweeter
get tweet retweeters by tweet id. Each page returns about 100 retweeters. Use cursor for pagination. Order by retweet time desc

`GET /twitter/tweet/retweeters`

> **Params:** `tweet_id` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/tweet/retweeters \
  --header 'X-API-Key: $KEY'
```

### Get Article
get article by tweet id. cost 100 credit per article

`GET /twitter/article`

> **Params:** `tweet_id` (required). Cost: 100 credits

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/article \
  --header 'X-API-Key: $KEY'
```

### Get Trends
Get trends by woeid

`GET /twitter/trends`

> **Params:** `woeid` (required — 1=worldwide, 23424977=US, 23424969=Turkey)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/trends \
  --header 'X-API-Key: $KEY'
```

### Get User Last Tweets
Retrieve tweets by user name. Sort by created_at. Results are paginated, with each page returning up to 20 tweets. If you only need to fetch the latest tweets from a single user very frequently, do not use this API—it will cost you a lot. Instead, please refer to https://twitterapi. io/blog/how-to-monitor-twitter-accounts-for-new-tweets-in-real-time. If you have more than 20 Twitter accounts requiring real-time tweet updates, use https://twitterapi. io/twitter-stream which is the most cost-effective solution.

`GET /twitter/user/last_tweets`

> **Params:** `userName` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/last_tweets \
  --header 'X-API-Key: $KEY'
```

### Get User Mention
get tweet mentions by user screen name. Each page returns exactly 20 mentions. Use cursor for pagination. Order by mention time desc

`GET /twitter/user/mentions`

> **Params:** `userId` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/mentions \
  --header 'X-API-Key: $KEY'
```


---

## Users

### Get User By Username
Get user info by screen name

`GET /twitter/user/info`

> **Params:** `userName` (required)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/info \
  --header 'X-API-Key: $KEY'
```

### Batch Get User By Userids
Batch get user info by user ids. Pricing:

`GET /twitter/user/batch_info_by_ids`

> **Params:** `userIds` (required, comma-separated)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/batch_info_by_ids \
  --header 'X-API-Key: $KEY'
```

### Get User About
Get user profile about by screen name

`GET /twitter/user_about`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user_about \
  --header 'X-API-Key: $KEY'
```

### Get My Info
Get my info

`GET /oapi/my/info`

```bash
curl --request GET \
  --url https://api.twitterapi.io/oapi/my/info \
  --header 'X-API-Key: $KEY'
```

### Search User
Search user by keyword

`GET /twitter/user/search`

> **Params:** `query` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/search \
  --header 'X-API-Key: $KEY'
```

### Get User Followers
Get user followers in reverse chronological order (newest first). Returns exactly 200 followers per page, sorted by follow date. Most recent followers appear on the first page. Use cursor for pagination through the complete followers list.

`GET /twitter/user/followers`

> **Params:** `userName` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/followers \
  --header 'X-API-Key: $KEY'
```

### Get User Followings
Get user followings. Each page returns exactly 200 followings. Use cursor for pagination. Sorted by follow date. Most recent followings appear on the first page.

`GET /twitter/user/followings`

> **Params:** `userName` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/followings \
  --header 'X-API-Key: $KEY'
```

### Get User Verified Followers
Get user verified followers in reverse chronological order (newest first). Returns exactly 20 verified followers per page, sorted by follow date. Most recent followers appear on the first page. Use cursor for pagination through the complete followers list.$0.3 per 1000 followers

`GET /twitter/user/verifiedFollowers`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/verifiedFollowers \
  --header 'X-API-Key: $KEY'
```

### Check Follow Relationship
Check if the user is following/followed by the target user. Trial operation price: 100 credits per call.

`GET /twitter/user/check_follow_relationship`

> **Params:** `userName` (required), `targetUserName` (required)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/check_follow_relationship \
  --header 'X-API-Key: $KEY'
```

### Get List Followers
Get followers of a list. Page size is 20.

`GET /twitter/list/followers`

> **Params:** `listId` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/list/followers \
  --header 'X-API-Key: $KEY'
```

### Get List Members
Get members of a list. Page size is 20.

`GET /twitter/list/members`

> **Params:** `listId` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/list/members \
  --header 'X-API-Key: $KEY'
```


---

## Tweet Actions

### Create Tweet V2
Create a tweet. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

`POST /twitter/create_tweet_v2`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/create_tweet_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "login_cookies": "<string>",
  "tweet_text": "<string>",
  "proxy": "<string>",
  "reply_to_tweet_id": "<string>",
  "attachment_url": "<string>",
  "community_id": "<string>",
  "is_note_tweet": true,
  "media_ids": "<array>"
}
'
```

### Delete Tweet V2
Delete a tweet. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.002 per call.

`POST /twitter/delete_tweet_v2`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/delete_tweet_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "login_cookies": "<string>",
  "tweet_id": "<string>",
  "proxy": "<string>"
}
'
```

### Like Tweet V2
Like a tweet. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.002 per call.

`POST /twitter/like_tweet_v2`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/like_tweet_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "login_cookies": "<string>",
  "tweet_id": "<string>",
  "proxy": "<string>"
}
'
```

### Unlike Tweet V2
Unlike a tweet. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.002 per call.

`POST /twitter/unlike_tweet_v2`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/unlike_tweet_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "login_cookies": "<string>",
  "tweet_id": "<string>",
  "proxy": "<string>"
}
'
```

### Retweet Tweet V2
Retweet a tweet. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.002 per call.

`POST /twitter/retweet_tweet_v2`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/retweet_tweet_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "login_cookies": "<string>",
  "tweet_id": "<string>",
  "proxy": "<string>"
}
'
```

### Upload Media V2
Upload media to twitter. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

`POST /twitter/upload_media_v2`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/upload_media_v2 \
  --header 'Content-Type: multipart/form-data' \
  --header 'X-API-Key: $KEY' \
  --form file='@example-file' \
  --form 'proxy=<string>' \
  --form 'login_cookies=<string>' \
  --form is_long_video=true
```

### Upload Tweet Image
upload image to twitter. Need to login first. Trial operation price: $0.001 per call.

`POST /twitter/upload_image`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/upload_image \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "auth_session": "<string>",
  "proxy": "<string>",
  "image_url": "<string>"
}
'
```


---

## Account Actions

### User Login V2
Log in directly using your email, username, password, and 2FA secret key. And obtain the Login_cookie,  to post tweets, etc. Please note that the Login_cookie obtained through login_v2 can only be used for APIs with the "v2" suffix, such as create_tweet_v2. Trial operation price: $0.003 per call.

`POST /twitter/user_login_v2`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/user_login_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "user_name": "<string>",
  "email": "<string>",
  "password": "<string>",
  "proxy": "<string>",
  "totp_secret": "<string>"
}
'
```

### Login By Email Or Username
Login Step 1: by email or username. Recommend to use email. Trial operation price: $0.003 per call. Please read the guide: https://twitterapi. io/blog/twitter-login-and-post-api-guide

`POST /twitter/login_by_email_or_username`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/login_by_email_or_username \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "username_or_email": "<string>",
  "password": "<string>",
  "proxy": "<string>"
}
'
```

### Login By 2fa
Deprecated soon. Please use login V2 instead, as it is more stable. Login Step 2: by 2fa code. Trial operation price: $0.003 per call.

`POST /twitter/login_by_2fa`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/login_by_2fa \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "login_data": "<string>",
  "2fa_code": "<string>",
  "proxy": "<string>"
}
'
```

### Follow User V2
Follow a user. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.002 per call.

`POST /twitter/follow_user_v2`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/follow_user_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "login_cookies": "<string>",
  "user_id": "<string>",
  "proxy": "<string>"
}
'
```

### Unfollow User V2
Unfollow a user. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.002 per call.

`POST /twitter/unfollow_user_v2`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/unfollow_user_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "login_cookies": "<string>",
  "user_id": "<string>",
  "proxy": "<string>"
}
'
```


---

## Profile Management

### twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Update your Twitter profile information. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

`PATCH /twitter/update_profile_v2`

```bash
curl --request PATCH \
  --url https://api.twitterapi.io/twitter/update_profile_v2 \
  --header 'X-API-Key: $KEY'
```

### twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Update your Twitter avatar/profile picture. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

`PATCH /twitter/update_avatar_v2`

```bash
curl --request PATCH \
  --url https://api.twitterapi.io/twitter/update_avatar_v2 \
  --header 'X-API-Key: $KEY'
```

### twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Update your Twitter banner/header image. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

`PATCH /twitter/update_banner_v2`

```bash
curl --request PATCH \
  --url https://api.twitterapi.io/twitter/update_banner_v2 \
  --header 'X-API-Key: $KEY'
```


---

## DMs

### Send Dm V2
Send a direct message to a user. You must set the login_cookie.. You can get the login_cookie from /twitter/user_login_v2. You can only send DMs to those who have enabled DMs. Sometimes it may fail, so be prepared to retry. Trial operation price: $0.003 per call.

`POST /twitter/send_dm_to_user`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/send_dm_to_user \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "login_cookies": "<string>",
  "user_id": "<string>",
  "text": "<string>",
  "proxy": "<string>",
  "media_ids": "<array>",
  "reply_to_message_id": "<string>"
}
'
```

### Get Dm History By User Id
Get the direct message history with a user.

`GET /twitter/get_dm_history_by_user_id`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/get_dm_history_by_user_id \
  --header 'X-API-Key: $KEY'
```


---

## Communities

### Create Community V2
Create a community. You must set the login_cookies. You can get the login_cookies from /twitter/user_login_v2. Trial operation price: $0.003 per call.

`POST /twitter/create_community_v2`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/create_community_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "login_cookies": "<string>",
  "name": "<string>",
  "description": "<string>",
  "proxy": "<string>"
}
'
```

### Delete Community V2
Delete a community. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

`POST /twitter/delete_community_v2`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/delete_community_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "login_cookie": "<string>",
  "community_id": "<string>",
  "community_name": "<string>",
  "proxy": "<string>"
}
'
```

### Join Community V2
Join a community. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

`POST /twitter/join_community_v2`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/join_community_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "login_cookie": "<string>",
  "community_id": "<string>",
  "proxy": "<string>"
}
'
```

### Leave Community V2
Leave a community. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

`POST /twitter/leave_community_v2`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/leave_community_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "login_cookie": "<string>",
  "community_id": "<string>",
  "proxy": "<string>"
}
'
```

### Get Community By Id
Get community info by community id. Price: 20 credits per call. Note: This API is a bit slow, we are still optimizing it.

`GET /twitter/community/info`

> **Params:** `communityId` (required)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/community/info \
  --header 'X-API-Key: $KEY'
```

### Get Community Members
Get members of a community. Page size is 20.

`GET /twitter/community/members`

> **Params:** `communityId` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/community/members \
  --header 'X-API-Key: $KEY'
```

### Get Community Moderators
Get moderators of a community. Page size is 20.

`GET /twitter/community/moderators`

> **Params:** `communityId` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/community/moderators \
  --header 'X-API-Key: $KEY'
```

### Get Community Tweets
Get tweets of a community. Page size is 20. Order by creation time desc.

`GET /twitter/community/tweets`

> **Params:** `communityId` (required). Optional: `cursor`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/community/tweets \
  --header 'X-API-Key: $KEY'
```

### Get All Community Tweets
get tweets from all communities,each page returns up to 20 tweets. Use cursor for pagination.

`GET /twitter/community/get_tweets_from_all_community`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/community/get_tweets_from_all_community \
  --header 'X-API-Key: $KEY'
```


---

## Webhooks & Monitoring

### Add Webhook Rule
Add a tweet filter rule. Default rule is not activated. You must call update_rule to activate the rule.

`POST /oapi/tweet_filter/add_rule`

```bash
curl --request POST \
  --url https://api.twitterapi.io/oapi/tweet_filter/add_rule \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "tag": "<string>",
  "value": "<string>",
  "interval_seconds": 123
}
'
```

### Update Webhook Rule
Update a tweet filter rule. You must set all parameters.

`POST /oapi/tweet_filter/update_rule`

```bash
curl --request POST \
  --url https://api.twitterapi.io/oapi/tweet_filter/update_rule \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "rule_id": "<string>",
  "tag": "<string>",
  "value": "<string>",
  "interval_seconds": 123,
  "is_effect": 0
}
'
```

### Delete Webhook Rule
Delete a tweet filter rule. You must set all parameters.

`DELETE /oapi/tweet_filter/delete_rule`

```bash
curl --request DELETE \
  --url https://api.twitterapi.io/oapi/tweet_filter/delete_rule \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "rule_id": "<string>"
}
'
```

### Get Webhook Rules
Get all tweet filter rules. Rule can be used in webhook and websocket. You can also modify the rule in our web page.

`GET /oapi/tweet_filter/get_rules`

```bash
curl --request GET \
  --url https://api.twitterapi.io/oapi/tweet_filter/get_rules \
  --header 'X-API-Key: $KEY'
```

### Add User To Monitor Tweet
Add a user to monitor real-time tweets. Monitor tweets from specified accounts, including directly sent tweets, quoted tweets, reply tweets, and retweeted tweets. Please ref:https://twitterapi. io/twitter-stream

`POST /oapi/x_user_stream/add_user_to_monitor_tweet`

```bash
curl --request POST \
  --url https://api.twitterapi.io/oapi/x_user_stream/add_user_to_monitor_tweet \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "x_user_name": "<string>"
}
'
```

### twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Get the list of users being monitored for real-time tweets. Returns all users that have been added for tweet monitoring. Please ref:https://twitterapi.io/twitter-stream

`GET /oapi/x_user_stream/get_user_to_monitor_tweet`

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/monitor_tweet \
  --header 'X-API-Key: $KEY'
```

### Remove User To Monitor Tweet
Remove a user from monitor real-time tweets. Please ref:https://twitterapi. io/twitter-stream

`POST /oapi/x_user_stream/remove_user_to_monitor_tweet`

```bash
curl --request POST \
  --url https://api.twitterapi.io/oapi/x_user_stream/remove_user_to_monitor_tweet \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "id_for_user": "<string>"
}
'
```


---

## Spaces

### Get Space Detail
Get spaces detail by space id

`GET /twitter/spaces/detail`

> **Params:** `space_id` (required)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/spaces/detail \
  --header 'X-API-Key: $KEY'
```


---

## Legacy (use v2 versions instead)

### Create Tweet
Create a tweet. Need to login first. Trial operation price: $0.001 per call.

`POST /twitter/create_tweet`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/create_tweet \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "auth_session": "<string>",
  "tweet_text": "<string>",
  "proxy": "<string>",
  "quote_tweet_id": "<string>",
  "in_reply_to_tweet_id": "<string>",
  "media_id": "<string>"
}
'
```

### Like Tweet
Like a tweet. Need to login first. Trial operation price: $0.001 per call.

`POST /twitter/like_tweet`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/like_tweet \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "auth_session": "<string>",
  "tweet_id": "<string>",
  "proxy": "<string>"
}
'
```

### Retweet Tweet
Retweet a tweet. Need to login first. Trial operation price: $0.001 per call.

`POST /twitter/retweet_tweet`

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/retweet_tweet \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: $KEY' \
  --data '
{
  "auth_session": "<string>",
  "tweet_id": "<string>",
  "proxy": "<string>"
}
'
```
