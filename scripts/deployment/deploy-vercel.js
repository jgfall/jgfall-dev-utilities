#!/usr/bin/env node
/**
 * Vercel Deployment Script
 * 
 * Automates deployment to Vercel with environment configuration.
 * 
 * Usage: node scripts/deployment/deploy-vercel.js --project my-app
 */

const { execSync } = require('child_process');
const { Command } = require('commander');
const chalk = require('chalk');
const ora = require('ora');

const program = new Command();

program
    .option('-p, --project <name>', 'project name')
    .option('-e, --env <environment>', 'deployment environment', 'production')
    .option('--prod', 'deploy to production')
    .parse(process.argv);

const options = program.opts();

async function deployToVercel() {
    console.log(chalk.blue.bold('\n▲ Vercel Deployment Script\n'));
    console.log(chalk.gray('='.repeat(50)));
    
    // Check if Vercel CLI is installed
    const spinner = ora('Checking Vercel CLI...').start();
    
    try {
        execSync('vercel --version', { stdio: 'pipe' });
        spinner.succeed('Vercel CLI found');
    } catch (error) {
        spinner.fail('Vercel CLI not found');
        console.log(chalk.yellow('\nInstalling Vercel CLI...'));
        execSync('npm install -g vercel', { stdio: 'inherit' });
    }
    
    // Deploy
    const deploySpinner = ora('Deploying to Vercel...').start();
    
    try {
        let deployCommand = 'vercel';
        
        if (options.prod) {
            deployCommand += ' --prod';
        }
        
        if (options.project) {
            deployCommand += ` --name=${options.project}`;
        }
        
        const result = execSync(deployCommand, { encoding: 'utf-8', stdio: 'inherit' });
        
        deploySpinner.succeed('Deployment successful!');
        
        console.log(chalk.gray('\n' + '='.repeat(50)));
        console.log(chalk.green.bold('\n✅ Deployment Complete!'));
        
    } catch (error) {
        deploySpinner.fail('Deployment failed');
        console.log(chalk.red('\n❌ Error:'), error.message);
        process.exit(1);
    }
}

deployToVercel();
