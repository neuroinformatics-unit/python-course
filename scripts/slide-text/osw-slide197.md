# (no title)

- Inheritance
- class Bus(Vehicle):
- def __init__(self, registration, colour, fare):
- super().__init__(registration, colour)
- self.fare = fare
- school_bus = Bus("B1 BUS", "red", "£1.55")
- school_bus.rev_engine()
- Use super() to access the parent class
- Use methods of the parent class rather than rewriting
