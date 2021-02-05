import { WEB_NAME, WEB_DESCRIPTION } from '../src/lib/constants';
import { getAuthorData } from '../src/lib/api';
import favicons, { FaviconOptions } from 'favicons';
import { mkdirSync } from 'fs';
import { writeFile } from '../src/lib/file-system-helpers';

async function generateFavicons() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  console.log('Generating favicons...');

  const author = getAuthor();

  const source = 'public/assets/blog/logo.png'; // Source image(s). `string`, `buffer` or array of `string`
  const configuration: Partial<FaviconOptions> = {
    path: '/favicon/', // Path for overriding default icons path. `string`
    appName: WEB_NAME, // Your application's name. `string`
    appShortName: WEB_NAME, // Your application's short_name. `string`. Optional. If not set, appName will be used
    appDescription: WEB_DESCRIPTION, // Your application's description. `string`
    developerName: `${author.name}`, // Your (or your developer's) name. `string`
    developerURL: `${author.link}`, // Your (or your developer's) URL. `string`
    dir: 'auto', // Primary text direction for name, short_name, and description
    lang: 'en-US', // Primary language for name and short_name
    background: '#000000', // Background colour for flattened icons. `string`
    theme_color: '#000', // Theme color user for example in Android's task switcher. `string`
    appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
    display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
    orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
    scope: '/', // set of URLs that the browser considers within your app
    start_url: '/', // Start URL when launching the application from a device. `string`
    version: '1.0', // Your application's version string. `string`
    logging: false, // Print logs to console? `boolean`
    pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
    loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
    icons: {
      // Platform Options:
      // - offset - offset in percentage
      // - background:
      //   * false - use default
      //   * true - force use default, e.g. set background for Android icons
      //   * color - set background for the specified icons
      //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
      //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
      //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
      //
      android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      coast: true, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    },
  };

  const callback = function (error: any, response: any) {
    if (error) {
      console.log(error.message); // Error description e.g. "An unknown error has occurred"
      return;
    }

    const folderPath = './public/favicon';

    mkdirSync(folderPath, { recursive: true });

    // Save the elements in the respective folder
    // response.images: Array of { name: string, contents: <buffer> }
    response.images.forEach((icon: any) => {
      writeFile(`${folderPath}/${icon.name}`, icon.contents);
    });

    // response.files: Array of { name: string, contents: <string> }
    response.files.forEach((file: any) => {
      writeFile(`${folderPath}/${file.name}`, file.contents);
    });

    // response.html: Array of strings (html elements)
    writeFile(
      `${folderPath}/meta.html`,
      [...response.html].join('\n').replaceAll(`">`, `"/>`),
    );
  };

  favicons(source, configuration, callback);
}

export default generateFavicons;

function getAuthor() {
  const authorData = getAuthorData('en');
  return {
    name: `${authorData.firstname} ${authorData.lastname}`,
    link: authorData.web,
  };
}
