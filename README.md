# Jackson Fall's Development Utilities

🛠️ **Comprehensive collection of reusable development utilities, components, and automation tools** for rapid project development and deployment.

## Overview

This repository serves as a centralized hub for all reusable development assets across Jackson Fall's projects, including:

- 🎨 **UI Component Library** - Pre-built, customizable components
- 💅 **Styling Frameworks** - CSS utilities and design systems
- 🚀 **Deployment Scripts** - Automated deployment to various platforms
- 🔧 **Project Setup Tools** - Scaffolding and boilerplate generators
- 📦 **Build Utilities** - Common build configurations
- 🧪 **Testing Utilities** - Shared test helpers and configurations
- 📝 **Documentation Tools** - Auto-documentation generators
- ⚙️ **CI/CD Templates** - Ready-to-use pipeline configurations

## Quick Start

```bash
# Clone the repository
git clone https://github.com/jgfall/jgfall-dev-utilities.git
cd jgfall-dev-utilities

# Install dependencies
npm install

# Run examples
npm run examples
```

## Repository Structure

```
jgfall-dev-utilities/
├── components/          # Reusable UI components
│   ├── react/          # React components
│   ├── vanilla/        # Pure JS components
│   └── web-components/ # Web Components
├── styles/             # Styling frameworks and utilities
│   ├── css/           # CSS frameworks
│   ├── scss/          # SCSS utilities
│   └── themes/        # Pre-built themes
├── scripts/            # Automation and deployment scripts
│   ├── deployment/    # Deploy to various platforms
│   ├── setup/         # Project initialization
│   └── build/         # Build utilities
├── templates/          # Project templates
│   ├── react-app/     # React application template
│   ├── static-site/   # Static website template
│   └── api-server/    # API server template
├── configs/            # Shared configurations
│   ├── eslint/        # ESLint configurations
│   ├── prettier/      # Prettier configurations
│   ├── webpack/       # Webpack configurations
│   └── vite/          # Vite configurations
├── utils/              # Utility functions
│   ├── validation/    # Form validation utilities
│   ├── api/           # API helpers
│   └── storage/       # Storage utilities
├── ci-cd/              # CI/CD templates
│   ├── github/        # GitHub Actions
│   ├── gitlab/        # GitLab CI
│   └── jenkins/       # Jenkins pipelines
└── docs/               # Documentation
    ├── guides/        # How-to guides
    └── api/           # API documentation
```

## Features

### 🎨 Component Library

#### React Components
```jsx
import { Button, Card, Modal } from '@jgfall/components/react';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

#### Vanilla JS Components
```javascript
import { createButton, createModal } from '@jgfall/components/vanilla';

const button = createButton({
  text: 'Click Me',
  variant: 'primary',
  onClick: handleClick
});
```

### 💅 Styling System

#### CSS Utilities
```html
<!-- Use pre-built utility classes -->
<div class="jgf-container jgf-flex jgf-center jgf-gap-md">
  <button class="jgf-btn jgf-btn-primary">Primary</button>
</div>
```

#### SCSS Mixins
```scss
@import '@jgfall/styles/scss/mixins';

.my-component {
  @include jgf-card;
  @include jgf-shadow-md;
  @include jgf-responsive(tablet) {
    padding: 2rem;
  }
}
```

### 🚀 Deployment Scripts

#### Deploy to Netlify
```bash
# One-command deployment
node scripts/deployment/deploy-netlify.js --env production
```

#### Deploy to Vercel
```bash
node scripts/deployment/deploy-vercel.js --project my-app
```

#### Deploy to GitHub Pages
```bash
node scripts/deployment/deploy-github-pages.js
```

### 🔧 Project Setup

#### Create New React Project
```bash
node scripts/setup/create-react-app.js my-new-project
```

#### Create Static Website
```bash
node scripts/setup/create-static-site.js my-website
```

#### Create API Server
```bash
node scripts/setup/create-api-server.js my-api
```

## Component Library

### Available Components

#### Buttons
- Primary, Secondary, Outline variants
- Small, Medium, Large sizes
- Icon support
- Loading states
- Disabled states

#### Cards
- Basic card
- Image card
- Product card
- Profile card

#### Forms
- Input fields
- Textareas
- Select dropdowns
- Checkboxes
- Radio buttons
- Form validation

#### Navigation
- Navbar
- Sidebar
- Breadcrumbs
- Tabs
- Pagination

#### Modals & Overlays
- Modal dialog
- Toast notifications
- Alert boxes
- Tooltips
- Popovers

#### Data Display
- Tables
- Lists
- Grids
- Charts integration
- Progress bars

## Styling Framework

### Design System

#### Colors
```css
:root {
  --jgf-primary: #0066CC;
  --jgf-secondary: #6C757D;
  --jgf-success: #28A745;
  --jgf-warning: #FFC107;
  --jgf-error: #DC3545;
  --jgf-info: #17A2B8;
}
```

#### Typography
- Heading scale (h1-h6)
- Body text variants
- Mono font for code
- Font weight utilities
- Line height utilities

#### Spacing
- Consistent spacing scale
- Margin/padding utilities
- Gap utilities
- Container widths

#### Breakpoints
```scss
$breakpoints: (
  'mobile': 320px,
  'tablet': 768px,
  'desktop': 1024px,
  'wide': 1440px
);
```

## Deployment Scripts

### Supported Platforms

1. **Netlify**
   - Automatic builds
   - Environment variables
   - Custom domains
   - Redirect rules

2. **Vercel**
   - Zero-config deployment
   - Serverless functions
   - Edge network
   - Analytics

3. **GitHub Pages**
   - Static site hosting
   - Custom domain support
   - HTTPS enabled
   - Jekyll support

4. **AWS S3 + CloudFront**
   - S3 bucket deployment
   - CloudFront CDN
   - Route 53 DNS
   - SSL certificates

5. **Firebase Hosting**
   - Fast CDN
   - Custom domains
   - Free SSL
   - Rollback support

6. **Docker**
   - Containerization
   - Docker Hub push
   - Kubernetes deployment
   - Docker Compose

## Project Templates

### React Application
```bash
node scripts/setup/create-react-app.js my-app --template standard
# Creates:
# - Configured Webpack/Vite
# - ESLint + Prettier
# - Jest + Testing Library
# - Router setup
# - State management (optional)
```

### Static Website
```bash
node scripts/setup/create-static-site.js my-site --template portfolio
# Creates:
# - HTML boilerplate
# - CSS framework
# - Build system
# - Asset optimization
```

### API Server
```bash
node scripts/setup/create-api-server.js my-api --framework express
# Creates:
# - Express/Fastify setup
# - Database connection
# - Authentication
# - API documentation
# - Testing setup
```

## Utility Functions

### Validation
```javascript
import { validateEmail, validatePhone, validateURL } from '@jgfall/utils/validation';

if (validateEmail('user@example.com')) {
  // Valid email
}
```

### API Helpers
```javascript
import { apiClient } from '@jgfall/utils/api';

const data = await apiClient.get('/users');
await apiClient.post('/users', { name: 'John' });
```

### Storage
```javascript
import { storage } from '@jgfall/utils/storage';

storage.set('user', { id: 1, name: 'John' });
const user = storage.get('user');
storage.remove('user');
```

### Date/Time
```javascript
import { formatDate, parseDate, isDateValid } from '@jgfall/utils/datetime';

const formatted = formatDate(new Date(), 'YYYY-MM-DD');
```

### String Utilities
```javascript
import { slugify, capitalize, truncate } from '@jgfall/utils/string';

const slug = slugify('Hello World'); // 'hello-world'
const title = capitalize('hello world'); // 'Hello World'
```

## CI/CD Templates

### GitHub Actions

#### Continuous Integration
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run build
```

#### Continuous Deployment
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Configuration Presets

### ESLint
```javascript
// configs/eslint/.eslintrc.js
module.exports = {
  extends: '@jgfall/eslint-config',
  rules: {
    // Your custom rules
  }
};
```

### Prettier
```javascript
// configs/prettier/.prettierrc.js
module.exports = require('@jgfall/prettier-config');
```

### TypeScript
```json
{
  "extends": "@jgfall/tsconfig",
  "compilerOptions": {
    // Your overrides
  }
}
```

## Usage Examples

### Example 1: Quick Website Setup
```bash
# Create new website
node scripts/setup/create-static-site.js my-portfolio

# Use component library
import '@jgfall/styles/css/framework.css';
import { createNavbar, createFooter } from '@jgfall/components/vanilla';

# Deploy
node scripts/deployment/deploy-netlify.js
```

### Example 2: React App with Components
```bash
# Create React app
node scripts/setup/create-react-app.js my-react-app

# Install component library
npm install @jgfall/components

# Use components
import { Button, Card, Modal } from '@jgfall/components/react';

# Deploy to Vercel
node scripts/deployment/deploy-vercel.js
```

### Example 3: API Server
```bash
# Create API
node scripts/setup/create-api-server.js my-api --db mongodb

# Use utilities
import { validateEmail } from '@jgfall/utils/validation';
import { apiLogger } from '@jgfall/utils/logging';

# Deploy to Docker
node scripts/deployment/deploy-docker.js
```

## Installation

### As NPM Packages

```bash
# Install component library
npm install @jgfall/components

# Install styling framework
npm install @jgfall/styles

# Install utilities
npm install @jgfall/utils
```

### Direct from GitHub

```bash
# Clone specific folder
git clone --depth 1 --filter=blob:none --sparse \
  https://github.com/jgfall/jgfall-dev-utilities.git
cd jgfall-dev-utilities
git sparse-checkout set components
```

## Contributing

This is a personal utility library, but suggestions and improvements are welcome!

### Adding New Components

1. Create component in appropriate directory
2. Add documentation
3. Add tests
4. Update examples
5. Update README

### Adding New Scripts

1. Create script in `scripts/` directory
2. Add usage documentation
3. Test thoroughly
4. Add to examples

## Testing

```bash
# Run all tests
npm test

# Run component tests
npm run test:components

# Run script tests
npm run test:scripts

# Run with coverage
npm run test:coverage
```

## Documentation

- **Component Docs**: `docs/components/`
- **Script Docs**: `docs/scripts/`
- **Style Guide**: `docs/style-guide.md`
- **API Reference**: `docs/api/`

## License

MIT License - See LICENSE file for details

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

**Built with ❤️ by Jackson Fall** | Making development faster and easier, one utility at a time 🚀
