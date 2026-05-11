# (no title)

- Files must first be opened in writing (w) mode
- ⚠️ We also need to close files!
- Context manager  with can do the cleanup for us 🧹
- Reading and writing text files
- file = open("test.txt", "w")
- file.write("Hello")
- file.close()
- with open("test.txt", "w") as file:
- file.write("Hello")

## Notes

In the vast majority of cases, we use the context manager version using with
—
Context managers allow you to allocate and release resources precisely when you want to. The most widely used example of context managers is the with statement. Suppose you have two related operations which you’d like to execute as a pair, with a block of code in between. Context managers allow you to do specifically that.

Strictly, the context manager is equivalent to:
file = open('some_file', 'w')
try:
    file.write('Hola!')
finally:
  file.close()

https://book.pythontips.com/en/latest/context_managers.html 

https://docs.python.org/3/library/io.html#io.TextIOBase.write
