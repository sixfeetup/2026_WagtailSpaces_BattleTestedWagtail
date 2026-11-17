# Deploy Pages from the repository root

## Intent

Repair the GitHub Pages workflow after the Slidev project was found to live at the repository root rather than under `slides/`.

## Approach

Pin Node.js 22.12.0 in a root `.nvmrc`, remove the nonexistent `slides` working directories, and make the workflow watch the root Slidev entry point and its build inputs. Keep the existing Pages build and deployment structure unchanged.

## Success criteria

- `actions/setup-node` can read `.nvmrc`.
- Dependency installation and the Slidev build execute from the repository root.
- Changes to root presentation sources, package metadata, and local themes trigger the workflow.
- A production Slidev build succeeds with the repository Pages base path.
