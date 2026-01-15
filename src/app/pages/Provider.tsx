import styles from './Provider.module.css';
import { CONVERGE_PROVIDER_VERSION } from '../../versions';

const providers = [
  { name: 'Anthropic', models: 'Claude 3.5 Sonnet, Haiku, Opus 4', status: 'stable' },
  { name: 'OpenAI', models: 'GPT-4o, GPT-4o-mini, GPT-4 Turbo', status: 'stable' },
  { name: 'Google Gemini', models: 'Gemini Pro, Flash', status: 'stable' },
  { name: 'Alibaba Qwen', models: 'Qwen-Max, Qwen-Plus, Qwen3-VL', status: 'stable' },
  { name: 'DeepSeek', models: 'DeepSeek Chat, Coder', status: 'stable' },
  { name: 'Mistral', models: 'Mistral Large, Medium', status: 'stable' },
  { name: 'xAI Grok', models: 'Grok models', status: 'beta' },
  { name: 'Perplexity', models: 'Online models (web search)', status: 'stable' },
  { name: 'OpenRouter', models: 'Multi-provider gateway', status: 'stable' },
  { name: 'Baidu ERNIE', models: 'ERNIE models', status: 'beta' },
  { name: 'Zhipu GLM', models: 'GLM-4 models', status: 'beta' },
  { name: 'Kimi (Moonshot)', models: 'Moonshot models', status: 'beta' },
  { name: 'Apertus', models: 'EU digital sovereignty', status: 'beta' },
  { name: 'Ollama', models: 'Local models (Llama, Mistral)', status: 'beta' },
];

const costClasses = [
  { level: 'VeryLow', price: '< $0.25 / 1M tokens', use: 'Bulk processing, simple tasks' },
  { level: 'Low', price: '$0.25 - $1 / 1M tokens', use: 'Standard workloads' },
  { level: 'Medium', price: '$1 - $5 / 1M tokens', use: 'Complex reasoning' },
  { level: 'High', price: '$5 - $15 / 1M tokens', use: 'Frontier capabilities' },
  { level: 'VeryHigh', price: '> $15 / 1M tokens', use: 'Maximum quality' },
];

const selectionStrategies = [
  {
    name: 'fast_and_cheap()',
    description: 'Optimize for speed and cost',
    code: 'AgentRequirements::fast_and_cheap()',
  },
  {
    name: 'quality_focused()',
    description: 'Prioritize output quality',
    code: 'AgentRequirements::quality_focused()',
  },
  {
    name: 'balanced()',
    description: 'Balance cost, speed, and quality',
    code: 'AgentRequirements::balanced()',
  },
  {
    name: 'custom',
    description: 'Fine-grained control',
    code: `AgentRequirements::new()
    .with_max_cost(CostClass::Medium)
    .with_min_tokens_per_second(100)
    .with_capability(Capability::CodeGen)`,
  },
];

export function Provider() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.tagline}>converge-provider</p>
        <h1 className={styles.title}>LLM Abstraction Layer</h1>
        <p className={styles.subtitle}>
          Unified interface to 14+ LLM providers and capability adapters.
          Model selection balances cost, latency, quality, and sovereignty.
        </p>
      </header>

      <section className={styles.install}>
        <pre className={styles.code}>
          <code>{`converge-provider = "${CONVERGE_PROVIDER_VERSION}"`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Supported Providers</h2>
        <div className={styles.providerGrid}>
          {providers.map((provider) => (
            <div key={provider.name} className={styles.provider}>
              <div className={styles.providerHeader}>
                <span className={styles.providerName}>{provider.name}</span>
                <span className={`${styles.status} ${styles[provider.status]}`}>
                  {provider.status}
                </span>
              </div>
              <span className={styles.providerModels}>{provider.models}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Intelligent Model Selection</h2>
        <p className={styles.sectionDescription}>
          The ModelSelector chooses the optimal model based on your requirements.
          Define constraints declaratively; the selector handles provider negotiation.
        </p>
        <div className={styles.strategyGrid}>
          {selectionStrategies.map((strategy) => (
            <div key={strategy.name} className={styles.strategy}>
              <h3 className={styles.strategyName}>{strategy.name}</h3>
              <p className={styles.strategyDescription}>{strategy.description}</p>
              <pre className={styles.strategyCode}>
                <code>{strategy.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Cost Classes</h2>
        <div className={styles.costTable}>
          <div className={styles.costHeader}>
            <span>Level</span>
            <span>Price Range</span>
            <span>Use Case</span>
          </div>
          {costClasses.map((cost) => (
            <div key={cost.level} className={styles.costRow}>
              <code className={styles.costLevel}>{cost.level}</code>
              <span className={styles.costPrice}>{cost.price}</span>
              <span className={styles.costUse}>{cost.use}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Prompt Formats</h2>
        <div className={styles.formatGrid}>
          <div className={styles.format}>
            <h3 className={styles.formatName}>EDN</h3>
            <p className={styles.formatDescription}>
              ~40% token reduction via structural notation. Ideal for high-volume workloads.
            </p>
            <pre className={styles.formatCode}>
              <code>{`{:task "analyze"
 :context {:market "tech" :period "Q4"}
 :constraints [:cost-aware :fast]}`}</code>
            </pre>
          </div>
          <div className={styles.format}>
            <h3 className={styles.formatName}>XML</h3>
            <p className={styles.formatDescription}>
              Optimized for Claude models. Clear structure for complex reasoning.
            </p>
            <pre className={styles.formatCode}>
              <code>{`<task>analyze</task>
<context>
  <market>tech</market>
  <period>Q4</period>
</context>`}</code>
            </pre>
          </div>
          <div className={styles.format}>
            <h3 className={styles.formatName}>JSON</h3>
            <p className={styles.formatDescription}>
              Standard format for OpenAI models. Wide compatibility.
            </p>
            <pre className={styles.formatCode}>
              <code>{`{
  "task": "analyze",
  "context": {
    "market": "tech",
    "period": "Q4"
  }
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Example</h2>
        <pre className={styles.codeBlock}>
          <code>{`use converge_provider::{
    ModelSelector, AgentRequirements,
    CostClass, LlmRequest
};

// Define requirements
let requirements = AgentRequirements::new()
    .with_max_cost(CostClass::Medium)
    .with_min_tokens_per_second(50)
    .with_capability(Capability::Reasoning);

// Select optimal model
let selector = ModelSelector::default();
let (provider, model) = selector.select(&requirements)?;

// Make request
let request = LlmRequest {
    prompt: "Analyze market trends for Q4".into(),
    max_tokens: Some(1000),
    temperature: Some(0.7),
};

let response = provider.complete(&request)?;`}</code>
        </pre>
      </section>
    </div>
  );
}
