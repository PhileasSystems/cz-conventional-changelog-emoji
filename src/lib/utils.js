const path = require('path');

module.exports.loadCommitLintConfig = (projectPath = process.cwd()) => {
  const configPath = path.join(projectPath, 'commitlint.config.js');
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const config = require(configPath);
  return config || { rules: { 'header-max-length': [2, 'always', 100] } };
};
