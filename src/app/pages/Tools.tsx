import { useState } from 'react';
import { useValidateRules } from '../hooks/useValidateRules';
import { CONVERGE_TOOL_VERSION } from '../../versions';
import styles from './Tools.module.css';

const exampleRule = `Truth: Order Processing
  Business rules for order fulfillment

  Scenario: Orders above $100 get free shipping
    Given a customer with a valid account
    And an order with items totaling $150
    When the order is submitted
    Then shipping cost should be $0
    And the order status should be "confirmed"

  Scenario: Inventory must be reserved before confirmation
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

export function Tools() {
  const [ruleText, setRuleText] = useState(exampleRule);
  const [useLlm, setUseLlm] = useState(false);
  const { state: validation, validate } = useValidateRules();

  const handleValidate = () => {
    void validate(ruleText, useLlm);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.tagline}>converge-tool</p>
        <h1 className={styles.title}>Converge Truths</h1>
        <p className={styles.subtitle}>
          Declare what must be true in a structured, verifiable format.
          Validate, score, and generate Truths from free text.
        </p>
      </header>

      <section className={styles.install}>
        <pre className={styles.code}>
          <code>{`converge-tool = "${CONVERGE_TOOL_VERSION}"`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why "Converge Truths"?</h2>
        <div className={styles.whyGrid}>
          <div className={styles.whyCard}>
            <h3 className={styles.whyTitle}>Not BDD Testing</h3>
            <p className={styles.whyDescription}>
              Traditional specs are for testing. Converge Truths
              declare business reality that agents make true.
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
            <h3 className={styles.whyTitle}>LLM Validation + Generation</h3>
            <p className={styles.whyDescription}>
              Rules are validated and can be generated from free text with
              confidence scoring and suggestions.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Truth Editor</h2>
        <p className={styles.sectionDescription}>
          Write Converge Truths and validate them. Enable LLM validation for
          deep business sense and compilability checks.
        </p>
        <div className={styles.editor}>
          <div className={styles.editorPane}>
            <div className={styles.editorHeader}>
              <span>rules.truth</span>
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
                  disabled={validation.status === 'loading'}
                >
                  {validation.status === 'loading' ? 'Validating...' : 'Validate'}
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
              {validation.status === 'success' && (
                <span className={styles.modeTag}>
                  {validation.mode === 'api' ? (useLlm ? 'LLM' : 'API') : 'Local'}
                </span>
              )}
              {validation.status === 'error' && (
                <span className={styles.modeTag}>
                  {validation.mode === 'api' ? 'API Error' : 'Local'}
                </span>
              )}
            </div>
            <div className={styles.results}>
              {validation.status === 'loading' ? (
                <p className={styles.placeholder}>Validating...</p>
              ) : validation.status === 'error' ? (
                <div className={styles.errorResult}>
                  <span className={styles.issueIcon}>!</span>
                  <div>
                    <span>{validation.error.message}</span>
                    {validation.error.type === 'api' && (
                      <span className={styles.meta}>HTTP {validation.error.status}</span>
                    )}
                  </div>
                </div>
              ) : validation.status === 'idle' ? (
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
        <h2 className={styles.sectionTitle}>Spec Generation</h2>
        <p className={styles.sectionDescription}>
          Convert free text into Converge Truths and iterate with LLM-assisted
          feedback loops.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`# Generate a Truth spec from free text
ANTHROPIC_API_KEY=your_key cargo run --example generate_spec`}</code>
        </pre>
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

// Parse and validate a .truth file (Truth: syntax supported)
let report = validator.validate_file("specs/money.truth")?;

// Check results
if report.is_valid() {
    println!("Truths are valid!");
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
