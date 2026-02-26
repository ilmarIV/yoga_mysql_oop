#!/bin/bash
USERNAME="eve"
PASSWORD="eve123"

curl -s -X POST "http://localhost:3020/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}"
echo
