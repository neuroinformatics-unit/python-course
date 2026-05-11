# (no title)

- Dictionary comprehensions
- course_capacity = {
- 'intro': 12,
- 'further': 10,
- 'packaging': 15}
- new_capacities = {
- item: capacity * 2
- for (item, capacity) in
- course_capacity.items()}
- print(new_capacities)
- Similar to list comprehensions
- E.g.: multiply by 2 each value in the dictionary
