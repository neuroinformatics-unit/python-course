# (no title)

- Creating objects
- class Cell():
- def __init__(self,
- GFP_level,
- RFP_level):
- self.GFP = GFP_level
- self.RFP = RFP_level
- def relative_expression(self):
- ratio = self.GFP / self.RFP
- return ratio
- cell_0 = Cell(300, 200)
- ratio = cell_0.relative_expression()
- print(ratio)
- A “real” example
