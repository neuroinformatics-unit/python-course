# (no title)

- Deep vs shallow copy
- When?
- For collections that are mutable or contain mutable items
- (i.e. lists, or instances of classes)
- “Assignment statements in Python do not copy objects, they create bindings between a target and an object.”
- If you equate two “collections”, the items inside won’t be copied by default
- If in doubt: use id() or check the docs
- ⚠️

## Notes

https://docs.python.org/3/library/copy.html

This might need to be removed/hidden/moved

Demo with lists
The elements in the list are the ones sharing same location in memory
