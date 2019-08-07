const wrap = require('word-wrap');
const map = require('lodash.map');
const longest = require('longest');
const rightPad = require('right-pad');

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = options => {
  const { types } = options;

  const length = longest(Object.keys(types)).length + 1;
  const choices = map(types, (type, key) => {
    return {
      name: `${rightPad(`${key}:`, length)} ${type.description}`,
      value: key,
    };
  });

  return {
    // When a user runs `git cz`, prompter will
    // be executed. We pass you cz, which currently
    // is just an instance of inquirer.js. Using
    // this you can ask questions and get answers.
    //
    // The commit callback should be executed when
    // you're ready to send back a commit template
    // to git.
    //
    // By default, we'll de-indent your commit
    // template and will keep empty lines.
    prompter(cz, commit) {
      console.log(JSON.stringify(cz, null, 2));
      console.log(JSON.stringify(commit, null, 2));
      console.log(
        '\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n',
      );

      // Let's ask some questions of the user
      // so that we can populate our commit
      // template.
      //
      // See inquirer.js docs for specifics.
      // You can also opt to use another input
      // collection library if you prefer.
      cz.prompt([
        {
          type: 'list',
          name: 'type',
          message: "Select the type of change that you're committing:",
          choices,
        },
        {
          type: 'input',
          name: 'scope',
          message: 'Denote the scope of this change ($location, $browser, $compile, etc.):\n',
        },
        {
          type: 'input',
          name: 'subject',
          message: 'Write a short, imperative tense description of the change:\n',
        },
        {
          type: 'input',
          name: 'body',
          message: 'Provide a longer description of the change:\n',
        },
        {
          type: 'input',
          name: 'footer',
          message: 'List any breaking changes or issues closed by this change:\n',
        },
      ]).then(function(answers) {
        const maxLineWidth = 200;

        const wrapOptions = {
          trim: true,
          newline: '\n',
          indent: '',
          width: maxLineWidth,
        };

        // parentheses are only needed when a scope is present
        let scope = answers.scope.trim();
        scope = scope ? `(${answers.scope.trim()})` : '';

        // Set emoji to use
        const emoji = types[answers.type].description.split(' ')[0];

        const shortDescription =
          `${answers.subject.trim()}`.charAt(0).toUpperCase() +
          `${answers.subject.trim()}`.slice(1);
        // Hard limit this line
        const head = `${answers.type + scope}: ${emoji} ${shortDescription}`.slice(0, maxLineWidth);

        // Wrap these lines at 100 characters
        const body = wrap(answers.body, wrapOptions);
        const footer = wrap(answers.footer, wrapOptions);

        commit(`${head}\n\n${body}\n\n${footer}`);
      });
    },
  };
};
