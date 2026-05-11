# (no title)

- Tracebacks
- def divide_0(x):
- return x / 0
- def call_func(x):
- y = divide_0(x)
- return y
- y = call_func(10)
- Can be confusing
- Help you “trace back” where your error is
- Take some time to understand the error message
- The debugging manifesto 🐛
