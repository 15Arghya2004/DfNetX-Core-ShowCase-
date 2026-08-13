const PIPELINE = [
  {
    n: '01',
    title: 'Ingestion',
    desc: 'Suricata, Wazuh, Sysmon, Zeek, and generic SIEM collectors post raw telemetry into a unified HTTP ingest, normalised into a typed CanonicalEvent schema.',
  },
  {
    n: '02',
    title: 'Detection',
    desc: 'Signature rules, behavioural baselines, and streaming anomaly scoring evaluate every event while the ML engine scores it in parallel.',
  },
  {
    n: '03',
    title: 'Correlation',
    desc: 'Alerts sharing a source IP, host, user, or hash within a 5-minute sliding window are promoted into a single correlated incident.',
  },
  {
    n: '04',
    title: 'Prediction',
    desc: 'A 14-stage MITRE ATT&CK kill-chain Markov model forecasts the attacker’s next move and an overall compromise probability.',
  },
  {
    n: '05',
    title: 'Investigation',
    desc: 'GPT-4o or Gemini 1.5 Flash generate a threat narrative, attack timeline, and remediation report for every correlated incident.',
  },
  {
    n: '06',
    title: 'Response',
    desc: 'A 4-worker SOAR queue executes block_ip, isolate_host, and notify_analyst playbooks, with every action written to an audit trail.',
  },
]

const CORE_FEATURES = [
  {
    title: 'Canonical normalisation',
    desc: 'A plugin-based normaliser maps every source to a typed CanonicalEvent schema with validation and a dead-letter queue for rejects.',
  },
  {
    title: 'MITRE ATT&CK mapping',
    desc: 'Every alert is automatically annotated end to end — technique ID, tactic, and kill-chain stage.',
  },
  {
    title: 'Rule hot reload',
    desc: 'A watchdog filesystem watcher applies detection rule changes with zero downtime.',
  },
  {
    title: 'Attack chain correlation',
    desc: 'Multi-source alert correlation across a 5-minute sliding window, keyed on IP, host, user, and hash.',
  },
  {
    title: 'IOC repository',
    desc: 'A live IP, domain, and hash IOC database with real-time enrichment lookups from AbuseIPDB, VirusTotal, and Shodan.',
  },
  {
    title: 'Crisis mode',
    desc: 'An elevated detection sensitivity mode operators can trigger during active incident response.',
  },
]

const STACK = [
  'FastAPI + Uvicorn',
  'Docker Compose',
  'Suricata IDS',
  'Wazuh 4.7.5',
  'SQLite (WAL)',
  'WebSocket /ws/live',
]

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="relative w-full bg-black border-t border-white/10 px-6 md:px-10 lg:px-20 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <span className="text-xs md:text-sm tracking-widest uppercase text-white/50">architecture</span>
        <h2 className="section-title mt-3 text-white font-medium text-3xl md:text-5xl max-w-2xl">
          One engine, six real-time pipelines
        </h2>
        <p className="mt-5 max-w-xl text-[15px] md:text-base leading-relaxed text-white/70">
          DfNetX runs as an event-driven microservice mesh orchestrated by Docker Compose. Core
          intelligence lives in a single FastAPI process, where concurrent background threads
          communicate over an internal SQLite pub/sub bus — no external broker required.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {PIPELINE.map((step) => (
            <div key={step.n} className="bg-neutral-950 p-6 md:p-8">
              <span className="text-white/40 text-sm font-medium tracking-tight">{step.n}</span>
              <h3 className="mt-3 text-white text-lg md:text-xl font-medium">{step.title}</h3>
              <p className="mt-2 text-[13px] md:text-[14px] leading-relaxed text-white/60">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {CORE_FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl bg-neutral-950 p-6 md:p-8">
              <h4 className="text-white text-base md:text-lg font-medium">{f.title}</h4>
              <p className="mt-2 text-[13px] md:text-[14px] leading-relaxed text-white/60">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-2">
          {STACK.map((item) => (
            <span
              key={item}
              className="bg-neutral-900/90 backdrop-blur rounded-full px-4 py-2 text-xs md:text-sm text-neutral-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
