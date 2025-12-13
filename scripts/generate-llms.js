import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Assumes script is in /scripts and root is one level up
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const outputFile = path.join(publicDir, 'llms.txt');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

const staticHeader = `# Dream Journal Ultimate

The world's most advanced dream journal. Record, analyze, and interpret your dreams with the power of AI.

## Core Features
- **AI Powered Interpretation**: Advanced AI analyzes dreams to reveal hidden symbols, emotional themes, and narrative patterns.
- **Social Dream Wall**: Connect with a global community. Share safely and anonymously.
- **Private & Secure**: Lock your journal with PIN or Biometrics. Encrypted cloud sync keeps data safe.
- **Cloud Sync**: Seamlessly sync across iOS, Android, and Web.

## Links
`;

function extractMeta(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : path.basename(filePath);

    // Calculate relative path from root
    const relativePath = path.relative(rootDir, filePath);
    // Determine public URL path
    let urlPath = '/' + relativePath;
    if (path.basename(filePath) === 'index.html') {
        urlPath = '/';
    }

    return { title, url: urlPath };
}

function generate() {
    console.log('Generating llms.txt...');

    const files = fs.readdirSync(rootDir).filter(file => file.endsWith('.html'));

    let linksContent = '';

    // Sort index.html to top
    files.sort((a, b) => {
        if (a === 'index.html') return -1;
        if (b === 'index.html') return 1;
        return a.localeCompare(b);
    });

    for (const file of files) {
        if (file === 'app_store_page.html') continue;

        const filePath = path.join(rootDir, file);
        const { title, url } = extractMeta(filePath);

        linksContent += `- [${title}](${url})\n`;
    }

    const externalLinks = `- [Download on App Store](https://itunes.apple.com/us/app/dream-journal-ultimate-pin/id802558054?mt=8)
- [Get it on Google Play](https://play.google.com/store/apps/details?id=dreamcapsule.com.dl.dreamjournalultimate)
`;

    const finalContent = staticHeader + linksContent + externalLinks;

    fs.writeFileSync(outputFile, finalContent);
    console.log(`Successfully generated ${outputFile}`);
}

generate();
