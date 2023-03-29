import fs from 'fs';

const filePath = './src/lib/icons-outline.json';
const icons = JSON.parse(fs.readFileSync(filePath).toString());

try {
  fs.mkdirSync('./src/lib/outline');
} catch(e) {
  console.log(e.message);
}

function snakeCaseToCamelCase(label) {
  return label.split('-').map(str => str[0].toUpperCase() + str.slice(1)).join('');
}

icons.forEach(icon => {
  fs.writeFileSync('./src/lib/outline/' + snakeCaseToCamelCase(icon.label) + '.svelte', icon.svg);
})