# Youtube Uploader: auto upload multiple youtube videos 批量上传youtube视频

[![Donate to this project using Paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=G3ZDMEQVR5ZCJ)


Node.js Script to upload multiple videos to youtube

Support platform: windows/linux

## Setup

1.install node.js 

2.install `Puppeteer` to control chrome

```sh
npm install puppeteer@2.0.0
```

3.login google account, you can use chrome installed by Puppeteer, which in directory:`node_modules/puppeteer/.local-chromium/win64-706915/chrome-win/chrome`

and goto page `chrome://version/` to get Profile Path: `C:\Users\peter\AppData\Local\Chromium\User Data\Default`, which delete `Default` to be user Data Dir: `C:\Users\peter\AppData\Local\Chromium\User Data`

you can also use local chrome.


## Usage

Download `upload.js`

then change variable: chrome_user_data_directory, upload_file_directory, title_prefix, video_description.

run script
```sh
git clone https://github.com/zhang0peter/youtube-upload-multi-videos.git
cd youtube-upload-multi-videos/
npm install puppeteer@2.0.0
# login google account and set variables
node upload.js
```

it will open chrome and auto upload each video in directory you specified, after each upload, it will wait 60 seconds to start next upload.








