#!/bin/bash

# Kill any existing node processes on port 5001
pkill -f "node.*5001" 2>/dev/null

# Start the server on port 5001
echo "Starting Solo Seller Marketplace Backend on port 5001..."
PORT=5001 node src/server.js
