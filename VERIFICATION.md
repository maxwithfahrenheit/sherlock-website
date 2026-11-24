# Sherlock v3.3 verification — 24 November 2026

This revision updates the headline and operational-data introduction, cleans the Assess shape boundaries, removes individual License bar labels, replaces the Anonymization sample email, and removes the pause-motion button. Original 3D compositions and motion are retained.

## Passed

- Build and static integrity: eight sections, one H1, 201 asset references, seven videos, seven posters, all local anchors valid.
- Interaction-controller JavaScript syntax check.
- All seven finished MP4s decoded completely without reported errors. The six restored compositions retain their source dimensions, frame counts and 25 fps timing. Four clips outside this revision are byte-identical to v3.2.
- Assess: final and representative intermediate frames reviewed for cleaner boundaries between the original stacked shapes. The extra workflow grain overlay is removed.
- License: original pillars and movement retained; Data, Buyer, Use, Access and Share lettering removed from the individual faces. Group callouts and base text retained.
- Anonymization: new delivery-scheduling email inspected before detection, during scanning and after redaction. New names, email addresses, project/delivery references, address and signature replace the old text. Twelve sensitive spans are covered after scanning; the nonidentifying request remains readable.
- Desktop 1440 × 1000: new headline and operational-data sentence visibly verified. Assess, License and Anonymization loaded at ready state 4 without media errors. Revised video results checked in the page context.
- Mobile 390 × 844: headline and introduction fit, no horizontal overflow or broken loaded images. Magnifying-glass logo and slim partnership button remain.
- The floating pause-motion control is absent at desktop and mobile sizes. Native reduced-motion CSS and event handling remain; an operating-system reduced-motion setting was not emulated during this revision.
- Browser console reported no warnings or errors during the exercised flows. Temporary viewport overrides were reset.
- ZIP integrity, required files, source/build synchronization and all bundled file hashes verified during packaging.

## Scope and limits

Browser checks used the Codex in-app browser at desktop and mobile viewport sizes, not physical devices or all browser engines. Representative frames were visually checked; this was not exhaustive frame-by-frame OCR. Original editable motion projects were unavailable, so text and boundary edits are composited into flattened MP4s. Small texture or antialiasing differences may remain. License pillar heights do not encode financial amounts or forecasts.

These checks describe the v3.3 package before publication. The public preview was prepared from the same application source. There is no backend; assessment links open an email app. No email was sent during testing. Source archive provenance and full media hashes are included in this folder.

The `verification/v3.3-package-manifest-sha256.json` records the original delivered ZIP; repository documentation and hosting metadata have since been updated.
