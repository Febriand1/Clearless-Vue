# Vue Forum

A modern forum application built with Vue 3, TypeScript, and Tailwind CSS. This project demonstrates a full-stack forum application with authentication, thread management, comments, likes, and replies.

## Features

-   🔐 **Authentication System** - Login and registration with real API
-   💬 **Thread Management** - Create, view, and manage discussion threads
-   💭 **Comments & Replies** - Nested comment system with reply functionality
-   ❤️ **Like System** - Like threads and comments
-   🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
-   📱 **Mobile Friendly** - Responsive design that works on all devices
-   🔧 **TypeScript** - Full type safety throughout the application
-   🏪 **State Management** - Pinia for efficient state management
-   🛣️ **Routing** - Vue Router for navigation

## Tech Stack

-   **Frontend**: Vue 3 with Composition API
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **State Management**: Pinia
-   **Routing**: Vue Router
-   **Build Tool**: Vite
-   **HTTP Client**: Axios

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── CommentForm.vue
│   ├── CommentItem.vue
│   └── ThreadCard.vue
├── data/               # Mock data
│   └── mockData.ts
├── router/             # Vue Router configuration
│   └── index.ts
├── services/           # API services
│   ├── api.ts
│   └── mockApi.ts
├── stores/             # Pinia stores
│   ├── auth.ts
│   └── forum.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── views/              # Page components
│   ├── HomeView.vue
│   ├── LoginView.vue
│   ├── RegisterView.vue
│   ├── ThreadView.vue
│   └── CreateThreadView.vue
├── App.vue
├── main.ts
└── style.css
```

## Getting Started

### Prerequisites

-   Node.js (version 20.19.0 or higher)
-   pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd forum-vue
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

-   `pnpm dev` - Start development server
-   `pnpm build` - Build for production
-   `pnpm preview` - Preview production build
-   `pnpm type-check` - Run TypeScript type checking

## Features Overview

### Authentication

-   User registration and login
-   Persistent authentication state
-   Protected routes

### Thread Management

-   Create new discussion threads
-   View thread details
-   Categorize threads
-   Like/unlike threads

### Comments System

-   Add comments to threads
-   Reply to comments (nested structure)
-   Like/unlike comments
-   Real-time updates

### UI/UX

-   Clean, modern design
-   Responsive layout
-   Loading states
-   Error handling
-   Empty states

## API Integration

The application is integrated with a real backend API running on `http://localhost:5001`. The API endpoints include:

-   `POST /authentications` - User login
-   `POST /users` - User registration
-   `GET /users/me` - Get current user
-   `GET /threads` - Get all threads
-   `POST /threads` - Create new thread
-   `GET /threads/:id` - Get thread details
-   `GET /threads/:id/comments` - Get thread comments
-   `POST /threads/:id/comments` - Create comment
-   `POST /threads/:id/up-vote` - Like/unlike thread
-   `POST /comments/:id/up-vote` - Like/unlike comment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
