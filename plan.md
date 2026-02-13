# University Fleet Optimization System (UFOS) - Master Execution Plan

**Region:** Extended NCR (Delhi, Gurugram, Faridabad, Noida, Palwal, Sohna, Bhiwadi, Bahadurgarh, Najafgarh, Rewari, Jhajjar, Nuh, Tauru, Pataudi)
**Architecture:** Zero-Operational Cost (Self-Hosted Open Source)

---

## 1. Project Goal

To automate the routing and scheduling of the university bus fleet (40+ buses) using mathematical optimization. The system replaces manual planning with a data-driven approach, reducing fuel costs and ensuring equitable service across the extended NCR region. The architecture is strictly **Zero-Cost**, utilizing self-hosted open-source engines instead of paid APIs.

---

## 2. Technical Architecture

### Stack Overview

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Frontend** | Next.js + Tailwind CSS | React-based, TanStack Query for data fetching |
| **Backend** | Python FastAPI | SQLAlchemy ORM, Pydantic validation |
| **Optimization** | Google OR-Tools | CVRPTW solver for vehicle routing |
| **Routing Engine** | OSRM (Docker) | Self-hosted, uses OpenStreetMap data |
| **Database** | PostgreSQL | Dockerized, persisted volumes |
| **Map Tiles** | Offline PMTiles | Pre-downloaded for NCR region |
| **Auth** | NextAuth (JWT) | Shared tokens verified by FastAPI |

### Full-Stack Type Safety

```
FastAPI (Python) → OpenAPI spec → openapi-typescript → TypeScript types → Next.js
```

### Authentication Flow

```
User → NextAuth (Next.js) → JWT Token → FastAPI (verify JWT) → Protected Routes
```

---

## 3. Directory Structure

```text
university-fleet-optimizer/
├── data/
│   ├── raw/                       # CSV inputs (stops, buses, demand)
│   ├── processed/                 # Cleaned data for import
│   ├── osm/                       # india.osm.pbf (Git-ignored)
│   └── tiles/                     # Offline PMTiles (Git-ignored)
│
├── routing/                       # OSRM config + bus.lua profile
│
├── api/                           # Python FastAPI backend
│   ├── models/                    # SQLAlchemy models
│   ├── routers/                   # API endpoints
│   ├── services/                  # OSRM client, OR-Tools solver
│   └── scripts/                   # Data import scripts
│
├── web/                           # Next.js frontend
│   ├── src/app/                   # Pages (dashboard, stops, optimize, etc.)
│   ├── src/components/            # Map, DataGrid, Sidebar, etc.
│   └── generated/                 # Auto-generated TypeScript types
│
├── docker-compose.yml             # Development orchestration
└── docker-compose.prod.yml        # Production deployment
```

---

## 4. Data Schemas

### CSV Input Formats

| File | Columns |
|------|---------|
| stops.csv | stop_id, stop_name, latitude, longitude, locality, zone, active |
| buses.csv | bus_id, bus_no, capacity, depot_name |
| demand.csv | stop_id, student_count, semester |

### Database Tables

| Table | Key Columns |
|-------|-------------|
| stops | id, name, lat, lon, zone, active |
| buses | id, bus_no, capacity, depot_id |
| depots | id, name, lat, lon |
| demand | stop_id, student_count, semester |
| distance_matrices | id, matrix_json, created_at |
| solutions | id, scenario_type, routes_json, stats_json, cost_estimate |

---

## 5. Key Constraints

| Constraint | Value |
|------------|-------|
| Max bus capacity | 50 students |
| Max ride time | 120 minutes |
| Campus arrival deadline | 08:45 AM |
| Fleet size | ~40 buses |
| Total stops | 682 |
| Campus location | KRMU Sohna (TBD) |

---

## 6. Phase-by-Phase Execution Plan

---

### Phase 1: Infrastructure & Core Setup

**Goal:** All services running locally, database connected, map displaying with offline tiles.

**Backend:**
- Create `api/` directory with FastAPI structure
- SQLAlchemy models for all tables
- JWT verification middleware (validate NextAuth tokens)
- Local PostgreSQL setup

**Frontend:**
- Keep Next.js T3 stack, add TanStack Query
- Integrate `react-leaflet` with PMTiles (offline tiles)
- Setup `openapi-typescript` for type generation
- Build App Shell: Sidebar, Topbar, Layout
- **Dark Mode toggle** (theme context + Tailwind dark classes)

**Infrastructure:**
- Generate PMTiles for NCR region (all zones from stops.csv)
- OSRM routing engine setup (local installation)

**Definition of Done:** All services run locally. Map shows NCR with offline tiles in light/dark mode.

---

### Phase 2: Data Management

**Goal:** Full CRUD for stops, buses, demand with CSV upload + visual editing.

**Backend:**
- CSV upload endpoints: `POST /api/{stops,buses,demand}/upload`
- CRUD endpoints for all entities
- **Multi-semester support:** Demand table has `semester` column, filter by active semester

**Frontend:**
- Data grid component with inline editing
- CSV upload dropzone with validation feedback
- Map preview showing stop locations
- **Semester selector:** Dropdown to switch between semesters
- Duplicate detection and missing data warnings

**Definition of Done:** Admin can upload CSVs, edit visually, switch semesters. Data persists correctly.

---

### Phase 3: Routing & Distance Matrix

**Goal:** Calculate accurate travel times between any stops.

**Backend:**
- Create `bus.lua` OSRM profile (50 km/h urban, U-turn penalties)
- `POST /api/matrix/build` - Generate N×N time/distance matrix
- `GET /api/matrix/latest` - Retrieve cached matrix
- **Stop clustering suggestions:** Analyze proximity, suggest merges for stops <500m apart

**Frontend:**
- Matrix build UI with progress indicator
- **Clustering suggestions panel:** Show "Consider merging stops A, B, C" with accept/dismiss

**Validation:** Palwal → Sohna should be ~50 mins.

**Definition of Done:** API returns valid matrix. Clustering suggestions appear for nearby stops.

---

### Phase 4: Optimization Engine

**Goal:** Generate optimal bus routes from demand data.

**Backend (OR-Tools CVRPTW):**
- Hard constraints: Capacity ≤50, Ride time ≤120 min, Arrive by 08:45
- Objective: Minimize total distance/time
- Store results in `solutions` table
- **Cost estimation:** Calculate fuel cost (input: ₹/km, output: total route cost)
- Handle edge cases: unreachable stops, infeasible scenarios

**Frontend:**
- Optimization trigger UI
- **Cost display:** Show estimated fuel cost per optimization run
- Loading state with progress

**Definition of Done:** API returns valid routes. Cost estimate displayed.

---

### Phase 5: Visualization & Dashboard

**Goal:** Interactive map and dashboard for route analysis.

**Map Visualization:**
- Color-coded stop markers (by zone)
- Route polylines (unique color per bus, real road geometry from OSRM)
- Click route in sidebar → highlight on map
- Hover stop → popup with student count
- **Demand heatmap layer:** Toggle to show student density

**Route Animation:**
- **Playback mode:** Animate buses moving along routes
- Play/pause controls, speed slider

**Dashboard:**
- KPI Cards: Total KM, Fleet Usage %, Avg Commute, **Estimated Cost**
- Route list with stop count, time, capacity status

**Alerts & Warnings:**
- ⚠️ Route exceeds 120 min ride time
- ⚠️ Bus at >95% capacity
- ⚠️ Stop has 0 students assigned
- Warnings displayed inline on dashboard

**Definition of Done:** Admin sees animated routes on heatmap, warnings displayed automatically.

---

### Phase 6: Comparison & Analysis

**Goal:** Scenario comparison, what-if analysis, historical tracking.

**Backend:**
- `POST /api/scenarios/compare` - Run strict vs suggested optimization
- **Historical solutions:** Store all runs with timestamps
- `GET /api/solutions/history` - List past optimizations

**Frontend:**
- **Split-view comparison:** Strict vs Suggested side-by-side
- Diff highlighting: "Stop X dropped", "Savings: ₹5,000"
- Ghost markers for dropped stops

**What-If Analysis:**
- Sliders: "Add X buses", "Change capacity to Y"
- Quick re-calculation without full optimization
- Show impact on KPIs in real-time

**Historical Comparison:**
- Compare current solution vs previous runs
- Trend graphs: Total KM over time, Cost reduction %

**Definition of Done:** Admin can compare scenarios, adjust what-if sliders, view history trends.

---

### Phase 7: Export & Mobile

**Goal:** Driver-friendly views and exportable reports.

**Exports:**
- `GET /api/export/routes/csv` - Driver route sheets
- `GET /api/export/routes/pdf` - Printable schedules with turn-by-turn

**Driver Mobile View:**
- Read-only responsive page: `/driver/{bus_id}`
- Shows: Route name, stop list with times, basic directions
- Works on phone/tablet
- PWA support for offline access

**Definition of Done:** Drivers can view their routes on mobile. Admin can export CSV/PDF.

---

### Phase 8: Polish & Testing

**Goal:** Polished, well-tested system ready for deployment.

**Testing:**
- API unit tests (pytest)
- Frontend type checking
- E2E tests (Playwright)

**UX Polish:**
- Loading skeletons throughout
- Error handling with user-friendly messages
- Responsive design verification

**Settings & Configuration:**
- Profile & Account Management
- OSRM Routing Engine Configuration (Health, Profile)
- Clustering Threshold Preferences
- System Data Summary & Backup
- Appearance & Theme Settings

**Documentation:**
- README with setup instructions
- "How to Update Data" guide
- API docs (auto from OpenAPI)

**Definition of Done:** All tests pass. Documentation complete.

---

### Phase 9: Docker & Deployment

**Goal:** Production-ready containerized deployment.

**Docker Setup:**
- Create `Dockerfile` for FastAPI backend
- Create `Dockerfile` for Next.js frontend
- Root `docker-compose.yml` (postgres, api, web, osrm)
- `docker-compose.prod.yml` with optimized images
- Configure OSRM Docker with `india.osm.pbf`

**Deployment:**
- Database backup strategy
- Environment variable management
- Health checks and restart policies
- Volume configuration for persistent data

**Definition of Done:** `docker-compose up` runs all services in production mode. System is fully containerized and deployable.

---

## 7. Open Items

- [ ] Campus coordinates (KRMU Sohna exact location)
- [ ] Bus fleet CSV data
- [ ] Demand CSV data (student counts per stop)
- [ ] Depot locations (where buses start)
- [ ] Fuel cost per km (for cost estimation)