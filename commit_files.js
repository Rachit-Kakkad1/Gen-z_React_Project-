const { execSync } = require('child_process');

try {
  const output = execSync('git status -uall --porcelain').toString();
  const lines = output.split('\n').filter(line => line.trim().length > 0);

  for (let line of lines) {
    let file = line.slice(3).trim();
    
    // If git quotes the filename due to spaces, remove the quotes
    if (file.startsWith('"') && file.endsWith('"')) {
      file = file.slice(1, -1);
    }
    
    let msg = `Add ${file}`;
    const filename = file.split('/').pop();
    
    if (file.includes('src/pages')) {
      msg = `Add page component: ${filename}`;
    } else if (file.includes('src/components')) {
      msg = `Add UI component: ${filename}`;
    } else if (file.includes('src/assets')) {
      msg = `Add asset file: ${filename}`;
    } else if (file.includes('vite.config.js')) {
      msg = `Add Vite project configuration`;
    } else if (file.includes('.gitignore')) {
      msg = `Add git ignore rules`;
    } else if (file.includes('package.json')) {
      msg = `Add package project configuration`;
    } else if (file.includes('package-lock.json')) {
      msg = `Add dependency lockfile`;
    } else if (file.includes('index.html')) {
      msg = `Add application entry HTML`;
    } else if (file.includes('eslint')) {
      msg = `Add ESLint configuration`;
    } else if (file.includes('App.jsx') || file.includes('main.jsx')) {
      msg = `Add main application entrypoints: ${filename}`;
    } else if (filename.endsWith('.css')) {
      msg = `Add application styles: ${filename}`;
    }
    
    console.log(`Committing ${file} with message: "${msg}"`);
    execSync(`git add "${file}"`);
    execSync(`git commit -m "${msg}"`);
  }
  console.log('All files committed successfully!');
} catch(e) {
  console.error('Error committing files:');
  console.error(e.stdout ? e.stdout.toString() : '');
  console.error(e.stderr ? e.stderr.toString() : e);
}
