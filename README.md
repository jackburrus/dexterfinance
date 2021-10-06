![made-with-python](https://img.shields.io/badge/Made%20with-Python3-brightgreen)

<!-- LOGO -->
<br />
<h1>
<p align="center">
  <img src="./packages/frontend/public/images/Logo.png" alt="Logo" width="140" height="110">
  <br>Dexter Dashboard
</h1>
  <p align="center">
    Built for EthOnline 2021.
    <br />
    </p>
</p>
<p align="center">
  <a href="#about-the-project">About The Project</a> •
  <a href="#stack">Stack</a> •
  <a href="#best-practice">Best Practice</a> •
  <a href="#credits">Credits</a> •
  <a href="examples.md">More Examples</a>
</p>



## About The Project
Dexter is a DeFi dashboard that allows you to create, import and export dashboard layouts to share with your friends. The dashboard aims to combine the customizability of Notion with the detailed data insights of Bloomberg terminal. Users have the ability to open a pull request to easily add their own blocks to the repository. Please see below for more information on creating your own block.


<p align="center">

![screenshot]("./../packages/frontend/public/images/DexterSubmission.jpeg)
</p>

## Stack

Name                          |  Usage
----------------------------------|------------------------------------------------------------------------------------
Alchemy            |  Primary Web3 API for fetching token metadata and balances.
The Graph            |  Provides on chain data for analytics and nft source information.
Protocol Labs            |  NFT.Storage is used to upload images to IPFS and provide a ipfs url for NFT creation.
ENS                |  Reverse and forward ENS resolution on the wallet provides readable address information.
Zora                 |  Zora auctions are displayed on the NFT block
Scaffold Eth          |  The Next.js and Typescript template provided a great starter for this project.
Chakra UI                 |  For style



## Creating your own block
```sh
usage: fast-copy.py [-h HELP] source destination [-d DELETE] [-s SYNC] [-r REPLACE]

optional arguments:
  -h --help            show this help message and exit
  source                the drive you are copying from
  destination           the drive you are copying to
  -d --delete           delete the source files after copy
  -s --sync             delete files in destination if not found in source (do not use, if using with rsync)
  -r --replace          replace files if they exist
  -t --thread           set the amount of parallel threads used
  -l --size-limit       set max size of files copied (supports gb, mb, kb) eg 1.5gb
```
The `source` and `destination` fields are required. Everything else is optional.

## Examples
```py
from google.colab import drive
drive.mount('/gdrive', force_remount=False)
import os
!wget -q https://raw.githubusercontent.com/L0garithmic/fastcolabcopy/main/fastcopy.py
import fastcopy
!python fastcopy.py /gdrive/Shareddrives/Source/. /gdrive/Shareddrives/Destination --thread 20 --size-limit 400mb
```
If you want to see copy execution time:
```mod
!pip install -q ipython-autotime
%load_ext autotime
```
Check out <a href="examples.md">examples.md</a> for some more examples.

## Best Practice
Colab has wildly varying transfer speeds, because of this, the best we can offer are suggestions:
- For large groups of medium/small files, 15-40 threads seems to work best.
- For 50+ files with significantly varying sizes, try 2 sequentially copies. `-t 15 -l 400` then `-t 2`
- For files that are 100MB+, it is best to use 2 threads. It is still faster then rsync.
- Currently `--sync` breaks if rsync is ran after. If you are mirroring drives. Disable `--sync` and use the rsync's `--delete` function.

## Credits
- Created by Jack Burrus

[![GitHub Badge](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jackburrus)
[![Twitter Badge](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/jackburrus)
[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jamesburrus/)