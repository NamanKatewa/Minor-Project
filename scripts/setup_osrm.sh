#!/bin/bash
# ============================================================
# OSRM Setup Script for WSL (Ubuntu)
# Idempotent — skips steps already completed.
# Run: wsl bash scripts/setup_osrm.sh
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
OSM_DIR="$PROJECT_DIR/data/osm"
PBF_FILE="$OSM_DIR/india.osm.pbf"
NCR_PBF="$OSM_DIR/ncr.osm.pbf"
OSRM_BUILD_DIR="$PROJECT_DIR/.osrm-backend"

# NCR bounding box (same as frontend map component)
# Format for osmium: left,bottom,right,top (lon_min,lat_min,lon_max,lat_max)
NCR_BBOX="76.5,27.83,77.65,28.98"

# Default profile (can be overridden: bash setup_osrm.sh /path/to/bus.lua)
PROFILE="${1:-$OSRM_BUILD_DIR/profiles/car.lua}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log()   { echo -e "${BLUE}[OSRM]${NC} $1"; }
ok()    { echo -e "${GREEN}[DONE]${NC} $1"; }
warn()  { echo -e "${YELLOW}[SKIP]${NC} $1"; }
fail()  { echo -e "${RED}[FAIL]${NC} $1"; exit 1; }

# ── Step 0: Check PBF file ──
if [ ! -f "$PBF_FILE" ]; then
    fail "india.osm.pbf not found at $PBF_FILE"
fi
ok "Found india.osm.pbf ($(du -h "$PBF_FILE" | cut -f1))"

# ── Step 1: Install dependencies ──
log "Step 1: Checking build dependencies..."
DEPS_NEEDED=false
for pkg in cmake g++ libbz2-dev libboost-all-dev liblua5.4-dev libtbb-dev osmium-tool; do
    if ! dpkg -s "$pkg" &> /dev/null; then
        DEPS_NEEDED=true
        break
    fi
done

if [ "$DEPS_NEEDED" = true ]; then
    log "Installing build dependencies..."
    sudo apt-get update -qq
    sudo apt-get install -y \
        build-essential git cmake pkg-config \
        libbz2-dev libxml2-dev libzip-dev \
        libboost-all-dev \
        lua5.4 liblua5.4-dev \
        libtbb-dev \
        osmium-tool \
        wget curl
    ok "Dependencies installed"
else
    warn "Dependencies already installed"
fi

# ── Step 2: Clone OSRM source ──
log "Step 2: Checking OSRM source..."
if [ -d "$OSRM_BUILD_DIR/.git" ]; then
    warn "OSRM source already cloned at $OSRM_BUILD_DIR"
else
    log "Cloning OSRM backend..."
    git clone --depth 1 https://github.com/Project-OSRM/osrm-backend.git "$OSRM_BUILD_DIR"
    ok "OSRM source cloned"
fi

# ── Step 3: Build & Install OSRM ──
log "Step 3: Checking OSRM installation..."
if command -v osrm-routed &> /dev/null; then
    warn "OSRM already installed ($(which osrm-routed))"
else
    log "Building OSRM from source (this takes ~10-20 minutes)..."
    cd "$OSRM_BUILD_DIR"
    mkdir -p build && cd build
    cmake .. -DCMAKE_BUILD_TYPE=Release
    cmake --build . -- -j$(nproc)
    sudo cmake --build . --target install
    sudo ldconfig
    cd "$PROJECT_DIR"
    ok "OSRM built and installed"
fi

# ── Step 4: Crop India PBF to NCR region ──
log "Step 4: Checking NCR extract..."
if [ -f "$NCR_PBF" ]; then
    warn "NCR extract already exists ($(du -h "$NCR_PBF" | cut -f1))"
else
    log "Cropping india.osm.pbf to NCR region (bbox: $NCR_BBOX)..."
    osmium extract -b "$NCR_BBOX" "$PBF_FILE" -o "$NCR_PBF" --overwrite
    ok "NCR extract created ($(du -h "$NCR_PBF" | cut -f1))"
fi

# ── Step 5: Extract, Partition, Customize ──
log "Step 5: Processing NCR data with profile: $(basename "$PROFILE")"

if [ ! -f "$PROFILE" ]; then
    fail "Profile not found: $PROFILE"
fi

if [ -f "$OSM_DIR/ncr.osrm.cell_metrics" ]; then
    warn "NCR data already processed (found .osrm files)"
    echo -e "${YELLOW}  To re-process with a different profile, delete existing files:${NC}"
    echo -e "${YELLOW}  wsl rm /mnt/c/Users/naman/Documents/GitHub/Minor-Project/data/osm/ncr.osrm*${NC}"
else
    log "5a: Extracting road network from NCR data..."
    osrm-extract -p "$PROFILE" "$NCR_PBF"
    ok "Extract complete"

    log "5b: Partitioning..."
    osrm-partition "$OSM_DIR/ncr.osrm"
    ok "Partition complete"

    log "5c: Customizing..."
    osrm-customize "$OSM_DIR/ncr.osrm"
    ok "Customize complete"
fi

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  OSRM is ready! Start it with:${NC}"
echo -e "${GREEN}  wsl bash scripts/start_osrm.sh${NC}"
echo -e "${GREEN}============================================${NC}"
