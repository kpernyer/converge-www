// Crate versions read from ../converge/Cargo.toml at build time
export const versions = __CARGO_VERSIONS__;

export const CONVERGE_CORE_VERSION = versions['converge-core'] ?? '0.6.1';
export const CONVERGE_PROVIDER_VERSION = versions['converge-provider'] ?? '0.2.3';
export const CONVERGE_DOMAIN_VERSION = versions['converge-domain'] ?? '0.2.3';
export const CONVERGE_TOOL_VERSION = versions['converge-tool'] ?? '0.2';

// Hex version read from ../converge-ledger/mix.exs at build time
export const CONVERGE_LEDGER_VERSION = __LEDGER_VERSION__ ?? '0.1.0';
