# user-management-app

This is a web application for user management, developed using Nuxt.js. The application provides an interface for viewing, creating, editing, and deleting users. It uses MSW for API mocks in development mode.

## Technologies

- **Nuxt.js**: Framework for Vue.js
- **Tailwind CSS**: For styling
- **MSW (Mock Service Worker)**: For API mocks
- **Vitest**: For testing
- **TypeScript**: For typing

## Project Structure

- `app/`: Main application
- `components/`: UI components (atoms, molecules, organisms)
- `composables/`: Reusable functions
- `pages/`: Application pages
- `mocks/`: API mocks
- `tests/`: Tests

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Initialize MSW (required for development)
npx msw init public/

# 3. Start the development server
npm run dev
```

Open: `http://localhost:3000`

## Working with the Application

The application has two main pages:

- **Home Page** (`/`): List of users with search, sorting, and filtering capabilities.
- **Admin Panel** (`/admin`): Form for creating and editing users.

### Main Features:

- View list of users
- Search users by name or email
- Sort by various fields
- Create a new user
- Edit an existing user
- Delete a user

## Testing

```bash
npm run test
```

## If it doesn't work

```bash
# Restart mocks
rm -f public/mockServiceWorker.js
npx msw init public/
npm run dev
```

## If everything is broken

```bash
# Full reinstall
rm -rf node_modules .nuxt .output
rm -f public/mockServiceWorker.js
npm install
npx msw init public/
npm run dev
```

### API Endpoints

| Method | URL              | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/users`     | Get all users     |
| GET    | `/api/users/:id` | Get user by ID    |
| POST   | `/api/users`     | Create a new user |
| PUT    | `/api/users/:id` | Update user       |
| DELETE | `/api/users/:id` | Delete user       |
