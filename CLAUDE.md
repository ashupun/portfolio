# Project Rules

## Code Style
- Never add comments to code
- Keep code minimal and clean
- No duplicated logic
- Always create components when code is reused
- Use single-word lowercase file names: icon, widget, theme
- Delete unused code completely

## Components
- Small, focused components
- TypeScript for type safety
- Components in app/components directory
- Server components by default, 'use client' only when needed

## Naming
- Components: PascalCase (About, Status, Weather)
- Files: lowercase (widget.tsx, icon.tsx)
- Functions: camelCase
- CSS variables: kebab-case (--pink, --card-bg)

## Next.js 16
- Use App Router
- Optimize images with next/image
- Use Metadata API for SEO
- Server components by default

## Styling
- Tailwind CSS with CSS variables
- Light and dark mode support
- Mobile-first responsive
- Semantic color tokens in globals.css

## Quality
- Research best practices before implementation
- Follow official documentation
- Performance and accessibility first
- Test responsive layouts
