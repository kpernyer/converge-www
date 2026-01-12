export const sdrFunnelDemo = `╔══════════════════════════════════════════════════════════════════════════════╗
║          SDR FUNNEL - QUALIFY, ROUTE, AND LEARN WITHOUT DRIFT                ║
╚══════════════════════════════════════════════════════════════════════════════╝

Demonstrates how Converge handles lead qualification with strict invariants:
  • HITL barriers for consent ambiguity
  • Cost-aware routing (calls are expensive: €25 each)
  • Full provenance on every routing decision
  • Learning updates from past outcomes

┌──────────────────────────────────────────────────────────────────────────────┐
│ ROOT INTENT CONFIGURATION                                                    │
└──────────────────────────────────────────────────────────────────────────────┘

  Intent:    sdr.funnel.optimize
  Budget:    llm_tokens=15000
  Max Cycles: 20

  WORKSPACE POLICIES:
    ✓ no_spam
    ✓ gdpr_safe_copy
    ✓ brand_safe_language

  COST CONSTRAINTS:
    📞 Calls: €25 per call (expensive)
    📧 Email: €0.02 per send
    📅 Meeting: €15 scheduling cost

┌──────────────────────────────────────────────────────────────────────────────┐
│ INVARIANTS (Compiled into Runtime Checks)                                    │
└──────────────────────────────────────────────────────────────────────────────┘

  RULE 1: Consent Barrier
  ───────────────────────────────────────────────────────────────────────────
    IF lead has "no_consent" AND "no_legitimate_interest"
    THEN engine MUST halt with AwaitingAuthority "legal_review"
    AND no outreach action may be emitted

  RULE 2: Call Threshold
  ───────────────────────────────────────────────────────────────────────────
    IF lead_score < 0.70 OR confidence < 0.75
    THEN engine MUST NOT emit action "place_call"

  RULE 3: Provenance Requirement
  ───────────────────────────────────────────────────────────────────────────
    WHEN lead is routed to a motion
    THEN routing_decision MUST contain:
      • evidence
      • rationale
      • provenance_id

┌──────────────────────────────────────────────────────────────────────────────┐
│ INBOUND LEAD                                                                 │
└──────────────────────────────────────────────────────────────────────────────┘

  📥 NEW LEAD RECEIVED:
    ID:      lead-1042
    Company: NordicOps AB
    Role:    Founder
    Source:  website
    Message: "Need help with CRM + billing"

  📊 ENRICHMENT SOURCES AVAILABLE:
    ✓ CRM enrichment
    ✓ Email enrichment
    ✓ Past outcomes from similar leads

┌──────────────────────────────────────────────────────────────────────────────┐
│ CONVERGENCE EXECUTION                                                        │
└──────────────────────────────────────────────────────────────────────────────┘

  Running engine.run()...
  ─────────────────────────────────────────────────────────────────────────────

  Cycle 1: LeadIngestionAgent processes inbound
    + Fact: lead_raw (lead-1042, NordicOps AB, Founder)

  Cycle 2: EnrichmentAgent queries CRM + email data
    + Fact: enrichment_crm (company_size: 45, revenue: €2.1M)
    + Fact: enrichment_email (domain_verified: true, role_confirmed: true)

  Cycle 3: ProfileBuilderAgent constructs lead profile
    + Fact: lead_profile
      ├─ company_fit: 0.82
      ├─ role_authority: HIGH
      └─ timing_signal: STRONG

  Cycle 4: QualificationAgent scores and qualifies
    + Fact: qualification
      ├─ score: 0.78
      ├─ confidence: 0.85
      └─ icp_match: true

  Cycle 5: MotionGeneratorAgent proposes actions
    + Fact: motion_options
      ├─ [1] send_personal_email (cost: €0.02)
      ├─ [2] schedule_meeting (cost: €15)
      ├─ [3] nurture_sequence (cost: €0.10)
      └─ [4] place_call (cost: €25)

  Cycle 6: RoutingAgent evaluates cost vs. value
    + Fact: routing_decision
      ├─ action: schedule_meeting
      ├─ rationale: "High authority founder, strong timing signal, 78% score"
      ├─ evidence: [lead_profile, qualification, enrichment_crm]
      └─ provenance_id: prov-1042-001

  Cycle 7: LearningAgent updates model
    + Fact: learning_update
      └─ similar_leads_outcome_weight: +0.05

  ─────────────────────────────────────────────────────────────────────────────
  ✓ Converged in 7 cycles

┌──────────────────────────────────────────────────────────────────────────────┐
│ INVARIANT CHECKS                                                             │
└──────────────────────────────────────────────────────────────────────────────┘

  ✓ Consent Check: PASSED
    └─ Source "website" implies legitimate interest

  ✓ Call Threshold: NOT TRIGGERED
    └─ score=0.78 ≥ 0.70, confidence=0.85 ≥ 0.75
    └─ Call was eligible but not selected (meeting more cost-effective)

  ✓ Provenance Check: PASSED
    └─ routing_decision contains all required fields

┌──────────────────────────────────────────────────────────────────────────────┐
│ FINAL ROUTING DECISION                                                       │
└──────────────────────────────────────────────────────────────────────────────┘

  🎯 RECOMMENDED ACTION: schedule_meeting

  LEAD: lead-1042 (NordicOps AB)
  ═══════════════════════════════════════════════════════════════════════════
    Score:      78/100
    Confidence: 85%
    Cost:       €15 (vs €25 for call)

  RATIONALE:
    "High authority founder with strong timing signal. Meeting is more
    cost-effective than call given 78% score. Email would be too passive
    for a founder-level contact showing active buying signals."

  EVIDENCE CHAIN:
    lead_raw → enrichment_crm → lead_profile → qualification → routing_decision
         ↓           ↓              ↓              ↓
      source      company       fit score        final
      website     €2.1M rev      0.82           0.78

  PROVENANCE ID: prov-1042-001

╔══════════════════════════════════════════════════════════════════════════════╗
║                              EXECUTION SUMMARY                                ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  Root Intent:     sdr.funnel.optimize                                        ║
║  Cycles:          7                                                          ║
║  Facts Produced:  8 (lead_profile, qualification, motion_options, etc.)      ║
║  Invariants:      3 checked, 3 passed                                        ║
║  HITL Barriers:   0 triggered                                                ║
║  Final Action:    schedule_meeting (€15)                                     ║
║  Convergence:     ✓ ACHIEVED                                                 ║
╚══════════════════════════════════════════════════════════════════════════════╝
`;

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
    [LLM(2)] LlmSignalAgent: Seeds → ProposedFacts (untrusted)
    [LLM(3)] LlmHypothesisAgent: Signals → ProposedFacts (untrusted)
    [Validator(4)] ValidationAgent: ProposedFacts → Trusted Context (Facts)
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
    Cycle 1: SeedAgents emit seeds (Trusted Facts)
    Cycle 2: LlmSignalAgent emits ProposedFacts
    Cycle 3: ValidationAgent promotes ProposedFacts to Facts
    Cycle 4: LlmHypothesisAgent emits ProposedFacts
    Cycle 5: ValidationAgent promotes ProposedFacts to Facts
    Cycle 6: SignalToCompetitorAgent creates profiles
    Cycle 7: StrategyAgent proposes strategies
    Cycle 8: EvaluationAgent scores strategies
    Cycle 9: Convergence (no more work)

  Running engine.run()...
  ─────────────────────────────────────────────────────────────────────────────
  Cycle 1: 2 agents ran, 4 Facts added
  Cycle 2: 1 agent ran, 5 ProposedFacts added
  Cycle 3: 1 agent ran, 3 Facts promoted, 2 ProposedFacts rejected
  Cycle 4: 1 agent ran, 3 ProposedFacts added
  Cycle 5: 1 agent ran, 2 Facts promoted, 1 ProposedFact rejected
  Cycle 6: 1 agent ran, 2 competitors added
  Cycle 7: 1 agent ran, 3 strategies added
  ─────────────────────────────────────────────────────────────────────────────
  Converged in 7 cycles

┌──────────────────────────────────────────────────────────────────────────────┐
│ LLM PROPOSAL ANALYSIS                                                        │
└──────────────────────────────────────────────────────────────────────────────┘

  ProposedFacts Submitted: 8
  ───────────────────────────────────────────────────────────────────────────
    • signals:llm-signal-nordic-trend
    • signals:llm-signal-competition
    • signals:llm-signal-hallucination
    • signals:llm-signal-b2b-channel
    • signals:llm-signal-uncertain
    • hypotheses:llm-hyp-smb-gap
    • hypotheses:llm-hyp-channel-opportunity
    • hypotheses:llm-hyp-anonymous

  Promotion Workflow (ValidationAgent):
  ───────────────────────────────────────────────────────────────────────────
    ✓ Promoted to Fact: 5
    ✗ Rejected Proposal: 3

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

    Seeds (Trusted Facts)
      └─→ ProposedFacts (Untrusted)
            └─→ ValidationAgent (Gateway)
                  ├─→ Promoted → Facts (Trusted)
                  └─→ Rejected → Audit Trail
                        └─→ Competitors (Derived from Facts)
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
    id: 'sdr-funnel',
    title: 'SDR Funnel - Qualify, Route, and Learn',
    description: 'Watch agents qualify leads, enforce consent rules, and route to cost-optimal actions with full provenance.',
    content: sdrFunnelDemo,
  },
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
