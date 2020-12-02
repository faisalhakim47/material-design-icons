const fs = require('fs');
const path = require('path');

const groups = fs.readdirSync('./src');

let js = '';

for (const group of groups) {
    const icons = fs.readdirSync(path.join(__dirname, 'src', group));
    for (const icon of icons) {
        const roundIconPath = path.join(__dirname, 'src', group, icon, 'materialiconsround', '24px.svg');
        if (fs.existsSync(roundIconPath)) {
            const svg = fs.readFileSync(roundIconPath, { encoding: 'utf8' })
                .replace(
                    '<svg xmlns',
                    '<svg class="${className}" xmlns'
                )
                .replace(
                    '/><path d=',
                    '/><path fill="${fill}" d='
                );
            const camelCasedIcon = toCamelCase('mdi_' + icon);
            js += `export function ${camelCasedIcon}({ fill = 'currentColor', className = '' } = {}) {
    return \`${svg}\`
}
`;
        }
    }
}

fs.writeFileSync('material-icons.js', js, { encoding: 'utf8' });

function toCamelCase(snakeCase) {
    return snakeCase
        .split('_')
        .map((word, index) => {
            if (index === 0) return word;
            return word[0].toUpperCase() + word.slice(1);
        })
        .join('');
}
