# Frontend for Climate Atlas by Stories of Change

This is a refactored version of the [previos repo](https://github.com/stories-of-change/atlas). The refactor was done to better structure the codebase and make it easier to maintain it long term. The following changes were brought:

1. The different component names and how they are structured in the app, removed unnecessary components.
2. Files containing data that weren't used by the frontend anymore were removed
3. Zustand was used instead of react context for state management, in order to make the codebase cleaner.
4. Using tailwindcss in most places to make development easier.
5. Typescript support was added to almost the entire codebase.
