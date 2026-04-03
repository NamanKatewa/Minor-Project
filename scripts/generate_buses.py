"""
Generate sample buses.csv with realistic fleet data for UFOS project.

This script creates a realistic bus fleet matching the plan constraints:
- ~250 buses total
- Capacity in range 58-60 students per bus

CSV Columns: bus_id, bus_no, capacity
"""

import csv
import random
from pathlib import Path

FLEET_SIZE = 250
OUTPUT_PATH = Path(__file__).parent.parent / "data" / "raw" / "buses.csv"


def generate_bus_number(bus_id):
    district = random.randint(1, 99)
    series = random.choice(["A", "B", "C", "S", "T", "U", "V"])
    number = random.randint(1000, 9999)
    return f"HR{district:02d}{series}{number}"


def main():
    random.seed(42)
    
    buses = []
    
    for bus_id in range(1, FLEET_SIZE + 1):
        capacity = random.randint(58, 60)
        bus_no = generate_bus_number(bus_id)
        
        buses.append({
            "bus_id": f"BUS_{bus_id:03d}",
            "bus_no": bus_no,
            "capacity": capacity,
        })
    
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    
    with open(OUTPUT_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["bus_id", "bus_no", "capacity"])
        writer.writeheader()
        writer.writerows(buses)
    
    print(f"✅ Generated {len(buses)} buses in {OUTPUT_PATH}")
    print("\n📊 Fleet Summary:")
    print(f"   Total buses: {len(buses)}")
    print(f"   Total capacity: {sum(b['capacity'] for b in buses)} students")
    print(f"   Average capacity: {sum(b['capacity'] for b in buses) / len(buses):.1f} students/bus")
    
    print("\n📏 Capacity Distribution:")
    capacity_counts = {}
    for bus in buses:
        capacity_counts[bus["capacity"]] = capacity_counts.get(bus["capacity"], 0) + 1
    for capacity, count in sorted(capacity_counts.items(), reverse=True):
        print(f"   {capacity} seats: {count} buses ({count/len(buses)*100:.0f}%)")


if __name__ == "__main__":
    main()