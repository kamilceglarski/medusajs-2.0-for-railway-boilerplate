#!/bin/bash

# Kolory dla lepszej czytelności
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Medusa Deploy & Reindex Script${NC}"
echo -e "${GREEN}========================================${NC}"

# Krok 1: Usuń cache frontendu
echo -e "\n${YELLOW}[1/4] Czyszczenie cache Next.js...${NC}"
cd /home/ubuntu/medusajs-2.0-for-railway-boilerplate/storefront
rm -rf .next
echo -e "${GREEN}✓ Cache Next.js wyczyszczony${NC}"

# Krok 2: Przejdź do katalogu backend
echo -e "\n${YELLOW}[2/4] Przechodzę do katalogu backend...${NC}"
cd /home/ubuntu/medusajs-2.0-for-railway-boilerplate/backend
echo -e "${GREEN}✓ W katalogu backend${NC}"

# Krok 3: Restart backendu
echo -e "\n${YELLOW}[3/4] Restartowanie Medusa backend...${NC}"
pm2 restart medusa-backend
sleep 5  # Czekaj 5 sekund aby backend się uruchomił
echo -e "${GREEN}✓ Backend zrestartowany${NC}"

# Krok 4: Reindeksacja produktów w MeiliSearch
echo -e "\n${YELLOW}[4/4] Uruchamianie reindeksacji produktów w MeiliSearch...${NC}"
npx medusa exec ./src/scripts/reindex-products.ts

# Sprawdź czy reindeksacja się powiodła
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}========================================${NC}"
    echo -e "${GREEN}  ✓ Deployment zakończony sukcesem!${NC}"
    echo -e "${GREEN}========================================${NC}"
else
    echo -e "\n${RED}========================================${NC}"
    echo -e "${RED}  ✗ Błąd podczas reindeksacji!${NC}"
    echo -e "${RED}========================================${NC}"
    exit 1
fi

# Opcjonalnie: Restart frontendu
echo -e "\n${YELLOW}Czy chcesz zrestartować frontend? (t/n)${NC}"
read -r response
if [[ "$response" =~ ^([tT][aA][kK]|[tT])$ ]]; then
    echo -e "${YELLOW}Restartowanie frontendu...${NC}"
    pm2 restart next-frontend
    echo -e "${GREEN}✓ Frontend zrestartowany${NC}"
fi

echo -e "\n${GREEN}Gotowe!${NC}"

