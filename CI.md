# Continuous integration

## Native Linux routing

The workflow selects `ci_os: linux`, matching the supported Woodpecker 3.19
agent setting `WOODPECKER_AGENT_LABELS=ci_os=linux`. Before merging this change,
the parent must configure and read back that label and actual Linux ARM64
platform on the current agent, then verify the label and Linux AMD64 platform
on its replacement. Include no other OS or unsupported CPU; retain native platform
reporting. This routing label is not a security boundary or hardware attestation.
The original image index supports both targets, without a matrix or emulation.
ARM64 rollout guidance below is historical, not native AMD64 proof. Commands,
pins and status layout stay unchanged; actual AMD64 acceptance is separate.

`.woodpecker.yaml` ports the sole authored Actions job, `no-comments`, to
Woodpecker 3.19. It runs on branch pushes, tag pushes and pull requests without
branch or path filters. The default native clone must retain Git metadata and
the index: the checker enumerates Git files and its regression tests exercise
staged snapshots. No all-branch history scan is part of this CI.

The pinned uv 0.11.32 / Python 3.14 image runs the original two commands with all
five parser requirement pins unchanged:

```sh
uv run --no-project --python 3.14 --with-requirements .comment-policy/requirements.txt python .comment-policy/check.py
uv run --no-project --python 3.14 --with-requirements .comment-policy/requirements.txt python -m unittest discover -s .comment-policy -p 'test_*.py'
```

The original job's **10-minute budget must be configured and verified using the
native repository timeout setting before activation**; it is not a YAML step
key. Use the existing Linux/ARM64 agent and resource limits. No secrets, host
mounts, privileged execution or extra services are needed. Keep fork approval,
`allowed_users: []` and all trust flags false; do not automatically run unapproved
external fork code.

Local hooks remain unchanged. With uv and Lefthook available, install and run
them using the repository's Gitleaks pin in a process-local environment:

```sh
mise exec gitleaks@8.30.1 -- lefthook install pre-commit
mise exec gitleaks@8.30.1 -- lefthook run pre-commit
```

The hook checks the complete index and scans staged changes. See
[the comment policy](.comment-policy/README.md) for details. Application commands
in `package.json`, `bun.lock`, Wrangler configuration and existing Cloudflare or
manual deployment controllers are unchanged. This migration adds no hosted
application build or deployment job; it proves neither application correctness
nor deployment equivalence.

Keep `.github/workflows/no-comments.yml` byte-identical for rollback and Actions
enabled until the separate merger reviews the source and the parent verifies a
normal delivery PR plus the resulting actual main push on native ARM64, with
matching exact-revision GitHub feedback. Preserve unrelated required checks and
deployment branches/controllers. Local checks and strict CLI lint are not hosted
proof. Only the parent performs serialized activation, required-check changes
and subsequent Actions disable. MC#26 already supplied controlled-failure PR
proof; do not create another failing or marker PR. MC#27 and MC#11 remain open.
