import os

folder_array = [
    "img/group_prototype/prototype_1",
    "img/group_prototype/prototype_2",
    "img/group_prototype/prototype_3"
]

# List and print image paths
for folder in folder_array:
    print("[")
    for filename in sorted(os.listdir(folder)):
        full_path = os.path.join(folder, filename)
        print(f"\'{full_path}\',")
    print("]\n")
