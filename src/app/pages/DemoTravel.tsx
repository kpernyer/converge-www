import { useState, useEffect, useRef } from 'react';
import styles from './DemoTravel.module.css';

type Step = 'input' | 'review' | 'running' | 'hold' | 'optimizing' | 'final' | 'priority2' | 'done';

interface Agent {
    name: string;
    status: 'idle' | 'working' | 'done';
}

export function DemoTravel() {
    const [step, setStep] = useState<Step>('input');
    const [input, setInput] = useState('');
    const [ghostText, setGhostText] = useState('Seoul week of Feb 3rd. 2 days work.\nExtend 2 days. Return via Dubai (1 night).\nUse Marriott points. Economy Plus.');
    const [gherkin, setGherkin] = useState('');
    const [logs, setLogs] = useState<string[]>([]);
    const [agents, setAgents] = useState<Agent[]>([
        { name: 'IntentParsing', status: 'idle' },
        { name: 'RouteGeneration', status: 'idle' },
        { name: 'Hospitality', status: 'idle' },
        { name: 'Loyalty', status: 'idle' },
        { name: 'Policy', status: 'idle' },
        { name: 'Convergence', status: 'idle' },
        { name: 'Dining (P2)', status: 'idle' },
        { name: 'Proximity (P2)', status: 'idle' },
        { name: 'AirlineSvc (P2)', status: 'idle' },
    ]);
    const [options, setOptions] = useState<string[]>([]);
    const logsEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logs
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const addLog = (msg: string) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

    const updateAgent = (name: string, status: 'idle' | 'working' | 'done') => {
        setAgents(prev => prev.map(a => a.name === name ? { ...a, status } : a));
    };

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Tab' && input === '') {
            e.preventDefault();
            setInput(ghostText);
        }
    };

    const generateGherkin = () => {
        setGherkin(`Feature: Complex Trip Planning
  @travel @complex @loyalty
  Scenario: Seoul Work Week with Dubai Leisure Extension
    Given a traveler "UserXYZ" with memberships:
      | Program  | Level    | Balance |
      | Marriott | Gold     | 150k    |
    And a mission request:
      """
      ${input}
      """
    And priority 2 preferences:
      | Type      | Detail                     |
      | Proximity | Hotel < 1km from Office    |
      | Dining    | No seafood, business lunch |`);
        setStep('review');
    };

    const startSimulation = () => {
        setStep('running');
        setLogs([]);
        simulateRun();
    };

    const simulateRun = async () => {
        addLog("🚀 Starting Travel Arrangement Pack...");
        updateAgent('IntentParsing', 'working');

        await wait(800);
        addLog("📋 Intent Parsed. Constraints identified: Seoul (Hard), Dubai (Hard).");
        updateAgent('IntentParsing', 'done');
        updateAgent('RouteGeneration', 'working');

        await wait(1200);
        addLog("✈️ FlightRoutes found: 12. Filtering for Economy Plus...");

        await wait(800);
        updateAgent('Hospitality', 'working');
        addLog("🏨 HospitalityAgent searching Marriott properties...");

        await wait(1200);
        // Trigger Hold
        setStep('hold');
    };

    const handleHoldDecision = async (decision: 'yes' | 'no') => {
        if (decision === 'yes') {
            addLog("✅ Safe Harbor Held! Continued optimization...");
        } else {
            addLog("❌ Safe Harbor skipped. Continuing...");
        }
        setStep('optimizing');
        continueSimulation();
    };

    const continueSimulation = async () => {
        updateAgent('Hospitality', 'done');
        updateAgent('RouteGeneration', 'done');
        updateAgent('Convergence', 'working');
        addLog("✨ Convergence achieved. Ranking options...");

        await wait(1500);
        updateAgent('Convergence', 'done');
        setOptions([
            "1. $2,400 | 95% Match | Emirates + Marriott + Dinner Reserved",
            "2. $2,100 | 85% Match | Korean Air + Courtyard (Further from office)",
            "3. $2,800 | 98% Match | Emirates Business (Upgrade) + Sheraton",
            "4. $2,300 | 90% Match | Lufthansa + Marriott",
            "5. $2,500 | 92% Match | Qatar Airways + Sheraton",
        ]);
        addLog("✅ Final Options Generated.");
        setStep('final');
    };

    const selectOption = async (idx: number) => {
        setStep('priority2');
        addLog(`🔒 Option ${idx + 1} locked. Initializing Ancillary Agents...`);

        await wait(1000);
        updateAgent('Dining (P2)', 'working');
        addLog("🍽️ DiningAgent searching 'No Seafood, Business Lunch'...");

        await wait(1200);
        updateAgent('Dining (P2)', 'done');
        updateAgent('Proximity (P2)', 'working');
        addLog("📍 ProximityAgent verifying office distance (<1km)...");

        await wait(1200);
        updateAgent('Proximity (P2)', 'done');
        updateAgent('AirlineSvc (P2)', 'working');
        addLog("🥗 AirlineServiceAgent requesting AVML meal...");

        await wait(1000);
        updateAgent('AirlineSvc (P2)', 'done');
        addLog("✅ ALL ANCILLARY SERVICES CONFIRMED.");
        setStep('done');
    };

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>Travel Arrangement Demo</h1>
                <p>Cascading Convergence & Speculative Holding</p>
            </header>

            {step === 'input' && (
                <section className={styles.section}>
                    <h3>Travel Request</h3>
                    <textarea
                        className={styles.inputArea}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Press TAB to autofill demo request..."
                    />
                    <button className={styles.button} onClick={generateGherkin} disabled={!input}>
                        Generate Plan
                    </button>
                </section>
            )}

            {step === 'review' && (
                <section className={styles.section}>
                    <h3>Converge Truth Proposal</h3>
                    <pre className={styles.inputArea} style={{ height: '300px', overflowY: 'auto' }}>{gherkin}</pre>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button className={styles.button} onClick={startSimulation}>
                            Accept & Run
                        </button>
                        <button className={styles.button} style={{ background: '#333' }} onClick={() => setStep('input')}>
                            Refine Request
                        </button>
                    </div>
                </section>
            )}

            {['running', 'hold', 'optimizing', 'final', 'priority2', 'done'].includes(step) && (
                <div>
                    <div className={styles.agentGrid}>
                        {agents.map(a => (
                            <div key={a.name} className={`${styles.agentCard} ${a.status === 'working' ? styles.agentWorking : ''}`}>
                                <div>{a.name}</div>
                                <small>{a.status.toUpperCase()}</small>
                            </div>
                        ))}
                    </div>

                    <div className={styles.logs}>
                        {logs.map((L, i) => <div key={i}>{L}</div>)}
                        <div ref={logsEndRef} />
                    </div>
                </div>
            )}

            {step === 'hold' && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popup}>
                        <h2>Inventory Alert: Safe Harbor Found</h2>
                        <p><strong>Emirates Flight EK123 ($2,400)</strong> meets all hard constraints.</p>
                        <p>Would you like to place a 24h Courtesy Hold while I continue optimizing for Alliance Codeshares?</p>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button className={styles.button} onClick={() => handleHoldDecision('yes')}>
                                (Y) Yes, Hold
                            </button>
                            <button className={styles.button} style={{ background: '#333' }} onClick={() => handleHoldDecision('no')}>
                                (N) No, Risk it
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {step === 'final' && (
                <section className={styles.section} style={{ marginTop: '2rem' }}>
                    <h3>✨ Your Converged Truths ✨</h3>
                    <p>Select an option to resolve Priority 2 constraints (Dining, Service, etc.)</p>
                    <ul className={styles.optionsList}>
                        {options.map((opt, i) => (
                            <li key={i} className={styles.optionItem}>
                                <span>{opt}</span>
                                <button
                                    className={styles.button}
                                    style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                    onClick={() => selectOption(i)}
                                >
                                    Select
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {step === 'done' && (
                <section className={styles.section} style={{ marginTop: '2rem', borderColor: 'var(--accent-success)' }}>
                    <h3 style={{ color: 'var(--accent-success)' }}>✅ Final Itinerary Confirmed</h3>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <div><strong>Flight:</strong> Emirates EK123 (Held)</div>
                        <div><strong>Hotel:</strong> Marriott Dongdaemun</div>
                        <div><strong>Dinner:</strong> Born & Bred (Reserved - No Seafood)</div>
                        <div><strong>Distance to Office:</strong> 500m</div>
                        <div><strong>Meal Service:</strong> AVML Confirmed</div>
                    </div>
                    <button className={styles.button} style={{ marginTop: '1rem' }} onClick={() => setStep('input')}>
                        New Request
                    </button>
                </section>
            )}
        </div>
    );
}
