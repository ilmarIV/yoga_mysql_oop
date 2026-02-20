#!/bin/bash
curl -X POST http://localhost:3020/article/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My First Article",
    "slug": "my-first-article",
    "image": "placeholder_image.png",
    "body": "This is the content of the article.",
    "author_id": 1
  }'
