# TypeScript CLI Packaging Spike

This is a simple experimental project (spike) to **prove that TypeScript code can be compiled into a real standalone CLI executable** for Linux, macOS, and Windows — without requiring Node.js at runtime.

The CLI reads JSON from stdin, transforms it using a TypeScript class (`Entity`), and outputs the transformed JSON to stdout.

---

## Goals

- Author CLI logic in **TypeScript**
- Compile to a self-contained executable using [`pkg`](https://github.com/vercel/pkg)
- Prove it works on **Linux**, **macOS**, and **Windows**
- Run the CLI in environments like **Databricks**, **CI pipelines**, or **bare systems** without installing Node.js

---

## Spike Outcome
✅ Confirmed that TypeScript can be authored as a CLI and built into a real executable with no external runtime dependencies using pkg, tested in MacOS.

---

## How It Works

#### `Entity` Class

The `Entity` class provides two methods:

```ts
new Entity().fromJson(rawJson).toJson()
```

This is used internally by the CLI to transform raw JSON input into a simplified structure.

---

## CLI Example

#### Command

```bash
echo '{"id": 1, "name": "Alice"}' | ./json-transform-linux
```

#### Output

```json
{"id":1,"name":"Alice","active":true}
```

---

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

---

## Run Tests

```bash
npm test
```

---

## How to use in Databricks

Optionally, to test the spike in Databricks environment, follow the below steps.

#### 1. Upload to DBFS

```bash
databricks fs cp json-transform-linux dbfs:/tmp/json-transform
```

#### 2. Run in Notebook

```python
import subprocess, json, os
os.system("chmod +x /dbfs/tmp/json-transform")

input_data = {"id": 123, "name": "Databricks"}
result = subprocess.run(["/dbfs/tmp/json-transform"], input=json.dumps(input_data), text=True, capture_output=True)

if result.returncode == 0:
    print("Output:", result.stdout)
else:
    print("Error:", result.stderr)
```

#### 3. Use with Spark

```python
df = spark.createDataFrame([{"id": 1, "name": "A"}, {"id": 2, "name": "B"}])

def transform_partition(rows):
    for row in rows:
        proc = subprocess.run(
            ["/dbfs/tmp/json-transform"],
            input=json.dumps(row.asDict()),
            text=True,
            capture_output=True
        )
        if proc.returncode == 0:
            yield json.loads(proc.stdout)
        else:
            yield {"error": proc.stderr}

df_out = df.rdd.mapPartitions(transform_partition).toDF()
df_out.show()
```
---
