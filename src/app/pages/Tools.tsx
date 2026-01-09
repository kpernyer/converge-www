import { useState } from 'react';
import { api, type ValidationIssue, type ValidateRulesResponse } from '../../api';
import styles from './Tools.module.css';

const exampleRule = `Feature: Order Processing
  Business rules for order fulfillment

  Rule: Orders above $100 get free shipping
    Given a customer with a valid account
    And an order with items totaling $150
    When the order is submitted
    Then shipping cost should be $0
    And the order status should be "confirmed"

  Rule: Inventory must be reserved before confirmation
    Given a product with 5 units in stock
    And an order requesting 3 units
    When the order is confirmed
    Then available inventory should be 2 units
    And the order should have reserved stock`;

const validationDimensions = [
  {
    name: 'Convention',
    description: 'Proper Given/When/Then structure, naming conventions, formatting',
    checks: ['Feature has description', 'Rules have clear names', 'Steps follow GWT pattern'],
  },
  {
    name: 'Compilability',
    description: 'Can rules be automated without human intervention?',
    checks: ['No uncertain language', 'Concrete values specified', 'Deterministic outcomes'],
  },
  {
    name: 'Business Sense',
    description: 'Are rules testable and well-defined?',
    checks: ['Preconditions are verifiable', 'Assertions are measurable', 'No external dependencies'],
  },
];

const issuePatterns = [
  { pattern: 'Missing Then clause', description: 'Every rule needs a verifiable outcome' },
  { pattern: 'Uncertain language', description: '"should", "might", "probably" are flags' },
  { pattern: 'Vague preconditions', description: '"Given some data" is not testable' },
  { pattern: 'Untestable assertions', description: '"Then it works correctly" cannot be verified' },
  { pattern: 'External dependencies', description: 'Avoid "When the API responds"' },
  { pattern: 'Human input required', description: '"When the user decides" breaks automation' },
];

// Client-side validation fallback
function validateRuleLocally(text: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const lines = text.split('\n');

  if (!lines.some(l => l.trim().startsWith('Feature:'))) {
    issues.push({
      location: 'File',
      category: 'convention',
      severity: 'error',
      message: 'Missing Feature declaration',
      suggestion: 'Add a Feature: line at the top',
    });
  }

  const hasGiven = lines.some(l => l.trim().startsWith('Given'));
  const hasWhen = lines.some(l => l.trim().startsWith('When'));
  const hasThen = lines.some(l => l.trim().startsWith('Then'));

  if (!hasGiven) {
    issues.push({
      location: 'Scenario',
      category: 'convention',
      severity: 'warning',
      message: 'Missing Given clause (preconditions)',
      suggestion: 'Add preconditions with Given steps',
    });
  }
  if (!hasWhen) {
    issues.push({
      location: 'Scenario',
      category: 'convention',
      severity: 'warning',
      message: 'Missing When clause (action)',
      suggestion: 'Add an action with When steps',
    });
  }
  if (!hasThen) {
    issues.push({
      location: 'Scenario',
      category: 'convention',
      severity: 'error',
      message: 'Missing Then clause (expected outcome)',
      suggestion: 'Add expected outcomes with Then steps',
    });
  }

  const uncertainWords = ['might', 'maybe', 'possibly', 'probably'];
  for (const word of uncertainWords) {
    if (text.toLowerCase().includes(word)) {
      issues.push({
        location: 'Content',
        category: 'convention',
        severity: 'warning',
        message: `Uncertain language detected: "${word}"`,
        suggestion: 'Use definite language for testable assertions',
      });
    }
  }

  return issues;
}

type ValidationState = {
  loading: boolean;
  result: ValidateRulesResponse | null;
  error: string | null;
  mode: 'local' | 'api';
};

export function Tools() {
  const [ruleText, setRuleText] = useState(exampleRule);
  const [useLlm, setUseLlm] = useState(false);
  const [validation, setValidation] = useState<ValidationState>({
    loading: false,
    result: null,
    error: null,
    mode: 'local',
  });

  const handleValidate = async () => {
    setValidation({ loading: true, result: null, error: null, mode: 'local' });

    try {
      // Try API validation first
      const result = await api.validateRules({
        content: ruleText,
        file_name: 'rules.feature',
        use_llm: useLlm,
      });
      setValidation({ loading: false, result, error: null, mode: 'api' });
    } catch {
      // Fall back to local validation
      const issues = validateRuleLocally(ruleText);
      setValidation({
        loading: false,
        result: {
          is_valid: issues.filter(i => i.severity === 'error').length === 0,
          scenario_count: 0,
          issues,
          confidence: 0.5,
        },
        error: null,
        mode: 'local',
      });
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.tagline}>converge-tool</p>
        <h1 className={styles.title}>Converge Rules</h1>
        <p className={styles.subtitle}>
          Define business rules in a structured, verifiable format.
          Based on Gherkin syntax, optimized for agent-driven automation.
        </p>
      </header>

      <section className={styles.install}>
        <pre className={styles.code}>
          <code>converge-tool = "0.2"</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why "Converge Rules"?</h2>
        <div className={styles.whyGrid}>
          <div className={styles.whyCard}>
            <h3 className={styles.whyTitle}>Not BDD Testing</h3>
            <p className={styles.whyDescription}>
              Traditional Gherkin is for behavior-driven testing. Converge Rules
              define business logic that agents execute directly.
            </p>
          </div>
          <div className={styles.whyCard}>
            <h3 className={styles.whyTitle}>Executable Specifications</h3>
            <p className={styles.whyDescription}>
              Rules are parsed into agent constraints. The engine ensures
              all rules converge to a consistent final state.
            </p>
          </div>
          <div className={styles.whyCard}>
            <h3 className={styles.whyTitle}>LLM Validation</h3>
            <p className={styles.whyDescription}>
              Rules are validated by LLM for compilability, convention compliance,
              and business sense before execution.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Rule Editor</h2>
        <p className={styles.sectionDescription}>
          Write Converge Rules and validate them. Enable LLM validation for
          deep business sense and compilability checks.
        </p>
        <div className={styles.editor}>
          <div className={styles.editorPane}>
            <div className={styles.editorHeader}>
              <span>rules.feature</span>
              <div className={styles.editorActions}>
                <label className={styles.llmToggle}>
                  <input
                    type="checkbox"
                    checked={useLlm}
                    onChange={(e) => setUseLlm(e.target.checked)}
                  />
                  <span>LLM</span>
                </label>
                <button
                  className={styles.validateBtn}
                  onClick={handleValidate}
                  disabled={validation.loading}
                >
                  {validation.loading ? 'Validating...' : 'Validate'}
                </button>
              </div>
            </div>
            <textarea
              className={styles.textarea}
              value={ruleText}
              onChange={(e) => setRuleText(e.target.value)}
              spellCheck={false}
            />
          </div>
          <div className={styles.resultPane}>
            <div className={styles.editorHeader}>
              <span>Validation Result</span>
              {validation.result && (
                <span className={styles.modeTag}>
                  {validation.mode === 'api' ? (useLlm ? 'LLM' : 'API') : 'Local'}
                </span>
              )}
            </div>
            <div className={styles.results}>
              {validation.loading ? (
                <p className={styles.placeholder}>Validating...</p>
              ) : validation.error ? (
                <div className={styles.errorResult}>
                  <span className={styles.issueIcon}>!</span>
                  <span>{validation.error}</span>
                </div>
              ) : validation.result === null ? (
                <p className={styles.placeholder}>Click "Validate" to check your rules</p>
              ) : validation.result.is_valid ? (
                <div className={styles.valid}>
                  <span className={styles.checkmark}>&#10003;</span>
                  <div>
                    <span>Rules are valid</span>
                    {validation.result.scenario_count > 0 && (
                      <span className={styles.meta}>
                        {validation.result.scenario_count} scenarios checked
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.issues}>
                  {validation.result.issues.map((issue, i) => (
                    <div
                      key={i}
                      className={`${styles.issueItem} ${styles[issue.severity]}`}
                    >
                      <span className={styles.issueIcon}>
                        {issue.severity === 'error' ? '✗' : issue.severity === 'warning' ? '!' : 'i'}
                      </span>
                      <div className={styles.issueContent}>
                        <div className={styles.issueHeader}>
                          <code className={styles.issueLocation}>{issue.location}</code>
                          <span className={styles.issueCategory}>{issue.category}</span>
                        </div>
                        <span className={styles.issueMessage}>{issue.message}</span>
                        {issue.suggestion && (
                          <span className={styles.issueSuggestion}>{issue.suggestion}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Validation Dimensions</h2>
        <div className={styles.dimensionGrid}>
          {validationDimensions.map((dim) => (
            <div key={dim.name} className={styles.dimension}>
              <h3 className={styles.dimensionName}>{dim.name}</h3>
              <p className={styles.dimensionDescription}>{dim.description}</p>
              <ul className={styles.checks}>
                {dim.checks.map((check) => (
                  <li key={check} className={styles.check}>{check}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Common Issues</h2>
        <div className={styles.issueGrid}>
          {issuePatterns.map((issue) => (
            <div key={issue.pattern} className={styles.issueCard}>
              <code className={styles.issuePattern}>{issue.pattern}</code>
              <p className={styles.issueDescription}>{issue.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Rust Integration</h2>
        <pre className={styles.codeBlock}>
          <code>{`use converge_tool::gherkin::{GherkinValidator, ValidationConfig};
use converge_provider::AnthropicProvider;

// Create validator with LLM provider
let provider = AnthropicProvider::from_env("claude-3-5-haiku-20241022")?;
let config = ValidationConfig::default();
let validator = GherkinValidator::new(provider, config);

// Parse and validate a feature file
let feature = gherkin::parse_feature(feature_text)?;
let report = validator.validate_feature(&feature)?;

// Check results
if report.is_valid() {
    println!("Rules are valid!");
} else {
    for issue in report.issues {
        println!("{}: {}", issue.severity, issue.message);
    }
}`}</code>
        </pre>
      </section>
    </div>
  );
}
