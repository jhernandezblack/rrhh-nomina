# RrhhNomina

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Structure of the folder

src/
├── app/
│   ├── core/                  # Core application modules
│   │   ├── auth/              # Authentication related
│   │   │   ├── guards/        # Route guards
│   │   │   ├── interceptors/  # HTTP interceptors
│   │   │   ├── services/      # Auth services
│   │   │   └── models/        # Auth models/interfaces
│   │   ├── api/               # API communication
│   │   │   ├── services/      # API services
│   │   │   ├── models/        # API models/interfaces
│   │   │   └── utils/        # API utilities
│   │   ├── interceptors/      # Global interceptors
│   │   ├── utils/             # Utility functions
│   │   └── core.config.ts     # Core configuration
│   │
│   ├── shared/                # Shared components/modules
│   │   ├── components/        # Reusable components
│   │   │   ├── header/        # Header component
│   │   │   ├── footer/        # Footer component
│   │   │   ├── modal/         # Modal system
│   │   │   └── ...            # Other shared components
│   │   ├── directives/        # Shared directives
│   │   ├── pipes/             # Shared pipes
│   │   └── services/         # Shared services
│   │
│   ├── features/              # Feature modules
│   │   ├── home/              # Home feature
│   │   ├── dashboard/         # Dashboard feature
│   │   └── ...               # Other features
│   │
│   ├── styles/                # Global SCSS
│   │   ├── _variables.scss    # Bootstrap variables override
│   │   ├── _mixins.scss       # Custom mixins
│   │   ├── _buttons.scss      # Button styles
│   │   ├── _forms.scss        # Form controls styles
│   │   ├── _typography.scss   # Typography styles
│   │   └── _global.scss       # Global styles
│   │
│   ├── app.config.ts          # Application configuration
│   ├── app.routes.ts          # Application routes
│   └── app.component.ts       # Root component
│
├── assets/
│   ├── images/                # Application images
│   └── scss/                  # Additional SCSS files
│
├── environments/              # Environment configurations
└── main.ts                    # Application entry point




## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
