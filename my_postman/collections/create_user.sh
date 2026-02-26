#!/bin/bash
curl -X POST http://localhost:3020/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "eve",
    "email": "eve@example.com",
    "password": "eve123"
  }'
