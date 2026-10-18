# learn-typescript

A hands-on TypeScript learning repo — from fundamentals to testing and design.

Each folder is a stage. Each file is a standalone lesson you can read and run on its own.

> Arabic version: [`README_RA.md`](./README_RA.md)

---

## Requirements

- [Node.js](https://nodejs.org/) (v18+ recommended)
- TypeScript and a runner like `tsx` (optional, but convenient)

```bash
npm install
npm install -g typescript tsx   # optional global install
```

---

## Running lessons

Run any lesson directly:

```bash
npx tsx 01_types_fundamentals/01_primitives.ts
```

Or type-check the whole project:

```bash
npx tsc --noEmit
```

---

## Project structure

Quick overview:

| Folder | Topic |
|--------|-------|
| `01_types_fundamentals` | Core types, inference, arrays, unions |
| `02_functions_control_flow` | Functions, narrowing, overloads |
| `03_object_modeling` | `type` / `interface`, discriminated unions |
| `04_generics_advanced_types` | Generics, mapped/conditional, utility types |
| `05_classes_oop` | Classes, inheritance, composition |
| `06_modules_tooling` | Modules, `tsconfig`, ESM/CJS |
| `07_async_runtime` | Promises, Node.js, environment variables |
| `08_testing_design` | Testing, SOLID, Repository/Service |

For a checklist-style progress track, see [`roadmap.md`](./roadmap.md).

---

### `01_types_fundamentals` — Types & fundamentals

TypeScript basics: value types, inference, and early type composition.

| File | Description |
|------|-------------|
| `01_primitives.ts` | Primitive types: `string`, `number`, `boolean`, and mutable variables |
| `02_special_types.ts` | Special types: `any`, `unknown`, `never`, `void`, and when to use each |
| `03_inference_annotations.ts` | Type inference vs writing annotations by hand |
| `04_arrays_tuples.ts` | Arrays (`T[]`) and tuples with fixed length/types per position |
| `05_objects_optional.ts` | Objects with required properties and optional ones via `?` |
| `06_enums_literals.ts` | Enums and literal types such as `"admin"` |
| `07_union_intersection.ts` | Union types `|` and intersection types `&` |

---

### `02_functions_control_flow` — Functions & control flow

Writing safe functions and narrowing types inside conditionals.

| File | Description |
|------|-------------|
| `01_function_params_return.ts` | Function parameters and return types (explicit or inferred) |
| `02_optional_default_params.ts` | Optional parameters `?` and default values |
| `03_arrow_callbacks.ts` | Arrow functions and passing functions as callbacks |
| `04_function_overloads.ts` | Same function with multiple signatures (overloads) by input type |
| `05_type_narrowing.ts` | Narrowing a union to a more precise type inside `if` / `else` |
| `06_typeof_instanceof_in.ts` | Narrowing tools: `typeof`, `instanceof`, `in` |
| `07_type_predicates_assertions.ts` | `is` functions (type predicates) and assertion functions |

---

### `03_object_modeling` — Object modeling

How to shape data with `type` and `interface`.

| File | Description |
|------|-------------|
| `01_type_interface.ts` | Basic usage and differences between `type` and `interface` |
| `02_extending_intersection.ts` | Extending interfaces with `extends` and intersections with `&` |
| `03_readonly_optional.ts` | `readonly` properties and optional properties |
| `04_index_signatures.ts` | Dynamic keys: `[key: string]: ...` |
| `05_discriminated_unions.ts` | Unions with a discriminant (`status`) for safe case handling |
| `06_structural_typing.ts` | Structural typing: shape matters more than the type name |

---

### `04_generics_advanced_types` — Generics & advanced types

Reusable flexible types and type-transformation tools.

| File | Description |
|------|-------------|
| `01_generic_functions_interfaces.ts` | Generic functions and interfaces with `<T>` |
| `02_generic_constraints.ts` | Constraining generics with `extends` |
| `03_keyof_typeof.ts` | Extracting keys with `keyof` and value types with `typeof` |
| `04_indexed_access.ts` | Property type access: `T[K]` |
| `05_conditional_infer.ts` | Conditional types `T extends U ? X : Y` and `infer` |
| `06_mapped_types.ts` | Transforming every property of a type into a new shape |
| `07_utility_types.ts` | Built-in helpers: `Partial`, `Pick`, `Omit`, `Record`, ... |
| `08_template_literal_types.ts` | Building string types from parts with template literals |

---

### `05_classes_oop` — Classes & OOP

OOP in TypeScript: encapsulation, inheritance, and composition.

| File | Description |
|------|-------------|
| `01_classes_constructors.ts` | Defining a class and its constructor |
| `02_access_modifiers.ts` | Access levels: `public`, `private`, `protected` |
| `03_readonly_static.ts` | `readonly` fields and `static` class-level members |
| `04_inheritance_implements.ts` | Inheritance with `extends` and contracts with `implements` |
| `05_abstract_classes.ts` | Abstract classes as templates that cannot be instantiated directly |
| `06_composition_vs_inheritance.ts` | When to prefer composition (has-a) over inheritance (is-a) |
| `07_getters_setters.ts` | Reading/writing properties with extra control logic |
| `08_parameter_properties.ts` | Shorthand for declaring fields from constructor parameters |

---

### `06_modules_tooling` — Modules & tooling

File organization, configuration, and running TypeScript on Node.

#### `01_named_default_exports/`
| File | Description |
|------|-------------|
| `exports.ts` | Named exports, default export, and types |
| `main.ts` | Importing and using them together |

#### `02_import_export_type/`
| File | Description |
|------|-------------|
| `models.ts` | `export type` for types erased at runtime |
| `main.ts` | `import type` vs importing regular values |

#### `03_module_organization/`
| File | Description |
|------|-------------|
| `types.ts` | Shared types in one file |
| `users.ts` / `products.ts` | Separate modules per domain |
| `index.ts` | Barrel file that re-exports from one place |
| `main.ts` | Entry point that imports from the barrel |

#### `04_tsconfig_strict/`
| File | Description |
|------|-------------|
| `strict_options.ts` | Comments explaining key `strict` options |
| `main.ts` | Valid code examples under strict mode |

#### `05_tsc_tsx_nodejs/`
| File | Description |
|------|-------------|
| `main.ts` | How to run TypeScript with `tsc` / `tsx` / Node |
| `app.ts` | Small helper function for trying the tooling |

#### `06_esm_commonjs/`
| File | Description |
|------|-------------|
| `main.ts` | ESM vs CommonJS comparison |
| `esm_math.ts` / `esm_main.ts` | Practical `import`/`export` (ESM) example |

#### `07_ambient_declarations/`
| File | Description |
|------|-------------|
| `main.ts` | Intro to `.d.ts` declaration files and `declare` |
| `global.d.ts` | Ambient types on `globalThis` |
| `legacy-lib.d.ts` | Typing an old JS library with no shipped types |
| `runtime.ts` | Runtime values that match the declarations |

---

### `07_async_runtime` — Async & runtime

Promises, error handling, and working with Node and runtime data.

| File | Description |
|------|-------------|
| `01_promise_async_await.ts` | Basics of `Promise` and `async`/`await` |
| `02_promise_all_settled.ts` | Running many promises together: `Promise.all` and `allSettled` |
| `03_try_catch_unknown.ts` | Catching errors and treating them as `unknown` safely |
| `04_json_runtime_validation.ts` | `JSON.parse` and validating shape at runtime |
| `05_filesystem_nodejs.ts` | Reading/writing files with `node:fs/promises` |
| `06_environment_variables.ts` | Reading `process.env` and a `.env` file via `dotenv` |
| `07_null_undefined_optional_chaining.ts` | `null` / `undefined`, optional chaining `?.`, and `??` |

---

### `08_testing_design` — Testing & design

Principles for testable code and clearer project structure.

| File | Description |
|------|-------------|
| `01_unit_testing.ts` | Unit testing idea: small functions + checking the result |
| `02_assertions_edge_cases.ts` | Assertions and edge cases |
| `03_dependency_injection.ts` | Passing dependencies from outside to make testing easier |
| `04_separation_of_concerns.ts` | Separating responsibilities instead of mixing everything |
| `05_solid_basics.ts` | SOLID principles with short class examples |
| `06_repository_service.ts` | Repository (data) and Service (business logic) patterns |
| `07_data_validation.ts` | Validating inputs before using them |
| `08_error_classes_result.ts` | Custom error classes and a Result success/failure pattern |

---

## TypeScript setup

This project uses `strict` plus extra options such as:

- `noUncheckedIndexedAccess`
- `exactOptionalPropertyTypes`
- `verbatimModuleSyntax`
- `module`: `nodenext`

See [`tsconfig.json`](./tsconfig.json).

---

## Notes

- Folders are numbered for learning order; start at `01` and go up.
- Some `07_async_runtime` lessons may need a local `.env` file (not committed to Git).
- Build outputs (`*.js`, `*.d.ts`, `dist/`) are ignored via `.gitignore`.

---

## License

Personal learning project — free to use for study and practice.
