# Agent Management Rules & Guidelines

## 1. Language & Communication Standards
- **Git Commit Messages**: Must be written in **English** following Conventional Commits formatting (e.g., `feat: ...`, `fix: ...`, `docs: ...`, `refactor: ...`).
- **Code Comments & Documentation**: All source code comments, JSDoc/TSDoc annotations, inline explanations, and documentation files (`.md` files) must be written in **English**.
- **User Explanations & Dialogue**: All direct chat explanations, progress reports, and discussions with the user must be provided in **Traditional Chinese (繁體中文)**.

## 2. Angular Official Guidelines & Philosophy
This repository strictly adheres to the official Angular team guidelines, best practices, and modern architectural standards.

### 2.1 Core Architectural Principles
- **Standalone Components**: Use Standalone Components (`standalone: true`) by default for components, directives, and pipes. Avoid legacy `NgModule` unless required for third-party integrations.
- **Angular Signals**: Prefer Angular Signals (`signal()`, `computed()`, `input()`, `output()`, `model()`) for state management and component communication.
- **RxJS Integration**: Use RxJS primarily for asynchronous event streams and HTTP requests. Utilize `@angular/core/rxjs-interop` (`toSignal`, `toObservable`) for seamless integration with Signals.
- **Control Flow**: Utilize modern built-in block control flow syntax (`@if`, `@for`, `@switch`) instead of legacy structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`).
- **OnPush Change Detection**: Apply `ChangeDetectionStrategy.OnPush` to all components for optimized change detection performance.
- **Deferrable Views**: Leverage `@defer` blocks to lazy-load heavy UI sections and optimize page rendering performance.

### 2.2 Coding & Project Conventions
- **Angular Style Guide**: Adhere strictly to the official Angular Style Guide (kebab-case file naming with standard suffixes like `.component.ts`, `.service.ts`, `.directive.ts`, single responsibility rule).
- **Dependency Injection**: Prefer modern functional `inject()` syntax for dependency injection over legacy constructor parameter injection where appropriate.
- **Strict TypeScript**: Enforce strict typing. Do not use `any` unless explicitly justified; define domain models and interface types.
- **Component Design**: Maintain slim, presentation-focused components and delegate complex business logic to dedicated services.
