export const growthStrategyDemo = `╔══════════════════════════════════════════════════════════════════════════════╗
║              CONVERGE GROWTH STRATEGY - LLM CONTAINMENT DEMO                 ║
╚══════════════════════════════════════════════════════════════════════════════╝

This demo shows how Converge handles LLM outputs safely:
  • LLM agents emit PROPOSALS (untrusted)
  • ValidationAgent acts as a gateway
  • Only validated proposals become trusted facts
  • Hallucinations are caught and logged

┌──────────────────────────────────────────────────────────────────────────────┐
│ ENGINE CONFIGURATION                                                         │
└──────────────────────────────────────────────────────────────────────────────┘

  AGENTS:
    [Human(0)] NordicMarketSeedAgent: ∅ → Seeds
    [Human(1)] PricingSeedAgent: ∅ → Seeds
    [LLM(2)] LlmSignalAgent: Seeds → Proposals (untrusted)
    [LLM(3)] LlmHypothesisAgent: Signals → Proposals (untrusted)
    [Validator(4)] ValidationAgent: Proposals → Signals/Hypotheses (trusted)
    [Agent(5)] SignalToCompetitorAgent: Signals → Competitors
    [Agent(6)] StrategyAgent: Competitors → Strategies
    [Agent(7)] EvaluationAgent: Strategies → Evaluations

  INVARIANTS:
    • BrandSafetyInvariant (structural)
    • RequireMultipleStrategies (acceptance)
    • RequireStrategyEvaluations (acceptance)

  Total: 8 agents registered

┌──────────────────────────────────────────────────────────────────────────────┐
│ CONVERGENCE EXECUTION                                                        │
└──────────────────────────────────────────────────────────────────────────────┘

  Expected cycle progression:
    Cycle 1: SeedAgents emit seeds
    Cycle 2: LlmSignalAgent proposes signals
    Cycle 3: ValidationAgent filters signals
    Cycle 4: LlmHypothesisAgent proposes hypotheses
    Cycle 5: ValidationAgent filters hypotheses
    Cycle 6: SignalToCompetitorAgent creates profiles
    Cycle 7: StrategyAgent proposes strategies
    Cycle 8: EvaluationAgent scores strategies
    Cycle 9: Convergence (no more work)

  Running engine.run()...
  ─────────────────────────────────────────────────────────────────────────────
  Cycle 1: 2 agents ran, 4 facts added
  Cycle 2: 1 agent ran, 5 proposals added
  Cycle 3: 1 agent ran, 3 signals promoted, 2 rejected
  Cycle 4: 1 agent ran, 3 proposals added
  Cycle 5: 1 agent ran, 2 hypotheses promoted, 1 rejected
  Cycle 6: 1 agent ran, 2 competitors added
  Cycle 7: 1 agent ran, 3 strategies added
  ─────────────────────────────────────────────────────────────────────────────
  Converged in 7 cycles

┌──────────────────────────────────────────────────────────────────────────────┐
│ LLM PROPOSAL ANALYSIS                                                        │
└──────────────────────────────────────────────────────────────────────────────┘

  LLM Proposals Submitted: 8
  ───────────────────────────────────────────────────────────────────────────
    • signals:llm-signal-nordic-trend
    • signals:llm-signal-competition
    • signals:llm-signal-hallucination
    • signals:llm-signal-b2b-channel
    • signals:llm-signal-uncertain
    • hypotheses:llm-hyp-smb-gap
    • hypotheses:llm-hyp-channel-opportunity
    • hypotheses:llm-hyp-anonymous

  Validation Results:
  ───────────────────────────────────────────────────────────────────────────
    ✓ Accepted Signals: 3
    ✓ Accepted Hypotheses: 2
    ✗ Rejected: 3

  ACCEPTED (Promoted to Trusted Context):
  ───────────────────────────────────────────────────────────────────────────

    📡 Signals:
      ✓ [llm-signal-nordic-trend] "Nordic tech adoption accelerating in enterprise se..."
      ✓ [llm-signal-competition] "3 major competitors identified in Nordic region"
      ✓ [llm-signal-b2b-channel] "LinkedIn most effective B2B channel in region"

    💡 Hypotheses:
      ✓ [llm-hyp-smb-gap] "Competitors focus on enterprise, leaving SMB under..."
      ✓ [llm-hyp-channel-opportunity] "LinkedIn presence could differentiate from competi..."

  REJECTED (Filtered by ValidationAgent):
  ───────────────────────────────────────────────────────────────────────────
    ✗ [llm-signal-hallucination]
      Reason: content contains forbidden term 'guaranteed'

    ✗ [llm-signal-uncertain]
      Reason: confidence 0.35 below threshold 0.6

    ✗ [llm-hyp-anonymous]
      Reason: provenance is required but empty

┌──────────────────────────────────────────────────────────────────────────────┐
│ FINAL STRATEGY OUTPUT                                                        │
└──────────────────────────────────────────────────────────────────────────────┘

  🏢 COMPETITORS IDENTIFIED:
  ───────────────────────────────────────────────────────────────────────────
    • EnterpriseInc: Strong enterprise focus, weak SMB presence
    • LegacyCorp: Established brand, slow innovation

  🎯 STRATEGIES GENERATED:
  ───────────────────────────────────────────────────────────────────────────
    [strategy:linkedin-campaign]
    Launch targeted LinkedIn campaign for Nordic B2B.
    Focus on decision-maker personas.

    [strategy:content-marketing]
    Establish thought leadership through content marketing.
    Build trust with educational content.

    [strategy:partnership]
    Partner with local system integrators.
    Leverage existing relationships.

  📊 RANKED EVALUATIONS:
  ═══════════════════════════════════════════════════════════════════════════
    Score: 78/100 | RECOMMENDED
    Rationale: High-reach channel with proven B2B effectiveness

    Score: 65/100 | ALTERNATIVE
    Rationale: Long-term brand building, slower ROI

    Score: 50/100 | ALTERNATIVE
    Rationale: Standard approach, moderate differentiation

┌──────────────────────────────────────────────────────────────────────────────┐
│ DATA LINEAGE - TRUST CHAIN                                                   │
└──────────────────────────────────────────────────────────────────────────────┘

  Every fact in the final output has a verifiable trust chain:

    Seeds (Human)
      └─→ LLM Proposals (Untrusted)
            └─→ ValidationAgent (Gateway)
                  ├─→ Accepted → Signals/Hypotheses (Trusted)
                  └─→ Rejected → Audit Trail
                        └─→ Competitors (Derived from Trusted)
                              └─→ Strategies (Derived)
                                    └─→ Evaluations (Final)

  NO LLM OUTPUT REACHED THE FINAL STRATEGIES WITHOUT:
    ✓ Passing confidence threshold (≥60%)
    ✓ Having valid provenance
    ✓ Avoiding forbidden terms
    ✓ Containing non-empty content

╔══════════════════════════════════════════════════════════════════════════════╗
║                              EXECUTION SUMMARY                                ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  Agents:           8 (2 human, 2 LLM, 1 validator, 3 strategy)               ║
║  Invariants:       3                                                         ║
║  Cycles:           7                                                         ║
║  LLM Proposals:    8                                                         ║
║  Accepted:         5                                                         ║
║  Rejected:         3                                                         ║
║  Final Strategies: 3                                                         ║
║  Convergence:      ✓ ACHIEVED                                                ║
╚══════════════════════════════════════════════════════════════════════════════╝
`;

export const supplyChainDemo = `╔══════════════════════════════════════════════════════════════════════════════╗
║                    CONVERGE SUPPLY CHAIN OPTIMIZATION                         ║
╚══════════════════════════════════════════════════════════════════════════════╝

Multi-warehouse routing with demand forecasting and cost optimization.

┌──────────────────────────────────────────────────────────────────────────────┐
│ WAREHOUSE NETWORK                                                            │
└──────────────────────────────────────────────────────────────────────────────┘

  🏭 WAREHOUSES:
    [WH-EU-CENTRAL] Frankfurt, Germany
      Capacity: 50,000 units | Current: 35,000 | Available: 15,000

    [WH-EU-NORTH] Stockholm, Sweden
      Capacity: 30,000 units | Current: 28,000 | Available: 2,000

    [WH-EU-SOUTH] Milan, Italy
      Capacity: 40,000 units | Current: 15,000 | Available: 25,000

┌──────────────────────────────────────────────────────────────────────────────┐
│ DEMAND SIGNALS                                                               │
└──────────────────────────────────────────────────────────────────────────────┘

  📊 FORECAST (Next 30 days):
    • Nordic Region: +40% demand surge expected
    • Central Europe: Stable, -5% seasonal adjustment
    • Southern Europe: +15% growth trend

  ⚠️  CONSTRAINT VIOLATIONS DETECTED:
    • WH-EU-NORTH will exceed capacity in 12 days
    • Nordic delivery SLA at risk (current: 4.2 days, target: 3 days)

┌──────────────────────────────────────────────────────────────────────────────┐
│ OPTIMIZATION AGENTS                                                          │
└──────────────────────────────────────────────────────────────────────────────┘

  Running convergence...

  Cycle 1: DemandForecastAgent analyzes signals
  Cycle 2: InventoryBalancer proposes transfers
  Cycle 3: CostOptimizer evaluates options
  Cycle 4: ConstraintChecker validates feasibility
  Cycle 5: RouteOptimizer finalizes paths

  ─────────────────────────────────────────────────────────────────────────────
  Converged in 5 cycles

┌──────────────────────────────────────────────────────────────────────────────┐
│ RECOMMENDED TRANSFERS                                                        │
└──────────────────────────────────────────────────────────────────────────────┘

  📦 TRANSFER #1:
    From: WH-EU-SOUTH (Milan)
    To:   WH-EU-NORTH (Stockholm)
    Units: 8,000
    Cost: €12,400
    ETA: 3 days

  📦 TRANSFER #2:
    From: WH-EU-CENTRAL (Frankfurt)
    To:   WH-EU-NORTH (Stockholm)
    Units: 5,000
    Cost: €6,200
    ETA: 2 days

  ───────────────────────────────────────────────────────────────────────────
  Total Transfer Cost: €18,600
  Projected SLA Improvement: 4.2 days → 2.8 days ✓
  Constraint Violations Resolved: 2/2 ✓

╔══════════════════════════════════════════════════════════════════════════════╗
║  OPTIMIZATION COMPLETE - All constraints satisfied                            ║
╚══════════════════════════════════════════════════════════════════════════════╝
`;

export const demos = [
  {
    id: 'growth-strategy',
    title: 'Growth Strategy with LLM Containment',
    description: 'Watch how the engine safely handles LLM outputs, rejecting hallucinations while promoting valid insights.',
    content: growthStrategyDemo,
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain Optimization',
    description: 'Multi-warehouse routing with demand forecasting and constraint satisfaction.',
    content: supplyChainDemo,
  },
];
