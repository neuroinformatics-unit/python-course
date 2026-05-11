# (no title)

- Exercise
- class Cell():
- def __init__(self,
- GFP_level,
- RFP_level):
- self.GFP = GFP_level
- self.RFP = RFP_level
- def relative_expression(self):
- ratio = self.GFP / self.RFP
- return ratio
- To the Cell class add a  “BFP” attribute
- Add a method to calculate the maximum expression (from GFP, RFP, BFP)
- Use the “max(a, b, c)” syntax
