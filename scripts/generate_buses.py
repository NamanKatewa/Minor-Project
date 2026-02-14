"""
Generate sample buses.csv with realistic fleet data for UFOS project.

This script creates a realistic bus fleet matching the plan constraints:
- ~40 buses total
- Max capacity: 50 students per bus
- Multiple depots across the NCR region

CSV Columns: bus_id, bus_no, capacity, depot_name
"""

import csv
import random
from pathlib import Path

FLEET_SIZE = 250  # Increased to handle ~10k+ students
OUTPUT_PATH = Path(__file__).parent.parent / "data" / "raw" / "buses.csv"

DEPOTS = [
    {"name": "KRMU Campus Depot", "bus_count": 50},
    {"name": "Gurgaon Central Depot", "bus_count": 40},
    {"name": "Delhi West Depot", "bus_count": 35},
    {"name": "Delhi South Depot", "bus_count": 30},
    {"name": "Faridabad Depot", "bus_count": 30},
    {"name": "Bahadurgarh Depot", "bus_count": 20},
    {"name": "Palwal Depot", "bus_count": 20},
    {"name": "Bhiwadi Depot", "bus_count": 15},
    {"name": "Noida Depot", "bus_count": 10},
]

CAPACITY_OPTIONS = [
    (50, 0.60),
    (45, 0.40),
]


def weighted_choice(options):
    total = sum(weight for _, weight in options)
    r = random.uniform(0, total)
    cumulative = 0
    for value, weight in options:
        cumulative += weight
        if r <= cumulative:
            return value
    return options[-1][0]


def generate_bus_number(bus_id):
    district = random.randint(1, 99)
    series = random.choice(["A", "B", "C", "S", "T", "U", "V"])
    number = random.randint(1000, 9999)
    return f"HR{district:02d}{series}{number}"


def main():
    random.seed(42)
    
    buses = []
    bus_id = 1
    
    for depot in DEPOTS:
        for i in range(depot["bus_count"]):
            capacity = weighted_choice(CAPACITY_OPTIONS)
            bus_no = generate_bus_number(bus_id)
            
            buses.append({
                "bus_id": f"BUS_{bus_id:03d}",
                "bus_no": bus_no,
                "capacity": capacity,
                "depot_name": depot["name"],
            })
            bus_id += 1
    
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    
    with open(OUTPUT_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["bus_id", "bus_no", "capacity", "depot_name"])
        writer.writeheader()
        writer.writerows(buses)
    
    print(f"✅ Generated {len(buses)} buses in {OUTPUT_PATH}")
    print("\n📊 Fleet Summary:")
    print(f"   Total buses: {len(buses)}")
    print(f"   Total capacity: {sum(b['capacity'] for b in buses)} students")
    print(f"   Average capacity: {sum(b['capacity'] for b in buses) / len(buses):.1f} students/bus")
    
    print("\n🏢 Depot Distribution:")
    depot_counts = {}
    for bus in buses:
        depot_counts[bus["depot_name"]] = depot_counts.get(bus["depot_name"], 0) + 1
    for depot, count in depot_counts.items():
        print(f"   {depot}: {count} buses")
    
    print("\n📏 Capacity Distribution:")
    capacity_counts = {}
    for bus in buses:
        capacity_counts[bus["capacity"]] = capacity_counts.get(bus["capacity"], 0) + 1
    for capacity, count in sorted(capacity_counts.items(), reverse=True):
        print(f"   {capacity} seats: {count} buses ({count/len(buses)*100:.0f}%)")


if __name__ == "__main__":
    main()
