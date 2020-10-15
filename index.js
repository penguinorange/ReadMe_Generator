const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "github",
      message: "What is your GitHub username?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?"
    },
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?"
    },
    {
      type: "input",
      name: "description",
      message: "Briefly describe your project"
    },
    {
      type: "input",
      name: "installation",
      message: "Please provide installation instructions for dependencies",
      default: "npm i"
    },
    {
      type: "input",
      name: "usage",
      message: "What is the purpose of this project"
    },
    {
      type: "list",
      name: "license",
      message: "What license are you using?",
      choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
    },
    {
      type: "input",
      name: "contributing",
      message: "Explain how people may contribute to the repository"
    },
    {
      type: "input",
      name: "tests",
      message: "Which commands can be run for testing this project?",
      default: "npm test"
    },
    {
      type: "input",
      name: "questions",
      message: "Is there anything the user should know regarding the use of this repository (if no, press enter)?"
    },
  ]);
}

function writeFile(answers) {
  return `
  # ${answers.title}
  [![License](https://img.shields.io/badge/License-${answers.license}-blue.svg)]

  ## Description
  ${answers.description}
  
  ## Table of Contents
  
  * [Installation](#installation)

  * [Preview](#preview)

  * [Usage](#usage)

  * [License](#license)

  * [Contributing](#contributing)

  * [Tests](#tests)

  * [Questions](#questions)


## Installation
Run the following command(s): ${answers.installation}

## Preview
https://drive.google.com/file/d/1aunybY9bEBuyuI_lr3ecLSGzhz7__Uv3/view?usp=sharing

## Usage
${answers.usage}

## License
This project is covered by the ${answers.license} license.

## Contributing
${answers.contributing}

## Tests
Run the following command(s): ${answers.tests}

## Questions
Check me out on Github: [${answers.github}](https://github.com/${answers.github})

Contact me via email: ${answers.email}

${answers.questions}
  `;
}

promptUser()
  .then(function (answers) {
    const NewMarkdown = writeFile(answers);

    return writeFileAsync("README.md", NewMarkdown);
  })
  .then(function () {
    console.log("Successfully wrote to README.md");
  })
  .catch(function (err) {
    console.log(err);
  });


