import BenefitsSection from './components/BenefitsSection'

const REPO_URL = 'https://github.com/15Arghya2004/DfNetX-Core-ShowCase-'

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center">
      <div className="w-full max-w-[1400px]">
        <header className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-6 sm:py-8">
          <span className="text-white text-lg sm:text-xl font-light" style={{ letterSpacing: '-0.02em' }}>
            DNetX <span className="text-white/50">[V10]</span>
          </span>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 text-sm sm:text-base font-light border border-white/20 rounded-full px-4 py-2 hover:text-white hover:border-white/40 transition-colors"
          >
            View on GitHub
          </a>
        </header>

        <BenefitsSection />
      </div>
    </div>
  )
}
