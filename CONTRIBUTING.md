# Contributing

Thank you for your interest in contributing to this project.

## Development Setup

```bash
git clone https://github.com/arshathhussain46/saisaktheeswari-staffing-services.git
cd saisaktheeswari-staffing-services
npm install
npm run dev
```

## Branch Naming

- `feature/description` — new features
- `fix/description` — bug fixes
- `chore/description` — maintenance, deps, config

## Commit Style

Use conventional commits:

```
feat: add contact form validation
fix: resolve mobile navbar overflow
chore: update framer-motion to v12
```

## Code Standards

- TypeScript strict mode — no `any` unless unavoidable
- Tailwind utility classes — no inline `style` for layout (only for dynamic values like `clamp()`)
- Framer Motion for all animations — no CSS keyframes
- Components must be functional with hooks — no class components
- No placeholder images, fake testimonials, or stock photos

## Pull Request Process

1. Create a branch from `main`
2. Make your changes
3. Run `npm run build` — must pass with zero errors
4. Open a PR with a clear description of what changed and why

## Image Guidelines

All images must be real company photographs. Do not add:
- Stock photos
- AI-generated images
- Generic illustrations
- Placeholder images
