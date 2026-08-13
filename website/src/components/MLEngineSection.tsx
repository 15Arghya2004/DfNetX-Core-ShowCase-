const STATS = [
  { n: '26', label: 'engineered features' },
  { n: '0–100', label: 'online risk score range' },
  { n: 'top-3', label: 'shap-like explainability' },
  { n: '7/7', label: 'ml unit tests passing' },
]

const MODELS = [
  {
    name: 'Risk Scorer',
    algo: 'Online Ridge SGD Regression',
    out: '0–100 risk score',
  },
  {
    name: 'Threat Classifier',
    algo: 'Online Logistic SGD Multiclass',
    out: 'Threat category label',
  },
  {
    name: 'Anomaly Detector',
    algo: 'Streaming statistical detector',
    out: 'Anomaly score',
  },
  {
    name: 'Attack Predictor',
    algo: 'Markov chain transition model',
    out: 'Next kill-chain stage',
  },
]

const LIFECYCLE = [
  'Model bootstrapped at v1.0.0 on first startup',
  'Live events scored in real time and returned with explainability',
  'Analyst closes an incident, submitting a labelled sample',
  'Background worker applies an SGD weight update',
  'Candidate is validated against the last 200 samples',
  'Accuracy improves: promote and checkpoint. Drops: roll back',
]

export default function MLEngineSection() {
  return (
    <section id="ml-engine" className="relative w-full bg-black border-t border-white/10 px-6 md:px-10 lg:px-20 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <span className="text-xs md:text-sm tracking-widest uppercase text-white/50">machine learning</span>
        <h2 className="section-title mt-3 text-white font-medium text-3xl md:text-5xl max-w-2xl">
          Models that learn from every closed incident
        </h2>
        <p className="mt-5 max-w-xl text-[15px] md:text-base leading-relaxed text-white/70">
          An embedded MLOps pipeline with online Stochastic Gradient Descent — no batch jobs, no
          data lake, no external MLflow server. Every alert is scored in real time and every
          resolved incident retrains the model on the spot.
        </p>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {STATS.map((s) => (
            <div key={s.label}>
              <span className="text-3xl md:text-5xl font-medium tracking-tight text-white">{s.n}</span>
              <div className="mt-1 text-xs md:text-sm text-white/60">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
          {MODELS.map((m) => (
            <div key={m.name} className="rounded-2xl bg-neutral-950 p-6 md:p-8">
              <h4 className="text-white text-base md:text-lg font-medium">{m.name}</h4>
              <p className="mt-2 text-[13px] md:text-[14px] leading-relaxed text-white/60">{m.algo}</p>
              <p className="mt-4 text-[12px] md:text-[13px] text-white/40 uppercase tracking-wide">{m.out}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-white text-lg md:text-xl font-medium">MLOps lifecycle</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-6 gap-3 sm:gap-4">
            {LIFECYCLE.map((step, i) => (
              <div key={step} className="rounded-2xl bg-neutral-950 p-5 md:p-6">
                <span className="text-white/40 text-xs font-medium tracking-tight">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-2 text-[12px] md:text-[13px] leading-relaxed text-white/60">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
