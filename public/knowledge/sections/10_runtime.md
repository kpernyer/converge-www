# Runtime — Summary

## Canonical Sources

- [knowledgebase/consolidated/10_runtime.md](../../knowledgebase/consolidated/10_runtime.md)

## Local Docs

- [README.md](README.md)

## Notes

# Runtime

The runtime provides execution boundaries, streaming interfaces, and control.

## Key Points

- Jobs execute as convergence loops over append-only context.
- gRPC bidirectional streaming is the primary transport; SSE is fallback.
- HTTP remains for REST-style job submission and status.
- Runtime separates transport from semantic validation.
- Multi-tenancy and security are enforced at the execution layer.
- **Remote client:** `converge-remote` is the gRPC CLI for multi-actor runs.

## Source Map

- `converge-runtime/README.md`
- `converge-runtime/docs/architecture/ARCHITECTURE.md`
- `converge-runtime/src/grpc/`
- `converge-runtime/src/sse.rs`
- `converge-remote/README.md`
