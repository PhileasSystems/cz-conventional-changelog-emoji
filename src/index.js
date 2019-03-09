"format cjs";

var engine = require('./engine');
var conventionalCommitTypes = require('conventional-commit-types-emoji');

module.exports = engine({
  types: {
    ...conventionalCommitTypes.types,
    review: {
      "description": "👌  Code changed after code review"
    },
    upgrade: {
      "description": "⬆️  Upgrade package.json dependency"
    },
    downgrade: {
      "description": "⬇️  Upgrade package.json dependency"
    },
    deployment: {
      "description": "🚀  Deploying stuff to remote environment"
    },
    hotfix: {
      "description": "🚑  Critical hotfix"
    },
    security: {
      "description": "🔒  Changes affecting security, access, ACLs..."
    }
  }
});
