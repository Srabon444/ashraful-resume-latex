# MD Ashraful Islam — Resume

My resume in two formats, both built from source in this repo.

| Format | Source | Output |
|---|---|---|
| LaTeX (one column, two pages) | `resume.tex` | `resume.pdf` |
| Word | `scripts/build-docx.js` | `Ashraful_Islam_Resume.docx` and `.pdf` |

The PDFs and the `.docx` are build outputs and are not committed.

## Build the LaTeX version

No local TeX install needed; it compiles in Docker:

```sh
docker build -t latex .
docker run --rm -v "$PWD":/data latex pdflatex resume.tex
```

## Build the Word version

Needs Node.js and LibreOffice. The body font is Carlito (`sudo apt install fonts-crosextra-carlito`); without it LibreOffice falls back to another font.

```sh
npm install
npm run docx
```
