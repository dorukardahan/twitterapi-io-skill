# Webhook / Filter Rule Endpoints

**Add Filter Rule** `POST /oapi/tweet_filter/add_rule`
```bash
curl -s -X POST "https://api.twitterapi.io/oapi/tweet_filter/add_rule" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "tag": "my_rule", "value": "from:elonmusk OR from:sama", "interval_seconds": 300 }'
```
Note: Rules are NOT activated by default. Call `update_rule` with `is_effect: 1` to activate (integer, not boolean).

**Get Filter Rules** `GET /oapi/tweet_filter/get_rules`
```bash
curl -s "https://api.twitterapi.io/oapi/tweet_filter/get_rules" -H "X-API-Key: $TWITTERAPI_IO_KEY"
```

**Update Filter Rule** `POST /oapi/tweet_filter/update_rule`
```bash
curl -s -X POST "https://api.twitterapi.io/oapi/tweet_filter/update_rule" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "rule_id": "ID", "is_effect": 1, "tag": "my_rule", "value": "from:elonmusk", "interval_seconds": 300 }'
```
Body: `rule_id` (required), `tag` (required), `value` (required), `interval_seconds` (required), `is_effect` (optional, integer: 0=inactive, 1=active)

**Delete Filter Rule** `DELETE /oapi/tweet_filter/delete_rule`
```bash
curl -s -X DELETE "https://api.twitterapi.io/oapi/tweet_filter/delete_rule" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "rule_id": "ID" }'
```
Body: `rule_id` (optional)

---

# Stream Endpoints (User Tweet Monitoring)

**Add User to Monitor** `POST /oapi/x_user_stream/add_user_to_monitor_tweet`
```bash
curl -s -X POST "https://api.twitterapi.io/oapi/x_user_stream/add_user_to_monitor_tweet" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "x_user_name": "elonmusk" }'
```
Monitors: direct tweets, quoted tweets, replies, and retweets.
Guide: https://twitterapi.io/twitter-stream

**Remove User from Monitor** `POST /oapi/x_user_stream/remove_user_to_monitor_tweet`
```bash
curl -s -X POST "https://api.twitterapi.io/oapi/x_user_stream/remove_user_to_monitor_tweet" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "id_for_user": "ID_FROM_GET_MONITORED_USERS" }'
```
Body: `id_for_user` (required — get this ID from `GET /oapi/x_user_stream/get_user_to_monitor_tweet` response, NOT the Twitter username)

**Get Monitored Users** `GET /oapi/x_user_stream/get_user_to_monitor_tweet`
```bash
curl -s "https://api.twitterapi.io/oapi/x_user_stream/get_user_to_monitor_tweet" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY"
```
