#!/bin/bash
curl -X PUT http://localhost:3020/article/4 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Article Name",
    "body": "Updated much cooler content here"
  }'
