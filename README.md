# TerraFund

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC)](https://redux-toolkit.js.org/)

A decentralized investment platform connecting landowners with investors for sustainable land development.

## Features

- **Land Listing & Discovery**: Landowners can list their unused land with detailed information
- **Investment Proposals**: Investors can send proposals to landowners
- **Real-time Chat**: Communication between landowners and investors
- **Contract Management**: Digital contract signing and escrow payments
- **KYC Verification**: Secure identity verification for all users
- **Admin Dashboard**: Platform management and analytics

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS, Framer Motion
- **State Management**: Redux Toolkit, React Query
- **Backend**: Node.js, Express, PostgreSQL, Prisma
- **Authentication**: JWT
- **File Storage**: AWS S3
- **Real-time**: WebSockets

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

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

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

## API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Lands
- `GET /api/lands` - Get all available lands
- `POST /api/lands` - Create new land listing (landowners only)

### Proposals
- `GET /api/proposals` - Get user's proposals
- `POST /api/proposals` - Create new proposal
- `GET /api/proposals/[id]` - Get proposal details

### Chat
- `GET /api/chat/[conversationId]` - Get chat messages
- `POST /api/chat/[conversationId]` - Send message

### Payments
- `POST /api/payments` - Process payment

### Notifications
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications` - Create notification

### Reports
- `GET /api/reports` - Get user reports
- `POST /api/reports` - Generate report

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/lands` - Get all lands (admin only)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test`
5. Submit a pull request

## License

This project is licensed under the MIT License.