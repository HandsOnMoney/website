// llm-generated

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TEMPLATE_END = '<!-- template-end -->';

function loadTemplates() {
  const templates = {};
  for (const file of fs.readdirSync(ROOT)) {
    if (file.endsWith('.template')) {
      const name = path.basename(file, '.template');
      templates[name] = fs.readFileSync(path.join(ROOT, file), 'utf8');
    }
  }
  return templates;
}

function findHtmlFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

function processFile(filePath, templates) {
  const original = fs.readFileSync(filePath, 'utf8');
  const startPattern = /<!-- template-start:(\S+?) -->/g;
  let result = '';
  let lastIndex = 0;
  let match;

  while ((match = startPattern.exec(original)) !== null) {
    const name = match[1];
    const blockStart = match.index;
    const contentStart = blockStart + match[0].length;
    const endIndex = original.indexOf(TEMPLATE_END, contentStart);

    if (endIndex === -1) {
      console.warn(`  Warning: no template-end for template-start:${name} in ${path.relative(ROOT, filePath)}`);
      continue;
    }

    if (!(name in templates)) {
      console.warn(`  Warning: template "${name}" not found (${path.relative(ROOT, filePath)})`);
      lastIndex = endIndex + TEMPLATE_END.length;
      startPattern.lastIndex = lastIndex;
      continue;
    }

    result += original.slice(lastIndex, blockStart);
    result += `<!-- template-start:${name} -->\n`;
    result += templates[name];
    result += `\n<!-- template-end -->`;
    lastIndex = endIndex + TEMPLATE_END.length;
    startPattern.lastIndex = lastIndex;
  }

  result += original.slice(lastIndex);

  if (result !== original) {
    fs.writeFileSync(filePath, result, 'utf8');
    return true;
  }
  return false;
}

function main() {
  const templates = loadTemplates();
  console.log(`Templates loaded: ${Object.keys(templates).join(', ')}`);

  const files = findHtmlFiles(ROOT);
  console.log(`HTML files found: ${files.length}`);

  let updated = 0;
  for (const file of files) {
    if (processFile(file, templates)) {
      console.log(`  Updated: ${path.relative(ROOT, file)}`);
      updated++;
    }
  }

  console.log(`Done — ${updated} file(s) updated.`);
}

main();
