# Quinton Que — personal website

Personal research homepage of Quinton (Haohua) Que.

**Website:** https://que121.github.io/

## Update the website

This site uses plain HTML, CSS, and JavaScript. There is no framework, database, package installation, or paid API dependency.

1. Edit `content.json` for biography, experience, education, honors, and publications.
2. Edit `art-sources.json` to update the painting collection; put image files in `assets/`.
3. Edit `style.css` for layout or `app.js` for interactions.
4. Run `node build.mjs` after changing content or the page template.
5. Commit the changes, including the generated `index.html`, and push to `main`.

GitHub Pages automatically publishes `main` from the repository root. The `.nojekyll` file keeps the static files intact. To preview locally, run `python -m http.server 8770` from this directory and open http://localhost:8770/.

Publication author lists use Haohua Que; the personal homepage uses Quinton Que. Keep dated affiliations and paper acceptance status current when updating the content.

## Images and attribution

- Fifteen public-domain oil paintings come from the National Gallery of Art. Titles, dates, artists, museum records, and source image URLs are recorded in `art-sources.json` and displayed in the site credits. Paintings can be enlarged by clicking them.
- Research method figures come from the corresponding authors' papers and project resources. Paper and code links are in `content.json`. They retain their respective rights and are not covered by a blanket repository license.
- The personal kitchen photograph was provided by Quinton and edited with AI-assisted background blur. It is used with the owner's permission.
- The locally hosted Manrope font includes its license in `assets/manrope-license.txt`.
- Visual inspiration: https://2023.rauno.me/. The implementation and content are specific to this portfolio.

The generated `index.html`, `style.css`, `app.js`, and `assets/` can also be hosted by another static hosting provider. Account credentials and original private source photographs are not part of this repository.
