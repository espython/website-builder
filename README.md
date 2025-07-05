# Mini Website Builder

A drag-and-drop website builder built with Next.js that allows users to easily create and customize web pages without coding knowledge.

## Features

- **Intuitive Drag and Drop Interface**: Build websites by simply dragging and dropping components onto the page
- **Component Library**: Various pre-built components ready to use in your designs
- **Real-time Preview**: See how your website looks as you build it
- **Responsive Design**: Create websites that work on all device sizes
- **Theme Customization**: Easily modify colors, fonts, and styles
- **Modern UI**: Built with Radix UI components and styled with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Drag and Drop**: dnd-kit
- **State Management**: Zustand
- **Animation**: tw-animate-css

## Project Structure

```
mini-website-builder/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── globals.css     # Global CSS
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   │
│   ├── features/           # Feature-based organization
│   │   ├── builder/        # Website builder feature
│   │   │   ├── components/ # Builder UI components
│   │   │   ├── hooks/      # Builder-specific hooks
│   │   │   ├── pages/      # Builder pages
│   │   │   └── store/      # Builder state management
│   │   │
│   │   ├── preview/        # Website preview feature
│   │   └── sections/       # Website section templates
│   │
│   └── shared/             # Shared code across features
│       ├── components/     # UI components
│       ├── lib/            # Utility libraries
│       ├── providers/      # React context providers
│       └── utils/          # Utility functions
│
├── .eslintrc.json         # ESLint configuration
├── .husky/                # Git hooks
├── .prettierrc            # Prettier configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Implementation Architecture

### Feature-Based Organization

The application follows a feature-based architecture where code is organized by business domain rather than technical function:

- **Builder Feature**: Contains all components, hooks, and state management related to the website builder interface
- **Preview Feature**: Responsible for displaying the website preview in different device sizes
- **Sections Feature**: Manages the different section types and templates available for users to add to their websites

This approach helps maintain separation of concerns and makes it easier to understand the codebase as it scales.

### Component Architecture

Components follow a hierarchy of:

1. **Page Components**: Top-level components that serve as entry points for routes
2. **Feature Components**: Complex components specific to a feature
3. **Shared Components**: Reusable UI components used across features
4. **Primitive Components**: Low-level UI building blocks (buttons, inputs, etc.)

### Drag and Drop Implementation

The drag-and-drop functionality uses the `@dnd-kit` library with:

- **Sortable Context**: Wraps the sections list to enable reordering
- **Draggable Elements**: Each section is wrapped in a draggable component
- **Drop Zones**: Designated areas where elements can be dropped
- **Custom Drag Overlay**: Enhanced visual feedback during drag operations

The implementation supports:

- Section reordering
- Component placement within sections
- Drag handles for better user experience

## State Management

The application uses Zustand for state management, with a modular approach that divides state into domain-specific stores:

### Configuration Store (`configStore`)

Manages project-level configuration and metadata:

```typescript
// Key state
currentProjectId: string | null
currentProjectName: string
currentProjectDescription: string
savedProjects: Project[]
autoSave: boolean
previewMode: 'desktop' | 'mobile' | 'tablet'

// Key actions
createNewProject(name, description)
saveProjectAs(name, description)
deleteProject(id)
```

### Sections Store (`sectionsStore`)

Manages website sections and provides history functionality:

```typescript
// Key state
sections: Section[]
selectedSectionId: string | null
history: HistoryState[]
historyIndex: number
canUndo: boolean
canRedo: boolean

// Key actions
addSection(type, content)
updateSection(id, content)
deleteSection(id)
reorderSections(activeId, overId)
undo()
redo()
exportSite(projectName)
importSite(data)
```

### UI Store (`uiStore`)

Manages UI-related state:

```typescript
// Key state
previewMode: 'mobile' | 'tablet' | 'desktop';

// Key actions
setPreviewMode(mode);
```

### State Persistence

All stores use Zustand's persist middleware to save state to localStorage, with:

- Custom storage configuration for SSR compatibility
- Skip hydration to avoid hydration mismatches
- Separate storage keys for each store

### State Management Principles

The application follows these state management principles:

1. **Single Source of Truth**: Each piece of state lives in exactly one store
2. **Minimal State**: Only essential data is stored in global state
3. **Derived State**: Complex state is computed from simple state when possible
4. **Immutability**: State is never directly mutated, only through actions
5. **Persistence**: User data is automatically persisted to localStorage

## Development

### Prerequisites

- Node.js 18.x or higher
- npm or yarn or pnpm

### Code Architecture

This project follows a feature-based architecture, where code is organized by business domain rather than technical function. Key architectural principles include:

- **Feature Isolation**: Each feature has its own components, hooks, and state
- **Shared Components**: Reusable UI components live in the shared directory
- **State Management**: Zustand is used for state management with stores organized by feature
- **Composition**: Complex UI is built by composing smaller components

### Development Workflow

1. **Setup**: Fork the repository and clone it to your local machine
2. **Install Dependencies**: Run `npm install` to install all dependencies
3. **Development Mode**: Run `npm run dev` to start the development server
4. **Linting**: Code is automatically linted on commit using Husky
5. **Building**: Run `npm run build` to create a production build

### Code Style

This project uses:

- ESLint for code linting with Next.js recommended rules
- Prettier for code formatting
- Husky for git hooks to enforce code quality
- TypeScript for static type checking

### Testing

- Unit tests can be run with `npm test`
- Component testing with React Testing Library
- End-to-end testing with Playwright

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website builder in action.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Feedback

Feel free to open an issue if you have any questions or suggestions for improvements!
