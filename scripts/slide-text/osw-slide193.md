# (no title)

- Exercise
- class Cell():
- def __init__(self,
- GFP_level,
- RFP_level,
- BFP_level):
- self.GFP = GFP_level
- self.RFP = RFP_level
- self.BFP = BFP_level
- def max_expression(self):
- max_expression = max(self.GFP, self.RFP, self.BFP)
- return max_expression
- To the Cell class add a  “BFP” attribute
- Add a method to calculate the maximum expression (from GFP, RFP, BFP)
- Use the “max(a, b, c)” syntax
