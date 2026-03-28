# Frontend Architecture Review

Date: 2026-03-28

## Scope

This review focuses on:

- `src/features/**`
- `src/pages/**`
- how the menu selects and renders page content in the main application container

No application code was changed. This document is a proposed plan only.

## Executive Assessment

The current structure is acceptable for an early-stage content application, but it will not scale cleanly as the number of topics, categories, and content authors grows.

What works today:

- The app shell is conceptually correct: sidebar menu on the left, main content area on the right, and the main area renders the selected page.
- Routing is simple and understandable: one route for `/topic/:topicId` and one route for the home screen.
- Lazy loading in `src/features/topics/topicRegistry.ts` is the right direction for keeping the initial bundle small.
- The `features/content` folder already acts like a reusable content design system.

What will become problematic long term:

- Navigation structure and page registration are duplicated across separate files.
- Topic metadata is fragmented across menu config, registry config, and page component files.
- The `pages` folder currently mixes "route-level page concerns" with "lesson content modules" in a way that will become harder to govern as subject areas expand.
- Placeholder topics exist in the menu without a matching registry or actual page implementation, which creates structural drift.

## Current Structure Review

### 1. App shell and route ownership

`src/App.tsx` has a solid shell boundary:

- `Sidebar` owns navigation UI.
- `Routes` owns view selection.
- `TopicPage` acts as the route-level page renderer.

This is a good start. The structural issue is not the shell itself. The issue is the data model behind it.

Relevant files:

- `src/App.tsx`
- `src/pages/components/TopicPage.tsx`

### 2. Navigation is data-driven, but only partially

`src/features/navigation/data/menuItems.ts` is effectively the content information architecture for the whole app. It defines subjects, nested categories, topic labels, and destination paths.

That is good in principle, but the file currently behaves as a second source of truth.

Examples:

- The menu defines many topics that do not exist in the registry yet.
- Some menu items use real topic paths and some use `"#"`.
- Menu labels, ids, and topic routing are maintained manually and separately from the page registry.

This means adding a topic requires updating multiple disconnected places:

1. Create the page file.
2. Add the lazy import in `topicRegistry.ts`.
3. Add the topic definition in `topicRegistry.ts`.
4. Add the topic entry in `menuItems.ts`.

That is the main scalability problem.

Relevant files:

- `src/features/navigation/data/menuItems.ts`
- `src/features/topics/topicRegistry.ts`

### 3. Topic registry is the real route source, but it is incomplete

`src/features/topics/topicRegistry.ts` is currently the real source for renderable topics, but it only contains four topics while the menu advertises many more.

This creates multiple long-term risks:

- navigation drift
- inconsistent availability rules
- "ghost topics" that appear valid in the IA but are not truly supported
- extra maintenance whenever labels, titles, or slugs change

This also means route-level metadata is too thin. A scalable topic definition should eventually own:

- `id`
- `slug`
- `title`
- `description`
- `status`
- `subject`
- `section`
- `menuLabel`
- `searchKeywords`
- `component loader`
- optional ordering metadata

Right now the registry only owns a subset of that.

### 4. Pages folder is workable, but the boundary is not yet stable

Current `pages` structure:

- `src/pages/components/TopicPage.tsx`
- `src/pages/frontend/core-web-fundamentals/*`

This mixes:

- route/page shell components
- actual lesson content modules

That is not wrong at this scale, but it becomes awkward when the app grows because "pages" starts meaning two different things:

- route containers
- content documents

A more durable structure would separate:

- route entry pages
- topic content modules
- topic metadata/indexing

### 5. Content authoring pattern is promising

The current content components in `src/features/content/*` are a strong foundation:

- `ContentContainer`
- `TopicCard`
- `CollapsibleSection`
- `CodeBlock`
- `Callout`
- typography primitives

This is the best-structured part of the codebase. It already acts like a local content rendering toolkit.

Long term, this should become the official authoring surface for study pages. That will keep topic pages visually consistent even as more contributors add content.

### 6. Scalability concern: page authoring is too free-form

`src/pages/frontend/core-web-fundamentals/HtmlSemantics.tsx` shows a rich authoring pattern, but it is still completely manual JSX composition.

That is fine for a few pages. It gets harder when you need:

- consistent metadata
- automated navigation generation
- search/indexing
- progress tracking
- analytics by section
- content linting
- editorial review workflows

The "coming soon" pages show another issue:

- `CssBoxModel.tsx`
- `ResponsiveDesign.tsx`
- `Accessibility.tsx`

These are valid files, but they encode placeholder state in the content component itself instead of expressing placeholder state through shared topic metadata. That creates avoidable duplication.

## Main Structural Risks

### Risk 1. Two competing sources of truth

The menu tree and topic registry both define the content map.

Impact:

- easy to forget one side
- labels and titles can drift
- route availability is unclear

### Risk 2. Adding a new page is too manual

The current flow requires touching multiple files across multiple folders for a single topic.

Impact:

- higher maintenance cost
- more merge conflicts
- easier to introduce broken links or missing routes

### Risk 3. `pages/` will become overloaded

As more subject areas are added, a route-level concern and a content concern will compete inside the same folder namespace.

Impact:

- weaker mental model
- harder onboarding for contributors
- less predictable file placement

### Risk 4. Placeholder handling is inconsistent

Some topics are represented as:

- actual pages with placeholder text
- menu links to real paths without renderable definitions
- menu items using `"#"`

Impact:

- inconsistent UX
- unclear rollout status
- harder testing and release control

### Risk 5. Navigation model is too UI-shaped

`MenuItem` is a UI tree model, not a domain/content model.

Impact:

- content structure is defined by navigation rendering needs
- future search, filtering, breadcrumbs, sitemap generation, or role-based views will require new parallel models

## Recommended Target Architecture

The long-term goal should be:

- one canonical content registry
- one route container for topic rendering
- one reusable content-authoring system
- navigation derived from canonical topic metadata, not hand-maintained separately

### Recommended responsibility split

#### `app` / route shell

Own:

- app shell
- route definitions
- layout containers
- top-level navigation placement

#### `domains/topics` or `entities/topics`

Own:

- topic metadata
- topic status
- loader references
- grouping and taxonomy metadata
- selectors/helpers

#### `features/navigation`

Own:

- rendering the menu
- expansion/collapse state
- active item behavior
- accessibility of navigation UI

Do not own:

- the canonical content taxonomy

#### `content` or `features/content`

Own:

- authoring primitives
- layout blocks
- callouts
- code blocks
- section components
- possibly a typed page schema in the future

#### `content/topics` or `topics/content`

Own:

- the actual lesson modules by subject area

Example target shape:

```text
src/
  app/
    AppShell.tsx
    routes.tsx
  domains/
    topics/
      model/
        topic.types.ts
        topic.registry.ts
        topic.selectors.ts
      content/
        frontend/
          core-web-fundamentals/
            html-semantics/
              index.tsx
              meta.ts
            css-box-model/
              index.tsx
              meta.ts
  features/
    navigation/
      components/
      hooks/
    content/
      components/
      typography/
  pages/
    HomePage.tsx
    TopicRoutePage.tsx
```

The exact naming can vary, but the core idea should remain:

- route pages are not the same thing as lesson content
- topic metadata is not duplicated inside navigation config

## Plan

### Phase 1. Consolidate the source of truth

Goal:

- make topic metadata canonical

Changes I would implement:

1. Promote `topicRegistry.ts` into the single canonical topic index.
2. Expand each topic definition to include all metadata required by navigation and routing.
3. Stop hardcoding full topic items in `menuItems.ts`; instead derive navigable leaf nodes from topic metadata.
4. Keep only structural grouping in navigation if needed, or derive the full tree from metadata.

Expected result:

- adding a topic requires one primary registration step instead of several

### Phase 2. Separate route pages from lesson content

Goal:

- make the `pages` folder mean only route-level containers

Changes I would implement:

1. Keep `TopicPage.tsx` as the route container, but move it to a route-specific area such as `src/pages/TopicRoutePage.tsx` or `src/app/routes/TopicRoutePage.tsx`.
2. Move lesson modules out of `src/pages/**` into a content-oriented folder such as `src/domains/topics/content/**`.
3. Use a consistent per-topic folder pattern for future growth.

Expected result:

- route concerns and content concerns stop competing inside the same namespace

### Phase 3. Normalize topic status and placeholders

Goal:

- make rollout state consistent

Changes I would implement:

1. Add a strict `status` model such as `draft | ready | coming-soon | archived`.
2. Represent placeholder topics in metadata, not ad hoc inside content files or `"#"` links.
3. Render "coming soon" topics through one shared route behavior.
4. Optionally hide draft topics from navigation entirely.

Expected result:

- cleaner UX and much more predictable release management

### Phase 4. Strengthen the navigation boundary

Goal:

- make navigation a rendering layer, not the content source

Changes I would implement:

1. Replace the current generic `MenuItem` model with a typed navigation view model derived from topic metadata.
2. Add explicit support for group nodes vs topic nodes.
3. Move tree-building logic into a dedicated mapper or selector.
4. Keep `Sidebar` focused only on rendering and interaction state.

Expected result:

- easier to support breadcrumbs, search, collapsible sections, and alternate navigation patterns later

### Phase 5. Formalize content authoring conventions

Goal:

- make content contributions predictable and scalable

Changes I would implement:

1. Define a standard topic module contract:
   - metadata
   - default exported content component
   - optional related topics
   - optional estimated reading time
2. Add authoring guidelines for when to use:
   - `SectionHeader`
   - `CollapsibleSection`
   - `Callout`
   - `CodeBlock`
3. Introduce a lightweight page template or helper for common lesson structure.
4. Optionally move toward structured content data for highly repetitive sections later.

Expected result:

- more consistent pages and easier multi-author collaboration

### Phase 6. Add architecture guardrails

Goal:

- prevent drift from returning

Changes I would implement:

1. Add tests that verify every navigable topic has a valid registry entry.
2. Add tests that verify no duplicate topic ids or slugs exist.
3. Add tests that verify derived menu output matches supported topic statuses.
4. Add a small content integrity check script if the topic count grows significantly.

Expected result:

- structural issues get caught automatically instead of through manual review

## Concrete Change List

If I were implementing this next, I would make the following changes in order:

1. Refactor topic registration into a single canonical metadata registry.
2. Make navigation derive from that registry instead of manually duplicating topic leaves in `menuItems.ts`.
3. Move lesson content modules out of `src/pages/**` into a content/domain folder.
4. Restrict `src/pages/**` to route containers only.
5. Add explicit topic status handling and remove `"#"` placeholder links.
6. Replace placeholder content pages with shared status-driven route rendering where appropriate.
7. Add richer topic metadata to support future search, filtering, and analytics.
8. Introduce a topic folder convention so each topic can grow without becoming a single oversized `.tsx` file.
9. Add integrity tests for topic ids, slugs, statuses, and navigation derivation.
10. Document the content authoring contract for future contributors.

## Suggested Folder Direction

This is the direction I would recommend for long-term maintainability:

```text
src/
  app/
    App.tsx
    AppShell.tsx
    routes.tsx
  pages/
    HomePage.tsx
    TopicRoutePage.tsx
  domains/
    topics/
      model/
        topic.types.ts
        topic.registry.ts
        topic.navigation.ts
      content/
        frontend/
          core-web-fundamentals/
            html-semantics/
              index.tsx
              meta.ts
            css-box-model/
              index.tsx
              meta.ts
            responsive-design/
              index.tsx
              meta.ts
            accessibility/
              index.tsx
              meta.ts
  features/
    navigation/
      components/
      hooks/
    content/
      Callout.tsx
      CodeBlock.tsx
      CollapsibleSection.tsx
      ContentContainer.tsx
      TopicCard.tsx
      typography.tsx
```

## Final Recommendation

The current app shell and content primitives are good enough to keep. I would not rebuild the app from scratch.

The highest-value architectural move is this:

- make topic metadata the single source of truth
- derive navigation from it
- separate route pages from lesson content

That change will improve extensibility far more than any visual or component-level refactor.

## Files Reviewed

- `src/App.tsx`
- `src/features/navigation/components/Sidebar.tsx`
- `src/features/navigation/data/menuItems.ts`
- `src/features/navigation/types/menuItem.interface.ts`
- `src/features/topics/topicRegistry.ts`
- `src/features/content/ContentContainer.tsx`
- `src/features/content/TopicCard.tsx`
- `src/features/content/CollapsibleSection.tsx`
- `src/features/content/Callout.tsx`
- `src/features/content/CodeBlock.tsx`
- `src/features/content/typography.tsx`
- `src/pages/components/TopicPage.tsx`
- `src/pages/frontend/core-web-fundamentals/HtmlSemantics.tsx`
- `src/pages/frontend/core-web-fundamentals/CssBoxModel.tsx`
- `src/pages/frontend/core-web-fundamentals/ResponsiveDesign.tsx`
- `src/pages/frontend/core-web-fundamentals/Accessibility.tsx`
