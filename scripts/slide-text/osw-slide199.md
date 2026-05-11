# (no title)

- Exercise
- Create a “Mammal” parent class
- Create (and customise) child classes, e.g.:
- “Cat”
- class Mammal():
- def __init__(self, species, colour):
- self.species = species
- self.colour = colour
- def greet(self):
- print("Hello, I'm a", self.species)
- class Cat(Mammal):
- def __init__(self, species, colour, name):
- super().__init__(species, colour)
- self.name = name
- def greet(self):
- print("Miaow, I'm", self.name)
- cat = Cat("cat", "ginger", "Garfield")
- cat.greet()
