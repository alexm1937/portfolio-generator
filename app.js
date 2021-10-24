const { writeFile, copyFile } = require('./utils/generate-site.js');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const promptUser = () => {
    return inquirer.prompt([
        {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
            if(nameInput) {
                return true;
            } else {
                console.log('Please enter your name!');
                return false;
                }
            }
        },
        {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: nameInput => {
            if(nameInput) {
                return true;
            } else {
                console.log('Please enter your GitHub Username!');
                return false;
                }
            }
        },
        {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
        },
        {
        type: 'input',
        name: 'about',
        message: 'Provide some infomation about yourself:',
        when: ({ confirmAbout }) => {
            if (confirmAbout) {
                return true;
            } else {
                return false;
            }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
        =================
        Add a New Project
        =================
    `);
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            
        name: 'name',
        message: 'What is the name of the project? (Required)',
        validate: nameInput => {
            if(nameInput) {
                return true;
            } else {
                console.log('Please enter your project name!');
                return false;
                }
            }
        },
        {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: nameInput => {
            if(nameInput) {
                return true;
            } else {
                console.log('Please enter a description!');
                return false;
                }
            }
        },
        {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: nameInput => {
            if(nameInput) {
                return true;
            } else {
                console.log('Please enter the GitHub link to your project!');
                return false;
                }
            }
        },
        {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
        },
        {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
        .then(promptProject)
        .then(portfolioData => {
        return generatePage(portfolioData);
        })
        .then(pageHTML => {
            return writeFile(pageHTML);
        })
        .then(writeFileResponse => {
            console.log(writeFileResponse);
            return copyFile();
        })
        .then(copyFileReponse => {
            console.log(copyFileReponse);
        })
        .catch(err => {
            console.log(err);
        });






    //     fs.writeFile('./index.html', pageHTML, err => {
    //       if (err) throw new Error(err);
    //       console.log('Page created! Check out index.html in this directory to see it!');
    //     })
    // })


// const mockData = {
//         name: 'Lernantino',
//         github: 'lernantino',
//         confirmAbout: true,
//         about:
//           'Dui tempus et.',
//         projects: [
//           {
//             name: 'Run Buddy',
//             description:
//               'Duis c Morbi mattis lla elit dapibus pellentesque cursus.',
//             languages: ['HTML', 'CSS'],
//             link: 'https://github.com/lernantino/run-buddy',
//             feature: true,
//             confirmAddProject: true
//           },
//           {
//             name: 'Taskinator',
//             description:
//               'Duisipsum. Morbi mattis jfringilla nulla. Inte dapibus pellentesque cursus.',
//             languages: ['JavaScript', 'HTML', 'CSS'],
//             link: 'https://github.com/lernantino/taskinator',
//             feature: true,
//             confirmAddProject: true
//           },
//           {
//             name: 'Taskmaster Pro',
//             description:
//               'Duis consectetulla eget fringilla nulla. Integes pellentesque cursus.',
//             languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//             link: 'https://github.com/lernantino/taskmaster-pro',
//             feature: false,
//             confirmAddProject: true
//           },
//           {
//             name: 'Robot Gladiators',
//             description:
//               'Duis consectetur nunc nunce.',
//             languages: ['JavaScript'],
//             link: 'https://github.com/lernantino/robot-gladiators',
//             feature: false,
//             confirmAddProject: false
//           }
//         ]
// };


// fs.writeFile('./dist/index.html', pageHTML, err => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('Page created! Check out index.html in this directory to see it!');
    
//     fs.copyFile('./src/style.css', './dist/style.css', err => {
//         if(err) {
//             console.log(err);
//             return;
//         }
//         console.log('Style sheet copied successfully!');
//     });
// });



