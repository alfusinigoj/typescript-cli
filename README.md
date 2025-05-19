# TypeScript CLI Packaging Spike

This is a simple experimental project (spike) to **prove that TypeScript code can be compiled into a real standalone CLI executable** for Linux, macOS, and Windows — without requiring Node.js at runtime.

The CLI reads JSON from stdin, transforms it using a TypeScript class (`Entity`), and outputs the transformed JSON to stdout.

## Goals

- Author CLI logic in **TypeScript**
- Compile to a self-contained executable using [`pkg`](https://github.com/vercel/pkg)
- Prove it works on **Linux**, **macOS**, and **Windows**
- Run the CLI in environments like **Databricks**, **CI pipelines**, or **bare systems** without installing Node.js

---

## How It Works

#### `Entity` Class

The `Entity` class provides two methods:

```ts
new Entity().fromJson(rawJson).toJson()
```

This is used internally by the CLI to transform raw JSON input into a simplified structure.

## CLI Example

#### Command

```bash
echo '{"id": 1, "name": "Alice"}' | ./json-transform-linux
```

#### Output

```json
{"id":1,"name":"Alice","active":true}
```

## How to Build Locally
#### 1. Install dependencies
```bash
npm install
```

#### 2. Compile TypeScript
```bash
npm run build
```

#### 3. Package into standalone executable
```bash
npm install -g pkg
pkg .
```

This generates `json-transform-linux`, `json-transform-macos`, `json-transform-win.exe`

## Run Tests

```bash
npm test
```

🧪 Spike Outcome
✅ Confirmed: TypeScript can be authored as a CLI and built into a real executable with no external runtime dependencies using pkg, tested in MacOS.
