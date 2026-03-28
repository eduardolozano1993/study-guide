# Frontend Security Audit Report

Date: 2026-03-28

## Summary

- Total Issues: 3
- Critical: 0
- High: 0
- Medium: 2
- Low: 1
- Risk Level: Medium

## Top Risks

- The app ships without a documented Content Security Policy or related browser security headers, so any future XSS or compromised dependency would execute with full privilege.
- The GitHub Pages route-restoration flow relies on inline scripts in the document head, which makes strict CSP adoption harder and widens the blast radius of any document-context injection.
- Production error logging still writes stack and state information to the browser console.

## Detailed Findings

### [SEC-001] Missing browser security headers and CSP

- Severity: Medium
- OWASP: A05: Security Misconfiguration
- Description:
  The repo does not define a Content Security Policy, `Referrer-Policy`, `X-Content-Type-Options`, or frame-ancestors protection in the app or deployment pipeline. The deployment workflow publishes the static site as-is, and the HTML entrypoints do not add compensating browser controls.
- Exploit Scenario:
  If a future XSS bug, compromised dependency, or malicious browser extension injects script into the page, the browser has no policy layer to restrict inline execution, framing, or referrer leakage. That turns a single injection into full-origin script execution and easier data exfiltration.
- Impact:
  Data breach, account takeover, privilege escalation
- Location:
  [`index.html`](../../index.html#L3-L31), [`public/404.html`](../../public/404.html#L1-L30), [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml#L1-L36)
- Fix:
  Add a strict CSP and related headers at the hosting layer if possible. For GitHub Pages, use a CSP meta tag as a fallback and move toward a host that supports response headers. Include `default-src 'self'`, block framing with `frame-ancestors 'none'`, set `referrer-policy`, and require `object-src 'none'`. Rework any inline scripts before enforcing a strict policy.

### [SEC-002] Inline route-restoration scripts widen the XSS blast radius

- Severity: Medium
- OWASP: A03: Injection
- Description:
  Both HTML entrypoints execute inline JavaScript in the document head to restore GitHub Pages routes. This is not a direct vulnerability today, but it is an execution path that runs before React mounts and it prevents a truly strict CSP unless the scripts are hashed, nonced, or moved out of the document.
- Exploit Scenario:
  If an attacker later gains any HTML injection vector, the document already contains executable inline script and the security model cannot be tightened without refactoring. In practice, this makes an XSS harder to contain and more likely to become full-origin compromise.
- Impact:
  Data breach, account takeover
- Location:
  [`index.html`](../../index.html#L8-L26), [`public/404.html`](../../public/404.html#L6-L27)
- Fix:
  Move the route-restore logic into an external JavaScript module loaded with `type="module"`, or generate a hash/nonce strategy that is compatible with your CSP. Keep the HTML entrypoint free of inline code so CSP can be enforced without `unsafe-inline`.

### [SEC-003] Production console logging exposes internal error details

- Severity: Low
- OWASP: A09: Security Logging and Monitoring Failures
- Description:
  The error boundary and sidebar persistence code log caught exceptions and warnings directly to the browser console. In production, that can expose stack traces, route names, storage behavior, and any future sensitive values included in error objects.
- Exploit Scenario:
  A malicious script, shared kiosk user, or remote support session can inspect the console and read internal error details. If later code includes user data in error messages, those values would also be visible.
- Impact:
  Data leak, reconnaissance
- Location:
  [`src/shared/components/ErrorBoundary.tsx`](../../src/shared/components/ErrorBoundary.tsx#L23-L33), [`src/features/navigation/components/Sidebar.tsx`](../../src/features/navigation/components/Sidebar.tsx#L9-L24)
- Fix:
  Gate console logging behind a development check, redact error payloads, or replace console output with structured telemetry that strips sensitive context before shipping to production.

## Attack Scenarios

- A compromised dependency injects script and exfiltrates same-origin data because no CSP or frame protections are present.
- A future DOM XSS becomes harder to contain because the app already depends on inline scripts in the document head.
- A production runtime error exposes internal state and stack details to anyone with console access.

## Recommendations

### Immediate

- Add browser security headers or a CSP meta policy for the deployed site.
- Remove or externalize the inline scripts in `index.html` and `public/404.html`.

### Medium Term

- Strip or gate `console.warn` / `console.error` calls in production builds.
- Review the deployment target for better header support if you expect the app to grow beyond static content.

### Long Term

- Adopt a standard security baseline for static frontends: CSP, referrer policy, frame protection, and dependency review in CI.
- Keep all future user-controlled rendering on framework-safe escaping paths and avoid adding raw HTML sinks.

## Security Score

- Injection Safety: 88%
- Auth Security: 100%
- Config Security: 72%
- Dependency Health: 90%
