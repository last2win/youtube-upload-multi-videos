//"use strict";

const fs = require("fs");
// load puppeteer
const puppeteer = require('puppeteer');



const window_height = 768;
const window_width = 1366;
const studio_url = "https://studio.youtube.com/";

// directory contains the videos you want to upload
const file_directory = "D:\\BaiduNetdiskDownload\\Python爬虫";


try {
    (async () => {
        const browser = await puppeteer.launch(
            {
                'headless': false,    // have window
                // 'headless': true,  //  no window
                'defaultViewport': null,
                'userDataDir': './browserdata',
                ignoreDefaultArgs: ["--enable-automation"],
                'autoClose': false,
                'args': ['--lang=en-US,en',
                    '--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Safari/537.36"'
                ],
            }
        );
        const page = await browser.newPage();

        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });

        await page.setViewport({'width': window_width, 'height': window_height})
        await page.goto(studio_url, options = {'timeout': 10 * 1000})

        //login account
        //sleep(30 * 1000);

        fs.readdir(file_directory, function (err, files) {
            if (err) {
                console.log('Something went wrong...');
                return console.error(err);
            }
            for (let i = 0; i < files.length; i++) {
                // upload each file
                const file_name = files[i];
                console.log(file_name);
            }
            // files.forEach(function (file) {
            // });
        });
        await browser.close();
    })();

} catch (error) {
    console.log(error);
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}