#!/bin/bash

# Prosty skrypt tylko do reindeksacji produktów w MeiliSearch

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Reindeksacja produktów w MeiliSearch...${NC}"

cd /home/ubuntu/medusajs-2.0-for-railway-boilerplate/backend
npx medusa exec ./src/scripts/reindex-products.ts

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Reindeksacja zakończona sukcesem!${NC}"
else
    echo -e "\033[0;31m✗ Błąd podczas reindeksacji!${NC}"
    exit 1
fi

