# Sherlock website

A standalone, eight-section website based on Sherlock v2 copy and the original replay-replica artwork and motion. This release uses a light silver / slate palette and restores six original video compositions. The former NVIDIA benchmark is replaced with an original-versus-protected records animation, without percentages, rankings or performance claims.

## Preview

[Open the public website preview](https://sherlock-enterprise-preview.maxdakota97.chatgpt.site).

## Open locally

Requires Python 3 only; no package installation is needed.

1. Clone or download this repository.
2. In Terminal, type `cd ` (including the space), drag the `sherlock-website` folder into Terminal, and press Return.
3. Run `python3 serve.py 4183`.
4. Open http://127.0.0.1:4183.

If the port is already in use, choose another, for example `python3 serve.py 8080`.

The page must be served over HTTP; opening `dist/index.html` directly as a file will not resolve its root-relative assets. Nothing is submitted or published by running the preview.

## Files

- `src/`: editable HTML sections, CSS and JavaScript.
- `public/`: bundled fonts, graphics, seven finished MP4 clips and seven static posters.
- `dist/`: generated static site, excluded from Git. Run the build or preview command to create it.
- `build.py`: rebuilds `dist` from `src` and `public`.
- `check.py`: checks local assets, anchors and document structure.
- `verification/`: browser screenshots, media checksums and technical audit results.
- `MEDIA-NOTES.md`: per-clip restoration details and limitations.
- `VERIFICATION.md`: tests actually performed.

To rebuild and check: `python3 build.py` followed by `python3 check.py`.

## What changed

- Updated the headline to “A new asset for the enterprise.” and the introduction to “the commercial value of operational data.”
- Cleaned the dashed edges between the stacked record shapes in Assess and removed the extra grain overlay over the workflow videos. Original shapes, perspective and animation are retained.
- Removed the individual Data, Buyer, Use, Access and Share labels from the License pillars. The group callouts and base label remain.
- Rewrote the Anonymization example as an equipment-delivery scheduling email, with new fictional names, addresses, IDs, organization and signature. The original scan direction, timing, detection emphasis and patterned before/after redaction are retained.
- Removed the floating pause-motion button; browser/system reduced-motion preferences remain supported.
- Preserved the magnifying-glass logo, slim partnership buttons, slate/silver styling and eight-section structure.

## Limitations and launch configuration

- Original editable motion projects were not available. Five restored MP4s use reconstructed text surfaces or localized edge cleanup, so small texture/antialiasing differences may remain. One clip is an exact original file copy; one comparison clip is newly generated. See `MEDIA-NOTES.md`.
- MP4s are finished assets; rebuilding the site does not regenerate their video frames. HTML/CSS/JS are editable. Video edits require a video/compositing tool or the original motion project.
- The assessment links open an email to `max@withfahrenheit.com`, carried forward from v2. There is no form backend, CRM integration or automatic email sending.
- Privacy information and licensing principles link to explanatory page sections, not reviewed legal policies. Analytics are disabled; cookie settings only save local preferences. Search indexing remains disabled with `noindex,nofollow`.
- Illustrations do not demonstrate actual processing results, data eligibility, revenue or security certification. Inherited artwork, fonts and video rights were not independently verified.
- This revision was checked in the Codex in-app browser at desktop and mobile viewport sizes. Safari, Firefox, real mobile hardware, slow-network performance and an independent accessibility audit were not tested.
- The public preview is hosted through Sites. Publishing future updates requires a Sites source push and deployment; a GitHub push alone does not publish.
