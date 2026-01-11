import styles from './Domain.module.css';
import { CONVERGE_DOMAIN_VERSION } from '../../versions';

const useCases = [
  {
    category: 'Business Strategy',
    items: [
      {
        name: 'Growth Strategy',
        description: 'Market signal analysis, competitor intelligence, strategy evaluation with automatic scoring.',
        agents: ['MarketSignalAgent', 'CompetitorAgent', 'StrategyAgent', 'EvaluationAgent'],
      },
      {
        name: 'Strategic Sourcing',
        description: 'Vendor assessment, risk scoring, and negotiation recommendations.',
        agents: ['VendorProfileAgent', 'RiskScoringAgent', 'NegotiationAgent'],
      },
    ],
  },
  {
    category: 'Operations',
    items: [
      {
        name: 'Supply Chain Optimization',
        description: 'Multi-warehouse routing, demand forecasting, cost optimization across regions.',
        agents: ['DemandForecastAgent', 'RoutingAgent', 'CostOptimizer'],
      },
      {
        name: 'Inventory Rebalancing',
        description: 'Cross-region transfers with financial impact analysis and constraint satisfaction.',
        agents: ['InventoryAnalyzer', 'TransferPlanner', 'ImpactCalculator'],
      },
      {
        name: 'Resource Routing',
        description: 'Task-resource matching with multi-constraint satisfaction and priority handling.',
        agents: ['TaskMatcher', 'ConstraintSolver', 'PriorityRouter'],
      },
    ],
  },
  {
    category: 'Enterprise',
    items: [
      {
        name: 'Meeting Scheduler',
        description: 'Multi-participant availability, timezone normalization, conflict resolution.',
        agents: ['AvailabilityAgent', 'TimezoneNormalizer', 'ConflictResolver'],
      },
      {
        name: 'Release Readiness',
        description: 'Quality gates, risk assessment, go/no-go decisions with audit trails.',
        agents: ['QualityGateAgent', 'RiskAssessor', 'DecisionAgent'],
      },
      {
        name: 'Compliance Monitoring',
        description: 'Regulation parsing, violation detection, remediation proposals.',
        agents: ['RegulationParser', 'ViolationDetector', 'RemediationAgent'],
      },
    ],
  },
  {
    category: 'Data & CRM',
    items: [
      {
        name: 'Catalog Enrichment',
        description: 'Product deduplication, schema validation, multi-source feed ingestion.',
        agents: ['DeduplicationAgent', 'SchemaValidator', 'FeedIngester'],
      },
      {
        name: 'CRM Account Health',
        description: 'Churn risk scoring, upsell identification, action prioritization.',
        agents: ['ChurnPredictor', 'UpsellIdentifier', 'ActionPrioritizer'],
      },
    ],
  },
];

const patterns = [
  {
    name: 'Fan-out / Fan-in',
    description: 'Parallel data collection converging to consolidated analysis',
    visual: '● → ●●● → ●',
  },
  {
    name: 'Pipeline Stages',
    description: 'Seeds → Signals → Hypotheses → Strategies → Evaluations',
    visual: '● → ● → ● → ● → ●',
  },
  {
    name: 'Invariant Enforcement',
    description: 'Domain-specific quality gates that must pass before progression',
    visual: '● → [gate] → ●',
  },
  {
    name: 'LLM Integration',
    description: 'Optional LLM-powered variants for natural language reasoning',
    visual: '● → [llm] → ●',
  },
];

export function Domain() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.tagline}>converge-domain</p>
        <h1 className={styles.title}>Domain Agents</h1>
        <p className={styles.subtitle}>
          Production-ready agent implementations for common enterprise use cases.
          Each demonstrates Converge patterns with deterministic convergence.
        </p>
      </header>

      <section className={styles.install}>
        <pre className={styles.code}>
          <code>{`converge-domain = "${CONVERGE_DOMAIN_VERSION}"`}</code>
        </pre>
      </section>

      <section className={styles.patterns}>
        <h2 className={styles.sectionTitle}>Architecture Patterns</h2>
        <div className={styles.patternGrid}>
          {patterns.map((pattern) => (
            <div key={pattern.name} className={styles.pattern}>
              <code className={styles.patternVisual}>{pattern.visual}</code>
              <h3 className={styles.patternName}>{pattern.name}</h3>
              <p className={styles.patternDescription}>{pattern.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.useCases}>
        <h2 className={styles.sectionTitle}>Use Cases</h2>
        {useCases.map((category) => (
          <div key={category.category} className={styles.category}>
            <h3 className={styles.categoryTitle}>{category.category}</h3>
            <div className={styles.itemGrid}>
              {category.items.map((item) => (
                <div key={item.name} className={styles.item}>
                  <h4 className={styles.itemName}>{item.name}</h4>
                  <p className={styles.itemDescription}>{item.description}</p>
                  <div className={styles.agents}>
                    {item.agents.map((agent) => (
                      <code key={agent} className={styles.agent}>{agent}</code>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.example}>
        <h2 className={styles.sectionTitle}>Example: Growth Strategy</h2>
        <pre className={styles.codeBlock}>
          <code>{`use converge_core::{Engine, Context, ContextKey, Fact};
use converge_domain::growth_strategy::{
    MarketSignalAgent, CompetitorAgent,
    StrategyAgent, EvaluationAgent
};

// Create engine with domain agents
let mut engine = Engine::new();
engine.register(MarketSignalAgent);
engine.register(CompetitorAgent);
engine.register(StrategyAgent);
engine.register(EvaluationAgent);

// Seed with market data
let mut ctx = Context::new();
ctx.add_fact(Fact::new(
    ContextKey::Seeds,
    "market-data",
    "Q4 revenue: $2.3M, growth: 15% YoY"
))?;

// Run to convergence
let result = engine.run(ctx)?;

// Extract evaluated strategies
for fact in result.context.get(ContextKey::Evaluations) {
    println!("Strategy: {}", fact.content);
}`}</code>
        </pre>
      </section>
    </div>
  );
}
