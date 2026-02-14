"""
Generate sample demand.csv with realistic student distribution for UFOS project.

This script creates demand data that:
- Maps to actual stop_ids from stops.csv
- Distributes students realistically based on zone population density
- Supports multiple semesters (odd/even)
- Creates varying demand patterns (more students near urban centers)

CSV Columns: stop_id, student_count, semester
"""

import csv
import random
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data" / "raw"
STOPS_PATH = DATA_DIR / "stops.csv"
OUTPUT_PATH = DATA_DIR / "demand.csv"

SEMESTERS = ["ODD-2025", "EVEN-2026"]

ZONE_WEIGHTS = {
    "GURGAON": 1.8,
    "DELHI_NCR_SOUTH": 1.5,
    "DELHI_NCR_WEST": 1.4,
    "FARIDABAD": 1.3,
    "NOIDA_GHAZIABAD": 1.0,
    "DELHI_NCR_SOUTH_WEST": 1.2,
    "DELHI_NCR_NORTH": 1.0,
    "DELHI_NCR_EAST": 0.9,
    "DELHI_NCR_CENTRAL": 0.8,
    "BAHADURGARH": 0.7,
    "PALWAL": 0.6,
    "BHIWADI": 0.5,
    "TAURU": 0.4,
    "NUH": 0.3,
    "REWARI": 0.4,
    "PATAUDI": 0.3,
    "JHAJJAR": 0.3,
    "MANESAR": 0.5,
}

BASE_STUDENT_RANGE = {
    "metro": (3, 12),      # Reduced from (8, 25)
    "urban": (2, 8),       # Reduced from (5, 18)
    "suburban": (1, 5),    # Reduced from (3, 12)
    "rural": (1, 3),       # Reduced from (1, 6)
}


def classify_stop(stop_name, zone):
    stop_lower = stop_name.lower()
    
    if "metro" in stop_lower or "station" in stop_lower:
        return "metro"
    
    if any(term in stop_lower for term in ["chowk", "market", "mall", "hospital", "school", "college"]):
        return "urban"
    
    if any(term in stop_lower for term in ["village", "khurd", "kalan", "pur", "garhi"]):
        return "rural"
    
    high_density_zones = ["GURGAON", "DELHI_NCR_SOUTH", "DELHI_NCR_WEST", "FARIDABAD"]
    if zone in high_density_zones:
        return "suburban"
    
    return "suburban"


def read_stops():
    stops = []
    with open(STOPS_PATH, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        headers = [h.strip() for h in next(reader)]
        
        for row in reader:
            if not row or not row[0].strip():
                continue
            
            row_dict = {headers[i]: row[i].strip() if i < len(row) else "" for i in range(len(headers))}
            
            stop_id = row_dict.get("stop_id", "")
            stop_name = row_dict.get("stop_name", "")
            zone = row_dict.get("zone", "")
            active = row_dict.get("active", "").upper()
            latitude = row_dict.get("latitude", "")
            
            if not stop_id or active != "TRUE":
                continue
            
            if "KRMU" in stop_id or "CAMPUS" in stop_id:
                continue
            
            if not latitude:
                continue
                
            stops.append({
                "stop_id": stop_id,
                "stop_name": stop_name,
                "zone": zone,
            })
    
    return stops


def generate_student_count(stop_type, zone_weight, is_active_semester=True):
    min_count, max_count = BASE_STUDENT_RANGE.get(stop_type, (2, 10))
    
    weighted_max = int(max_count * zone_weight)
    weighted_min = max(1, int(min_count * zone_weight * 0.5))
    
    base_count = random.randint(weighted_min, max(weighted_min + 1, weighted_max))
    
    if not is_active_semester:
        variance = random.uniform(0.8, 1.2)
        base_count = max(1, int(base_count * variance))
    
    if random.random() < 0.15:
        return 0
    
    if random.random() < 0.05:
        base_count = int(base_count * random.uniform(1.5, 2.0))
    
    return min(base_count, 25)  # Cap at 25 students per stop


def main():
    random.seed(42)
    
    print("📖 Reading stops from", STOPS_PATH)
    stops = read_stops()
    print(f"   Found {len(stops)} active stops with coordinates")
    
    if not stops:
        print("❌ No stops found! Check stops.csv format.")
        return
    
    demand_data = []
    
    for semester in SEMESTERS:
        semester_total = 0
        is_primary = semester == SEMESTERS[0]
        
        for stop in stops:
            zone = stop["zone"]
            zone_weight = ZONE_WEIGHTS.get(zone, 0.5)
            stop_type = classify_stop(stop["stop_name"], zone)
            
            student_count = generate_student_count(stop_type, zone_weight, is_primary)
            semester_total += student_count
            
            demand_data.append({
                "stop_id": stop["stop_id"],
                "student_count": student_count,
                "semester": semester,
            })
        
        print(f"   {semester}: {semester_total} total students")
    
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    
    with open(OUTPUT_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["stop_id", "student_count", "semester"])
        writer.writeheader()
        writer.writerows(demand_data)
    
    print(f"\n✅ Generated demand data in {OUTPUT_PATH}")
    
    primary_semester = SEMESTERS[0]
    primary_data = [d for d in demand_data if d["semester"] == primary_semester]
    active_stops = [d for d in primary_data if d["student_count"] > 0]
    
    print("\n📊 Demand Summary (Primary Semester):")
    print(f"   Active stops: {len(active_stops)} / {len(stops)}")
    print(f"   Total students: {sum(d['student_count'] for d in primary_data)}")
    if active_stops:
        print(f"   Avg students/active stop: {sum(d['student_count'] for d in active_stops) / len(active_stops):.1f}")
    print(f"   Max at single stop: {max(d['student_count'] for d in primary_data)}")
    
    print("\n🗺️  Students by Zone (Primary Semester):")
    zone_totals = {}
    for stop, demand in zip(stops, primary_data[:len(stops)]):
        zone = stop["zone"]
        zone_totals[zone] = zone_totals.get(zone, 0) + demand["student_count"]
    
    for zone, total in sorted(zone_totals.items(), key=lambda x: -x[1]):
        print(f"   {zone}: {total} students")


if __name__ == "__main__":
    main()
