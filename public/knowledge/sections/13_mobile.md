# Mobile — Summary

## Canonical Sources

- [knowledgebase/consolidated/13_mobile.md](../../knowledgebase/consolidated/13_mobile.md)

## Local Docs

- [README.md](README.md)

## Notes

# Mobile

Mobile architecture defines client boundaries and offline semantics.

## Key Points

- Clients execute within Truths boundaries; ML proposes, Truths decide.
- gRPC bidirectional streaming is primary; REST is fallback.
- Offline and resume rules preserve correctness and idempotency.
- Android focuses on smart action prediction (on-device ML + JTBD).
- iOS positions the app as an agent host with policy, budgets, and traceability.
- Mobile architecture aligns with protocol contracts.

## Source Map

- `converge-android/README.md`
- `converge-ios/README.md`
- `docs/mobile/ARCHITECTURE.md`
- `docs/MOBILE_INTEGRATION.md`
- `android-CROSS_PLATFORM_CONTRACT.md`
- `ios-CROSS_PLATFORM_CONTRACT.md`
