
# Contributing to ScrollMe

Thank you for your interest in contributing to **ScrollMe**! We welcome all contributions, whether it’s fixing bugs, implementing new features, or improving documentation.

Please take a moment to read through this guide before contributing. It will help you understand the contribution process and ensure smooth collaboration.

## Table of Contents

- [Contributing to ScrollMe](#contributing-to-scrollme)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [How to Contribute](#how-to-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Feature Requests](#feature-requests)
    - [Code Contributions](#code-contributions)
  - [Development Setup](#development-setup)
    - [Steps](#steps)
  - [Pull Request Guidelines](#pull-request-guidelines)
  - [Code Style and Standards](#code-style-and-standards)
  - [Commit Message Guidelines](#commit-message-guidelines)
    - [Common Prefixes](#common-prefixes)

## Getting Started

1. **Fork the repository**:
   Fork the project to your own GitHub account by clicking the "Fork" button at the top-right of the project page.

2. **Clone your fork**:

   ```bash
   git clone git@github.com:saurabhbakolia/SCROLLME--ECOMMERCE-WEBSITE.git
   cd SCROLLME--ECOMMERCE-WEBSITE
   ```

3. **Checkout the `develop` branch**

   ```bash
   git checkout develop
   ```

4. **Install dependencies**
   Run the following command to install project dependencies:

 ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
```

5. **Create a branch from `develop`**
   Create a new branch where your changes will be isolated from the `develop` branch.

   ```bash
   git checkout -b feature/your-feature
   ```

## How to Contribute

### Reporting Bugs

If you find a bug or any issue, you can help by submitting a bug report.

1. **Search for existing issues**: First, check if the issue has already been reported.
2. **Submit a new issue**: If no existing issue matches, [open a new issue](https://github.com/saurabhbakolia/SCROLLME--ECOMMERCE-WEBSITE/issues) with detailed steps to reproduce the bug, expected vs. actual behavior, and any error messages or logs.

### Feature Requests

We are always looking to improve **ScrollMe Ecommerce Website**! If you have ideas for new features:

1. **Check open issues**: Search for existing feature requests.
2. **Open a feature request**: If your idea is new, [submit a feature request](https://github.com/saurabhbakolia/SCROLLME--ECOMMERCE-WEBSITE/issues) with a clear description of the feature, how it improves the project, and any alternatives you’ve considered.

### Code Contributions

Contributions to code are highly appreciated. Here’s how you can contribute code:

1. **Open an issue**: First, discuss the change you wish to make by [opening an issue](https://github.com/saurabhbakolia/SCROLLME--ECOMMERCE-WEBSITE/issues/new).
2. **Work on the issue**: After discussion and approval, you can start coding.
3. **Submit a pull request (PR)**: Once your work is done, submit a PR following the [Pull Request Guidelines](#pull-request-guidelines).

## Development Setup

Ensure you have the required tools:

- **Node.js**: v14.x or higher.
- **MongoDB**: Ensure MongoDB is installed and running locally.

### Steps

1. **Set up backend environment variables**:
   In the `backend/` directory, copy `.env.example` to `.env` and set the following variables:

   ```bash
   MONGODB_URI=mongodb://127.0.0.1:27017/scrollme
   MONGODB_DATABASE_NAME=scrollme
   PRODUCTS_COLLECTION_NAME=products
   SALT=10
   JWT_SECRET=your_secret_key
   ```

2. **Start the application**:
   Run the following command to start both frontend and backend:

```bash
# Start the backend
cd backend
npm run start

# Start the frontend
npm start
```

## Pull Request Guidelines

To ensure a smooth pull request (PR) process, please follow these guidelines:

1. **Create a PR from your branch**:
   Push your feature branch to your forked repository, then [create a pull request](https://github.com/saurabhbakolia/SCROLLME--ECOMMERCE-WEBSITE/pulls) from your branch.

2. **Describe your PR**: Provide a detailed explanation of the changes and why they are necessary.

3. **Link issues**: If your PR addresses an issue, link it in your PR description (`Closes #issue_number`).

4. **Request a review**: Assign reviewers to your PR.

5. **Make changes if needed**: Be open to feedback, and if adjustments are requested, push the necessary changes to your branch.

## Code Style and Standards

- Ensure your code follows established coding conventions.
- Maintain clear, readable, and modular code.
- Always test your code before submitting a PR.

## Commit Message Guidelines

Follow these simple rules when writing commit messages:

1. **Use the present tense**: ("Add feature" not "Added feature").
2. **Capitalize the subject line**: Ensure the first letter of the subject line is capitalized.
3. **Keep the subject line concise**: Aim for 50 characters or fewer.
4. **Include a detailed explanation**: If necessary, provide a detailed explanation in the commit body, wrapping lines at 72 characters.
5. **Reference issues and pull requests**: Include references to any related issues or pull requests using `#issue_number`.
6. **Use imperative mood**: Start the message with a verb (e.g., "Fix", "Add", "Update", "Remove").
7. **Separate subject from body with a blank line**: If your message has a body, leave a blank line between the subject and the body.
8. **Be consistent**: Maintain consistency in style and format across your commit messages to improve clarity.

### Common Prefixes

Use the following prefixes to categorize your commits:

- **feat**: A new feature (e.g., `feat: add user login functionality`)
- **fix**: A bug fix (e.g., `fix: resolve issue with product search`)
- **chore**: Routine tasks (e.g., `chore: update dependencies`)
- **docs**: Documentation changes (e.g., `docs: update README with installation instructions`)
- **style**: Formatting changes (e.g., `style: fix whitespace issues`)
- **refactor**: Code changes that neither fix a bug nor add a feature (e.g., `refactor: simplify authentication logic`)
- **test**: Adding or updating tests (e.g., `test: add unit tests for product model`)
