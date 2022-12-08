const puppeteer = require('puppeteer');
const loading = require('loading-indicator');
const loadingPresets = require('loading-indicator/presets');

(async() => {
    const args = puppeteer
        .defaultArgs()
        .filter(
            arg =>
            arg !== '--disable-gpu' && arg !== 'about:blank' && arg !== '--headless'
        );

    const additionalArgs = `--enable-gpu-rasterization
        --force-gpu-rasterization
        --enable-native-gpu-memory-buffers
        --enable-oop-rasterization
        --ignore-gpu-blacklist
        --use-skia-deferred-display-list
        --enable-surfaces-for-videos
        -–enable-zero-copy
        --enable-fast-unload`.split('\n');
    args.push(...additionalArgs);
    args.push('--headless');
    args.push('--canvas-msaa-sample-count=4');
    args.push('about:blank');

    const browser = await puppeteer.launch({
        ignoreDefaultArgs: true,
        args
    });

    const timer = loading.start('Exporting screenshot 🖼️', {
        frames: loadingPresets.dots,
    });

    const page = await browser.newPage();
    await page.setViewport({
        width: 7016 / 2,
        height: 9932 / 2,
        deviceScaleFactor: 2
    });
    await console.log('Puppeteer launched with following viewport settings:');
    await console.log(page.viewport());

    await page.setDefaultNavigationTimeout(0);

    await page.goto('http://127.0.0.1:5502/sketch/');
    // await page.waitForTimeout(10000);
    await page.waitForSelector('#ready', {
        timeout: 0,
    });
    await page.screenshot({ path: Date.now() + '_export.png' });
    await browser.close();
    loading.stop(timer);
})();