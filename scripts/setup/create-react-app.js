#!/usr/bin/env node
/**
 * React Application Setup Script
 * 
 * Creates a new React application with JGFall configurations.
 * 
 * Usage: node scripts/setup/create-react-app.js my-app
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

const projectName = process.argv[2];

if (!projectName) {
    console.log(chalk.red('\n❌ Please provide a project name'));
    console.log(chalk.gray('Usage: node scripts/setup/create-react-app.js my-app'));
    process.exit(1);
}

async function createReactApp() {
    console.log(chalk.blue.bold('\n⚛️  React App Setup Wizard\n'));
    console.log(chalk.gray('='.repeat(50)));
    
    // Ask configuration questions
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'template',
            message: 'Choose a template:',
            choices: [
                { name: 'Standard (React + Router)', value: 'standard' },
                { name: 'TypeScript', value: 'typescript' },
                { name: 'With Redux', value: 'redux' },
                { name: 'Minimal', value: 'minimal' }
            ]
        },
        {
            type: 'list',
            name: 'bundler',
            message: 'Choose a bundler:',
            choices: ['Vite', 'Webpack']
        },
        {
            type: 'confirm',
            name: 'includeComponents',
            message: 'Include JGFall component library?',
            default: true
        },
        {
            type: 'confirm',
            name: 'setupCI',
            message: 'Setup GitHub Actions CI/CD?',
            default: true
        }
    ]);
    
    // Create project
    const spinner = ora(`Creating React app: ${projectName}`).start();
    
    try {
        const projectPath = path.resolve(process.cwd(), projectName);
        
        // Create directory
        fs.mkdirSync(projectPath, { recursive: true });
        
        spinner.text = 'Initializing project...';
        
        if (answers.bundler === 'Vite') {
            execSync(`npm create vite@latest ${projectName} -- --template react${answers.template === 'typescript' ? '-ts' : ''}`, 
                { stdio: 'inherit' });
        } else {
            execSync(`npx create-react-app ${projectName}${answers.template === 'typescript' ? ' --template typescript' : ''}`, 
                { stdio: 'inherit' });
        }
        
        process.chdir(projectPath);
        
        // Install additional dependencies
        if (answers.includeComponents) {
            spinner.text = 'Installing JGFall components...';
            // In real implementation, would install from npm
            console.log(chalk.gray('\n  (Component library would be installed from npm)'));
        }
        
        // Setup CI/CD
        if (answers.setupCI) {
            spinner.text = 'Setting up GitHub Actions...';
            const ciDir = path.join(projectPath, '.github', 'workflows');
            fs.mkdirSync(ciDir, { recursive: true });
            
            const ciConfig = `name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build
      
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
`;
            
            fs.writeFileSync(path.join(ciDir, 'ci-cd.yml'), ciConfig);
        }
        
        // Create README
        spinner.text = 'Generating documentation...';
        const readme = `# ${projectName}

React application created with JGFall utilities.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

## Deploy

\`\`\`bash
# Netlify
node scripts/deployment/deploy-netlify.js

# Vercel
node scripts/deployment/deploy-vercel.js
\`\`\`

## Features

- ⚛️ React ${answers.template === 'typescript' ? '+ TypeScript' : ''}
- 📦 ${answers.bundler}
${answers.includeComponents ? '- 🎨 JGFall Component Library\n' : ''}${answers.setupCI ? '- 🚀 GitHub Actions CI/CD\n' : ''}  - 🎨 Modern styling
- 📱 Responsive design

---

Built with JGFall Dev Utilities
`;
        
        fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
        
        spinner.succeed('Project created successfully!');
        
        console.log(chalk.gray('\n' + '='.repeat(50)));
        console.log(chalk.green.bold('\n✅ React App Created!'));
        console.log(chalk.cyan('\nNext steps:'));
        console.log(chalk.white(`  cd ${projectName}`));
        console.log(chalk.white('  npm install'));
        console.log(chalk.white('  npm run dev'));
        console.log(chalk.gray('\n' + '='.repeat(50) + '\n'));
        
    } catch (error) {
        spinner.fail('Project creation failed');
        console.log(chalk.red('\n❌ Error:'), error.message);
        process.exit(1);
    }
}

creatReactApp();
