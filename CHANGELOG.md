# Changelog

All notable changes to TerraFund will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-21

### Added
- ErrorBoundary component for enhanced error handling
- Fade-in and zoom animations to modal components
- Notifications and Reports API endpoints
- Jest testing framework setup with unit tests
- Lazy loading for Map component to improve performance
- Improved accessibility with ARIA attributes and proper label association
- API documentation in README
- Additional unit tests for Input component

### Changed
- Updated package.json with test scripts
- Enhanced Input component with better accessibility

## [1.0.0] - 2025-01-21

### Added
- Initial release of TerraFund platform
- User registration and authentication
- Land listing and discovery features
- Investment proposal system
- Real-time chat functionality
- Contract signing with digital signatures
- Payment processing with escrow
- Admin dashboard for platform management
- Responsive design with dark mode support
- API endpoints for all core functionality

### Features
- **For Landowners**: List land, receive proposals, negotiate deals, sign contracts
- **For Investors**: Browse lands, send proposals, chat with landowners, make payments
- **For Admins**: Manage users, verify lands, monitor platform activity
- **Security**: KYC verification, encrypted payments, secure authentication
- **UI/UX**: Modern design, mobile-responsive, accessibility features

### Technical
- Built with Next.js 15, React 19, TypeScript
- State management with Redux Toolkit
- Styled with TailwindCSS and ShadCN UI
- Database integration ready (PostgreSQL + MongoDB)
- Docker containerization
- CI/CD with GitHub Actions