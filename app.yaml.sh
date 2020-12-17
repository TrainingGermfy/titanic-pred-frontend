#!/bin/bash
echo """
service: titanic-frontend
runtime: nodejs14
handlers:
  - url: /
    static_files: build/index.html
    upload: build/index.html
  - url: /
    static_dir: build
    http_headers:
      Access-Control-Allow-Origin: "*"
  - url: /.*
    script: auto
    secure: always
env_variables:
  GOOGLE_PROJECT_ID: \"$GOOGLE_PROJECT_ID\"
"""