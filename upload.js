const fs = require("fs");

// load puppeteer
const puppeteer = require('puppeteer');

const window_height = 768;
const window_width = 1366;
const studio_url = "https://studio.youtube.com/";

// directory contains the videos you want to upload
const upload_file_directory = "your video directory";
// change user data directory to your directory
const chrome_user_data_directory = "C:\\Users\\user\\AppData\\Local\\Chromium\\User Data";

const title_prefix = "video title prefix ";
const video_description = "";

let files = [];
fs.readdir(upload_file_directory, function (err, temp_files) {
    if (err) {
        console.log('Something went wrong...');
        return console.error(err);
    }
    for (let i = 0; i < temp_files.length; i++) {
        files.push(temp_files[i]);
    }
});

try {
    (async () => {
        const browser = await puppeteer.launch(
            {
                'headless': false,    // have window
                executablePath: null,
                userDataDir: chrome_user_data_directory,
                ignoreDefaultArgs: ["--enable-automation"],
                autoClose: false,
                args: ['--lang=en-US,en',
                    `--window-size=${window_width},${window_height}`,
                    '--enable-audio-service-sandbox',
                    '--no-sandbox',
                ],
            }
        );
        let page = await browser.newPage();
        await page.setViewport({'width': window_width, 'height': window_height});
        await page.goto(studio_url, options = {'timeout': 20 * 1000});

        for (let i = 0; i < files.length; i++) {
            const file_name = files[i];
            console.log("now process file:\t" + file_name);

            //click create icon
            await page.click('#create-icon');

            //click upload video
            await page.click('#text-item-0 > ytcp-ve');
            await sleep(500);
            //click select files button and upload file
            const [fileChooser] = await Promise.all([
                page.waitForFileChooser(),
                page.click('#select-files-button > div'), // some button that triggers file selection
            ]);
            await fileChooser.accept([upload_file_directory + file_name]);

            // wait 10 seconds
            await sleep(10_000);

            // title content
            await page.type('#textbox', title_prefix + file_name.replace('.mp4', ''));
            await sleep(1000);
            // Description content, default to be null
            await page.type('#child-input', video_description);

            await sleep(1000);
            // add video to the second playlists

            // await page.click('#basics > ytcp-video-metadata-playlists > ytcp-text-dropdown-trigger > ytcp-dropdown-trigger > div');
            // await page.click('#items > ytcp-ve:nth-child(3)');
            // await page.click('#dialog > div.action-buttons.style-scope.ytcp-playlist-dialog > ytcp-button.save-button.action-button.style-scope.ytcp-playlist-dialog > div');
            // await sleep(500);

            //click next
            await page.click('#dialog > div > ytcp-animatable.button-area.metadata-fade-in-section.style-scope.ytcp-uploads-dialog > div > div.right-button-area.style-scope.ytcp-uploads-dialog');
            await sleep(1000);
            //click next
            await page.click('#dialog > div > ytcp-animatable.button-area.metadata-fade-in-section.style-scope.ytcp-uploads-dialog > div > div.right-button-area.style-scope.ytcp-uploads-dialog');
            await sleep(1000);
            //click publish now and public
            await page.click('#publish-now-container');
            await page.click('#privacy-radios > paper-radio-button:nth-child(1)');
            await page.click('#done-button');
            await sleep(5000);
            // close
            await page.click('#close-button > div');

            // wait 60 seconds
            await sleep(60 * 1000);
        }
        await browser.close();
    })();

} catch (error) {
    console.log(error);
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

