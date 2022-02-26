# NFT-photshop-art-generator
This script is built upon hashlips his script. Go check his out https://github.com/HashLips/hashlips_art_engine_ps_script

I just added some functionality for people who have a diffrent folder for their character and background.
It also will ignore locked layers if some layers alwasy need to be visible.

# How To Use
1. Run the generate.js in photshop "file > scripts > browse"
2. If theres any layers that always need to be visible put them in a folder and lock the folder.
3. It will ask for your supply, name, description, and the name of your characters rootfolder and background folder. In my example the rootfolder is "CHARACTER" and the background folder "BG"
![Screenshot 2022-02-26 174422](https://user-images.githubusercontent.com/27363998/155851451-17d950a4-a741-4c96-9bf4-066ba1e10917.png)
4. Wait until its finished. It will save the images in a /build/images folder where your psd file is saved. and the json data in the /build/metadata.
5. The update_metadata.js script will update the ipfs link in the json data.

Big thanks to HashLips for creating the base of this script. 


