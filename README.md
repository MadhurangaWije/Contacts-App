# Contacts Management Application

A modern contact management application built with Next.js, Redux Toolkit, and TypeScript. The application provides a clean interface for managing contacts with features like pagination, search, and real-time updates.

## Features

- 📋 Contact listing with pagination
- 🔍 Real-time search functionality
- ✏️ Add, edit, and delete contacts
- 📱 Responsive design
- 🎯 Type-safe with TypeScript
- 🧪 Comprehensive test coverage

```bash
app/
├── components/ # Reusable components
│ ├── AddContactDialog # New contact creation
│ ├── EditContactDialog # Contact editing
│ ├── ContactTable # Main contact listing
│ └── ExpandedCard # Detailed contact view
├── store/ # Redux store setup
│ ├── features/
│ │ └── contacts/ # Contact-related state management
│ ├── middleware/ # Custom Redux middleware
│ └── hooks.ts # Custom Redux hooks
├── services/ # API services
│ └── api.ts # Axios setup and API calls
└── types/ # TypeScript type definitions
```

### State Management

The application uses Redux Toolkit for state management with the following structure:

- **Store**: Central state container
- **Slices**: Feature-based state management (contacts)
- **Thunks**: Async actions for API calls
- **Middleware**: Error handling and logging

### Data Flow

1. User interactions trigger Redux actions
2. Thunks handle async operations with the API
3. Reducers update the store based on action results
4. Components re-render with updated data
5. Error middleware catches and displays errors

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd contacts-app
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### API Configuration

The application expects a REST API running at `http://localhost:3000` with the following endpoints:

- `GET /contacts?page={page}&limit={limit}` - Fetch paginated contacts
- `POST /contacts` - Create new contact
- `PUT /contacts/:id` - Update contact
- `DELETE /contacts/:id` - Delete contact

### Running Tests

Run the test suite:
```bash
npm test
```
## Testing Strategy

The application includes comprehensive tests for:

- Redux state management
- API service layer
- React components
- User interactions

### Test Coverage

- Unit tests for Redux reducers and actions
- Integration tests for API services
- Component tests for UI behavior
- End-to-end tests for critical user flows

## Development

### Code Organization

- Components follow a functional approach with hooks
- TypeScript interfaces ensure type safety
- Redux actions use builder pattern for type inference
- Jest tests co-located with source files

### State Management Patterns

- Centralized store configuration
- Feature-based slice organization
- Async thunks for API integration
- Custom hooks for Redux usage

## Architecture

### Tech Stack
- **Frontend Framework**: Next.js 14
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Type Safety**: TypeScript
- **Testing**: Jest + React Testing Library
