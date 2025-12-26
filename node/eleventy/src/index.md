---
layout: base.njk
title: Home
---

<div style="padding: 20px; background: #f0f0f0; margin: 20px; border-radius: 8px;">
  <h2>Environment Variable Test</h2>
  <h3>Build-time (baked into bundle)</h3>
  <p><strong>BUILD_PUBLIC_VAR:</strong> {{ buildPublicVar }}</p>
  <p style="color: #666; font-size: 14px;">
    Note: Static sites only support build-time env vars (no server at runtime)
  </p>
</div>

# Hello from Eleventy!
