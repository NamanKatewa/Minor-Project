# HEMS - Route Optimization Documentation

## Table of Contents

1. [Overview](#overview)
2. [Algorithm Implementation](#algorithm-implementation)
3. [Configuration Knobs](#configuration-knobs)
4. [OR-Tools Tuning Options](#or-tools-tuning-options)
5. [Experimental Results](#experimental-results)
6. [Complete Result Analysis](#complete-result-analysis)

---

## Overview

This document describes the route optimization system used in the UFOS (University Fleet Operation System) project. The system uses Google OR-Tools to solve a multi-depot capacitated vehicle routing problem with time windows (MD-CVRPTW) for campus bus route optimization.

---

## Algorithm Implementation

### Problem Type: Multi-Depot CVRPTW

The optimizer solves a **Multi-Depot Capacitated Vehicle Routing Problem with Time Windows (MD-CVRPTW)**:

- **Multiple Depots**: Buses start from different depot locations
- **Capacity Constraints**: Each bus has a maximum passenger capacity (default 50)
- **Time Windows**: Students must arrive at campus by a deadline (default 08:45)
- **Maximum Ride Time**: Students cannot travel more than 350 minutes

### Node Mapping Strategy

The implementation uses an **Integrated Multi-Depot Approach**:

```
Node 0: Virtual Source (Pool of all buses)
Node 1: Campus (End destination)
Nodes 2 to N: Student Stops
```

**Key Innovation**: Instead of treating physical depots as actual nodes in the graph, the system uses a "virtual source" that connects to each stop via the **closest physical depot**. This allows:

- Buses to start from any depot
- Dynamic depot assignment based on the first stop
- Simplified solver convergence

### Solver Pipeline

```
1. Load Distance Matrix (from OSRM)
2. Load Stops with Demand (per semester)
3. Load Available Buses (with depot info)
4. Build CVRPTW Model
   - Create node mapping
   - Build time/cost matrices
   - Add capacity constraints
   - Add time window constraints
   - Add drop penalty for soft constraints
5. Solve using OR-Tools
   - First Solution Strategy (initial route)
   - Local Search Metaheuristic (improvement)
6. Process Road Geometries (OSRM route API)
7. Calculate Statistics & Cost
8. Store Route Plan
```

### Cost Function

```
Total Cost = (Total Distance in km) × (Fuel Cost per km)
```

Default fuel cost: ₹12.33/km

---

## Configuration Knobs

| Parameter                  | Default | Description                  |
| -------------------------- | ------- | ---------------------------- |
| `fuel_cost_per_km`         | 12.33   | Cost per kilometer in ₹      |
| `campus_lat`               | 28.26   | Campus latitude              |
| `campus_lon`               | 77.07   | Campus longitude             |
| `max_bus_capacity`         | 50      | Maximum students per bus     |
| `max_ride_time_min`        | 350     | Maximum ride time in minutes |
| `arrival_deadline`         | "08:45  | Student arrival deadline     |
| `optimization_timeout_sec` | 300     | Solver timeout in seconds    |
| `drop_penalty`             | 100000  | Penalty for dropping a stop  |
| `time_dimension_slack`     | 30      | Time window slack in minutes |
| `fixed_vehicle_cost`       | 1000    | Fixed cost per vehicle used  |

### Strategy Configuration

| Parameter                    | Default               | Description                       |
| ---------------------------- | --------------------- | --------------------------------- |
| `first_solution_strategy`    | "PATH_CHEAPEST_ARC"   | Initial route construction method |
| `local_search_metaheuristic` | "GUIDED_LOCAL_SEARCH" | Local search improvement method   |

---

## OR-Tools Tuning Options

### First Solution Strategy (13 Options)

The first solution strategy determines how the solver builds the **initial valid route** before any optimization.

| Strategy                      | Description                                                          | Best For                   |
| ----------------------------- | -------------------------------------------------------------------- | -------------------------- |
| `PATH_CHEAPEST_ARC`           | Greedy: Start from depot, pick nearest stop, repeat                  | Fast initial solution      |
| `PATH_MOST_CONSTRAINED_ARC`   | Prioritize constrained arcs first                                    | Tight capacity scenarios   |
| `EVALUATOR_STRATEGY`          | Use custom arc cost evaluator                                        | Custom objective functions |
| `SAVINGS`                     | Clarke-Wright algorithm: Start with n routes, merge to save distance | Distance minimization      |
| `SWEEP`                       | Angular sweep from depot                                             | Geographic clustering      |
| `CHRISTOFIDES`                | Graph theory heuristic (metric TSP based)                            | Complex, scattered maps    |
| `ALL_UNPERFORMED`             | Make all nodes inactive                                              | Optional nodes only        |
| `BEST_INSERTION`              | Insert cheapest node at global cheapest position                     | Quality over speed         |
| `PARALLEL_CHEAPEST_INSERTION` | Build all routes simultaneously                                      | Minimize number of buses   |
| `LOCAL_CHEAPEST_INSERTION`    | Insert nodes in creation order                                       | Faster than parallel       |
| `GLOBAL_CHEAPEST_ARC`         | Connect cheapest pair iteratively                                    | Balanced approach          |
| `LOCAL_CHEAPEST_ARC`          | Local cheapest arc selection                                         | Very fast                  |
| `FIRST_UNBOUND_MIN_VALUE`     | First available node                                                 | Deterministic              |
| `AUTOMATIC`                   | Solver chooses automatically                                         | Quick setup                |

### Local Search Metaheuristic (7 Options)

The local search metaheuristic determines how the solver **improves** the initial solution to escape local minima.

| Metaheuristic         | Description                                 | Best For                |
| --------------------- | ------------------------------------------- | ----------------------- |
| `GREEDY_DESCENT`      | Only accept improving moves                 | Fast, simple problems   |
| `GUIDED_LOCAL_SEARCH` | Penalize bad routes to find shortcuts       | Most reliable for VRP   |
| `SIMULATED_ANNEALING` | Temperature-based: accept worse moves early | Global optimization     |
| `TABU_SEARCH`         | Remember recent moves, forbid undoing       | Capacity packing        |
| `GENERIC_TABU_SEARCH` | Tabu on objective value                     | Alternative to standard |
| `AUTOMATIC`           | Solver chooses                              | Default behavior        |
| `GREEDY`              | Alias for GREEDY_DESCENT                    | -                       |

### Other Solver Parameters

| Parameter                | Current             | Description                 |
| ------------------------ | ------------------- | --------------------------- |
| `lns_time_limit.seconds` | 100 (default)       | Time per LNS iteration      |
| `solution_limit`         | kint64max (default) | Maximum solutions to find   |
| `use_full_propagation`   | true (default)      | Full constraint propagation |

---

## Experimental Results

### Test Configuration

- **Date**: 31 March 2026
- **Scenario**: Strict (all constraints enforced)
- **Total Students**: 3,094
- **Available Buses**: ~100 (45 - 50 capacity each)
- **Total Capacity**: ~5,000 seats

### Results Summary Table

| First Solution Strategy     | Local Search        | Buses | Students | Distance   | Cost    |
| --------------------------- | ------------------- | ----- | -------- | ---------- | ------- |
| Local Cheapest Insertion    | Greedy Descent      | 64    | 3,094    | 4,881.9 km | ₹60,193 |
| Local Cheapest Insertion    | Simulated Annealing | 65    | 3,094    | 4,361.5 km | ₹53,777 |
| Local Cheapest Insertion    | Tabu Search         | 65    | 3,094    | 4,320.1 km | ₹53,266 |
| Local Cheapest Insertion    | Guided Local Search | 65    | 3,094    | 4,397.0 km | ₹54,215 |
| Christofides                | Greedy Descent      | 65    | 3,094    | 4,323.1 km | ₹53,303 |
| Christofides                | Simulated Annealing | 65    | 3,093    | 4,182.4 km | ₹51,569 |
| Christofides                | Tabu Search         | 65    | 3,094    | 4,266.6 km | ₹52,607 |
| Christofides                | Guided Local Search | 65    | 3,094    | 4,264.8 km | ₹52,585 |
| Savings                     | Greedy Descent      | 70    | 3,094    | 4,564.2 km | ₹56,277 |
| Savings                     | Simulated Annealing | 70    | 3,094    | 4,564.2 km | ₹56,277 |
| Savings                     | Tabu Search         | 70    | 3,094    | 4,434.0 km | ₹54,672 |
| Savings                     | Guided Local Search | 69    | 3,094    | 4,374.6 km | ₹53,939 |
| Parallel Cheapest Insertion | Greedy Descent      | 69    | 3,094    | 4,635.1 km | ₹57,151 |
| Parallel Cheapest Insertion | Simulated Annealing | 69    | 3,094    | 4,630.4 km | ₹57,092 |
| Parallel Cheapest Insertion | Tabu Search         | 69    | 3,094    | 4,485.5 km | ₹55,306 |
| Parallel Cheapest Insertion | Guided Local Search | 69    | 3,094    | 4,478.4 km | ₹55,219 |
| Path Cheapest Arc           | Greedy Descent      | 65    | 3,094    | 4,343.8 km | ₹53,559 |
| Path Cheapest Arc           | Simulated Annealing | 65    | 3,094    | 4,290.8 km | ₹52,906 |
| Path Cheapest Arc           | Tabu Search         | 65    | 3,094    | 4,289.0 km | ₹52,883 |
| Path Cheapest Arc           | Guided Local Search | 66    | 3,094    | 4,238.4 km | ₹52,260 |

### Coverage

All combinations achieved **100% coverage** except one (all 3,094 students assigned to routes).

---

## Complete Result Analysis

### Rankings

#### By Cost (Best to Worst)

| Rank | First Solution              | Local Search        | Cost    | Savings vs Worst |
| ---- | --------------------------- | ------------------- | ------- | ---------------- |
| 1    | Christofides                | Simulated Annealing | ₹51,569 | -                |
| 2    | Christofides                | Guided Local Search | ₹52,585 | 1.9%             |
| 3    | Christofides                | Tabu Search         | ₹52,607 | 2.0%             |
| 4    | Christofides                | Greedy Descent      | ₹53,303 | 3.3%             |
| 5    | Path Cheapest Arc           | Guided Local Search | ₹52,260 | 1.3%             |
| 6    | Path Cheapest Arc           | Tabu Search         | ₹52,883 | 2.5%             |
| 7    | Path Cheapest Arc           | Simulated Annealing | ₹52,906 | 2.5%             |
| 8    | Path Cheapest Arc           | Greedy Descent      | ₹53,559 | 3.7%             |
| 9    | Local Cheapest Insertion    | Tabu Search         | ₹53,266 | 3.2%             |
| 10   | Local Cheapest Insertion    | Guided Local Search | ₹54,215 | 4.9%             |
| 11   | Local Cheapest Insertion    | Simulated Annealing | ₹53,777 | 4.1%             |
| 12   | Local Cheapest Insertion    | Greedy Descent      | ₹60,193 | 14.3%            |
| 13   | Parallel Cheapest Insertion | Guided Local Search | ₹55,219 | 6.6%             |
| 14   | Parallel Cheapest Insertion | Tabu Search         | ₹55,306 | 6.8%             |
| 15   | Parallel Cheapest Insertion | Simulated Annealing | ₹57,092 | 9.7%             |
| 16   | Parallel Cheapest Insertion | Greedy Descent      | ₹57,151 | 9.8%             |
| 17   | Savings                     | Guided Local Search | ₹53,939 | 4.4%             |
| 18   | Savings                     | Tabu Search         | ₹54,672 | 5.7%             |
| 19   | Savings                     | Greedy Descent      | ₹56,277 | 8.4%             |
| 20   | Savings                     | Simulated Annealing | ₹56,277 | 8.4%             |

#### By Distance (Shortest to Longest)

| Rank | First Solution              | Local Search        | Distance   |
| ---- | --------------------------- | ------------------- | ---------- |
| 1    | Christofides                | Simulated Annealing | 4,182.4 km |
| 2    | Christofides                | Guided Local Search | 4,264.8 km |
| 3    | Christofides                | Tabu Search         | 4,266.6 km |
| 4    | Path Cheapest Arc           | Guided Local Search | 4,238.4 km |
| 5    | Christofides                | Greedy Descent      | 4,323.1 km |
| 6    | Path Cheapest Arc           | Tabu Search         | 4,289.0 km |
| 7    | Path Cheapest Arc           | Simulated Annealing | 4,290.8 km |
| 8    | Local Cheapest Insertion    | Tabu Search         | 4,320.1 km |
| 9    | Path Cheapest Arc           | Greedy Descent      | 4,343.8 km |
| 10   | Savings                     | Guided Local Search | 4,374.6 km |
| 11   | Local Cheapest Insertion    | Simulated Annealing | 4,361.5 km |
| 12   | Local Cheapest Insertion    | Guided Local Search | 4,397.0 km |
| 13   | Savings                     | Tabu Search         | 4,434.0 km |
| 14   | Parallel Cheapest Insertion | Guided Local Search | 4,478.4 km |
| 15   | Parallel Cheapest Insertion | Tabu Search         | 4,485.5 km |
| 16   | Savings                     | Greedy Descent      | 4,564.2 km |
| 17   | Savings                     | Simulated Annealing | 4,564.2 km |
| 18   | Parallel Cheapest Insertion | Simulated Annealing | 4,630.4 km |
| 19   | Parallel Cheapest Insertion | Greedy Descent      | 4,635.1 km |
| 20   | Local Cheapest Insertion    | Greedy Descent      | 4,881.9 km |

#### By Bus Count (Fewest to Most)

| Rank | First Solution              | Local Search        | Buses |
| ---- | --------------------------- | ------------------- | ----- |
| 1    | Local Cheapest Insertion    | Greedy Descent      | 64    |
| 2    | Christofides                | Simulated Annealing | 65    |
| 3    | Christofides                | Greedy Descent      | 65    |
| 4    | Christofides                | Tabu Search         | 65    |
| 5    | Christofides                | Guided Local Search | 65    |
| 6    | Local Cheapest Insertion    | Simulated Annealing | 65    |
| 7    | Local Cheapest Insertion    | Tabu Search         | 65    |
| 8    | Local Cheapest Insertion    | Guided Local Search | 65    |
| 9    | Path Cheapest Arc           | Greedy Descent      | 65    |
| 10   | Path Cheapest Arc           | Simulated Annealing | 65    |
| 11   | Path Cheapest Arc           | Tabu Search         | 65    |
| 12   | Path Cheapest Arc           | Guided Local Search | 66    |
| 13   | Savings                     | Guided Local Search | 69    |
| 14   | Parallel Cheapest Insertion | Greedy Descent      | 69    |
| 15   | Parallel Cheapest Insertion | Simulated Annealing | 69    |
| 16   | Parallel Cheapest Insertion | Tabu Search         | 69    |
| 17   | Parallel Cheapest Insertion | Guided Local Search | 69    |
| 18   | Savings                     | Greedy Descent      | 70    |
| 19   | Savings                     | Simulated Annealing | 70    |
| 20   | Savings                     | Tabu Search         | 70    |

### First Solution Strategy Analysis

| Strategy                    | Avg Cost | Avg Distance | Avg Buses | Best With           |
| --------------------------- | -------- | ------------ | --------- | ------------------- |
| **Christofides**            | ₹52,516  | 4,284 km     | 65        | Simulated Annealing |
| Path Cheapest Arc           | ₹52,907  | 4,291 km     | 65        | Guided Local Search |
| Local Cheapest Insertion    | ₹55,363  | 4,570 km     | 65        | Tabu Search         |
| Parallel Cheapest Insertion | ₹56,187  | 4,557 km     | 69        | Guided Local Search |
| Savings                     | ₹56,277  | 4,484 km     | 70        | Guided Local Search |

**Winner**: Christofides dominates across all metrics

### Local Search Metaheuristic Analysis

| Metaheuristic       | Avg Cost | Avg Distance | Characteristics                     |
| ------------------- | -------- | ------------ | ----------------------------------- |
| Simulated Annealing | ₹55,113  | 4,386 km     | Global optimizer, explores widely   |
| Guided Local Search | ₹55,296  | 4,350 km     | Most reliable, penalizes bad routes |
| Tabu Search         | ₹55,563  | 4,359 km     | Memory-based, excellent packing     |
| Greedy Descent      | ₹57,206  | 4,706 km     | Fast but gets stuck easily          |

**Runner-up**: Guided Local Search is most consistent

### Key Insights

1. **Christofides is the best first solution strategy** - It produces the best results with every local search metaheuristic

2. **Simulated Annealing + Christofides is optimal** - Achieves lowest cost (₹51,569) and shortest distance (4,182 km)

3. **Local Cheapest Insertion + Greedy Descent is worst** - Costs 14.3% more than best combination, 14% more distance

4. **Savings method is local-search insensitive** - Both Simulated Annealing and Greedy Descent produce identical results (4,564.2 km)

5. **More buses ≠ better cost** - Savings uses 70 buses but costs more than Christofides with 65 buses

6. **Path Cheapest Arc with Guided Local Search uses 66 buses** - The only combination requiring an extra bus, but has good distance

---

_Document generated: April 2026_
_Project: UFOS - University Fleet Operation System_
