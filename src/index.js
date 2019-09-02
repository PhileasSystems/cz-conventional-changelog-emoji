const conventionalCommitTypes = require('conventional-commit-types-emoji');
const engine = require('./engine');

module.exports = engine({
  types: {
    ...conventionalCommitTypes.types,
    review: {
      description: '👌  Code changed after code review',
    },
    upgrade: {
      description: '⬆️  Upgrade package.json dependency',
    },
    downgrade: {
      description: '⬇️  Upgrade package.json dependency',
    },
    deployment: {
      description: '🌈  Deploying stuff to remote environment',
    },
    release: {
      description: '🔖  New version release',
    },
    hotfix: {
      description: '🚑  Critical hotfix',
    },
    security: {
      description: '🔒  Changes affecting security, access, ACLs...',
    },
    wtf: {
      description: '🧐 WTF changes other then previous changes types',
    },
  },
});
