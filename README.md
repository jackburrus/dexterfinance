
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
  <a href="#creating-blocks">Creating Blocks</a> •
  <a href="#credits">Credits</a>

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
The Graph            |  Provides on chain data for analytics and NFT source information.
Protocol Labs            |  NFT.Storage is used to upload images to IPFS and provide a ipfs url for NFT creation.
ENS                |  Reverse and forward ENS resolution on the wallet provides readable address information.
Zora                 |  Auction images are displayed on the NFT block
Scaffold Eth          |  The Next.js and Typescript template provided a great starter for this project.
Chakra UI                 |  For style



## Creating Blocks
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


## Credits
- Created by Jack Burrus

[![GitHub Badge](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jackburrus)
[![Twitter Badge](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/jackburrus)
[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jamesburrus/)