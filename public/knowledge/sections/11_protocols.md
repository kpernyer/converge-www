# Protocols — Summary

## Canonical Sources

- [knowledgebase/consolidated/11_protocols.md](../../knowledgebase/consolidated/11_protocols.md)

## Local Docs

- [README.md](README.md)

## Notes

# Protocols

Protocols define transport semantics, contracts, and resume behavior.

## Key Points

- Protocol defines message forms and state transitions.
- Stream-first: gRPC bidirectional streaming is primary; SSE is fallback.
- Cross-platform contract sets shared mobile and client rules.
- Resume and offline semantics preserve idempotency.
- Remote CLI uses the same protocol for streaming facts and control messages.

## Source Map

- `docs/protocols/CONVERGE_PROTOCOL.md`
- `converge-runtime/src/grpc/`
- `converge-runtime/src/sse.rs`
- `converge-remote/README.md`
- `android-CROSS_PLATFORM_CONTRACT.md`
- `ios-CROSS_PLATFORM_CONTRACT.md`
- `application-CROSS_PLATFORM_CONTRACT.md`
