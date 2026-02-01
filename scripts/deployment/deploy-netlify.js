#!/usr/bin/env node
/**
 * Netlify Deployment Script
 * 
 * Automates deployment to Netlify with environment configuration.
 * 
 * Usage: node scripts/deployment/deploy-netlify.js --env production
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const chalk = require('chalk');
const ora = require('ora');

const program = new Command();

program
    .option('-e, --env <environment>', 'deployment environment', 'production')
    .option('-d, --dir <directory>', 'build directory', 'dist')
    .option('-s, --site <siteId>', 'Netlify site ID')
    .option('--draft', 'deploy as draft')
    .parse(process.argv);

const options = program.opts();

async function deployToNetlify() {
    console.log(chalk.blue.bold('\n🚀 Netlify Deployment Script\n'));
    console.log(chalk.gray('=' .repeat(50)));
    
    // Check if Netlify CLI is installed
    const spinner = ora('Checking Netlify CLI...').start();
    
    try {
        execSync('netlify --version', { stdio: 'pipe' });
        spinner.succeed('Netlify CLI found');
    } catch (error) {
        spinner.fail('Netlify CLI not found');
        console.log(chalk.yellow('\nInstalling Netlify CLI...'));
        execSync('npm install -g netlify-cli', { stdio: 'inherit' });
    }
    
    // Check if build directory exists
    const buildDir = path.resolve(process.cwd(), options.dir);
    
    if (!fs.existsSync(buildDir)) {
        console.log(chalk.red(`\n❌ Build directory not found: ${buildDir}`));
        console.log(chalk.yellow('\nRunning build command...\n'));
        
        try {
            execSync('npm run build', { stdio: 'inherit' });
        } catch (error) {
            console.log(chalk.red('\n❌ Build failed'));
            process.exit(1);
        }
    }
    
    // Deploy
    const deploySpinner = ora('Deploying to Netlify...').start();
    
    try {
        let deployCommand = `netlify deploy --dir=${options.dir}`;
        
        if (!options.draft) {
            deployCommand += ' --prod';
        }
        
        if (options.site) {
            deployCommand += ` --site=${options.site}`;
        }
        
        const result = execSync(deployCommand, { encoding: 'utf-8' });
        
        deploySpinner.succeed('Deployment successful!');
        
        console.log(chalk.gray('\n' + '='.repeat(50)));
        console.log(chalk.green.bold('\n✅ Deployment Complete!'));
        console.log(chalk.cyan('\nDeployment Details:'));
        console.log(result);
        
    } catch (error) {
        deploySpinner.fail('Deployment failed');
        console.log(chalk.red('\n❌ Error:'), error.message);
        process.exit(1);
    }
}

deployToNetlify();
