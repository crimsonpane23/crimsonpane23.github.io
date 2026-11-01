# Your portfolio website

A 6-page static site (Home, Interests, Projects, Experience, Gallery, Contact).
No build step, no installs: just HTML, CSS and JavaScript.

## 1. Edit your details
Open **site-data.js** in any text editor (VS Code, Notepad++, even Notepad).
Every page is generated from that one file. Replace the lorem ipsum text.
- Keep the "quotes" and commas.
- Add an item: copy one { ... } block and paste it after the previous one.
- Remove an item: delete its { ... } block.
- Hide a page: delete its line in `nav`.

## 2. Add photos, your CV and certificates
- Your photo and gallery pictures go in `images/`  ->  `photo: "images/me.jpg"`
- Your CV goes in `files/` as `cv.pdf`  ->  the CV buttons on Home and Experience use it
- Certificates: paste a web link, or put the PDF in `files/` and write `"files/cert1.pdf"`

## 3. Preview
Double-click `index.html`. (It works straight from your computer.)

## 4. Publish free on GitHub Pages
1. Create a GitHub repo named `your-username.github.io`
2. Upload everything in this folder (keep the folder structure)
3. Visit https://your-username.github.io after a minute

## Files
- `*.html`             one tiny shell per page (you rarely touch these)
- `site-data.js`       YOUR CONTENT  <- edit this
- `assets/style.css`   colours (top of file) and layout
- `assets/app.js`      builds the menu and pages from site-data.js
- `assets/ripples.js`  the soft background animation on Home
                       (delete its <script> line in index.html to switch it off)
