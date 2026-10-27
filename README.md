# MD Ashraful Islam — Resume

My resume in two formats, both built from source in this repo.

| Format | Source | Output |
|---|---|---|
| LaTeX (one column, two pages) | `resume.tex` | `Ashraful_Islam_Resume.pdf` |
| Word | `scripts/build-docx.js` | `word/Ashraful_Islam_Resume.docx` and `word/Ashraful_Islam_Resume.pdf` |

The PDFs and the `.docx` are build outputs and are not committed.

## Build the LaTeX version

No local TeX install needed; it compiles in Docker. Build the image once, then compile:

```sh
docker build -t latex .
npm run latex
```

This writes `Ashraful_Islam_Resume.pdf` in the repo root.

## Build the Word version

Needs Node.js and LibreOffice. The body font is Carlito (`sudo apt install fonts-crosextra-carlito`); without it LibreOffice falls back to another font.

```sh
npm install
npm run docx
```

This writes `Ashraful_Islam_Resume.docx` and its PDF into `word/`.
