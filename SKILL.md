---
name: twitterapi-io
version: 3.1.0
description: Use Twitter/X API via TwitterAPI.io. 56+ endpoints — search, post, like, retweet, follow, DM, communities, webhooks, lists, spaces, profile management. No Twitter developer account needed. Works with any LLM.
homepage: https://twitterapi.io
---

# TwitterAPI.io — Complete Twitter/X API Reference

Base URL: `https://api.twitterapi.io`  
Header: `x-api-key: $KEY`

## Quick Start

### 1) Search tweets
```bash
curl -G 'https://api.twitterapi.io/twitter/tweet/advanced_search' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'query=(AI OR Twitter) lang:en' \
  --data-urlencode 'queryType=Latest'
```

### 2) Login and post tweet (v2)
```bash
# Step A: login
curl -X POST 'https://api.twitterapi.io/twitter/user_login_v2' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{"email":"user@example.com","password":"***","two_factor_secret":"***","proxy":"http://user:pass@host:port"}'

# Step B: create tweet using returned login_cookies
curl -X POST 'https://api.twitterapi.io/twitter/create_tweet_v2' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{"login_cookies":"$COOKIES","tweet_text":"Hello from API"}'
```

### 3) Fetch user profile
```bash
curl -G 'https://api.twitterapi.io/twitter/user/info' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'userName=elonmusk'
```

## Authentication

- All endpoints require `x-api-key`.
- Write/privileged endpoints additionally require `login_cookies` in request body.
- Standardized field name in this skill: **`login_cookies`** (normalized from `login_cookie` / `auth_session`).

### Login flow
1. Call `user_login_v2` with credentials.
2. Read `login_cookies` from response.
3. Pass `login_cookies` into write endpoints (tweet, like, follow, community ops, profile updates, DM, media).

### Auth matrix (summary)
- `api_key` only: search/read/listing endpoints.
- `api_key + login_cookies`: v2 write endpoints and account actions.

## Error Handling
- **401** invalid API key or expired `login_cookies`
- **403** forbidden/account restriction/action disallowed
- **429** throttle; backoff and honor retry windows
- **500** transient upstream issue; exponential retry

## Rate Limits & QPS
- Free: 1 request / 5 seconds
- Paid: 3–20 QPS based on credit tier

## Endpoint Reference

## Search & Tweets

### tweet_advanced_search
- **Description:** Advanced search for tweets.Each page returns up to 20 replies(Sometimes less than 20,because we will filter out ads or other not  tweets). Use cursor for pagination.
- **Method + Path:** `GET /twitter/tweet/advanced_search`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/tweet/advanced_search' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'query=elon' \
  --data-urlencode 'queryType=Latest' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: tweets, has_next_page, next_cursor.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes
- **Full response schema (live docs):**
```json
{
  "type": "object",
  "properties": {
    "tweets": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "tweet"
            ],
            "uniqueKey": "tweets.items.[INDEX].type",
            "typeLabel": "enum<string>"
          },
          "id": {
            "type": "string",
            "description": "The ID of the tweet",
            "uniqueKey": "tweets.items.[INDEX].id",
            "typeLabel": "string"
          },
          "url": {
            "type": "string",
            "description": "The URL of the tweet",
            "uniqueKey": "tweets.items.[INDEX].url",
            "typeLabel": "string"
          },
          "text": {
            "type": "string",
            "description": "The text of the tweet",
            "uniqueKey": "tweets.items.[INDEX].text",
            "typeLabel": "string"
          },
          "source": {
            "type": "string",
            "description": "The source of the tweet.eg. \"Twitter for iPhone\"",
            "uniqueKey": "tweets.items.[INDEX].source",
            "typeLabel": "string"
          },
          "retweetCount": {
            "type": "integer",
            "description": "The number of times the tweet has been retweeted",
            "uniqueKey": "tweets.items.[INDEX].retweetCount",
            "typeLabel": "integer"
          },
          "replyCount": {
            "type": "integer",
            "description": "The number of times the tweet has been replied to",
            "uniqueKey": "tweets.items.[INDEX].replyCount",
            "typeLabel": "integer"
          },
          "likeCount": {
            "type": "integer",
            "description": "The number of times the tweet has been liked",
            "uniqueKey": "tweets.items.[INDEX].likeCount",
            "typeLabel": "integer"
          },
          "quoteCount": {
            "type": "integer",
            "description": "The number of times the tweet has been quoted",
            "uniqueKey": "tweets.items.[INDEX].quoteCount",
            "typeLabel": "integer"
          },
          "viewCount": {
            "type": "integer",
            "description": "The number of times the tweet has been viewed",
            "uniqueKey": "tweets.items.[INDEX].viewCount",
            "typeLabel": "integer"
          },
          "createdAt": {
            "type": "string",
            "description": "The date and time the tweet was created.eg. Tue Dec 10 07:00:30 +0000 2024",
            "uniqueKey": "tweets.items.[INDEX].createdAt",
            "typeLabel": "string"
          },
          "lang": {
            "type": "string",
            "description": "The language of the tweet.eg. \"en\".may be empty",
            "uniqueKey": "tweets.items.[INDEX].lang",
            "typeLabel": "string"
          },
          "bookmarkCount": {
            "type": "integer",
            "description": "The number of times the tweet has been bookmarked",
            "uniqueKey": "tweets.items.[INDEX].bookmarkCount",
            "typeLabel": "integer"
          },
          "isReply": {
            "type": "boolean",
            "description": "Indicates if the tweet is a reply",
            "uniqueKey": "tweets.items.[INDEX].isReply",
            "typeLabel": "boolean"
          },
          "inReplyToId": {
            "type": "string",
            "description": "The ID of the tweet being replied to.may be empty",
            "uniqueKey": "tweets.items.[INDEX].inReplyToId",
            "typeLabel": "string"
          },
          "conversationId": {
            "type": "string",
            "description": "The ID of the conversation the tweet is part of.may be empty",
            "uniqueKey": "tweets.items.[INDEX].conversationId",
            "typeLabel": "string"
          },
          "displayTextRange": {
            "type": "array",
            "description": "specifies the UTF-16 code unit indices in full_text that define the visible portion of a Tweet.eg\"@jack Thanks for the update!\",display_text_range is [6, 28]",
            "items": {
              "type": "integer",
              "uniqueKey": "tweets.items.[INDEX].displayTextRange.items.[INDEX]",
              "typeLabel": "integer"
            },
            "uniqueKey": "tweets.items.[INDEX].displayTextRange",
            "typeLabel": "integer[]"
          },
          "inReplyToUserId": {
            "type": "string",
            "description": "The ID of the user being replied to.may be empty",
            "uniqueKey": "tweets.items.[INDEX].inReplyToUserId",
            "typeLabel": "string"
          },
          "inReplyToUsername": {
            "type": "string",
            "description": "The username of the user being replied to.may be empty",
            "uniqueKey": "tweets.items.[INDEX].inReplyToUsername",
            "typeLabel": "string"
          },
          "author": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "user"
                ],
                "uniqueKey": "tweets.items.[INDEX].author.type",
                "typeLabel": "enum<string>"
              },
              "userName": {
                "type": "string",
                "description": "The username of the Twitter user",
                "uniqueKey": "tweets.items.[INDEX].author.userName",
                "typeLabel": "string"
              },
              "url": {
                "type": "string",
                "description": "The x.com URL of the user's profile",
                "uniqueKey": "tweets.items.[INDEX].author.url",
                "typeLabel": "string"
              },
              "id": {
                "type": "string",
                "description": "The unique identifier of the user",
                "uniqueKey": "tweets.items.[INDEX].author.id",
                "typeLabel": "string"
              },
              "name": {
                "type": "string",
                "description": "The display name of the user",
                "uniqueKey": "tweets.items.[INDEX].author.name",
                "typeLabel": "string"
              },
              "isBlueVerified": {
                "type": "boolean",
                "description": "Whether the user has Twitter Blue verification",
                "uniqueKey": "tweets.items.[INDEX].author.isBlueVerified",
                "typeLabel": "boolean"
              },
              "verifiedType": {
                "type": "string",
                "description": "The type of verification. eg. \"government\" ,can be empty",
                "uniqueKey": "tweets.items.[INDEX].author.verifiedType",
                "typeLabel": "string"
              },
              "profilePicture": {
                "type": "string",
                "description": "URL of the user's profile picture",
                "uniqueKey": "tweets.items.[INDEX].author.profilePicture",
                "typeLabel": "string"
              },
              "coverPicture": {
                "type": "string",
                "description": "URL of the user's cover picture",
                "uniqueKey": "tweets.items.[INDEX].author.coverPicture",
                "typeLabel": "string"
              },
              "description": {
                "type": "string",
                "description": "The user's profile description",
                "uniqueKey": "tweets.items.[INDEX].author.description",
                "typeLabel": "string"
              },
              "location": {
                "type": "string",
                "description": "The user's location.for example: 東京の端っこ . may be empty",
                "uniqueKey": "tweets.items.[INDEX].author.location",
                "typeLabel": "string"
              },
              "followers": {
                "type": "integer",
                "description": "Number of followers",
                "uniqueKey": "tweets.items.[INDEX].author.followers",
                "typeLabel": "integer"
              },
              "following": {
                "type": "integer",
                "description": "Number of accounts following",
                "uniqueKey": "tweets.items.[INDEX].author.following",
                "typeLabel": "integer"
              },
              "canDm": {
                "type": "boolean",
                "description": "Whether the user can receive DMs",
                "uniqueKey": "tweets.items.[INDEX].author.canDm",
                "typeLabel": "boolean"
              },
              "createdAt": {
                "type": "string",
                "description": "When the account was created.for example: Thu Dec 13 08:41:26 +0000 2007",
                "uniqueKey": "tweets.items.[INDEX].author.createdAt",
                "typeLabel": "string"
              },
              "favouritesCount": {
                "type": "integer",
                "description": "Number of favorites",
                "uniqueKey": "tweets.items.[INDEX].author.favouritesCount",
                "typeLabel": "integer"
              },
              "hasCustomTimelines": {
                "type": "boolean",
                "description": "Whether the user has custom timelines",
                "uniqueKey": "tweets.items.[INDEX].author.hasCustomTimelines",
                "typeLabel": "boolean"
              },
              "isTranslator": {
                "type": "boolean",
                "description": "Whether the user is a translator",
                "uniqueKey": "tweets.items.[INDEX].author.isTranslator",
                "typeLabel": "boolean"
              },
              "mediaCount": {
                "type": "integer",
                "description": "Number of media posts",
                "uniqueKey": "tweets.items.[INDEX].author.mediaCount",
                "typeLabel": "integer"
              },
              "statusesCount": {
                "type": "integer",
                "description": "Number of status updates",
                "uniqueKey": "tweets.items.[INDEX].author.statusesCount",
                "typeLabel": "integer"
              },
              "withheldInCountries": {
                "type": "array",
                "items": {
                  "type": "string",
                  "uniqueKey": "tweets.items.[INDEX].author.withheldInCountries.items.[INDEX]",
                  "typeLabel": "string"
                },
                "description": "Countries where the account is withheld",
                "uniqueKey": "tweets.items.[INDEX].author.withheldInCountries",
                "typeLabel": "string[]"
              },
              "affiliatesHighlightedLabel": {
                "type": "object",
                "uniqueKey": "tweets.items.[INDEX].author.affiliatesHighlightedLabel",
                "typeLabel": "object"
              },
              "possiblySensitive": {
                "type": "boolean",
                "description": "Whether the account may contain sensitive content",
                "uniqueKey": "tweets.items.[INDEX].author.possiblySensitive",
                "typeLabel": "boolean"
              },
              "pinnedTweetIds": {
                "type": "array",
                "items": {
                  "type": "string",
                  "uniqueKey": "tweets.items.[INDEX].author.pinnedTweetIds.items.[INDEX]",
                  "typeLabel": "string"
                },
                "description": "IDs of pinned tweets",
                "uniqueKey": "tweets.items.[INDEX].author.pinnedTweetIds",
                "typeLabel": "string[]"
              },
              "isAutomated": {
                "type": "boolean",
                "description": "Whether the account is automated",
                "uniqueKey": "tweets.items.[INDEX].author.isAutomated",
                "typeLabel": "boolean"
              },
              "automatedBy": {
                "type": "string",
                "description": "The account that automated the account",
                "uniqueKey": "tweets.items.[INDEX].author.automatedBy",
                "typeLabel": "string"
              },
              "unavailable": {
                "type": "boolean",
                "description": "Whether the account is unavailable",
                "uniqueKey": "tweets.items.[INDEX].author.unavailable",
                "typeLabel": "boolean"
              },
              "message": {
                "type": "string",
                "description": "The message of the account.eg. \"This account is unavailable\" or \"This account is suspended\"",
                "uniqueKey": "tweets.items.[INDEX].author.message",
                "typeLabel": "string"
              },
              "unavailableReason": {
                "type": "string",
                "description": "The reason the account is unavailable.eg. \"suspended\" ",
                "uniqueKey": "tweets.items.[INDEX].author.unavailableReason",
                "typeLabel": "string"
              },
              "profile_bio": {
                "type": "object",
                "properties": {
                  "description": {
                    "type": "string",
                    "uniqueKey": "tweets.items.[INDEX].author.profile_bio.description",
                    "typeLabel": "string"
                  },
                  "entities": {
                    "type": "object",
                    "properties": {
                      "description": {
                        "type": "object",
                        "properties": {
                          "urls": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "display_url": {
                                  "type": "string",
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].display_url",
                                  "typeLabel": "string"
                                },
                                "expanded_url": {
                                  "type": "string",
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].expanded_url",
                                  "typeLabel": "string"
                                },
                                "indices": {
                                  "type": "array",
                                  "items": {
                                    "type": "integer",
                                    "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].indices.items.[INDEX]",
                                    "typeLabel": "integer"
                                  },
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].indices",
                                  "typeLabel": "integer[]"
                                },
                                "url": {
                                  "type": "string",
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].url",
                                  "typeLabel": "string"
                                }
                              },
                              "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX]",
                              "typeLabel": "object"
                            },
                            "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls",
                            "typeLabel": "object[]"
                          }
                        },
                        "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description",
                        "typeLabel": "object"
                      },
                      "url": {
                        "type": "object",
                        "properties": {
                          "urls": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "display_url": {
                                  "type": "string",
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].display_url",
                                  "typeLabel": "string"
                                },
                                "expanded_url": {
                                  "type": "string",
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].expanded_url",
                                  "typeLabel": "string"
                                },
                                "indices": {
                                  "type": "array",
                                  "items": {
                                    "type": "integer",
                                    "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].indices.items.[INDEX]",
                                    "typeLabel": "integer"
                                  },
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].indices",
                                  "typeLabel": "integer[]"
                                },
                                "url": {
                                  "type": "string",
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].url",
                                  "typeLabel": "string"
                                }
                              },
                              "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX]",
                              "typeLabel": "object"
                            },
                            "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls",
                            "typeLabel": "object[]"
                          }
                        },
                        "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url",
                        "typeLabel": "object"
                      }
                    },
                    "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities",
                    "typeLabel": "object"
                  }
                },
                "uniqueKey": "tweets.items.[INDEX].author.profile_bio",
                "typeLabel": "object"
              }
            },
            "description": "The user who posted the tweet",
            "uniqueKey": "tweets.items.[INDEX].author",
            "typeLabel": "object"
          },
          "entities": {
            "type": "object",
            "properties": {
              "hashtags": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "indices": {
                      "type": "array",
                      "items": {
                        "type": "integer",
                        "uniqueKey": "tweets.items.[INDEX].entities.hashtags.items.[INDEX].indices.items.[INDEX]",
                        "typeLabel": "integer"
                      },
                      "uniqueKey": "tweets.items.[INDEX].entities.hashtags.items.[INDEX].indices",
                      "typeLabel": "integer[]"
                    },
                    "text": {
                      "type": "string",
                      "uniqueKey": "tweets.items.[INDEX].entities.hashtags.items.[INDEX].text",
                      "typeLabel": "string"
                    }
                  },
                  "uniqueKey": "tweets.items.[INDEX].entities.hashtags.items.[INDEX]",
                  "typeLabel": "object"
                },
                "uniqueKey": "tweets.items.[INDEX].entities.hashtags",
                "typeLabel": "object[]"
              },
              "urls": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "display_url": {
                      "type": "string",
                      "uniqueKey": "tweets.items.[INDEX].entities.urls.items.[INDEX].display_url",
                      "typeLabel": "string"
                    },
                    "expanded_url": {
                      "type": "string",
                      "uniqueKey": "tweets.items.[INDEX].entities.urls.items.[INDEX].expanded_url",
                      "typeLabel": "string"
                    },
                    "indices": {
                      "type": "array",
                      "items": {
                        "type": "integer",
                        "uniqueKey": "tweets.items.[INDEX].entities.urls.items.[INDEX].indices.items.[INDEX]",
                        "typeLabel": "integer"
                      },
                      "uniqueKey": "tweets.items.[INDEX].entities.urls.items.[INDEX].indices",
                      "typeLabel": "integer[]"
                    },
                    "url": {
                      "type": "string",
                      "uniqueKey": "tweets.items.[INDEX].entities.urls.items.[INDEX].url",
                      "typeLabel": "string"
                    }
                  },
                  "uniqueKey": "tweets.items.[INDEX].entities.urls.items.[INDEX]",
                  "typeLabel": "object"
                },
                "uniqueKey": "tweets.items.[INDEX].entities.urls",
                "typeLabel": "object[]"
              },
              "user_mentions": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id_str": {
                      "type": "string",
                      "description": "The ID of the user being mentioned",
                      "uniqueKey": "tweets.items.[INDEX].entities.user_mentions.items.[INDEX].id_str",
                      "typeLabel": "string"
                    },
                    "name": {
                      "type": "string",
                      "description": "The name of the user being mentioned",
                      "uniqueKey": "tweets.items.[INDEX].entities.user_mentions.items.[INDEX].name",
                      "typeLabel": "string"
                    },
                    "screen_name": {
                      "type": "string",
                      "description": "The screen name of the user being mentioned",
                      "uniqueKey": "tweets.items.[INDEX].entities.user_mentions.items.[INDEX].screen_name",
                      "typeLabel": "string"
                    }
                  },
                  "uniqueKey": "tweets.items.[INDEX].entities.user_mentions.items.[INDEX]",
                  "typeLabel": "object"
                },
                "uniqueKey": "tweets.items.[INDEX].entities.user_mentions",
                "typeLabel": "object[]"
              }
            },
            "description": "The entities in the tweet.eg. hashtags,urls,mentions",
            "uniqueKey": "tweets.items.[INDEX].entities",
            "typeLabel": "object"
          },
          "quoted_tweet": {
            "$circularRef": "2b5fa7d7-8d07-4f45-9ef7-91c2daddd7f0",
            "description": "The tweet being quoted.may be null",
            "uniqueKey": "tweets.items.[INDEX].quoted_tweet",
            "typeLabel": "any"
          },
          "retweeted_tweet": {
            "$circularRef": "2b5fa7d7-8d07-4f45-9ef7-91c2daddd7f0",
            "description": "The tweet being retweeted.may be null",
            "uniqueKey": "tweets.items.[INDEX].retweeted_tweet",
            "typeLabel": "any"
          },
          "isLimitedReply": {
            "type": "boolean",
            "description": "Whether the tweet is a limited reply. Possible restrictions: only mentioned users, verified users, or followed accounts can reply",
            "uniqueKey": "tweets.items.[INDEX].isLimitedReply",
            "typeLabel": "boolean"
          }
        },
        "uniqueKey": "tweets.items.[INDEX]",
        "typeLabel": "object"
      },
      "description": "Array of tweets",
      "isRequired": true,
      "uniqueKey": "tweets",
      "typeLabel": "object[]"
    },
    "has_next_page": {
      "type": "boolean",
      "description": "Indicates if there are more results available",
      "isRequired": true,
      "uniqueKey": "has_next_page",
      "typeLabel": "boolean"
    },
    "next_cursor": {
      "type": "string",
      "description": "Cursor for fetching the next page of results",
      "isRequired": true,
      "uniqueKey": "next_cursor",
      "typeLabel": "string"
    }
  },
  "required": [
    "tweets",
    "has_next_page",
    "next_cursor"
  ],
  "uniqueKey": "",
  "typeLabel": "object"
}
```

### get_tweet_reply
- **Description:** get tweet replies by tweet id.Each page returns up to 20 replies(Sometimes less than 20,because we will filter out ads or other not  tweets). Use cursor for pagination. Order by reply time desc
- **Method + Path:** `GET /twitter/tweet/replies`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/tweet/replies' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'tweetId=1887346801234567890' \
  --data-urlencode 'tweet=1887346801234567890' \
  --data-urlencode 'sinceTime=1704067200' \
  --data-urlencode 'untilTime=1706745600' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: replies, has_next_page, next_cursor, status, message.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes
- **Full response schema (live docs):**
```json
{
  "type": "object",
  "properties": {
    "replies": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "tweet"
            ],
            "uniqueKey": "replies.items.[INDEX].type",
            "typeLabel": "enum<string>"
          },
          "id": {
            "type": "string",
            "description": "The ID of the tweet",
            "uniqueKey": "replies.items.[INDEX].id",
            "typeLabel": "string"
          },
          "url": {
            "type": "string",
            "description": "The URL of the tweet",
            "uniqueKey": "replies.items.[INDEX].url",
            "typeLabel": "string"
          },
          "text": {
            "type": "string",
            "description": "The text of the tweet",
            "uniqueKey": "replies.items.[INDEX].text",
            "typeLabel": "string"
          },
          "source": {
            "type": "string",
            "description": "The source of the tweet.eg. \"Twitter for iPhone\"",
            "uniqueKey": "replies.items.[INDEX].source",
            "typeLabel": "string"
          },
          "retweetCount": {
            "type": "integer",
            "description": "The number of times the tweet has been retweeted",
            "uniqueKey": "replies.items.[INDEX].retweetCount",
            "typeLabel": "integer"
          },
          "replyCount": {
            "type": "integer",
            "description": "The number of times the tweet has been replied to",
            "uniqueKey": "replies.items.[INDEX].replyCount",
            "typeLabel": "integer"
          },
          "likeCount": {
            "type": "integer",
            "description": "The number of times the tweet has been liked",
            "uniqueKey": "replies.items.[INDEX].likeCount",
            "typeLabel": "integer"
          },
          "quoteCount": {
            "type": "integer",
            "description": "The number of times the tweet has been quoted",
            "uniqueKey": "replies.items.[INDEX].quoteCount",
            "typeLabel": "integer"
          },
          "viewCount": {
            "type": "integer",
            "description": "The number of times the tweet has been viewed",
            "uniqueKey": "replies.items.[INDEX].viewCount",
            "typeLabel": "integer"
          },
          "createdAt": {
            "type": "string",
            "description": "The date and time the tweet was created.eg. Tue Dec 10 07:00:30 +0000 2024",
            "uniqueKey": "replies.items.[INDEX].createdAt",
            "typeLabel": "string"
          },
          "lang": {
            "type": "string",
            "description": "The language of the tweet.eg. \"en\".may be empty",
            "uniqueKey": "replies.items.[INDEX].lang",
            "typeLabel": "string"
          },
          "bookmarkCount": {
            "type": "integer",
            "description": "The number of times the tweet has been bookmarked",
            "uniqueKey": "replies.items.[INDEX].bookmarkCount",
            "typeLabel": "integer"
          },
          "isReply": {
            "type": "boolean",
            "description": "Indicates if the tweet is a reply",
            "uniqueKey": "replies.items.[INDEX].isReply",
            "typeLabel": "boolean"
          },
          "inReplyToId": {
            "type": "string",
            "description": "The ID of the tweet being replied to.may be empty",
            "uniqueKey": "replies.items.[INDEX].inReplyToId",
            "typeLabel": "string"
          },
          "conversationId": {
            "type": "string",
            "description": "The ID of the conversation the tweet is part of.may be empty",
            "uniqueKey": "replies.items.[INDEX].conversationId",
            "typeLabel": "string"
          },
          "displayTextRange": {
            "type": "array",
            "description": "specifies the UTF-16 code unit indices in full_text that define the visible portion of a Tweet.eg\"@jack Thanks for the update!\",display_text_range is [6, 28]",
            "items": {
              "type": "integer",
              "uniqueKey": "replies.items.[INDEX].displayTextRange.items.[INDEX]",
              "typeLabel": "integer"
            },
            "uniqueKey": "replies.items.[INDEX].displayTextRange",
            "typeLabel": "integer[]"
          },
          "inReplyToUserId": {
            "type": "string",
            "description": "The ID of the user being replied to.may be empty",
            "uniqueKey": "replies.items.[INDEX].inReplyToUserId",
            "typeLabel": "string"
          },
          "inReplyToUsername": {
            "type": "string",
            "description": "The username of the user being replied to.may be empty",
            "uniqueKey": "replies.items.[INDEX].inReplyToUsername",
            "typeLabel": "string"
          },
          "author": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "user"
                ],
                "uniqueKey": "replies.items.[INDEX].author.type",
                "typeLabel": "enum<string>"
              },
              "userName": {
                "type": "string",
                "description": "The username of the Twitter user",
                "uniqueKey": "replies.items.[INDEX].author.userName",
                "typeLabel": "string"
              },
              "url": {
                "type": "string",
                "description": "The x.com URL of the user's profile",
                "uniqueKey": "replies.items.[INDEX].author.url",
                "typeLabel": "string"
              },
              "id": {
                "type": "string",
                "description": "The unique identifier of the user",
                "uniqueKey": "replies.items.[INDEX].author.id",
                "typeLabel": "string"
              },
              "name": {
                "type": "string",
                "description": "The display name of the user",
                "uniqueKey": "replies.items.[INDEX].author.name",
                "typeLabel": "string"
              },
              "isBlueVerified": {
                "type": "boolean",
                "description": "Whether the user has Twitter Blue verification",
                "uniqueKey": "replies.items.[INDEX].author.isBlueVerified",
                "typeLabel": "boolean"
              },
              "verifiedType": {
                "type": "string",
                "description": "The type of verification. eg. \"government\" ,can be empty",
                "uniqueKey": "replies.items.[INDEX].author.verifiedType",
                "typeLabel": "string"
              },
              "profilePicture": {
                "type": "string",
                "description": "URL of the user's profile picture",
                "uniqueKey": "replies.items.[INDEX].author.profilePicture",
                "typeLabel": "string"
              },
              "coverPicture": {
                "type": "string",
                "description": "URL of the user's cover picture",
                "uniqueKey": "replies.items.[INDEX].author.coverPicture",
                "typeLabel": "string"
              },
              "description": {
                "type": "string",
                "description": "The user's profile description",
                "uniqueKey": "replies.items.[INDEX].author.description",
                "typeLabel": "string"
              },
              "location": {
                "type": "string",
                "description": "The user's location.for example: 東京の端っこ . may be empty",
                "uniqueKey": "replies.items.[INDEX].author.location",
                "typeLabel": "string"
              },
              "followers": {
                "type": "integer",
                "description": "Number of followers",
                "uniqueKey": "replies.items.[INDEX].author.followers",
                "typeLabel": "integer"
              },
              "following": {
                "type": "integer",
                "description": "Number of accounts following",
                "uniqueKey": "replies.items.[INDEX].author.following",
                "typeLabel": "integer"
              },
              "canDm": {
                "type": "boolean",
                "description": "Whether the user can receive DMs",
                "uniqueKey": "replies.items.[INDEX].author.canDm",
                "typeLabel": "boolean"
              },
              "createdAt": {
                "type": "string",
                "description": "When the account was created.for example: Thu Dec 13 08:41:26 +0000 2007",
                "uniqueKey": "replies.items.[INDEX].author.createdAt",
                "typeLabel": "string"
              },
              "favouritesCount": {
                "type": "integer",
                "description": "Number of favorites",
                "uniqueKey": "replies.items.[INDEX].author.favouritesCount",
                "typeLabel": "integer"
              },
              "hasCustomTimelines": {
                "type": "boolean",
                "description": "Whether the user has custom timelines",
                "uniqueKey": "replies.items.[INDEX].author.hasCustomTimelines",
                "typeLabel": "boolean"
              },
              "isTranslator": {
                "type": "boolean",
                "description": "Whether the user is a translator",
                "uniqueKey": "replies.items.[INDEX].author.isTranslator",
                "typeLabel": "boolean"
              },
              "mediaCount": {
                "type": "integer",
                "description": "Number of media posts",
                "uniqueKey": "replies.items.[INDEX].author.mediaCount",
                "typeLabel": "integer"
              },
              "statusesCount": {
                "type": "integer",
                "description": "Number of status updates",
                "uniqueKey": "replies.items.[INDEX].author.statusesCount",
                "typeLabel": "integer"
              },
              "withheldInCountries": {
                "type": "array",
                "items": {
                  "type": "string",
                  "uniqueKey": "replies.items.[INDEX].author.withheldInCountries.items.[INDEX]",
                  "typeLabel": "string"
                },
                "description": "Countries where the account is withheld",
                "uniqueKey": "replies.items.[INDEX].author.withheldInCountries",
                "typeLabel": "string[]"
              },
              "affiliatesHighlightedLabel": {
                "type": "object",
                "uniqueKey": "replies.items.[INDEX].author.affiliatesHighlightedLabel",
                "typeLabel": "object"
              },
              "possiblySensitive": {
                "type": "boolean",
                "description": "Whether the account may contain sensitive content",
                "uniqueKey": "replies.items.[INDEX].author.possiblySensitive",
                "typeLabel": "boolean"
              },
              "pinnedTweetIds": {
                "type": "array",
                "items": {
                  "type": "string",
                  "uniqueKey": "replies.items.[INDEX].author.pinnedTweetIds.items.[INDEX]",
                  "typeLabel": "string"
                },
                "description": "IDs of pinned tweets",
                "uniqueKey": "replies.items.[INDEX].author.pinnedTweetIds",
                "typeLabel": "string[]"
              },
              "isAutomated": {
                "type": "boolean",
                "description": "Whether the account is automated",
                "uniqueKey": "replies.items.[INDEX].author.isAutomated",
                "typeLabel": "boolean"
              },
              "automatedBy": {
                "type": "string",
                "description": "The account that automated the account",
                "uniqueKey": "replies.items.[INDEX].author.automatedBy",
                "typeLabel": "string"
              },
              "unavailable": {
                "type": "boolean",
                "description": "Whether the account is unavailable",
                "uniqueKey": "replies.items.[INDEX].author.unavailable",
                "typeLabel": "boolean"
              },
              "message": {
                "type": "string",
                "description": "The message of the account.eg. \"This account is unavailable\" or \"This account is suspended\"",
                "uniqueKey": "replies.items.[INDEX].author.message",
                "typeLabel": "string"
              },
              "unavailableReason": {
                "type": "string",
                "description": "The reason the account is unavailable.eg. \"suspended\" ",
                "uniqueKey": "replies.items.[INDEX].author.unavailableReason",
                "typeLabel": "string"
              },
              "profile_bio": {
                "type": "object",
                "properties": {
                  "description": {
                    "type": "string",
                    "uniqueKey": "replies.items.[INDEX].author.profile_bio.description",
                    "typeLabel": "string"
                  },
                  "entities": {
                    "type": "object",
                    "properties": {
                      "description": {
                        "type": "object",
                        "properties": {
                          "urls": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "display_url": {
                                  "type": "string",
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].display_url",
                                  "typeLabel": "string"
                                },
                                "expanded_url": {
                                  "type": "string",
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].expanded_url",
                                  "typeLabel": "string"
                                },
                                "indices": {
                                  "type": "array",
                                  "items": {
                                    "type": "integer",
                                    "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].indices.items.[INDEX]",
                                    "typeLabel": "integer"
                                  },
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].indices",
                                  "typeLabel": "integer[]"
                                },
                                "url": {
                                  "type": "string",
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].url",
                                  "typeLabel": "string"
                                }
                              },
                              "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX]",
                              "typeLabel": "object"
                            },
                            "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls",
                            "typeLabel": "object[]"
                          }
                        },
                        "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description",
                        "typeLabel": "object"
                      },
                      "url": {
                        "type": "object",
                        "properties": {
                          "urls": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "display_url": {
                                  "type": "string",
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].display_url",
                                  "typeLabel": "string"
                                },
                                "expanded_url": {
                                  "type": "string",
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].expanded_url",
                                  "typeLabel": "string"
                                },
                                "indices": {
                                  "type": "array",
                                  "items": {
                                    "type": "integer",
                                    "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].indices.items.[INDEX]",
                                    "typeLabel": "integer"
                                  },
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].indices",
                                  "typeLabel": "integer[]"
                                },
                                "url": {
                                  "type": "string",
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].url",
                                  "typeLabel": "string"
                                }
                              },
                              "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX]",
                              "typeLabel": "object"
                            },
                            "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls",
                            "typeLabel": "object[]"
                          }
                        },
                        "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url",
                        "typeLabel": "object"
                      }
                    },
                    "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities",
                    "typeLabel": "object"
                  }
                },
                "uniqueKey": "replies.items.[INDEX].author.profile_bio",
                "typeLabel": "object"
              }
            },
            "description": "The user who posted the tweet",
            "uniqueKey": "replies.items.[INDEX].author",
            "typeLabel": "object"
          },
          "entities": {
            "type": "object",
            "properties": {
              "hashtags": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "indices": {
                      "type": "array",
                      "items": {
                        "type": "integer",
                        "uniqueKey": "replies.items.[INDEX].entities.hashtags.items.[INDEX].indices.items.[INDEX]",
                        "typeLabel": "integer"
                      },
                      "uniqueKey": "replies.items.[INDEX].entities.hashtags.items.[INDEX].indices",
                      "typeLabel": "integer[]"
                    },
                    "text": {
                      "type": "string",
                      "uniqueKey": "replies.items.[INDEX].entities.hashtags.items.[INDEX].text",
                      "typeLabel": "string"
                    }
                  },
                  "uniqueKey": "replies.items.[INDEX].entities.hashtags.items.[INDEX]",
                  "typeLabel": "object"
                },
                "uniqueKey": "replies.items.[INDEX].entities.hashtags",
                "typeLabel": "object[]"
              },
              "urls": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "display_url": {
                      "type": "string",
                      "uniqueKey": "replies.items.[INDEX].entities.urls.items.[INDEX].display_url",
                      "typeLabel": "string"
                    },
                    "expanded_url": {
                      "type": "string",
                      "uniqueKey": "replies.items.[INDEX].entities.urls.items.[INDEX].expanded_url",
                      "typeLabel": "string"
                    },
                    "indices": {
                      "type": "array",
                      "items": {
                        "type": "integer",
                        "uniqueKey": "replies.items.[INDEX].entities.urls.items.[INDEX].indices.items.[INDEX]",
                        "typeLabel": "integer"
                      },
                      "uniqueKey": "replies.items.[INDEX].entities.urls.items.[INDEX].indices",
                      "typeLabel": "integer[]"
                    },
                    "url": {
                      "type": "string",
                      "uniqueKey": "replies.items.[INDEX].entities.urls.items.[INDEX].url",
                      "typeLabel": "string"
                    }
                  },
                  "uniqueKey": "replies.items.[INDEX].entities.urls.items.[INDEX]",
                  "typeLabel": "object"
                },
                "uniqueKey": "replies.items.[INDEX].entities.urls",
                "typeLabel": "object[]"
              },
              "user_mentions": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id_str": {
                      "type": "string",
                      "description": "The ID of the user being mentioned",
                      "uniqueKey": "replies.items.[INDEX].entities.user_mentions.items.[INDEX].id_str",
                      "typeLabel": "string"
                    },
                    "name": {
                      "type": "string",
                      "description": "The name of the user being mentioned",
                      "uniqueKey": "replies.items.[INDEX].entities.user_mentions.items.[INDEX].name",
                      "typeLabel": "string"
                    },
                    "screen_name": {
                      "type": "string",
                      "description": "The screen name of the user being mentioned",
                      "uniqueKey": "replies.items.[INDEX].entities.user_mentions.items.[INDEX].screen_name",
                      "typeLabel": "string"
                    }
                  },
                  "uniqueKey": "replies.items.[INDEX].entities.user_mentions.items.[INDEX]",
                  "typeLabel": "object"
                },
                "uniqueKey": "replies.items.[INDEX].entities.user_mentions",
                "typeLabel": "object[]"
              }
            },
            "description": "The entities in the tweet.eg. hashtags,urls,mentions",
            "uniqueKey": "replies.items.[INDEX].entities",
            "typeLabel": "object"
          },
          "quoted_tweet": {
            "$circularRef": "2b5fa7d7-8d07-4f45-9ef7-91c2daddd7f0",
            "description": "The tweet being quoted.may be null",
            "uniqueKey": "replies.items.[INDEX].quoted_tweet",
            "typeLabel": "any"
          },
          "retweeted_tweet": {
            "$circularRef": "2b5fa7d7-8d07-4f45-9ef7-91c2daddd7f0",
            "description": "The tweet being retweeted.may be null",
            "uniqueKey": "replies.items.[INDEX].retweeted_tweet",
            "typeLabel": "any"
          },
          "isLimitedReply": {
            "type": "boolean",
            "description": "Whether the tweet is a limited reply. Possible restrictions: only mentioned users, verified users, or followed accounts can reply",
            "uniqueKey": "replies.items.[INDEX].isLimitedReply",
            "typeLabel": "boolean"
          }
        },
        "uniqueKey": "replies.items.[INDEX]",
        "typeLabel": "object"
      },
      "description": "Array of tweets",
      "uniqueKey": "replies",
      "typeLabel": "object[]"
    },
    "has_next_page": {
      "type": "boolean",
      "description": "Indicates if there are more results available. If true, use next_cursor to fetch the next page. Warning: Due to Twitter API inconsistency, has_more might return true even when no additional data exists. In such cases, subsequent requests will return empty results - this is a known platform limitation.",
      "uniqueKey": "has_next_page",
      "typeLabel": "boolean"
    },
    "next_cursor": {
      "type": "string",
      "description": "Cursor for fetching the next page of results",
      "uniqueKey": "next_cursor",
      "typeLabel": "string"
    },
    "status": {
      "type": "string",
      "description": "Status of the request.success or error",
      "enum": [
        "success",
        "error"
      ],
      "uniqueKey": "status",
      "typeLabel": "enum<string>"
    },
    "message": {
      "type": "string",
      "description": "Message of the request.error message",
      "uniqueKey": "message",
      "typeLabel": "string"
    }
  },
  "uniqueKey": "",
  "typeLabel": "object"
}
```

### get_tweet_replies_v2
- **Description:** Get tweet replies by tweet id (V2). Each page returns up to 20 replies. Use cursor for pagination. Supports sorting by Relevance, Latest, or Likes.
- **Method + Path:** `GET /twitter/tweet/replies/v2`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/tweet/replies/v2' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'tweetId=1887346801234567890' \
  --data-urlencode 'cursor=' \
  --data-urlencode 'queryType=Latest'
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: replies, has_next_page, next_cursor, status, message.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes
- **Full response schema (live docs):**
```json
{
  "type": "object",
  "properties": {
    "replies": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "tweet"
            ],
            "uniqueKey": "replies.items.[INDEX].type",
            "typeLabel": "enum<string>"
          },
          "id": {
            "type": "string",
            "description": "The ID of the tweet",
            "uniqueKey": "replies.items.[INDEX].id",
            "typeLabel": "string"
          },
          "url": {
            "type": "string",
            "description": "The URL of the tweet",
            "uniqueKey": "replies.items.[INDEX].url",
            "typeLabel": "string"
          },
          "text": {
            "type": "string",
            "description": "The text of the tweet",
            "uniqueKey": "replies.items.[INDEX].text",
            "typeLabel": "string"
          },
          "source": {
            "type": "string",
            "description": "The source of the tweet.eg. \"Twitter for iPhone\"",
            "uniqueKey": "replies.items.[INDEX].source",
            "typeLabel": "string"
          },
          "retweetCount": {
            "type": "integer",
            "description": "The number of times the tweet has been retweeted",
            "uniqueKey": "replies.items.[INDEX].retweetCount",
            "typeLabel": "integer"
          },
          "replyCount": {
            "type": "integer",
            "description": "The number of times the tweet has been replied to",
            "uniqueKey": "replies.items.[INDEX].replyCount",
            "typeLabel": "integer"
          },
          "likeCount": {
            "type": "integer",
            "description": "The number of times the tweet has been liked",
            "uniqueKey": "replies.items.[INDEX].likeCount",
            "typeLabel": "integer"
          },
          "quoteCount": {
            "type": "integer",
            "description": "The number of times the tweet has been quoted",
            "uniqueKey": "replies.items.[INDEX].quoteCount",
            "typeLabel": "integer"
          },
          "viewCount": {
            "type": "integer",
            "description": "The number of times the tweet has been viewed",
            "uniqueKey": "replies.items.[INDEX].viewCount",
            "typeLabel": "integer"
          },
          "createdAt": {
            "type": "string",
            "description": "The date and time the tweet was created.eg. Tue Dec 10 07:00:30 +0000 2024",
            "uniqueKey": "replies.items.[INDEX].createdAt",
            "typeLabel": "string"
          },
          "lang": {
            "type": "string",
            "description": "The language of the tweet.eg. \"en\".may be empty",
            "uniqueKey": "replies.items.[INDEX].lang",
            "typeLabel": "string"
          },
          "bookmarkCount": {
            "type": "integer",
            "description": "The number of times the tweet has been bookmarked",
            "uniqueKey": "replies.items.[INDEX].bookmarkCount",
            "typeLabel": "integer"
          },
          "isReply": {
            "type": "boolean",
            "description": "Indicates if the tweet is a reply",
            "uniqueKey": "replies.items.[INDEX].isReply",
            "typeLabel": "boolean"
          },
          "inReplyToId": {
            "type": "string",
            "description": "The ID of the tweet being replied to.may be empty",
            "uniqueKey": "replies.items.[INDEX].inReplyToId",
            "typeLabel": "string"
          },
          "conversationId": {
            "type": "string",
            "description": "The ID of the conversation the tweet is part of.may be empty",
            "uniqueKey": "replies.items.[INDEX].conversationId",
            "typeLabel": "string"
          },
          "displayTextRange": {
            "type": "array",
            "description": "specifies the UTF-16 code unit indices in full_text that define the visible portion of a Tweet.eg\"@jack Thanks for the update!\",display_text_range is [6, 28]",
            "items": {
              "type": "integer",
              "uniqueKey": "replies.items.[INDEX].displayTextRange.items.[INDEX]",
              "typeLabel": "integer"
            },
            "uniqueKey": "replies.items.[INDEX].displayTextRange",
            "typeLabel": "integer[]"
          },
          "inReplyToUserId": {
            "type": "string",
            "description": "The ID of the user being replied to.may be empty",
            "uniqueKey": "replies.items.[INDEX].inReplyToUserId",
            "typeLabel": "string"
          },
          "inReplyToUsername": {
            "type": "string",
            "description": "The username of the user being replied to.may be empty",
            "uniqueKey": "replies.items.[INDEX].inReplyToUsername",
            "typeLabel": "string"
          },
          "author": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "user"
                ],
                "uniqueKey": "replies.items.[INDEX].author.type",
                "typeLabel": "enum<string>"
              },
              "userName": {
                "type": "string",
                "description": "The username of the Twitter user",
                "uniqueKey": "replies.items.[INDEX].author.userName",
                "typeLabel": "string"
              },
              "url": {
                "type": "string",
                "description": "The x.com URL of the user's profile",
                "uniqueKey": "replies.items.[INDEX].author.url",
                "typeLabel": "string"
              },
              "id": {
                "type": "string",
                "description": "The unique identifier of the user",
                "uniqueKey": "replies.items.[INDEX].author.id",
                "typeLabel": "string"
              },
              "name": {
                "type": "string",
                "description": "The display name of the user",
                "uniqueKey": "replies.items.[INDEX].author.name",
                "typeLabel": "string"
              },
              "isBlueVerified": {
                "type": "boolean",
                "description": "Whether the user has Twitter Blue verification",
                "uniqueKey": "replies.items.[INDEX].author.isBlueVerified",
                "typeLabel": "boolean"
              },
              "verifiedType": {
                "type": "string",
                "description": "The type of verification. eg. \"government\" ,can be empty",
                "uniqueKey": "replies.items.[INDEX].author.verifiedType",
                "typeLabel": "string"
              },
              "profilePicture": {
                "type": "string",
                "description": "URL of the user's profile picture",
                "uniqueKey": "replies.items.[INDEX].author.profilePicture",
                "typeLabel": "string"
              },
              "coverPicture": {
                "type": "string",
                "description": "URL of the user's cover picture",
                "uniqueKey": "replies.items.[INDEX].author.coverPicture",
                "typeLabel": "string"
              },
              "description": {
                "type": "string",
                "description": "The user's profile description",
                "uniqueKey": "replies.items.[INDEX].author.description",
                "typeLabel": "string"
              },
              "location": {
                "type": "string",
                "description": "The user's location.for example: 東京の端っこ . may be empty",
                "uniqueKey": "replies.items.[INDEX].author.location",
                "typeLabel": "string"
              },
              "followers": {
                "type": "integer",
                "description": "Number of followers",
                "uniqueKey": "replies.items.[INDEX].author.followers",
                "typeLabel": "integer"
              },
              "following": {
                "type": "integer",
                "description": "Number of accounts following",
                "uniqueKey": "replies.items.[INDEX].author.following",
                "typeLabel": "integer"
              },
              "canDm": {
                "type": "boolean",
                "description": "Whether the user can receive DMs",
                "uniqueKey": "replies.items.[INDEX].author.canDm",
                "typeLabel": "boolean"
              },
              "createdAt": {
                "type": "string",
                "description": "When the account was created.for example: Thu Dec 13 08:41:26 +0000 2007",
                "uniqueKey": "replies.items.[INDEX].author.createdAt",
                "typeLabel": "string"
              },
              "favouritesCount": {
                "type": "integer",
                "description": "Number of favorites",
                "uniqueKey": "replies.items.[INDEX].author.favouritesCount",
                "typeLabel": "integer"
              },
              "hasCustomTimelines": {
                "type": "boolean",
                "description": "Whether the user has custom timelines",
                "uniqueKey": "replies.items.[INDEX].author.hasCustomTimelines",
                "typeLabel": "boolean"
              },
              "isTranslator": {
                "type": "boolean",
                "description": "Whether the user is a translator",
                "uniqueKey": "replies.items.[INDEX].author.isTranslator",
                "typeLabel": "boolean"
              },
              "mediaCount": {
                "type": "integer",
                "description": "Number of media posts",
                "uniqueKey": "replies.items.[INDEX].author.mediaCount",
                "typeLabel": "integer"
              },
              "statusesCount": {
                "type": "integer",
                "description": "Number of status updates",
                "uniqueKey": "replies.items.[INDEX].author.statusesCount",
                "typeLabel": "integer"
              },
              "withheldInCountries": {
                "type": "array",
                "items": {
                  "type": "string",
                  "uniqueKey": "replies.items.[INDEX].author.withheldInCountries.items.[INDEX]",
                  "typeLabel": "string"
                },
                "description": "Countries where the account is withheld",
                "uniqueKey": "replies.items.[INDEX].author.withheldInCountries",
                "typeLabel": "string[]"
              },
              "affiliatesHighlightedLabel": {
                "type": "object",
                "uniqueKey": "replies.items.[INDEX].author.affiliatesHighlightedLabel",
                "typeLabel": "object"
              },
              "possiblySensitive": {
                "type": "boolean",
                "description": "Whether the account may contain sensitive content",
                "uniqueKey": "replies.items.[INDEX].author.possiblySensitive",
                "typeLabel": "boolean"
              },
              "pinnedTweetIds": {
                "type": "array",
                "items": {
                  "type": "string",
                  "uniqueKey": "replies.items.[INDEX].author.pinnedTweetIds.items.[INDEX]",
                  "typeLabel": "string"
                },
                "description": "IDs of pinned tweets",
                "uniqueKey": "replies.items.[INDEX].author.pinnedTweetIds",
                "typeLabel": "string[]"
              },
              "isAutomated": {
                "type": "boolean",
                "description": "Whether the account is automated",
                "uniqueKey": "replies.items.[INDEX].author.isAutomated",
                "typeLabel": "boolean"
              },
              "automatedBy": {
                "type": "string",
                "description": "The account that automated the account",
                "uniqueKey": "replies.items.[INDEX].author.automatedBy",
                "typeLabel": "string"
              },
              "unavailable": {
                "type": "boolean",
                "description": "Whether the account is unavailable",
                "uniqueKey": "replies.items.[INDEX].author.unavailable",
                "typeLabel": "boolean"
              },
              "message": {
                "type": "string",
                "description": "The message of the account.eg. \"This account is unavailable\" or \"This account is suspended\"",
                "uniqueKey": "replies.items.[INDEX].author.message",
                "typeLabel": "string"
              },
              "unavailableReason": {
                "type": "string",
                "description": "The reason the account is unavailable.eg. \"suspended\" ",
                "uniqueKey": "replies.items.[INDEX].author.unavailableReason",
                "typeLabel": "string"
              },
              "profile_bio": {
                "type": "object",
                "properties": {
                  "description": {
                    "type": "string",
                    "uniqueKey": "replies.items.[INDEX].author.profile_bio.description",
                    "typeLabel": "string"
                  },
                  "entities": {
                    "type": "object",
                    "properties": {
                      "description": {
                        "type": "object",
                        "properties": {
                          "urls": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "display_url": {
                                  "type": "string",
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].display_url",
                                  "typeLabel": "string"
                                },
                                "expanded_url": {
                                  "type": "string",
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].expanded_url",
                                  "typeLabel": "string"
                                },
                                "indices": {
                                  "type": "array",
                                  "items": {
                                    "type": "integer",
                                    "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].indices.items.[INDEX]",
                                    "typeLabel": "integer"
                                  },
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].indices",
                                  "typeLabel": "integer[]"
                                },
                                "url": {
                                  "type": "string",
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].url",
                                  "typeLabel": "string"
                                }
                              },
                              "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX]",
                              "typeLabel": "object"
                            },
                            "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description.urls",
                            "typeLabel": "object[]"
                          }
                        },
                        "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.description",
                        "typeLabel": "object"
                      },
                      "url": {
                        "type": "object",
                        "properties": {
                          "urls": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "display_url": {
                                  "type": "string",
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].display_url",
                                  "typeLabel": "string"
                                },
                                "expanded_url": {
                                  "type": "string",
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].expanded_url",
                                  "typeLabel": "string"
                                },
                                "indices": {
                                  "type": "array",
                                  "items": {
                                    "type": "integer",
                                    "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].indices.items.[INDEX]",
                                    "typeLabel": "integer"
                                  },
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].indices",
                                  "typeLabel": "integer[]"
                                },
                                "url": {
                                  "type": "string",
                                  "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].url",
                                  "typeLabel": "string"
                                }
                              },
                              "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX]",
                              "typeLabel": "object"
                            },
                            "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url.urls",
                            "typeLabel": "object[]"
                          }
                        },
                        "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities.url",
                        "typeLabel": "object"
                      }
                    },
                    "uniqueKey": "replies.items.[INDEX].author.profile_bio.entities",
                    "typeLabel": "object"
                  }
                },
                "uniqueKey": "replies.items.[INDEX].author.profile_bio",
                "typeLabel": "object"
              }
            },
            "description": "The user who posted the tweet",
            "uniqueKey": "replies.items.[INDEX].author",
            "typeLabel": "object"
          },
          "entities": {
            "type": "object",
            "properties": {
              "hashtags": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "indices": {
                      "type": "array",
                      "items": {
                        "type": "integer",
                        "uniqueKey": "replies.items.[INDEX].entities.hashtags.items.[INDEX].indices.items.[INDEX]",
                        "typeLabel": "integer"
                      },
                      "uniqueKey": "replies.items.[INDEX].entities.hashtags.items.[INDEX].indices",
                      "typeLabel": "integer[]"
                    },
                    "text": {
                      "type": "string",
                      "uniqueKey": "replies.items.[INDEX].entities.hashtags.items.[INDEX].text",
                      "typeLabel": "string"
                    }
                  },
                  "uniqueKey": "replies.items.[INDEX].entities.hashtags.items.[INDEX]",
                  "typeLabel": "object"
                },
                "uniqueKey": "replies.items.[INDEX].entities.hashtags",
                "typeLabel": "object[]"
              },
              "urls": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "display_url": {
                      "type": "string",
                      "uniqueKey": "replies.items.[INDEX].entities.urls.items.[INDEX].display_url",
                      "typeLabel": "string"
                    },
                    "expanded_url": {
                      "type": "string",
                      "uniqueKey": "replies.items.[INDEX].entities.urls.items.[INDEX].expanded_url",
                      "typeLabel": "string"
                    },
                    "indices": {
                      "type": "array",
                      "items": {
                        "type": "integer",
                        "uniqueKey": "replies.items.[INDEX].entities.urls.items.[INDEX].indices.items.[INDEX]",
                        "typeLabel": "integer"
                      },
                      "uniqueKey": "replies.items.[INDEX].entities.urls.items.[INDEX].indices",
                      "typeLabel": "integer[]"
                    },
                    "url": {
                      "type": "string",
                      "uniqueKey": "replies.items.[INDEX].entities.urls.items.[INDEX].url",
                      "typeLabel": "string"
                    }
                  },
                  "uniqueKey": "replies.items.[INDEX].entities.urls.items.[INDEX]",
                  "typeLabel": "object"
                },
                "uniqueKey": "replies.items.[INDEX].entities.urls",
                "typeLabel": "object[]"
              },
              "user_mentions": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id_str": {
                      "type": "string",
                      "description": "The ID of the user being mentioned",
                      "uniqueKey": "replies.items.[INDEX].entities.user_mentions.items.[INDEX].id_str",
                      "typeLabel": "string"
                    },
                    "name": {
                      "type": "string",
                      "description": "The name of the user being mentioned",
                      "uniqueKey": "replies.items.[INDEX].entities.user_mentions.items.[INDEX].name",
                      "typeLabel": "string"
                    },
                    "screen_name": {
                      "type": "string",
                      "description": "The screen name of the user being mentioned",
                      "uniqueKey": "replies.items.[INDEX].entities.user_mentions.items.[INDEX].screen_name",
                      "typeLabel": "string"
                    }
                  },
                  "uniqueKey": "replies.items.[INDEX].entities.user_mentions.items.[INDEX]",
                  "typeLabel": "object"
                },
                "uniqueKey": "replies.items.[INDEX].entities.user_mentions",
                "typeLabel": "object[]"
              }
            },
            "description": "The entities in the tweet.eg. hashtags,urls,mentions",
            "uniqueKey": "replies.items.[INDEX].entities",
            "typeLabel": "object"
          },
          "quoted_tweet": {
            "$circularRef": "2b5fa7d7-8d07-4f45-9ef7-91c2daddd7f0",
            "description": "The tweet being quoted.may be null",
            "uniqueKey": "replies.items.[INDEX].quoted_tweet",
            "typeLabel": "any"
          },
          "retweeted_tweet": {
            "$circularRef": "2b5fa7d7-8d07-4f45-9ef7-91c2daddd7f0",
            "description": "The tweet being retweeted.may be null",
            "uniqueKey": "replies.items.[INDEX].retweeted_tweet",
            "typeLabel": "any"
          },
          "isLimitedReply": {
            "type": "boolean",
            "description": "Whether the tweet is a limited reply. Possible restrictions: only mentioned users, verified users, or followed accounts can reply",
            "uniqueKey": "replies.items.[INDEX].isLimitedReply",
            "typeLabel": "boolean"
          }
        },
        "uniqueKey": "replies.items.[INDEX]",
        "typeLabel": "object"
      },
      "description": "Array of reply tweets",
      "uniqueKey": "replies",
      "typeLabel": "object[]"
    },
    "has_next_page": {
      "type": "boolean",
      "description": "Indicates if there are more results available. If true, use next_cursor to fetch the next page.",
      "uniqueKey": "has_next_page",
      "typeLabel": "boolean"
    },
    "next_cursor": {
      "type": "string",
      "description": "Cursor for fetching the next page of results",
      "uniqueKey": "next_cursor",
      "typeLabel": "string"
    },
    "status": {
      "type": "string",
      "description": "Status of the request. success or error",
      "enum": [
        "success",
        "error"
      ],
      "uniqueKey": "status",
      "typeLabel": "enum<string>"
    },
    "message": {
      "type": "string",
      "description": "Message of the request. error message",
      "uniqueKey": "message",
      "typeLabel": "string"
    }
  },
  "uniqueKey": "",
  "typeLabel": "object"
}
```

### get_tweet_by_ids
- **Description:** get tweet by tweet ids
- **Method + Path:** `GET /twitter/tweets`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/tweets' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'tweet_ids=1887346801234567890' \
  --data-urlencode 
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: tweets, status, message.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes
- **Full response schema (live docs):**
```json
{
  "type": "object",
  "properties": {
    "tweets": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "tweet"
            ],
            "uniqueKey": "tweets.items.[INDEX].type",
            "typeLabel": "enum<string>"
          },
          "id": {
            "type": "string",
            "description": "The ID of the tweet",
            "uniqueKey": "tweets.items.[INDEX].id",
            "typeLabel": "string"
          },
          "url": {
            "type": "string",
            "description": "The URL of the tweet",
            "uniqueKey": "tweets.items.[INDEX].url",
            "typeLabel": "string"
          },
          "text": {
            "type": "string",
            "description": "The text of the tweet",
            "uniqueKey": "tweets.items.[INDEX].text",
            "typeLabel": "string"
          },
          "source": {
            "type": "string",
            "description": "The source of the tweet.eg. \"Twitter for iPhone\"",
            "uniqueKey": "tweets.items.[INDEX].source",
            "typeLabel": "string"
          },
          "retweetCount": {
            "type": "integer",
            "description": "The number of times the tweet has been retweeted",
            "uniqueKey": "tweets.items.[INDEX].retweetCount",
            "typeLabel": "integer"
          },
          "replyCount": {
            "type": "integer",
            "description": "The number of times the tweet has been replied to",
            "uniqueKey": "tweets.items.[INDEX].replyCount",
            "typeLabel": "integer"
          },
          "likeCount": {
            "type": "integer",
            "description": "The number of times the tweet has been liked",
            "uniqueKey": "tweets.items.[INDEX].likeCount",
            "typeLabel": "integer"
          },
          "quoteCount": {
            "type": "integer",
            "description": "The number of times the tweet has been quoted",
            "uniqueKey": "tweets.items.[INDEX].quoteCount",
            "typeLabel": "integer"
          },
          "viewCount": {
            "type": "integer",
            "description": "The number of times the tweet has been viewed",
            "uniqueKey": "tweets.items.[INDEX].viewCount",
            "typeLabel": "integer"
          },
          "createdAt": {
            "type": "string",
            "description": "The date and time the tweet was created.eg. Tue Dec 10 07:00:30 +0000 2024",
            "uniqueKey": "tweets.items.[INDEX].createdAt",
            "typeLabel": "string"
          },
          "lang": {
            "type": "string",
            "description": "The language of the tweet.eg. \"en\".may be empty",
            "uniqueKey": "tweets.items.[INDEX].lang",
            "typeLabel": "string"
          },
          "bookmarkCount": {
            "type": "integer",
            "description": "The number of times the tweet has been bookmarked",
            "uniqueKey": "tweets.items.[INDEX].bookmarkCount",
            "typeLabel": "integer"
          },
          "isReply": {
            "type": "boolean",
            "description": "Indicates if the tweet is a reply",
            "uniqueKey": "tweets.items.[INDEX].isReply",
            "typeLabel": "boolean"
          },
          "inReplyToId": {
            "type": "string",
            "description": "The ID of the tweet being replied to.may be empty",
            "uniqueKey": "tweets.items.[INDEX].inReplyToId",
            "typeLabel": "string"
          },
          "conversationId": {
            "type": "string",
            "description": "The ID of the conversation the tweet is part of.may be empty",
            "uniqueKey": "tweets.items.[INDEX].conversationId",
            "typeLabel": "string"
          },
          "displayTextRange": {
            "type": "array",
            "description": "specifies the UTF-16 code unit indices in full_text that define the visible portion of a Tweet.eg\"@jack Thanks for the update!\",display_text_range is [6, 28]",
            "items": {
              "type": "integer",
              "uniqueKey": "tweets.items.[INDEX].displayTextRange.items.[INDEX]",
              "typeLabel": "integer"
            },
            "uniqueKey": "tweets.items.[INDEX].displayTextRange",
            "typeLabel": "integer[]"
          },
          "inReplyToUserId": {
            "type": "string",
            "description": "The ID of the user being replied to.may be empty",
            "uniqueKey": "tweets.items.[INDEX].inReplyToUserId",
            "typeLabel": "string"
          },
          "inReplyToUsername": {
            "type": "string",
            "description": "The username of the user being replied to.may be empty",
            "uniqueKey": "tweets.items.[INDEX].inReplyToUsername",
            "typeLabel": "string"
          },
          "author": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "user"
                ],
                "uniqueKey": "tweets.items.[INDEX].author.type",
                "typeLabel": "enum<string>"
              },
              "userName": {
                "type": "string",
                "description": "The username of the Twitter user",
                "uniqueKey": "tweets.items.[INDEX].author.userName",
                "typeLabel": "string"
              },
              "url": {
                "type": "string",
                "description": "The x.com URL of the user's profile",
                "uniqueKey": "tweets.items.[INDEX].author.url",
                "typeLabel": "string"
              },
              "id": {
                "type": "string",
                "description": "The unique identifier of the user",
                "uniqueKey": "tweets.items.[INDEX].author.id",
                "typeLabel": "string"
              },
              "name": {
                "type": "string",
                "description": "The display name of the user",
                "uniqueKey": "tweets.items.[INDEX].author.name",
                "typeLabel": "string"
              },
              "isBlueVerified": {
                "type": "boolean",
                "description": "Whether the user has Twitter Blue verification",
                "uniqueKey": "tweets.items.[INDEX].author.isBlueVerified",
                "typeLabel": "boolean"
              },
              "verifiedType": {
                "type": "string",
                "description": "The type of verification. eg. \"government\" ,can be empty",
                "uniqueKey": "tweets.items.[INDEX].author.verifiedType",
                "typeLabel": "string"
              },
              "profilePicture": {
                "type": "string",
                "description": "URL of the user's profile picture",
                "uniqueKey": "tweets.items.[INDEX].author.profilePicture",
                "typeLabel": "string"
              },
              "coverPicture": {
                "type": "string",
                "description": "URL of the user's cover picture",
                "uniqueKey": "tweets.items.[INDEX].author.coverPicture",
                "typeLabel": "string"
              },
              "description": {
                "type": "string",
                "description": "The user's profile description",
                "uniqueKey": "tweets.items.[INDEX].author.description",
                "typeLabel": "string"
              },
              "location": {
                "type": "string",
                "description": "The user's location.for example: 東京の端っこ . may be empty",
                "uniqueKey": "tweets.items.[INDEX].author.location",
                "typeLabel": "string"
              },
              "followers": {
                "type": "integer",
                "description": "Number of followers",
                "uniqueKey": "tweets.items.[INDEX].author.followers",
                "typeLabel": "integer"
              },
              "following": {
                "type": "integer",
                "description": "Number of accounts following",
                "uniqueKey": "tweets.items.[INDEX].author.following",
                "typeLabel": "integer"
              },
              "canDm": {
                "type": "boolean",
                "description": "Whether the user can receive DMs",
                "uniqueKey": "tweets.items.[INDEX].author.canDm",
                "typeLabel": "boolean"
              },
              "createdAt": {
                "type": "string",
                "description": "When the account was created.for example: Thu Dec 13 08:41:26 +0000 2007",
                "uniqueKey": "tweets.items.[INDEX].author.createdAt",
                "typeLabel": "string"
              },
              "favouritesCount": {
                "type": "integer",
                "description": "Number of favorites",
                "uniqueKey": "tweets.items.[INDEX].author.favouritesCount",
                "typeLabel": "integer"
              },
              "hasCustomTimelines": {
                "type": "boolean",
                "description": "Whether the user has custom timelines",
                "uniqueKey": "tweets.items.[INDEX].author.hasCustomTimelines",
                "typeLabel": "boolean"
              },
              "isTranslator": {
                "type": "boolean",
                "description": "Whether the user is a translator",
                "uniqueKey": "tweets.items.[INDEX].author.isTranslator",
                "typeLabel": "boolean"
              },
              "mediaCount": {
                "type": "integer",
                "description": "Number of media posts",
                "uniqueKey": "tweets.items.[INDEX].author.mediaCount",
                "typeLabel": "integer"
              },
              "statusesCount": {
                "type": "integer",
                "description": "Number of status updates",
                "uniqueKey": "tweets.items.[INDEX].author.statusesCount",
                "typeLabel": "integer"
              },
              "withheldInCountries": {
                "type": "array",
                "items": {
                  "type": "string",
                  "uniqueKey": "tweets.items.[INDEX].author.withheldInCountries.items.[INDEX]",
                  "typeLabel": "string"
                },
                "description": "Countries where the account is withheld",
                "uniqueKey": "tweets.items.[INDEX].author.withheldInCountries",
                "typeLabel": "string[]"
              },
              "affiliatesHighlightedLabel": {
                "type": "object",
                "uniqueKey": "tweets.items.[INDEX].author.affiliatesHighlightedLabel",
                "typeLabel": "object"
              },
              "possiblySensitive": {
                "type": "boolean",
                "description": "Whether the account may contain sensitive content",
                "uniqueKey": "tweets.items.[INDEX].author.possiblySensitive",
                "typeLabel": "boolean"
              },
              "pinnedTweetIds": {
                "type": "array",
                "items": {
                  "type": "string",
                  "uniqueKey": "tweets.items.[INDEX].author.pinnedTweetIds.items.[INDEX]",
                  "typeLabel": "string"
                },
                "description": "IDs of pinned tweets",
                "uniqueKey": "tweets.items.[INDEX].author.pinnedTweetIds",
                "typeLabel": "string[]"
              },
              "isAutomated": {
                "type": "boolean",
                "description": "Whether the account is automated",
                "uniqueKey": "tweets.items.[INDEX].author.isAutomated",
                "typeLabel": "boolean"
              },
              "automatedBy": {
                "type": "string",
                "description": "The account that automated the account",
                "uniqueKey": "tweets.items.[INDEX].author.automatedBy",
                "typeLabel": "string"
              },
              "unavailable": {
                "type": "boolean",
                "description": "Whether the account is unavailable",
                "uniqueKey": "tweets.items.[INDEX].author.unavailable",
                "typeLabel": "boolean"
              },
              "message": {
                "type": "string",
                "description": "The message of the account.eg. \"This account is unavailable\" or \"This account is suspended\"",
                "uniqueKey": "tweets.items.[INDEX].author.message",
                "typeLabel": "string"
              },
              "unavailableReason": {
                "type": "string",
                "description": "The reason the account is unavailable.eg. \"suspended\" ",
                "uniqueKey": "tweets.items.[INDEX].author.unavailableReason",
                "typeLabel": "string"
              },
              "profile_bio": {
                "type": "object",
                "properties": {
                  "description": {
                    "type": "string",
                    "uniqueKey": "tweets.items.[INDEX].author.profile_bio.description",
                    "typeLabel": "string"
                  },
                  "entities": {
                    "type": "object",
                    "properties": {
                      "description": {
                        "type": "object",
                        "properties": {
                          "urls": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "display_url": {
                                  "type": "string",
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].display_url",
                                  "typeLabel": "string"
                                },
                                "expanded_url": {
                                  "type": "string",
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].expanded_url",
                                  "typeLabel": "string"
                                },
                                "indices": {
                                  "type": "array",
                                  "items": {
                                    "type": "integer",
                                    "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].indices.items.[INDEX]",
                                    "typeLabel": "integer"
                                  },
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].indices",
                                  "typeLabel": "integer[]"
                                },
                                "url": {
                                  "type": "string",
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX].url",
                                  "typeLabel": "string"
                                }
                              },
                              "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls.items.[INDEX]",
                              "typeLabel": "object"
                            },
                            "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description.urls",
                            "typeLabel": "object[]"
                          }
                        },
                        "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.description",
                        "typeLabel": "object"
                      },
                      "url": {
                        "type": "object",
                        "properties": {
                          "urls": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "display_url": {
                                  "type": "string",
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].display_url",
                                  "typeLabel": "string"
                                },
                                "expanded_url": {
                                  "type": "string",
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].expanded_url",
                                  "typeLabel": "string"
                                },
                                "indices": {
                                  "type": "array",
                                  "items": {
                                    "type": "integer",
                                    "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].indices.items.[INDEX]",
                                    "typeLabel": "integer"
                                  },
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].indices",
                                  "typeLabel": "integer[]"
                                },
                                "url": {
                                  "type": "string",
                                  "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX].url",
                                  "typeLabel": "string"
                                }
                              },
                              "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls.items.[INDEX]",
                              "typeLabel": "object"
                            },
                            "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url.urls",
                            "typeLabel": "object[]"
                          }
                        },
                        "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities.url",
                        "typeLabel": "object"
                      }
                    },
                    "uniqueKey": "tweets.items.[INDEX].author.profile_bio.entities",
                    "typeLabel": "object"
                  }
                },
                "uniqueKey": "tweets.items.[INDEX].author.profile_bio",
                "typeLabel": "object"
              }
            },
            "description": "The user who posted the tweet",
            "uniqueKey": "tweets.items.[INDEX].author",
            "typeLabel": "object"
          },
          "entities": {
            "type": "object",
            "properties": {
              "hashtags": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "indices": {
                      "type": "array",
                      "items": {
                        "type": "integer",
                        "uniqueKey": "tweets.items.[INDEX].entities.hashtags.items.[INDEX].indices.items.[INDEX]",
                        "typeLabel": "integer"
                      },
                      "uniqueKey": "tweets.items.[INDEX].entities.hashtags.items.[INDEX].indices",
                      "typeLabel": "integer[]"
                    },
                    "text": {
                      "type": "string",
                      "uniqueKey": "tweets.items.[INDEX].entities.hashtags.items.[INDEX].text",
                      "typeLabel": "string"
                    }
                  },
                  "uniqueKey": "tweets.items.[INDEX].entities.hashtags.items.[INDEX]",
                  "typeLabel": "object"
                },
                "uniqueKey": "tweets.items.[INDEX].entities.hashtags",
                "typeLabel": "object[]"
              },
              "urls": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "display_url": {
                      "type": "string",
                      "uniqueKey": "tweets.items.[INDEX].entities.urls.items.[INDEX].display_url",
                      "typeLabel": "string"
                    },
                    "expanded_url": {
                      "type": "string",
                      "uniqueKey": "tweets.items.[INDEX].entities.urls.items.[INDEX].expanded_url",
                      "typeLabel": "string"
                    },
                    "indices": {
                      "type": "array",
                      "items": {
                        "type": "integer",
                        "uniqueKey": "tweets.items.[INDEX].entities.urls.items.[INDEX].indices.items.[INDEX]",
                        "typeLabel": "integer"
                      },
                      "uniqueKey": "tweets.items.[INDEX].entities.urls.items.[INDEX].indices",
                      "typeLabel": "integer[]"
                    },
                    "url": {
                      "type": "string",
                      "uniqueKey": "tweets.items.[INDEX].entities.urls.items.[INDEX].url",
                      "typeLabel": "string"
                    }
                  },
                  "uniqueKey": "tweets.items.[INDEX].entities.urls.items.[INDEX]",
                  "typeLabel": "object"
                },
                "uniqueKey": "tweets.items.[INDEX].entities.urls",
                "typeLabel": "object[]"
              },
              "user_mentions": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id_str": {
                      "type": "string",
                      "description": "The ID of the user being mentioned",
                      "uniqueKey": "tweets.items.[INDEX].entities.user_mentions.items.[INDEX].id_str",
                      "typeLabel": "string"
                    },
                    "name": {
                      "type": "string",
                      "description": "The name of the user being mentioned",
                      "uniqueKey": "tweets.items.[INDEX].entities.user_mentions.items.[INDEX].name",
                      "typeLabel": "string"
                    },
                    "screen_name": {
                      "type": "string",
                      "description": "The screen name of the user being mentioned",
                      "uniqueKey": "tweets.items.[INDEX].entities.user_mentions.items.[INDEX].screen_name",
                      "typeLabel": "string"
                    }
                  },
                  "uniqueKey": "tweets.items.[INDEX].entities.user_mentions.items.[INDEX]",
                  "typeLabel": "object"
                },
                "uniqueKey": "tweets.items.[INDEX].entities.user_mentions",
                "typeLabel": "object[]"
              }
            },
            "description": "The entities in the tweet.eg. hashtags,urls,mentions",
            "uniqueKey": "tweets.items.[INDEX].entities",
            "typeLabel": "object"
          },
          "quoted_tweet": {
            "$circularRef": "2b5fa7d7-8d07-4f45-9ef7-91c2daddd7f0",
            "description": "The tweet being quoted.may be null",
            "uniqueKey": "tweets.items.[INDEX].quoted_tweet",
            "typeLabel": "any"
          },
          "retweeted_tweet": {
            "$circularRef": "2b5fa7d7-8d07-4f45-9ef7-91c2daddd7f0",
            "description": "The tweet being retweeted.may be null",
            "uniqueKey": "tweets.items.[INDEX].retweeted_tweet",
            "typeLabel": "any"
          },
          "isLimitedReply": {
            "type": "boolean",
            "description": "Whether the tweet is a limited reply. Possible restrictions: only mentioned users, verified users, or followed accounts can reply",
            "uniqueKey": "tweets.items.[INDEX].isLimitedReply",
            "typeLabel": "boolean"
          }
        },
        "uniqueKey": "tweets.items.[INDEX]",
        "typeLabel": "object"
      },
      "description": "Array of tweets",
      "isRequired": true,
      "uniqueKey": "tweets",
      "typeLabel": "object[]"
    },
    "status": {
      "type": "string",
      "description": "Status of the request.success or error",
      "enum": [
        "success",
        "error"
      ],
      "isRequired": true,
      "uniqueKey": "status",
      "typeLabel": "enum<string>"
    },
    "message": {
      "type": "string",
      "description": "Message of the request.error message",
      "isRequired": true,
      "uniqueKey": "message",
      "typeLabel": "string"
    }
  },
  "required": [
    "tweets",
    "status",
    "message"
  ],
  "uniqueKey": "",
  "typeLabel": "object"
}
```

### get_tweet_quote
- **Description:** get tweet quotes by tweet id.Each page returns exactly 20 quotes. Use cursor for pagination. Order by quote time desc
- **Method + Path:** `GET /twitter/tweet/quotes`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/tweet/quotes' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'tweetId=1887346801234567890' \
  --data-urlencode 'sinceTime=1704067200' \
  --data-urlencode 'untilTime=1706745600' \
  --data-urlencode 'includeReplies=true' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: tweets, has_next_page, next_cursor, status, message.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes

### get_tweet_retweeter
- **Description:** get tweet retweeters by tweet id.Each page returns about 100 retweeters. Use cursor for pagination. Order by retweet time desc
- **Method + Path:** `GET /twitter/tweet/retweeters`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/tweet/retweeters' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'tweetId=1887346801234567890' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: users, has_next_page, next_cursor, status, message.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes

### get_tweet_thread_context
- **Description:** Get the thread context of a tweet.Suppose a tweet thread consists of t1, t2 (replying to t1), t3 (replying to t2), and t4, t5, t6 (all replying to t3). If we provide an API where you input t3 and receive t1, t2, t3, t4, t5, t6.Pagination is supported.The pagination size cannot be set (due to Twitter's limitations), and the data returned per page is not fixed.
- **Method + Path:** `GET /twitter/tweet/thread_context`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/tweet/thread_context' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'tweetId=1887346801234567890' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: replies, has_next_page, next_cursor, status, message.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes

### get_community_tweets
- **Description:** Get tweets of a community. Page size is 20. Order by creation time desc.
- **Method + Path:** `GET /twitter/community/tweets`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/community/tweets' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'community_id=1887346801234567890' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: tweets, has_next_page, next_cursor, status, msg.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes

### add_webhook_rule
- **Description:** Add a tweet filter rule. Default rule is not activated.You must call update_rule to activate the rule.
- **Method + Path:** `POST /oapi/tweet_filter/add_rule`
- **Auth:** api_key
- **Curl:**
```bash
curl -X POST 'https://api.twitterapi.io/oapi/tweet_filter/add_rule' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl example.
- Response schema (condensed): top-level fields: rule_id, status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

### get_webhook_rules
- **Description:** Get all tweet filter rules.Rule can be used in webhook and websocket.You can also modify the rule in our web page.
- **Method + Path:** `GET /oapi/tweet_filter/get_rules`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/oapi/tweet_filter/get_rules' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: rules, status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

### update_webhook_rule
- **Description:** Update a tweet filter rule. You must set all parameters.
- **Method + Path:** `POST /oapi/tweet_filter/update_rule`
- **Auth:** api_key
- **Curl:**
```bash
curl -X POST 'https://api.twitterapi.io/oapi/tweet_filter/update_rule' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl example.
- Response schema (condensed): top-level fields: status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

### delete_webhook_rule
- **Description:** Delete a tweet filter rule. You must set all parameters.
- **Method + Path:** `DELETE /oapi/tweet_filter/delete_rule`
- **Auth:** api_key
- **Curl:**
```bash
curl -X DELETE 'https://api.twitterapi.io/oapi/tweet_filter/delete_rule' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl example.
- Response schema (condensed): top-level fields: status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

## Users & Graph

### batch_get_user_by_userids
- **Description:** Batch get user info by user ids. Pricing:
- **Method + Path:** `GET /twitter/user/batch_info_by_ids`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/user/batch_info_by_ids' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'userIds=1887346801234567890' \
  --data-urlencode 
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: users, status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

### get_user_by_username
- **Description:** Get user info by screen name
- **Method + Path:** `GET /twitter/user/info`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/user/info' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'userName=elonmusk'
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: data, status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

### get_user_last_tweets
- **Description:** Retrieve tweets by user name.Sort by created_at. Results are paginated, with each page returning up to 20 tweets.If you only need to fetch the latest tweets from a single user very frequently, do not use this API—it will cost you a lot. Instead, please refer to https://twitterapi.io/blog/how-to-monitor-twitter-accounts-for-new-tweets-in-real-time. If you have more than 20 Twitter accounts requiring real-time tweet updates, use https://twitterapi.io/twitter-stream which is the most cost-effective solution.
- **Method + Path:** `GET /twitter/user/last_tweets`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/user/last_tweets' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'userId=1887346801234567890' \
  --data-urlencode 'userName=elonmusk' \
  --data-urlencode 'cursor=' \
  --data-urlencode 'includeReplies=true'
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: tweets, has_next_page, next_cursor, status, message.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes

### get_user_followings
- **Description:** Get user followings. Each page returns exactly 200 followings. Use cursor for pagination.Sorted by follow date. Most recent followings appear on the first page.
- **Method + Path:** `GET /twitter/user/followings`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/user/followings' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'userName=elonmusk' \
  --data-urlencode 'cursor=' \
  --data-urlencode 'pageSize=20'
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: followings, has_next_page, next_cursor, status, message.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes

### get_user_mention
- **Description:** get tweet mentions by user screen name.Each page returns exactly 20 mentions. Use cursor for pagination. Order by mention time desc
- **Method + Path:** `GET /twitter/user/mentions`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/user/mentions' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'userName=elonmusk' \
  --data-urlencode 'sinceTime=1704067200' \
  --data-urlencode 'untilTime=1706745600' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: tweets, has_next_page, next_cursor, status, message.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes

### get_user_verified_followers
- **Description:** Get user verified followers in reverse chronological order (newest first). Returns exactly 20 verified followers per page, sorted by follow date. Most recent followers appear on the first page. Use cursor for pagination through the complete followers list.$0.3 per 1000 followers
- **Method + Path:** `GET /twitter/user/verifiedFollowers`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/user/verifiedFollowers' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'user_id=1887346801234567890' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: followers, status, message.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** $0.3

### get_user_about
- **Description:** Get user profile about by screen name
- **Method + Path:** `GET /twitter/user_about`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/user_about' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'userName=elonmusk'
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: data, status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

### search_user
- **Description:** Search user by keyword
- **Method + Path:** `GET /twitter/user/search`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/user/search' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'query=elon' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: users, has_next_page, next_cursor, status, msg.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes

### check_follow_relationship
- **Description:** Check if the user is following/followed by the target user. Trial operation price: 100 credits per call.
- **Method + Path:** `GET /twitter/user/check_follow_relationship`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/user/check_follow_relationship' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'source_user_name=elonmusk' \
  --data-urlencode 'target_user_name=jack'
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: data, status, message.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

### user_login_v2
- **Description:** Log in directly using your email, username, password, and 2FA secret key. And obtain the Login_cookie,  to post tweets, etc. Please note that the Login_cookie obtained through login_v2 can only be used for APIs with the "v2" suffix, such as create_tweet_v2. Trial operation price: $0.003 per call. We highly recommend enabling 2FA for your login – otherwise, the login_cookie you obtain may be faulty, preventing you from posting tweets.
- **Method + Path:** `POST /twitter/user_login_v2`
- **Auth:** api_key
- **Curl:**
```bash
curl -X POST 'https://api.twitterapi.io/twitter/user_login_v2' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl example.
- Response schema (condensed): top-level fields: login_cookie, status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** $0.003

## Communities, Lists & Spaces

### get_community_by_id
- **Description:** Get community info by community id. Price: 20 credits per call. Note: This API is a bit slow, we are still optimizing it.
- **Method + Path:** `GET /twitter/community/info`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/community/info' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'community_id=1887346801234567890' \
  --data-urlencode 
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: community_info, status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

### get_community_members
- **Description:** Get members of a community. Page size is 20.
- **Method + Path:** `GET /twitter/community/members`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/community/members' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'community_id=1887346801234567890' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: members, has_next_page, next_cursor, status, msg.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes

### get_community_moderators
- **Description:** Get moderators of a community. Page size is 20.
- **Method + Path:** `GET /twitter/community/moderators`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/community/moderators' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'community_id=1887346801234567890' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: members, has_next_page, next_cursor, status, msg.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes

### get_all_community_tweets
- **Description:** get tweets from all communities,each page returns up to 20 tweets. Use cursor for pagination.
- **Method + Path:** `GET /twitter/community/get_tweets_from_all_community`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/community/get_tweets_from_all_community' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'query=elon' \
  --data-urlencode 'queryType=Latest' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: tweets, has_next_page, next_cursor.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes

### get_list_followers
- **Description:** Get followers of a list. Page size is 20.
- **Method + Path:** `GET /twitter/list/followers`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/list/followers' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'list_id=1887346801234567890' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: followers, has_next_page, next_cursor, status, msg.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes

### get_list_members
- **Description:** Get members of a list. Page size is 20.
- **Method + Path:** `GET /twitter/list/members`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/list/members' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'list_id=1887346801234567890' \
  --data-urlencode 'cursor='
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: members, has_next_page, next_cursor, status, msg.
- **Pagination:** cursor param: 'cursor', response field: 'next_cursor'
- **Pricing:** See notes

### get_space_detail
- **Description:** Get spaces detail by space id
- **Method + Path:** `GET /twitter/spaces/detail`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/spaces/detail' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'space_id=1887346801234567890'
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: data, status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

## Login, Webhooks & Monitoring

### check_login
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl example.
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified in live docs.
- **Pricing:** See endpoint notes/default pricing.

## Profile & Safety Actions

### update_avatar_v2
- **Description:** Update your Twitter avatar/profile picture. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.
- **Method + Path:** `PATCH /twitter/update_avatar_v2`
- **Auth:** api_key
- **Curl:**
```bash
curl -X PATCH 'https://api.twitterapi.io/twitter/update_avatar_v2' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl example.
- Response schema (condensed): top-level fields: status, message.
- **Pagination:** Check response for next_cursor
- **Pricing:** $0.003

### update_banner_v2
- **Description:** Update your Twitter banner/header image. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.
- **Method + Path:** `PATCH /twitter/update_banner_v2`
- **Auth:** api_key
- **Curl:**
```bash
curl -X PATCH 'https://api.twitterapi.io/twitter/update_banner_v2' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl example.
- Response schema (condensed): top-level fields: status, message.
- **Pagination:** Check response for next_cursor
- **Pricing:** $0.003

### get_my_info
- **Description:** Get my info
- **Method + Path:** `GET /oapi/my/info`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/oapi/my/info' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: recharge_credits.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

### bookmark_tweet_v2
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl example.
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified in live docs.
- **Pricing:** See endpoint notes/default pricing.

### unbookmark_tweet_v2
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl example.
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified in live docs.
- **Pricing:** See endpoint notes/default pricing.

### block_user_v2
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl example.
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified in live docs.
- **Pricing:** See endpoint notes/default pricing.

### unblock_user_v2
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl example.
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified in live docs.
- **Pricing:** See endpoint notes/default pricing.

### mute_user_v2
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl example.
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified in live docs.
- **Pricing:** See endpoint notes/default pricing.

### unmute_user_v2
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl example.
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified in live docs.
- **Pricing:** See endpoint notes/default pricing.

### get_dm_history
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl example.
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified in live docs.
- **Pricing:** See endpoint notes/default pricing.

### get_dm_conversations
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl example.
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified in live docs.
- **Pricing:** See endpoint notes/default pricing.

## Other Endpoints

### create_tweet_v2
- **Description:** Create a tweet.You must set the login_cookie.You can get the login_cookie from /twitter/user_login_v2.Trial operation price: $0.003 per call.
- **Method + Path:** `POST /twitter/create_tweet_v2`
- **Auth:** api_key
- **Curl:**
```bash
curl -X POST 'https://api.twitterapi.io/twitter/create_tweet_v2' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl
- Response schema (condensed): top-level fields: tweet_id, status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** $0.003

### delete_tweet_v2
- **Description:** Delete a tweet.You must set the login_cookie.You can get the login_cookie from /twitter/user_login_v2.Trial operation price: $0.002 per call.
- **Method + Path:** `POST /twitter/delete_tweet_v2`
- **Auth:** api_key
- **Curl:**
```bash
curl -X POST 'https://api.twitterapi.io/twitter/delete_tweet_v2' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl
- Response schema (condensed): top-level fields: status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** $0.002

### unlike_tweet_v2
- **Description:** Unlike a tweet.You must set the login_cookie.You can get the login_cookie from /twitter/user_login_v2.Trial operation price: $0.002 per call.
- **Method + Path:** `POST /twitter/unlike_tweet_v2`
- **Auth:** api_key
- **Curl:**
```bash
curl -X POST 'https://api.twitterapi.io/twitter/unlike_tweet_v2' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl
- Response schema (condensed): top-level fields: status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** $0.002

### retweet_tweet_v2
- **Description:** Retweet a tweet.You must set the login_cookie.You can get the login_cookie from /twitter/user_login_v2.Trial operation price: $0.002 per call.
- **Method + Path:** `POST /twitter/retweet_tweet_v2`
- **Auth:** api_key
- **Curl:**
```bash
curl -X POST 'https://api.twitterapi.io/twitter/retweet_tweet_v2' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl
- Response schema (condensed): top-level fields: status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** $0.002

### create_community_v2
- **Description:** Create a community.You must set the login_cookies.You can get the login_cookies from /twitter/user_login_v2.Trial operation price: $0.003 per call.
- **Method + Path:** `POST /twitter/create_community_v2`
- **Auth:** api_key
- **Curl:**
```bash
curl -X POST 'https://api.twitterapi.io/twitter/create_community_v2' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl
- Response schema (condensed): top-level fields: community_id, status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** $0.003

### delete_community_v2
- **Description:** Delete a community.You must set the login_cookie.You can get the login_cookie from /twitter/user_login_v2.Trial operation price: $0.003 per call.
- **Method + Path:** `POST /twitter/delete_community_v2`
- **Auth:** api_key
- **Curl:**
```bash
curl -X POST 'https://api.twitterapi.io/twitter/delete_community_v2' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl
- Response schema (condensed): top-level fields: status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** $0.003

### join_community_v2
- **Description:** Join a community.You must set the login_cookie.You can get the login_cookie from /twitter/user_login_v2.Trial operation price: $0.003 per call.
- **Method + Path:** `POST /twitter/join_community_v2`
- **Auth:** api_key
- **Curl:**
```bash
curl -X POST 'https://api.twitterapi.io/twitter/join_community_v2' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl
- Response schema (condensed): top-level fields: community_id, community_name, status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** $0.003

### leave_community_v2
- **Description:** Leave a community.You must set the login_cookie.You can get the login_cookie from /twitter/user_login_v2.Trial operation price: $0.003 per call.
- **Method + Path:** `POST /twitter/leave_community_v2`
- **Auth:** api_key
- **Curl:**
```bash
curl -X POST 'https://api.twitterapi.io/twitter/leave_community_v2' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl
- Response schema (condensed): top-level fields: community_id, community_name, status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** $0.003

### get_trends
- **Description:** Get trends by woeid
- **Method + Path:** `GET /twitter/trends`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/twitter/trends' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'woeid=1887346801234567890' \
  --data-urlencode 'count=20'
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: trends, status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

### add_user_to_monitor_tweet
- **Description:** Add a user to monitor real-time tweets.Monitor tweets from specified accounts, including directly sent tweets, quoted tweets, reply tweets, and retweeted tweets. Please ref:https://twitterapi.io/twitter-stream
- **Method + Path:** `POST /oapi/x_user_stream/add_user_to_monitor_tweet`
- **Auth:** api_key
- **Curl:**
```bash
curl -X POST 'https://api.twitterapi.io/oapi/x_user_stream/add_user_to_monitor_tweet' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl
- Response schema (condensed): top-level fields: status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

### remove_user_to_monitor_tweet
- **Description:** Remove a user from monitor real-time tweets.Please ref:https://twitterapi.io/twitter-stream
- **Method + Path:** `POST /oapi/x_user_stream/remove_user_to_monitor_tweet`
- **Auth:** api_key
- **Curl:**
```bash
curl -X POST 'https://api.twitterapi.io/oapi/x_user_stream/remove_user_to_monitor_tweet' \
  -H 'x-api-key: $KEY' \
  -H 'Content-Type: application/json' \
  --data '{
    "login_cookies": "$COOKIES"
  }'
```
- **Request body fields:** See curl
- Response schema (condensed): top-level fields: status, msg.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

### get_user_to_monitor_tweet
- **Description:** Get the list of users being monitored for real-time tweets. Returns all users that have been added for tweet monitoring. Please ref:https://twitterapi.io/twitter-stream
- **Method + Path:** `GET /oapi/x_user_stream/get_user_to_monitor_tweet`
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io/oapi/x_user_stream/get_user_to_monitor_tweet' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 
```
- **Request body fields:** N/A (GET)
- Response schema (condensed): top-level fields: status, msg, data.
- **Pagination:** Check response for next_cursor
- **Pricing:** See notes

### get_user_likes
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified.
- **Pricing:** default

### create_list
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified.
- **Pricing:** default

### delete_list
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified.
- **Pricing:** default

### add_list_member
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified.
- **Pricing:** default

### remove_list_member
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified.
- **Pricing:** default

### get_list_by_id
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified.
- **Pricing:** default

### get_space_tweets
- **Description:** No description in scrape.
- **Method + Path:** ` `
- **Auth:** api_key
- **Curl:**
```bash
curl -G 'https://api.twitterapi.io' \
  -H 'x-api-key: $KEY'
```
- **Request body fields:** See curl
- Response schema: not published in live docs (key fields unavailable).
- **Pagination:** Not specified.
- **Pricing:** default

## Undocumented Endpoints (from Codex draft only)

> ⚠️ Undocumented — may not be available. These are not present in live-scraped docs pages.

### create_tweet ⚠️ Legacy — prefer v2 equivalents.
- **Method + Path:** `POST /twitter/create_tweet`
- **Auth:** api_key + login_cookies
- **Status:** Not in live docs scrape; use with caution.

### like_tweet ⚠️ Legacy — prefer v2 equivalents.
- **Method + Path:** `POST /twitter/like_tweet`
- **Auth:** api_key + login_cookies
- **Status:** Not in live docs scrape; use with caution.

### login_by_2fa ⚠️ Legacy — prefer v2 equivalents.
- **Method + Path:** `POST /twitter/login_by_2fa`
- **Auth:** api_key + login_cookies
- **Status:** Not in live docs scrape; use with caution.

### login_by_email_or_username ⚠️ Legacy — prefer v2 equivalents.
- **Method + Path:** `POST /twitter/login_by_email_or_username`
- **Auth:** api_key
- **Status:** Not in live docs scrape; use with caution.

### follow_user_v2
- **Method + Path:** `POST /twitter/follow_user_v2`
- **Auth:** api_key + login_cookies
- **Status:** Not in live docs scrape; use with caution.

### like_tweet_v2
- **Method + Path:** `POST /twitter/like_tweet_v2`
- **Auth:** api_key + login_cookies
- **Status:** Not in live docs scrape; use with caution.

### send_dm_v2
- **Method + Path:** `POST /twitter/send_dm_to_user`
- **Auth:** api_key + login_cookies
- **Status:** Not in live docs scrape; use with caution.

### unfollow_user_v2
- **Method + Path:** `POST /twitter/unfollow_user_v2`
- **Auth:** api_key + login_cookies
- **Status:** Not in live docs scrape; use with caution.

### upload_media_v2
- **Method + Path:** `POST /twitter/upload_media_v2`
- **Auth:** api_key + login_cookies
- **Status:** Not in live docs scrape; use with caution.

### update_profile_v2
- **Method + Path:** `PATCH /twitter/update_profile_v2`
- **Auth:** api_key + login_cookies
- **Status:** Not in live docs scrape; use with caution.

### get_article
- **Method + Path:** `GET /twitter/article`
- **Auth:** api_key
- **Status:** Not in live docs scrape; use with caution.

## Workflow Recipes

### Recipe 1: Login → Post Tweet with Media
```bash
# 1. Login
COOKIES=$(curl -s -X POST 'https://api.twitterapi.io/twitter/user_login_v2' \
  -H 'x-api-key: $KEY' -H 'Content-Type: application/json' \
  -d '{"email":"you@mail.com","password":"***","two_factor_secret":"JBSWY3DPEHPK3PXP","proxy":"http://user:pass@proxy:8080"}' \
  | jq -r '.login_cookies')

# 2. Upload media
MEDIA_ID=$(curl -s -X POST 'https://api.twitterapi.io/twitter/upload_media_v2' \
  -H 'x-api-key: $KEY' -H 'Content-Type: application/json' \
  -d "{"login_cookies":"$COOKIES","media_url":"https://example.com/image.jpg","proxy":"http://user:pass@proxy:8080"}" \
  | jq -r '.media_id')

# 3. Create tweet with media
curl -X POST 'https://api.twitterapi.io/twitter/create_tweet_v2' \
  -H 'x-api-key: $KEY' -H 'Content-Type: application/json' \
  -d "{"login_cookies":"$COOKIES","tweet_text":"Hello world!","media_ids":["$MEDIA_ID"]}"
```

### Recipe 2: Search → Engage (like + retweet)
```bash
# 1. Search
TWEET_ID=$(curl -s -G 'https://api.twitterapi.io/twitter/tweet/advanced_search' \
  -H 'x-api-key: $KEY' \
  --data-urlencode 'query=bitcoin lang:en' \
  --data-urlencode 'queryType=Latest' | jq -r '.tweets[0].id')

# 2. Like
curl -X POST 'https://api.twitterapi.io/twitter/like_tweet_v2' \
  -H 'x-api-key: $KEY' -H 'Content-Type: application/json' \
  -d "{"login_cookies":"$COOKIES","tweet_id":"$TWEET_ID"}"

# 3. Retweet
curl -X POST 'https://api.twitterapi.io/twitter/retweet_tweet_v2' \
  -H 'x-api-key: $KEY' -H 'Content-Type: application/json' \
  -d "{"login_cookies":"$COOKIES","tweet_id":"$TWEET_ID"}"
```

### Recipe 3: Paginate Through User's Followers
```bash
CURSOR=""
while true; do
  RESP=$(curl -s -G 'https://api.twitterapi.io/twitter/user/followers' \
    -H 'x-api-key: $KEY' \
    --data-urlencode 'userName=elonmusk' \
    --data-urlencode "cursor=$CURSOR")
  echo "$RESP" | jq '.followers[].userName'
  HAS_NEXT=$(echo "$RESP" | jq -r '.has_next_page')
  [ "$HAS_NEXT" != "true" ] && break
  CURSOR=$(echo "$RESP" | jq -r '.next_cursor')
done
```

### Recipe 4: Monitor Account Tweets (Streaming)
```bash
# 1. Add user to monitor
curl -X POST 'https://api.twitterapi.io/oapi/x_user_stream/add_user_to_monitor_tweet' \
  -H 'x-api-key: $KEY' -H 'Content-Type: application/json' \
  -d '{"userScreenName":"elonmusk"}'

# 2. Set up webhook to receive tweets
curl -X POST 'https://api.twitterapi.io/oapi/tweet_filter/add_rule' \
  -H 'x-api-key: $KEY' -H 'Content-Type: application/json' \
  -d '{"rule":"from:elonmusk","tag":"elon-tweets","webhook_url":"https://your-server.com/webhook"}'
```

## Pricing Appendix

100,000 credits = $1 USD. Minimum charge: 15 credits ($0.00015) per request.

### Read Endpoints (API key only)
| Endpoint | Cost |
|----------|------|
| `tweet_advanced_search` | 15 credits/tweet returned |
| `get_tweet_by_ids` | 15 credits/tweet |
| `get_tweet_replies` / `v2` | 15 credits/tweet returned |
| `get_tweet_quote` | 15 credits/tweet returned |
| `get_tweet_retweeter` | 15 credits/user returned |
| `get_tweet_thread_context` | 15 credits/tweet |
| `get_user_by_username` | 18 credits/user |
| `batch_get_user_by_userids` | 18 credits/user (bulk 100+: 10 credits) |
| `get_user_last_tweets` | 15 credits/tweet returned |
| `get_user_followers` | 15 credits/follower returned |
| `get_user_followings` | 15 credits/following returned |
| `get_user_verified_followers` | $0.30 per 1000 followers |
| `get_user_mention` | 15 credits/tweet returned |
| `get_user_about` | 18 credits/user |
| `search_user` | 18 credits/user returned |
| `get_trends` | 150 credits/call |
| `check_follow_relationship` | 100 credits/call |
| `get_article` | 100 credits/article |
| `get_community_by_id` | 20 credits/call |
| `get_community_tweets` | 15 credits/tweet returned |
| `get_community_members` | 15 credits/member returned |
| `get_list_members` | 150 credits/call |
| `get_list_followers` | 150 credits/call |
| `get_space_detail` | 150 credits/call |

### Write Endpoints (login_cookies required)
| Endpoint | Cost |
|----------|------|
| `create_tweet_v2` | $0.003/call |
| `delete_tweet_v2` | $0.002/call |
| `like_tweet_v2` | $0.002/call |
| `unlike_tweet_v2` | $0.002/call |
| `retweet_tweet_v2` | $0.002/call |
| `follow_user_v2` | $0.002/call |
| `unfollow_user_v2` | $0.002/call |
| `send_dm_v2` | $0.003/call |
| `upload_media_v2` | $0.003/call |
| `update_profile_v2` | $0.003/call |
| `update_avatar_v2` | $0.003/call |
| `update_banner_v2` | $0.003/call |
| `user_login_v2` | $0.003/call |
| `create_community_v2` | $0.003/call |
| `delete_community_v2` | $0.003/call |
| `join_community_v2` | $0.003/call |
| `leave_community_v2` | $0.003/call |

### QPS by Plan
| Credits | QPS |
|---------|-----|
| Free | 1 req/5s |
| 1,000 | 3 |
| 5,000 | 6 |
| 10,000 | 10 |
| 50,000 | 20 |
