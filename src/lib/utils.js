const fs = require('fs');
const path = require('path');

module.exports.loadCommitLintConfig = (projectPath = process.cwd()) => {
  const configPath = path.join(projectPath, 'commitlint.config.js');
  const file = fs.readFileSync(configPath);
  return JSON.parse(file.toString('utf8'));
};