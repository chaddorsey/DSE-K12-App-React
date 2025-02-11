#!/bin/bash

# Create data directory if it doesn't exist
mkdir -p public/data

# Copy CSV file if it doesn't exist
if [ ! -f public/data/user_list.csv ]; then
  cp src/features/connections/data/user_list.csv public/data/
fi 