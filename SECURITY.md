# Security Policy

## Supported versions

Security fixes are applied to the latest maintained major version. Older branches may receive a fix when the change is low risk, but they are not guaranteed to be supported.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting for this repository when available. Do not disclose exploitable details in a public issue before a fix is available.

Include the affected version, a minimal reproduction, the impact, and any suggested mitigation you have identified.

## Security model

Summernote Heading creates editable HTML inside a WYSIWYG editor. Applications remain responsible for validating input and sanitizing persisted/rendered editor HTML according to their threat model. Client-side validation and editor constraints are usability features, not a server-side security boundary.
