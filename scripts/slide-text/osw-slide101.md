# (no title)

- Demo: answer
- column_labels = "sample_id,speed,distance"
- samples = [(0, 12, 53), (1, 7, 23), (2, 15, 30)]
- with open("out.csv", "w") as file:
- file.write(column_labels)
- file.write("\n")
- for sample in samples:
- for value in sample:
- file.write(str(value) + ",")
- file.write("\n")
- Let’s write a script that generates a simple csv file

## Notes

Gradually go thru it with them

Including googling/chatGPTing the join method – we can give them some time to solve that\\


with open("out.csv", "w") as fileobj:
   ...:     num_columns = 100
   ...:     column_labels = ["id-" + str(i) for i in range(num_columns)]
   ...:     fileobj.write(",".join(column_labels))
   ...:     fileobj.write("\n")
   ...:     for i in range(num_columns):
   ...:         fileobj.write(str(i)+",")
