import os
import cv2

# Set the path to your images directory
img_dir = "./img"

# Set the desired output size
output_size = (512, 512)

# Loop through all images in the directory
for i, img_name in enumerate(os.listdir(img_dir)):
    # Read the image
    img_path = os.path.join(img_dir, img_name)
    img = cv2.imread(img_path)

    # Get the dimensions of the image
    h, w, _ = img.shape

    # Determine the crop size based on the larger dimension
    if w > h:
        crop_size = h
        start_x = int((w - crop_size) / 2)
        start_y = 0
    else:
        crop_size = w
        start_x = 0
        start_y = int((h - crop_size) / 2)

    # Crop the image
    img_cropped = img[start_y : start_y + crop_size, start_x : start_x + crop_size]

    # Resize the image to the desired output size
    img_resized = cv2.resize(img_cropped, output_size)

    # Save the resized image
    img_output_path = os.path.join(f"./outimgs/{i}.jpg")
    cv2.imwrite(img_output_path, img_resized)
