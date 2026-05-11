# (no title)

- Documentation - clean code
- def analyse_well(well_data):
- ...
- def save_analysed_well(well_data):
- ...
- def process_single_well(well_data):
- analysed_well = analyse_well(well_data)
- save_analysed_well(analysed_well)
- def process_all_wells(all_data):
- for well in all_data:
- process_single_well(well)
- Each function should do one thing
- This promotes modularity
- Give functions understandable names
- Don’t repeat yourself
- This is also a form of documentation
