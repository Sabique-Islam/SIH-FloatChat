# Contributing to FloatChat

## Branching & PRs

* **Do not push directly to `main`.**
* Work on your **own branch**:

  ```bash
  git checkout -b feature/<your-feature-name>
  ```
* After finishing your changes, **create a pull request (PR) to merge into `main`**.
* PRs must be reviewed before merging.

---

## Frontend Structure

* **`app/page.tsx`**:

  * Only call exported components here.
  * No UI logic or JSX directly in this file.
* **Homepage UI sections**:

  * Everything must be in the `sections/` folder.
  * Each section should be a self-contained component:

    ```
    /sections
      Navbar.tsx
      Hero.tsx
      Features.tsx
      Footer.tsx
    ```

---

## Code Style

* Use Prettier + ESLint.
* Name components and functions clearly.
* Keep components modular and reusable.

## Build & Test

* Before creating a PR, run:

  ```bash
  npm run build
  ```
* Ensure the build passes and there are no linting errors.

---

## Commits

* Use clear commit messages:

  ```
  feat: add salinity profile map
  fix: correct depth axis labels
  ```

---
