# Contributing to TerraFund

Thank you for your interest in contributing to TerraFund! We welcome contributions from everyone.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/terrafund.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Run tests: `npm run lint && npm run type-check`
7. Commit your changes: `git commit -m "Add your message"`
8. Push to your fork: `git push origin feature/your-feature-name`
9. Open a Pull Request

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages

- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove)
- Keep the first line under 50 characters
- Add more details in the body if needed

### Testing

- Write tests for new features
- Ensure all tests pass before submitting
- Test your changes in different browsers

### Pull Requests

- Provide a clear description of the changes
- Reference any related issues
- Ensure CI checks pass
- Request review from maintainers

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API calls
├── store/              # Redux store and slices
└── types/              # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Questions?

If you have any questions, feel free to open an issue or contact the maintainers.