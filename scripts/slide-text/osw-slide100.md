# (no title)

- Demo
- Let’s write a script that generates a simple csv file

## Notes

Gradually go thru it with them as a script

Including googling/chatGPTing the join method – we can give them some time to solve that\\


with open("out.csv", "w") as fileobj:
   ...:     num_columns = 100
   ...:     column_labels = ["id-" + str(i) for i in range(num_columns)]
   ...:     fileobj.write(",".join(column_labels))
   ...:     fileobj.write("\n")
   ...:     for i in range(num_columns):
   ...:         fileobj.write(str(i)+",")
