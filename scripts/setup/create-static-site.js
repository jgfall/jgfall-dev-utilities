#!/usr/bin/env node
/**
 * Static Website Setup Script
 * 
 * Creates a new static website with JGFall configurations.
 * 
 * Usage: node scripts/setup/create-static-site.js my-website
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

const projectName = process.argv[2];

if (!projectName) {
    console.log(chalk.red('\n❌ Please provide a project name'));
    console.log(chalk.gray('Usage: node scripts/setup/create-static-site.js my-website'));
    process.exit(1);
}

async function createStaticSite() {
    console.log(chalk.blue.bold('\n🌐 Static Website Setup Wizard\n'));
    console.log(chalk.gray('='.repeat(50)));
    
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Website title:',
            default: projectName
        },
        {
            type: 'input',
            name: 'description',
            message: 'Website description:',
            default: 'A modern static website'
        },
        {
            type: 'list',
            name: 'template',
            message: 'Choose a template:',
            choices: [
                { name: 'Portfolio', value: 'portfolio' },
                { name: 'Business', value: 'business' },
                { name: 'Blog', value: 'blog' },
                { name: 'Landing Page', value: 'landing' },
                { name: 'Blank', value: 'blank' }
            ]
        },
        {
            type: 'confirm',
            name: 'includeFramework',
            message: 'Include JGFall CSS framework?',
            default: true
        }
    ]);
    
    const spinner = ora('Creating static website...').start();
    
    try {
        const projectPath = path.resolve(process.cwd(), projectName);
        fs.mkdirSync(projectPath, { recursive: true });
        
        // Create directories
        const dirs = ['css', 'js', 'images', 'assets'];
        dirs.forEach(dir => {
            fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
        });
        
        // Create index.html
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${answers.description}">
    <title>${answers.title}</title>
    ${answers.includeFramework ? '<link rel="stylesheet" href="css/jgfall-framework.css">' : ''}
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <nav class="jgf-container">
            <h1>${answers.title}</h1>
        </nav>
    </header>
    
    <main class="jgf-container">
        <section>
            <h2>Welcome to ${answers.title}</h2>
            <p>${answers.description}</p>
        </section>
    </main>
    
    <footer class="jgf-container">
        <p>&copy; 2026 ${answers.title}. All rights reserved.</p>
    </footer>
    
    <script src="js/main.js"></script>
</body>
</html>
`;
        
        fs.writeFileSync(path.join(projectPath, 'index.html'), html);
        
        // Create CSS
        const css = `/* ${answers.title} - Custom Styles */

:root {
    --primary-color: #0066CC;
    --secondary-color: #6C757D;
    --text-color: #212529;
    --bg-color: #FFFFFF;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: var(--text-color);
    line-height: 1.6;
}

header {
    background: var(--primary-color);
    color: white;
    padding: 2rem 0;
}

main {
    padding: 4rem 0;
    min-height: 60vh;
}

footer {
    background: var(--secondary-color);
    color: white;
    padding: 2rem 0;
    text-align: center;
}
`;
        
        fs.writeFileSync(path.join(projectPath, 'css', 'styles.css'), css);
        
        // Create JS
        const js = `// ${answers.title} - Main JavaScript

console.log('${answers.title} loaded!');

// Your code here
`;
        
        fs.writeFileSync(path.join(projectPath, 'js', 'main.js'), js);
        
        // Create package.json
        const packageJson = {
            name: projectName,
            version: '1.0.0',
            description: answers.description,
            scripts: {
                dev: 'python -m http.server 8000',
                build: 'echo \"No build needed for static site\"',
                deploy: 'node ../jgfall-dev-utilities/scripts/deployment/deploy-github-pages.js'
            }
        };
        
        fs.writeFileSync(
            path.join(projectPath, 'package.json'),
            JSON.stringify(packageJson, null, 2)
        );
        
        // Create README
        const readme = `# ${answers.title}

${answers.description}

## Development

\`\`\`bash
npm run dev
# Visit http://localhost:8000
\`\`\`

## Deployment

\`\`\`bash
npm run deploy
\`\`\`

---

Created with JGFall Dev Utilities
`;
        
        fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
        
        spinner.succeed('Static website created!');
        
        console.log(chalk.gray('\n' + '='.repeat(50)));
        console.log(chalk.green.bold('\n✅ Static Website Created!'));
        console.log(chalk.cyan('\nProject created at:'), chalk.white(projectPath));
        console.log(chalk.cyan('\nNext steps:'));
        console.log(chalk.white(`  cd ${projectName}`));
        console.log(chalk.white('  npm run dev'));
        console.log(chalk.gray('\n' + '='.repeat(50) + '\n'));
        
    } catch (error) {
        spinner.fail('Project creation failed');
        console.log(chalk.red('\n❌ Error:'), error.message);
        process.exit(1);
    }
}

createStaticSite();
