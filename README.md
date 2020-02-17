# Youtube Uploader: auto upload multiple youtube videos
Node.js Script to upload videos in bulk to youtube

Support platform: windows/linux

## Setup
1. install node.js 

2. install `Puppeteer` to control chrome

```sh
npm install puppeteer@2.0.0
```

3. login google account, you can use chrome installed by Puppeteer, which in directory:`node_modules/puppeteer/.local-chromium/win64-706915/chrome-win/chrome`

and goto page `chrome://version/` to get Profile Path: `C:\Users\peter\AppData\Local\Chromium\User Data\Default`, which delete `Default` to be user Data Dir: `C:\Users\peter\AppData\Local\Chromium\User Data`

you can also use local chrome.


## Usage

Download `upload.js`

then change variable: chrome_user_data_directory, upload_file_directory, title_prefix, video_description.

run script
```sh
node upload.js
```

it will open chrome and upload each video in directory you specified, after each upload, it will wait 60 seconds to start next upload.








