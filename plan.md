# University Fleet Optimization System (UFOS) - Master Execution Plan

**Region:** Extended NCR (Sohna, Gurugram, Faridabad, Palwal, Noida, Bhiwadi)
**Architecture:** Zero-Operational Cost (Self-Hosted Open Source)

---

## 1. Project Goal
To automate the routing and scheduling of the university bus fleet (40+ buses) using mathematical optimization. The system replaces manual planning with a data-driven approach, reducing fuel costs and ensuring equitable service across the extended NCR region. The architecture is strictly **Zero-Cost**, utilizing self-hosted open-source engines instead of paid APIs.

---

## 2. Directory Structure
*Strict adherence required to keep the monorepo clean.*

```text
university-fleet-optimizer/
├── data/                          # Project Data
│   ├── raw/                       # Human inputs (Excel/CSV of stops, demand)
│   ├── processed/                 # Cleaned JSON/SQL ready for import
│   └── osm/                       # RAW MAP DATA (Ignored by Git)
│       └── india.osm.pbf   # Downloaded from Geofabrik
│
├── routing/                       # Routing Engine Config
│   ├── docker-compose.yml         # Runs OSRM container locally
│   └── profiles/                  # Custom speed profiles (bus.lua)
│
├── api/                           # Backend Service
│   ├── main.py                    # App Entry point
│   ├── config.py                  # Env variables
│   ├── database.py                # DB Connection
│   ├── solver.py                  # Google OR-Tools Logic
│   └── routers/                   # API Endpoints
│
├── web/                           # Frontend Application
│   ├── src/
│   │   ├── app/                   # Next.js Pages & Layouts
│   │   ├── components/            # Map.tsx, Sidebar.tsx, Forms
│   │   └── hooks/                 # useRoutes.ts (TanStack Query)
│   └── public/                    # Static assets
│
├── docker-compose.yml             # Orchestration (Web + API + DB)
└── README.md

```

---

## 3. Phase-by-Phase Execution Plan

### Phase 1: Infrastructure & Data Foundation

**Goal:** A running server, a connected database, and clean data ready for ingestion.

* **Project Setup:**
* Initialize the monorepo structure.
* Set up FastAPI with SQLAlchemy and Pydantic models.
* Initialize Next.js (T3 stack or standard) with Tailwind CSS.
* Create the root `docker-compose.yml` to spin up `api` and `postgres` services.


* **Database Engineering:**
* Design DB Schema:
* `Stops`: `id, name, lat, lon, zone`
* `Buses`: `id, capacity, depot_id`
* `Depots`: `id, lat, lon`


* Write `scripts/import_stops.py` to parse CSVs and insert into DB securely.


* **Routing Setup:**
* Download `india.osm.pbf` from Geofabrik into `data/osm/`.
* Configure OSRM Docker container to mount the data volume and extract the graph.


* **Frontend Foundation:**
* Build the "App Shell": Sidebar navigation, Topbar, and layout containers.
* Create a "Hello World" Map component using `react-leaflet` to prove tiles load from OpenStreetMap public servers.



**Definition of Done:** `docker-compose up` runs without errors. The DB has tables. The Frontend shows a basic map.

---

### Phase 2: The Intelligence Layer (Routing & Matrices)

**Goal:** The system can calculate accurate travel times between any two points in NCR.

* **Routing Logic:**
* **Profile Tuning:** Create `bus.lua` profile for OSRM (lower max speed than cars, higher penalties for U-turns).
* **Validation:** Manually verify travel times (e.g., "Does Palwal -> Sohna take ~50 mins?").


* **Backend Implementation:**
* Build Endpoint: `POST /api/matrix/build`.
* Logic: Fetch all active stops -> Request OSRM `table` service -> Receive 100x100 matrix.
* Implement Caching: Save the calculated matrix to a file/DB to avoid re-calculating on every request.
* Create `DistanceMatrices` table to version-control the travel data.


* **Frontend Implementation:**
* Build "Manage Stops" Screen: A Data Grid to view, edit, and delete stops.



**Definition of Done:** Hitting the API endpoint generates and saves a valid Time/Distance matrix for all university stops.

---

### Phase 3: The Optimization Engine (The Core)

**Goal:** Converting demand and distance into actual bus routes.

* **Optimization Logic:**
* **Implement Solver:** Code the Google OR-Tools `CVRPTW` logic.
* **Hard Constraints:**
* Capacity <= 50 students.
* Max Ride Time <= 120 mins.
* Morning Deadline: 08:45 AM at Campus.


* **Response Formatting:** Convert raw solver output into rich JSON (`Route 1: Stop A -> Stop B -> Campus`).


* **Data Persistence:**
* Design `Solutions` schema to store optimized results (`run_id`, `bus_id`, `stop_sequence`, `arrival_times`).


* **Debugging:**
* Identify and resolve "Unreachable Stops" (nodes isolated on the map graph).



**Definition of Done:** Sending stop data to the `POST /optimize` endpoint returns a valid JSON schedule that respects all constraints.

---

### Phase 4: Frontend Visualization & Dashboard

**Goal:** Making the math visible and interactive.

* **Map Visualization:**
* **Route Rendering:** Parse the optimized JSON geometry and draw colored `Polylines` on the Leaflet map.
* **Interactivity:** Clicking a route in the sidebar highlights it on the map; hovering a stop shows student count.


* **Dashboard UI:**
* **Stats Cards:** Build cards for "Total KM", "Fleet Usage", "Avg Commute Time".
* **Route List:** A sidebar component listing generated routes (Bus 01 to Bus 40).
* **API Integration:** Use **TanStack Query** to fetch optimization results and handle loading states.


* **Geometry Service:**
* Update API to fetch "Turn-by-Turn" geometry from OSRM for the final routes (so lines follow roads, not just straight dots).



**Definition of Done:** The Admin can click "Optimize" and see routes draw dynamically on the map.

---

### Phase 5: Advanced Comparison Features

**Goal:** The "Strict" vs "Suggested" analysis.

* **Backend Scenarios:**
* **Scenario Logic:** Add `allow_dropped_stops` flag to the solver.
* **Comparison Endpoint:** Return two solution objects: `solution_strict` and `solution_suggested`.


* **Frontend Comparison:**
* **Split View:** Build a UI to compare two scenarios side-by-side.
* **Diff Engine:** Highlight changes (e.g., "Stop X Dropped", "Fuel Savings: 12%").
* **Visual Diff:** Render dropped stops as grey/ghost markers on the map.


* **Exports:**
* Build "Export to CSV" for driver route sheets.



**Definition of Done:** Admin can simulate "What if we drop low-demand stops?" and see the cost impact.

---

### Phase 6: Polish & Deployment

**Goal:** Production readiness.

* **Testing:** Full system testing (End-to-End).
* **Deployment:** Create `docker-compose.prod.yml` for single-command deployment.
* **UX Refinement:** Ensure responsiveness for tablet use.
* **Documentation:** Write `README.md` documentation and "How to Update Data" guides.

---