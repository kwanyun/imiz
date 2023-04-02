import torch
import torchvision.transforms as transforms
from PIL import Image
import clip
import os
import json
import numpy as np

# Set the device to run the model on
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load the CLIP model
model, preprocess = clip.load("ViT-B/32", device=device)

model.to(device)


def read_image(file_path):
    image = Image.open(file_path)
    image = preprocess(image).unsqueeze(0).to(device)
    return image


# Define a function to embed each line of text
def embed_text(text):
    text_toembed = clip.tokenize([text])
    with torch.no_grad():
        embedding = model.encode_text(text_toembed).squeeze(0).detach().cpu().numpy()
    return embedding.astype(np.float16).tolist()


# Set the directory path for images
img_dir_path = "./outimgs/"

# Set the file paths for the output JSON files
img_output_file_path = "./image_embeddings.json"
text_output_file_path = "./text_embeddings.json"

# Create empty lists to hold the image and text embeddings
image_embeddings = []
text_embeddings = []

# Embed each image and add the embedding to the list
for i, file_name in enumerate(os.listdir(img_dir_path)):
    if (
        file_name.endswith(".jpg")
        or file_name.endswith(".jpeg")
        or file_name.endswith(".png")
    ):
        file_path = os.path.join(img_dir_path, file_name)
        image = read_image(file_path)
        embedding = model.encode_image(image).squeeze(0).detach().cpu().numpy()
        embedding = embedding.astype(np.float16).tolist()
        image_embeddings.append({"img": i, "embedding": embedding})

# Embed each line of text and add the embedding to the list
with open("./clip.txt", "r") as f:
    for ind, line in enumerate(f):
        line = line.strip()
        embedding = embed_text(line)
        text_embeddings.append({"txt": ind, "embedding": embedding})

with open(img_output_file_path, "w") as f:
    json.dump(
        image_embeddings, f, separators=(",", ":"), indent=None, ensure_ascii=False
    )

# Write the text embeddings to the output JSON file
with open(text_output_file_path, "w") as f:
    json.dump(
        text_embeddings, f, separators=(",", ":"), indent=None, ensure_ascii=False
    )
