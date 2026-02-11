#!/bin/bash
# ============================================================
# Start OSRM routing server
# Run: wsl bash scripts/start_osrm.sh
# Server will be available at http://localhost:5000
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
OSM_DIR="$PROJECT_DIR/data/osm"
OSRM_FILE="$OSM_DIR/ncr.osrm"

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

if [ ! -f "${OSRM_FILE}.cell_metrics" ]; then
    echo -e "${RED}[ERROR]${NC} OSRM data not processed. Run setup first:"
    echo "  wsl bash scripts/setup_osrm.sh"
    exit 1
fi

if ! command -v osrm-routed &> /dev/null; then
    echo -e "${RED}[ERROR]${NC} osrm-routed not found. Run setup first:"
    echo "  wsl bash scripts/setup_osrm.sh"
    exit 1
fi

echo -e "${GREEN}Starting OSRM server on http://localhost:5000${NC}"
echo "Press Ctrl+C to stop"
echo ""

osrm-routed --algorithm mld "$OSRM_FILE" --port 5000
