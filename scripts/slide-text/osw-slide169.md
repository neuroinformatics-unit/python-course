# (no title)

- Documentation - comments
- def analyse_image(image):
- # remove noise
- image = gaussian(image)
- # binarise cells
- image = otsu(image)
- # split merged cells
- image = watershed(image)
- return image
- This is more useful
