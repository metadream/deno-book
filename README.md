# Deno-Book

A super easy-to-use markdown document preview framework in Deno.

## Demo

https://docs.zerg.cc

## Usage

1. Create a start file with any name (ex. `start.ts`) in your document folder
   root. The content of the file is as follows:

```
// start.ts
import "https://deno.land/x/book/mod.ts";
```

2. Create `SUMMARY.md` and `README.md` in your document folder root. The
   contents of the summary will be rendered in the left navigation side of the
   page, and README file will be used as homepage content.

   A typical `SUMMARY.md` contains the following content. Among them, metadata
   between `---` and first-level title are not required.

```
---
name: My Document
logo: https://example.com/logo.png
footer: Copyright (c) 2023
---

# TABLE OF CONTENT

## Get Started

- [Installation](/folder1/installation.md)

## API References

- [Properties](/folder2/properties.md)
- [Methods](/folder2/methods.md)
```

3. Create markdown files with corresponding names under folder1 and folder2. The
   final directory structure is as follows:
   ```
   ├─ folder1
   │   └─ installation.md
   ├─ folder2
   │   ├─ properties.md
   │   └─ methods.md
   ├─ README.md
   ├─ SUMMARY.md
   └─ start.ts
   ```

4. Run start file.

```
deno run --allow-net --allow-read start.ts
```
