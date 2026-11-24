# Media restoration notes

The source set was recovered from local copies named `replay-replica.zip` and `sherlock-website-v2.zip`; the referenced `/mnt/data` mount was not available in this desktop session. Source archive hashes are recorded in `verification/source-archives.json`.

Six original compositions are used. Their source dimensions, frame counts and 25 fps timing are retained. Edited clips were encoded as H.264 at high quality with fast-start metadata. A reversible CSS treatment lowers saturation and modestly lifts brightness to fit the slate palette; the underlying shapes, camera motion and textures were not redesigned.

| Website placement | File | Treatment |
| --- | --- | --- |
| Assess | `htw-1.mp4` | Original layered document stack and motion retained. Labels are unchanged from v3.2. Noisy dashed boundaries were locally replaced with smooth transitions between the existing materials; isolated corner specks were softened. The website’s additional grain overlay was removed. |
| Agree | `htw-2.mp4` | Original layered 3D agreement, solid/striped reveal, camera and timing retained. Embedded text now reads Agreement / Agreed terms / Records included / Details removed. The vague processing-boundaries label is removed. |
| Protect | `htw-3.mp4` | Original detection composition, copied byte for byte. |
| License | `htw-4.mp4` | Original five pillars and rise animation retained. Removed the extra labels on individual bar faces. The Approved data / Protected records and License terms / Agreed together callouts remain, as does Defined rights. Shared revenue. on the base. The geometry is illustrative; heights do not encode amounts or forecasts. |
| Anonymization | `De-Identification - 1.mp4` | Original document layout, fabric, scan direction/timing and patterned redaction retained. Email now describes rescheduling an equipment delivery, using Avery Morgan, Taylor and Jordan Lee with example.com addresses and fictional project/delivery details. All identifying spans are redacted after scanning; nonidentifying request language remains. |
| Our Pipeline | `De-Identification - 2.mp4` | Replaced benchmark. Equal groups of original/protected records, staged reveals, scanning light, redaction hatching and reference fabric. No NVIDIA/Replay branding, percentages, numerical values or unequal performance bars. 1500 × 1270, 25 fps, seven seconds. |
| Governance | `De-Identification - 3.mp4` | Original locked processing area, document and redaction motion. Heading/badges describe processing scope, review, permitted uses, release criteria and approval. The document body was re-typeset over reconstructed original woven material using neutral sample values. Its sender, recipient, account, record and contact values are fully covered by staged redactions. The old name, email and recipient artifacts are removed. |

## Editing limits

The supplied media consists of flattened MP4s, not editable layered compositions. Complete text regions were reconstructed and composited onto the moving surfaces using tracked geometry. Original artwork, camera movement, panel reveals and timing are retained; the governance document text and its redaction overlays were rebuilt. These are approximate visual text edits: some original microtexture, font metrics and antialiasing around changed lettering can differ, particularly during fades. It is not a lossless replacement of an original text layer.

The NVIDIA chart is intentionally a replacement animation. Its record rows have equal size and count and depict transformation, not relative model performance or a measured success rate. Text labels correspond to the current pipeline copy. A static final-state poster is used when the visitor prefers reduced motion.

All seven complete files decoded without errors. The revised clips were reviewed in final and representative intermediate frames. The anonymization sequence was checked before detection, during scanning and after redaction. Four other finished clips are unchanged from v3.2. A second reviewer checked text clarity and consistency with the adjacent copy. This was not exhaustive frame-by-frame OCR. SHA-256 hashes, frame counts, dimensions and exact-original status are in `verification/media-audit.json`.
