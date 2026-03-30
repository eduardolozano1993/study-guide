# Topic Content Authoring

Use this folder for lesson modules, metadata, and authoring conventions.

## Standard lesson shape

- Export a metadata object from `meta.ts`.
- Export the lesson component as the default export from `index.tsx`.
- Keep route concerns out of the lesson module.

## Component usage

- Use `SectionHeader` for major topic breaks inside a lesson.
- Use `SubHeader` for a subordinate concept within a section.
- Use `CollapsibleSection` for supporting reference material and optional detail.
- Use `Callout` for editorial guidance, warnings, or important reminders.
- Use `CodeBlock` for examples that the reader should copy or inspect directly.
- Use `TopicCard` for compact summary cards, feature highlights, or lesson openers.

## Ordering guidance

- Start with the core explanation.
- Follow with the smallest useful example.
- Move to deeper detail only after the reader has the main idea.
- Collapse reference-heavy material unless it is essential to understand the lesson.

## Metadata guidance

- Add an estimated reading time when the page is a full lesson.
- Add related topics when there are obvious next steps.
- Keep the summary short and instructional.
