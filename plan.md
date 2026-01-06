# University Bus Route & Schedule Optimizer (Static, Semester Planning)

This document defines a complete, end-to-end plan to design, build, and demonstrate a university bus route optimization system for ~40 buses, ~100 stops, and two daily time slots (morning + evening).  
The system optimizes routes and produces schedules while enforcing hard constraints (capacity, arrival deadline, max ride time) and providing an admin dashboard with side-by-side comparisons of alternative plans.

---

## 1) Product specification

### 1.1 Problem statement

University bus routes are often manually planned and fixed, leading to inefficient travel times, uneven utilization, overcrowding, and avoidable fuel costs.  
The goal is to produce an admin-only web application that computes improved static routes for a semester, based on stops, demand, and realistic road travel times.

### 1.2 Primary users and workflows

**Admin user** (transport office) workflows:

- Import/maintain stops, bus fleet, depots, and demand.
- Choose a scenario (Morning vs Evening) and constraint settings.
- Run optimization to generate:
  - Stop-to-bus assignments.
  - Ordered stop sequence per bus.
  - Estimated timetable (arrival time per stop).
  - Load/occupancy progression per bus.
- Compare:
  - “Strict plan” (serve all stops) vs “Suggestion plan” (drop/merge candidates with penalties).
  - “Keep stop” vs “Drop/Merge stop” what-if results.
- Export reports:
  - Printable route sheets.
  - CSV for archival.
  - (Optional) GTFS-like schedule export for future extensibility. [web:119][web:120]

### 1.3 Core objectives (what “success” means)

Operational objectives:

- Meet all hard constraints:
  - Campus arrival deadline (Morning) is a hard time window.
  - Max route duration (ride time) is 2 hours.
  - Capacity is respected (initially uniform capacity, later per-bus capacity).
- Improve efficiency metrics:
  - Reduce total bus-km (fuel proxy).
  - Reduce total bus-minutes.
  - Reduce max overload risk and spread load more evenly.
- Provide explainability:
  - Show why a route is “better” with clear metrics and diffs.

### 1.4 Non-goals (explicitly out of scope for v1)

- Real-time GPS tracking, live ETA, or real-time traffic integration.
- Student-facing apps.
- Automated ticketing/attendance integration (can be future).

### 1.5 Constraints and assumptions

- Two time slots per day:
  - Morning: many-to-one (multiple origins/depots → campus).
  - Evening: one-to-many (campus → distributed destinations).
- Demand is manual estimate or college-provided data initially.
- Must serve every stop in the strict plan.
- Provide an alternative plan that can recommend dropping/merging stops, but only as a suggestion with comparison UI.

---

## 2) Data requirements & collection plan

### 2.1 “Minimum viable dataset” (must collect before coding optimization)

You can begin implementation once these are available (even rough estimates).

#### A) Stops master

For each stop:

- `stop_id` (stable unique id)
- `stop_name`
- `latitude`, `longitude`
- `locality/zone` (Noida/Gurgaon/Dwarka/etc., optional)
- `active` (boolean)
- Notes:
  - Ensure coordinates are verified on a map (common failure: swapped lat/lon).

How to collect:

- Transport office route sheets (stop names).
- One-time coordinate collection:
  - Use phone GPS/Google Maps manual pin-drop (fast, but manual).
  - Use OSM/Nominatim-based geocoding only sparingly and cache results (avoid bulk requests on public services).

#### B) Depots / start points

Because morning buses may start from different locations, define depots as nodes:

- `depot_id`, `depot_name`, `lat`, `lon`
  Required depots:
- `CAMPUS` depot (always present).
- Any morning start yards / parking / driver start points.

#### C) Time slots + service rules

For each time slot:

- `timeslot_id`: `MORNING`, `EVENING`
- Hard campus arrival deadline time (Morning)
- Max route duration: 120 minutes
- Dwell time per stop (seconds), configurable (start with 30–60 seconds)

#### D) Demand

For each stop and time slot:

- `students_expected` (integer)
- `confidence` level (low/medium/high, optional)
- Notes for special cases (e.g., “only on Tue/Thu” if that exists later)

#### E) Fleet (v1 uniform, v2 heterogenous)

For each bus:

- `bus_id`
- `capacity` (v1: same for all; v2: real values)
- `morning_start_depot_id` (if fixed per bus; otherwise optional and chosen by admin)
- (Optional) bus availability per time slot (if not all 40 run both slots)

### 2.2 “Strongly recommended dataset” (makes the solution realistic)

- Observed travel times (even coarse):
  - For 1–2 weeks, record actual times for a few routes:
    - First stop departure time
    - Campus arrival time
    - Optionally 2–3 intermediate timestamps
- These observations allow static “peak multipliers” to calibrate morning vs evening travel times (traffic-aware but not real-time).

### 2.3 Data formats to standardize early (so you don’t rework later)

Even if you don’t publish GTFS, follow the GTFS mindset (stops, routes, trips, stop_times) so schedules and exports are structured. [web:119][web:120]  
If you later decide to output a GTFS static feed, you’ll already have compatible primitives (stop list + trip stop-times). [web:119]

### 2.4 Data validation checklist (do this before every optimization run)

- Stop coordinates:
  - Must be within Delhi NCR bounding box (basic sanity check).
- No duplicate stop IDs.
- Demand is non-negative integer.
- Fleet capacity is set (default allowed).
- Deadline and max duration are consistent (deadline must allow feasible travel).
- Count of stops ~100; ensure the solver node count matches expectations.

### 2.5 Privacy and operational notes

- Demand data may be sensitive (student counts by neighborhood). Keep the app admin-only and store minimal personal data (ideally none).

---

## 3) Technical architecture (free-first)

### 3.1 High-level components

1. **Admin Web App** (Next.js / React)

- Scenario configuration UI
- Map visualization
- Tables for timetables and loads
- Comparison views and exports

2. **Backend API** (Python, recommended: FastAPI)

- CRUD for stops/demand/fleet
- “Build matrices” job endpoint
- “Optimize” job endpoint
- Export endpoints (CSV/HTML printable)

3. **Routing engine** (self-hosted)

- Computes realistic road travel time/distance between coordinates using OSM road data
- Produces:
  - Pairwise travel-time matrix for Morning
  - Pairwise travel-time matrix for Evening

4. **Optimization engine** (Python OR-Tools)

- Solves VRP with capacity + time windows + max route duration
- OR-Tools directly documents VRP/VRPTW concepts (time matrix, time windows, depot, vehicles). [web:126][web:69]

5. **Database**

- PostgreSQL (recommended) for relational data + PostGIS optional for geo queries
- Store matrices either:
  - In DB tables (fine at N~100), or
  - As versioned files (JSON/NPY) referenced by scenario

### 3.2 Why self-host maps/tiles may be needed (policy + reliability)

OpenStreetMap “tiles” are map images used by the browser to draw the basemap in a slippy map UI. [web:47]  
OSM’s tile usage policy warns that heavy use and offline/prefetch patterns put disproportionate load on community-funded servers and can be blocked, and it explicitly suggests self-hosted tiles or a provider that allows offline/prefetching. [web:47][web:38]  
Plan: use public tiles only for development demos; for anything stable/internal, switch to self-hosted vector/raster tiles.

### 3.3 Basemap options (no satellite needed)

Option A (simplest UI):

- Leaflet + raster tiles (either public during dev or self-hosted later)

Option B (more control, modern):

- MapLibre GL + vector tiles

Self-hosting vector tiles:

- OpenMapTiles docs describe generating your own vector tiles with open-source tools and provide correct attribution guidance. [web:115]

### 3.4 Key API endpoints (v1 contract)

Admin CRUD:

- `GET/POST /stops`
- `GET/POST /depots`
- `GET/POST /demand`
- `GET/POST /fleet`
- `GET/POST /scenarios` (stores config versions)

Routing/matrices:

- `POST /matrices/build` (build morning/evening matrices for a scenario)
- `GET /matrices/{scenario_id}/{timeslot}`

Optimization:

- `POST /optimize` (scenario_id + timeslot + mode=strict/suggested)
- `GET /solutions/{solution_id}`

Exports:

- `GET /solutions/{id}/export.csv`
- `GET /solutions/{id}/print.html`

### 3.5 Versioning and reproducibility

Every run must be reproducible:

- Scenario config version
- Dataset version hash (stops/demand/fleet)
- Matrix version (morning/evening)
- Solver parameters (time limit, heuristic settings)
  Store these together with the solution.

---

## 4) Algorithms & optimization design

### 4.1 Routing engine: what it produces and why it matters

The optimization requires realistic travel times between stops; road-network routing engines compute these times using the real directed graph of roads and restrictions.  
This is fundamentally different from straight-line distance and is necessary for Delhi NCR complexity (one-ways, flyovers, restricted turns, disconnected roads).

### 4.2 Matrix strategy (works well at ~100 stops)

Build two matrices:

- Morning matrix (peak assumptions)
- Evening matrix (peak assumptions)

Traffic-aware static approach:

- Maintain two calibrated profiles/multipliers (morning/evening) using:
  - Heuristic multipliers initially
  - Later, empirical calibration from observed bus times

### 4.3 VRP formulation (what exactly is solved)

Model each time slot as a Vehicle Routing Problem with:

- Nodes = stops + depots
- Vehicles = buses
- Depot behavior:
  - Morning: each vehicle can start from its assigned depot (or from a chosen depot if admin allows)
  - End depot = campus
  - Evening: start depot = campus, end is “route end anywhere” or a modeled end depot
- Demand at nodes = students_expected
- Vehicle capacity = seats
- Travel time between nodes = matrix time
- Service/dwell time per stop (added to time dimension)

OR-Tools VRPTW expects a time matrix, time windows for locations, a number of vehicles, and a depot, and can produce routes with timing. [web:126]  
Capacity constraints and time-window constraints are standard VRP dimensions in OR-Tools’ routing model. [web:69][web:126]

### 4.4 Hard constraints (must never violate in strict mode)

- Capacity: no bus load exceeds capacity.
- Campus arrival deadline (Morning): hard time window at campus depot.
- Max route duration: 120 minutes.
- Serve all stops (strict mode).

### 4.5 Suggested mode (comparison plan)

Goal: show the admin “what could improve if policy changes,” without forcing it.

Suggested relaxations:

- Allow “drop stop” with a high penalty (so it happens only when it strongly improves feasibility/efficiency).
- Allow “merge stops”:
  - Replace stop A with nearby stop B (within X meters) if demand can walk
  - Keep a record of merges for transparency

Outputs must include:

- Exactly which stops were dropped or merged
- Impact on:
  - Total km/time
  - Number of buses needed
  - Max occupancy
  - On-time arrival feasibility

### 4.6 Feasibility-first strategy (important for hard deadlines)

Hard deadlines + capacity can make the problem infeasible.  
Design the solver pipeline to detect infeasibility and provide actionable diagnostics:

- Which constraint caused failure (deadline too strict, not enough buses, capacity too low, max duration too low)
- Minimal changes to restore feasibility (e.g., “add 2 buses” or “extend deadline by 10 minutes”)

### 4.7 Practical performance targets

At ~100 stops and 40 buses, a well-implemented OR-Tools setup with a time limit (e.g., 10–60 seconds) should return good-quality solutions quickly for admin iteration.  
Always provide a “fast run” (quick heuristic) and a “best effort” run (longer time limit) mode.

---

## 5) Execution roadmap (build order, deliverables, testing, demo)

### 5.1 Milestones (recommended)

Milestone 0 — Project scaffold (1–2 days)

- Repo setup (monorepo or two repos)
- Basic CI checks (formatting, linting)
- Docker compose skeleton (db + backend)

Milestone 1 — Data admin MVP (3–7 days)

- CRUD screens:
  - Stops table + map preview
  - Demand editor
  - Fleet editor (uniform capacity allowed)
  - Depots editor
- Import/export CSV in UI

Milestone 2 — Routing + matrix builder (3–10 days)

- Self-host routing engine locally
- Build morning/evening matrices
- Persist matrices and version them
- Add matrix validation:
  - No “infinite/unreachable” edges (or handle them explicitly)

Milestone 3 — Optimization v1 (7–14 days)

- Implement strict VRPTW solver:
  - Capacity
  - Max route duration
  - Morning arrival deadline hard constraint
- Produce solution JSON:
  - Per bus: ordered stop list, ETA list, load list
  - Global metrics

Milestone 4 — Visualization + exports (5–10 days)

- Map route polylines per bus
- Timetable table per bus
- Occupancy chart/table per bus (min/max load)
- Export:
  - CSV route sheets
  - Printable HTML

Milestone 5 — Comparison engine (5–12 days)

- Suggested mode:
  - Drop/merge candidates with penalty
  - Side-by-side compare UI
- “What-if” single stop:
  - Keep vs Drop/Merge
  - Visual diff and metric diff

Milestone 6 — Packaging + demo (3–7 days)

- Seed sample dataset (anonymized)
- One-command local run (Docker compose)
- Demo script:
  - Import → build matrices → optimize morning → optimize evening → compare → export

### 5.2 Testing plan (must include)

Data tests:

- CSV import validation tests
- Coordinate sanity checks
- Demand constraints tests

Routing tests:

- Matrix builder unit tests (dimensions, non-negative, symmetry not assumed)
- Spot-check routes between known stop pairs

Optimization tests:

- Tiny synthetic dataset tests (5–10 stops) with known expected behavior
- Feasibility tests:
  - Too few buses
  - Too strict deadline
  - Too small capacity
- Regression tests:
  - If inputs unchanged, solution metrics shouldn’t drastically degrade (allow solver randomness but track quality bounds)

UI tests:

- Basic smoke tests:
  - Load scenario
  - Render 40 routes without crashing
  - Export works

### 5.3 Deployment plan (free-first)

Development:

- Localhost stack:
  - Next.js
  - FastAPI
  - PostgreSQL
  - Routing engine container

Pilot deployment options:

- College server (ideal if available)
- Single VM
- If later moving to cloud, keep everything containerized and stateless where possible.

Map tiles:

- During development, keep usage light on public servers.
- For stable internal use, generate/host tiles:
  - Vector tiles with OpenMapTiles generation workflow. [web:115]
  - Follow tile usage policy guidance to avoid reliance on community servers for offline/prefetch patterns. [web:47]

### 5.4 Documentation deliverables (what you must submit)

- Architecture diagram (components + data flow)
- Data dictionary (every field definition)
- Optimization formulation:
  - Constraints
  - Objective terms (weights)
  - Hard vs soft rules
- Reproducibility guide:
  - How to run locally
  - How to import data
  - How to generate matrices
  - How to run solver for both slots
- Admin user guide (screens + workflows)
- Evaluation report:
  - Baseline vs optimized metrics on sample/real data

---

├─ README.md
├─ plan.md
├─ .gitignore
├─ .env.example

├─ data/ # ✅ Your current work goes here
│ ├─ raw/ # Raw files as received (never edited)
│ ├─ interim/ # Optional: partially cleaned / mapped
│ ├─ processed/ # Cleaned, validated canonical CSV/JSON
│ ├─ samples/ # Small demo datasets
│ ├─ external/ # OSM extracts, boundary files, etc.
│ └─ README.md # Data dictionary + naming rules

├─ docs/ # Screenshots, diagrams, notes
│ ├─ architecture/
│ ├─ api/
│ └─ decisions/ # ADRs (why you chose X)

├─ web/

├─ services/
│ ├─ api/ # FastAPI backend
│ │ ├─ app/
│ │ │ ├─ main.py # FastAPI entrypoint
│ │ │ ├─ core/ # config, settings, logging
│ │ │ ├─ db/ # session, models, migrations hooks
│ │ │ ├─ modules/ # feature-based modules (recommended)
│ │ │ │ ├─ stops/ # router.py, schemas.py, models.py, service.py
│ │ │ │ ├─ demand/
│ │ │ │ ├─ fleet/
│ │ │ │ ├─ matrices/
│ │ │ │ └─ optimization/
│ │ │ └─ utils/
│ │ ├─ tests/
│ │ ├─ pyproject.toml
│ │
│ └─ routing/ # Routing engine container config/scripts
│ ├─ docker/ # Dockerfiles / compose fragments
│ ├─ profiles/ # morning/evening profiles, speed configs
│ └─ README.md
└─ packages/ # shared libs
│ └─ shared-types/ # zod schemas / OpenAPI client, etc.
