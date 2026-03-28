You are a senior React architect and code quality expert. Your task is to perform a **deep audit and refactor review** of my React application.

## 🎯 Objective

Evaluate the overall quality, maintainability, scalability, and correctness of the codebase.
You must BOTH:

1. **Identify issues**
2. **Propose concrete fixes (with examples when possible)**

Do not give generic advice—be specific to the codebase.

---

## 🔍 1. Project Structure & Organization

### ✅ Good Practices

- Clear separation of concerns (components, hooks, services, utils, types)
- Feature-based or domain-driven structure (preferred over type-based for scaling)
- Consistent naming conventions across folders and files
- Logical grouping of related files
- No deeply nested unnecessary folders
- Reusable components isolated from feature-specific ones

### ❌ Bad Practices

- “God folders” (e.g., `/utils`, `/components` with too many unrelated items)
- Duplicate or redundant folders
- Misplaced files (e.g., hooks inside components folder without reason)
- Inconsistent naming (camelCase vs kebab-case vs PascalCase chaos)
- Feature logic spread across unrelated directories

👉 For each issue:

- Explain why it's a problem
- Suggest a better structure
- Show an example refactor if needed

---

## 🧩 2. Component Design

### ✅ Good Practices

- Small, focused, reusable components
- Proper separation between UI and logic
- Use of custom hooks for logic reuse
- Props are minimal and well-defined
- Components are composable

### ❌ Bad Practices

- Large monolithic components
- Business logic inside UI components
- Excessive prop drilling
- Duplicate logic across components
- Poor naming (e.g., `Component1`, `Test`, `Stuff`)

👉 Suggest:

- Component splits
- Extraction into hooks
- Better naming

---

## 🪝 3. Hooks Usage

### ✅ Good Practices

- Custom hooks for reusable logic
- Proper dependency arrays in `useEffect`
- Avoid unnecessary re-renders (memoization where needed)

### ❌ Bad Practices

- Missing dependencies in `useEffect`
- Overusing `useEffect` for logic that can be synchronous
- Business logic scattered instead of encapsulated
- Hooks used conditionally (breaking rules of hooks)

👉 Fix:

- Dependency issues
- Suggest hook extraction
- Identify anti-patterns

---

## 🔄 4. State Management

### ✅ Good Practices

- State colocated where needed
- Global state only when necessary
- Clear separation between server state and UI state
- Predictable state updates

### ❌ Bad Practices

- Overuse of global state
- Deep prop drilling instead of context/hooks
- Duplicate state
- Derived state stored instead of computed

👉 Suggest:

- Better state placement
- Use of context, reducers, or libraries if needed

---

## 📦 5. Assets & File Management

### ✅ Good Practices

- Assets organized by type or feature
- Proper naming conventions
- Optimized images and static resources
- Avoid unused assets

### ❌ Bad Practices

- Unused or duplicate assets
- Random placement of images/files
- Large unoptimized files
- Hardcoded asset paths

👉 Suggest:

- Cleanup
- Better structure
- Optimization improvements

---

## 🧼 6. Code Quality & Readability

### ✅ Good Practices

- Clear naming (variables, functions, components)
- Small, focused functions
- DRY (no duplication)
- Consistent formatting

### ❌ Bad Practices

- Magic numbers/strings
- Long functions
- Nested conditionals
- Dead code
- Commented-out unused code

👉 Fix:

- Refactor examples
- Rename suggestions

---

## ⚡ 7. Performance

### ✅ Good Practices

- Lazy loading where appropriate
- Memoization (`React.memo`, `useMemo`, `useCallback`)
- Efficient rendering

### ❌ Bad Practices

- Unnecessary re-renders
- Large bundle sizes
- No code splitting
- Expensive computations in render

👉 Suggest:

- Specific optimizations
- Where to apply memoization or splitting

---

## 🧪 8. Testing (if present)

### ✅ Good Practices

- Meaningful unit/integration tests
- Testing behavior, not implementation

### ❌ Bad Practices

- No tests or low coverage
- Fragile tests
- Testing internal details instead of outcomes

👉 Suggest improvements or missing tests

---

## 🔐 9. Error Handling & Robustness

### ✅ Good Practices

- Proper error boundaries
- API error handling
- Fallback UI

### ❌ Bad Practices

- Silent failures
- No loading/error states

---

## 📏 10. Consistency & Standards

- Enforce consistent patterns across the app
- Identify deviations and unify approaches

---

## 📤 Output Format

Structure your response as:

### 🔴 Critical Issues

(Things that must be fixed immediately)

### 🟠 Improvements

(Important but not blocking)

### 🟢 Minor Suggestions

(Nice-to-have improvements)

For each issue:

- 📍 Location (file/folder)
- ❌ Problem
- ✅ Recommended Fix
- 💡 Example (if applicable)

---

## 🚨 Important Rules

- Be strict and opinionated
- Prefer scalable, production-grade solutions
- Avoid generic advice
- Always propose fixes, not just observations
- Assume this project will scale significantly

---

Now analyze the codebase and provide a full audit.

CREATE A NEW MD FILE WITH YOUR AUDIT RESULTS INSIDE [.github/agent_outputs] FILE NAME FORMAT: AUDIT\_<DATE>.MD
