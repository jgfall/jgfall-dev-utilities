#!/usr/bin/env node
/**
 * GitHub Pages Deployment Script
 * 
 * Automates deployment to GitHub Pages.
 * 
 * Usage: node scripts/deployment/deploy-github-pages.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const chalk = require('chalk');
const ora = require('ora');

const program = new Command();

program
    .option('-d, --dir <directory>', 'build directory', 'dist')
    .option('-b, --branch <branch>', 'deployment branch', 'gh-pages')
    .option('-m, --message <message>', 'commit message', 'Deploy to GitHub Pages')
    .parse(process.argv);

const options = program.opts();

async function deployToGitHubPages() {
    console.log(chalk.blue.bold('\n📄 GitHub Pages Deployment Script\n'));
    console.log(chalk.gray('='.repeat(50)));
    
    const buildDir = path.resolve(process.cwd(), options.dir);
    
    // Check if build directory exists
    if (!fs.existsSync(buildDir)) {
        console.log(chalk.yellow('\nBuild directory not found. Running build...\n'));
        
        try {
            execSync('npm run build', { stdio: 'inherit' });
        } catch (error) {
            console.log(chalk.red('\n❌ Build failed'));
            process.exit(1);
        }
    }
    
    // Install gh-pages if needed
    const spinner = ora('Checking gh-pages package...').start();
    
    try {
        require('gh-pages');
        spinner.succeed('gh-pages package found');
    } catch (error) {
        spinner.info('Installing gh-pages...');
        execSync('npm install --save-dev gh-pages', { stdio: 'inherit' });
    }
    
    // Deploy
    const deploySpinner = ora('Deploying to GitHub Pages...').start();
    
    try {
        const ghpages = require('gh-pages');
        
        await new Promise((resolve, reject) => {
            ghpages.publish(buildDir, {
                branch: options.branch,
                message: options.message
            }, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        deploySpinner.succeed('Deployment successful!');
        
        console.log(chalk.gray('\n' + '='.repeat(50)));
        console.log(chalk.green.bold('\n✅ Deployment Complete!'));
        console.log(chalk.cyan('\nYour site will be available at:'));
        console.log(chalk.white('https://[username].github.io/[repo-name]'));
        
    } catch (error) {
        deploySpinner.fail('Deployment failed');
        console.log(chalk.red('\n❌ Error:'), error.message);
        process.exit(1);
    }
}

deployToGitHubPages();
