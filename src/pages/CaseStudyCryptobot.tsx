import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export function CaseStudyCryptobot() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const url = "https://exilonx.github.io/case-study/cryptobot";
    const title = "cryptobot — Case Study · Ionel Merca";
    const description =
      "Personal exploration of systematic crypto trading on Binance — orchestrated execution framework with 16 strategies, Redis-backed backtesting, and an honest read on the results.";

    const previousTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const previousDesc = descMeta?.getAttribute("content") ?? "";

    document.title = title;
    descMeta?.setAttribute("content", description);

    // Canonical link
    const canonical = document.createElement("link");
    canonical.id = "case-study-canonical";
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", url);
    document.head.appendChild(canonical);

    // TechArticle structured data
    const schema = document.createElement("script");
    schema.id = "case-study-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "cryptobot — orchestrated crypto-trading framework",
      alternativeHeadline:
        "An orchestrator pattern with 16 pluggable strategies, Redis-backed backtesting, and a research-grade honest read on results",
      description,
      author: { "@type": "Person", name: "Ionel Merca", url: "https://exilonx.github.io/" },
      publisher: { "@type": "Person", name: "Ionel Merca", url: "https://exilonx.github.io/" },
      datePublished: "2022-02-01",
      dateModified: "2026-04-24",
      mainEntityOfPage: url,
      inLanguage: "en",
      keywords: [
        "algorithmic trading",
        "crypto trading bot",
        "Binance",
        "orchestrator pattern",
        "backtesting",
        "MACD strategy",
        "SAR strategy",
        "Python trading framework",
        "Redis OHLCV",
        "strategy interface",
      ],
      codeRepository: "https://github.com/exilonX/cryptobot",
    });
    document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      if (descMeta) descMeta.setAttribute("content", previousDesc);
      document.getElementById("case-study-canonical")?.remove();
      document.getElementById("case-study-schema")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text">
      <Nav />

      <article className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        <a href="/" className="text-sm text-primary hover:underline">
          &larr; Back to portfolio
        </a>

        <header className="relative overflow-hidden rounded-2xl glass-card mt-8 mb-12">
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-30"
            style={{ background: "#22d3ee" }}
          />
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="absolute top-8 right-8 hidden md:block opacity-60 pointer-events-none">
            <CandleChartDeco />
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="section-label">Case Study &middot; 2021–2022</div>
            <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 leading-tight">
              cryptobot
            </h1>
            <p className="text-lg text-text-muted leading-relaxed max-w-2xl mb-8">
              An orchestrated crypto-trading framework on Binance, built as a sandbox for strategy ideas and architecture experiments. Not a commercial bot, not an attempt to print money &mdash; a research project about how to structure a system that trades, with real backtesting numbers behind every strategy.
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <HeroStat label="Duration" value="~4 months" />
              <HeroStat label="Commits" value="~78" />
              <HeroStat label="Strategies" value="16" />
              <HeroStat label="Backtest trades" value="2,000+" />
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <Meta label="Role" value="Solo &mdash; personal project, no collaborators" />
          <Meta label="Duration" value="Oct 2021 – Feb 2022 &middot; ~78 commits" />
          <Meta
            label="Status"
            value='Not production. Kept as a sandbox for strategy and architecture experimentation.'
          />
          <Meta
            label="Repository"
            value='<a href="https://github.com/exilonX/cryptobot" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">github.com/exilonX/cryptobot</a>'
          />
        </div>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">The brief</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Most crypto bots are one-file scripts &mdash; fetch candle, check indicator, place order. They work for a weekend and then fall apart the moment you want to try a second strategy, run a backtest, or survive a process restart without losing the current position.
          </p>
          <p className="text-text-muted leading-relaxed">
            I wanted to see what a slightly-more-serious version looked like: an execution framework decoupled from the strategies that feed it, a backtesting harness driven by real historical data, persistent state so a crash didn&rsquo;t cost me an open position, and enough instrumentation that I could quantify whether any of the strategies I was trying actually did anything. The trading results were a secondary outcome &mdash; the architecture was the point.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-6 mt-14">Architecture</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            The core is an <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">Orchestrator</code> that holds the runtime state and a reference to a pluggable <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">Strategy</code>. The orchestrator knows nothing about specific indicators &mdash; it only knows <em>when</em> to ask the strategy for a decision (on a closed candle, to consider entry) and <em>when</em> to ask if a trade should exit (on every price tick, against stop-loss / take-profit / trailing rules).
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            That separation keeps strategy code free of order-book mechanics, wallet state, and persistence concerns. A strategy is a subclass of <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">SuperStrategy</code> with four entry points: <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">check_entry</code>, <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">open_position</code>, <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">exit_limits</code>, and <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">check_exit</code>. Everything else &mdash; order placement, fee accounting, wallet updates, history tracking, Telegram notifications &mdash; lives in the orchestrator and the state layer.
          </p>
          <p className="text-text-muted leading-relaxed">
            The same orchestrator runs against a live Binance exchange or a <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">BacktestExchange</code> implementation that replays historical candles from Redis. Paper-trading mode sits in the middle. One code path, three execution modes.
          </p>

          <div className="mt-8">
            <OrchestratorDiagram />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">The strategy layer</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Sixteen strategy files, all inheriting from the same interface:
          </p>
          <div className="glass-card rounded-xl p-5 mb-4">
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-text-muted font-mono">
              <div>stupid_rsi_strategy</div>
              <div>macd_strategy</div>
              <div>macd_trail_strategy</div>
              <div>macd_win_strategy</div>
              <div>macd_adx_strategy</div>
              <div>macd_adx_fractal_strategy</div>
              <div>macd_sar_trail_strategy</div>
              <div>macd_fractal_exit_strategy</div>
              <div>macd_backed_volume_strategy</div>
              <div>only_sar_strategy</div>
              <div>sar_strategy</div>
              <div>sar_adx_strategy</div>
              <div>sar_atr_strategy</div>
              <div>sar_fractal_strategy</div>
              <div>spike_sar_strategy</div>
            </div>
          </div>
          <p className="text-text-muted leading-relaxed">
            Most of them are small variations on the same idea: combine an entry signal (MACD cross, RSI oversold, SAR flip, spike detection) with a different exit discipline (fixed TP/SL, trailing stop, Parabolic SAR, Fractal-based). The point wasn&rsquo;t to find the one true signal &mdash; it was to make swapping one in or out trivial, and to quantify how each variation actually behaved under the same historical window.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">Backtesting</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Historical OHLCV candles are pre-loaded into Redis per contract. The <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">BacktestExchange</code> implementation replays them one at a time, triggering the same orchestrator callbacks a live WebSocket would: candle close to check entry, price ticks to check exit. The wallet, the persistence layer, and the state machine don&rsquo;t know the difference.
          </p>
          <p className="text-text-muted leading-relaxed">
            At the end of each run the bot dumps a stats blob per strategy: total trades, profitable vs losing, win/loss ratio, average winner, average looser, max win, max loss, total fees, fees ratio, net profit, absolute net profit, average holding time. Thirteen measures per run. That&rsquo;s what made it possible to compare strategies objectively instead of cherry-picking chart screenshots.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">Actual backtest numbers</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Two strategies, same $1,000 starting balance, same historical window. The numbers are straight out of the repo&rsquo;s <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">README.md</code>:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <ResultCard
              name="Stupid RSI (baseline)"
              stats={[
                ["Total trades", "2,042"],
                ["Win rate", "29.8%"],
                ["Win / loss ratio", "0.42"],
                ["Net profit (after fees)", "$164.89"],
                ["Fees ratio", "4.82%"],
                ["Avg holding time", "~70 hours"],
              ]}
            />
            <ResultCard
              name="MACD Swing Low from Lows"
              stats={[
                ["Total trades", "246"],
                ["Win rate", "52.4%"],
                ["Win / loss ratio", "1.10"],
                ["Net profit (after fees)", "$450.05"],
                ["Fees ratio", "0.89%"],
                ["Avg holding time", "~1,089 hours"],
              ]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">Honest read on the numbers</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            The 45% net on the MACD-swing variant looks great until you read the fine print: 246 trades across four months is not a statistically meaningful sample, a single bull-market window is not a regime test, and the holding-time average sits in months &mdash; meaning most of that PnL is just being long crypto during an up-period. The baseline RSI strategy does something more honest: 2,042 trades, 4.8% fees ratio, and a 16% net that is almost entirely funded by the average winner being 3&times; the average loser, not by a higher win rate.
          </p>
          <p className="text-text-muted leading-relaxed">
            That&rsquo;s the actual lesson I took from the project. The edge these strategies &ldquo;found&rdquo; was thinner than the fee structure in every case once you controlled for regime. None of this is news &mdash; it&rsquo;s what anyone who has seriously backtested retail strategies concludes &mdash; but doing it yourself on your own framework with your own numbers is a different kind of knowing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">State and crash-recovery</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Running a multi-pair bot live means the process <em>will</em> die &mdash; network hiccup, exchange timeout, Binance rate-limit, server reboot. The wallet state, the open positions, and the stats history all live in a <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">PersistLayer</code> so that on restart the orchestrator can hydrate: load open positions, reattach them to the in-memory state, reload the wallet&rsquo;s running stats, and keep going without double-entering or forgetting a position it was already watching.
          </p>
          <p className="text-text-muted leading-relaxed">
            Max-coin exposure is enforced by the state (<code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">MAX_COINS</code>) before a strategy is even asked for an entry signal &mdash; you can&rsquo;t open a twenty-first position, no matter how bullish the indicator looks. Telegram notifications fire on fills, exits, wallet rollups, and uncaught exceptions via <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">knockknock</code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">Looking back</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Four years on, the architectural decisions still look right. Orchestrator / Strategy / State / Persistence is the separation I&rsquo;d reach for again. Redis-as-backtest-store is overkill for the data volume (a directory of parquet files would be simpler), and some of the strategy files duplicate more than they should &mdash; a cleaner base class with composable exit rules would have cut the file count in half.
          </p>
          <p className="text-text-muted leading-relaxed">
            What I&rsquo;d do differently now: treat fees and slippage as first-class in the backtester, test across regimes (not a single rising window), and resist the temptation to add the seventeenth strategy when the framework is already telling you the edge isn&rsquo;t there.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-text mb-4">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Python 3.8+",
              "python-binance",
              "Redis",
              "pytest",
              "pandas",
              "Telegram Bot API",
              "knockknock",
              "boto3",
            ].map((t) => (
              <span key={t} className="skill-badge">
                {t}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-16 pt-8 border-t border-border">
          <a href="/" className="text-sm text-primary hover:underline">
            &larr; Back to portfolio
          </a>
        </div>
      </article>

      <Footer />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-text-faint mb-1">{label}</div>
      <div className="text-sm text-text" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-text-faint mb-0.5">{label}</div>
      <div className="text-lg font-semibold text-text">{value}</div>
    </div>
  );
}

function OrchestratorDiagram() {
  const caption =
    "Runtime layout. Exchange events feed into the Orchestrator, which consults a pluggable Strategy for entry and exit decisions and mutates the State layer (wallet + open positions). Every mutation flows through the Persistence layer so a restart hydrates back to a consistent snapshot. The same orchestrator core runs against a live Binance feed or a Redis-backed BacktestExchange.";

  const exchange = "fill-[#dbeafe] stroke-[#3b82f6]";
  const exchangeText = "fill-[#1e3a8a]";
  const core = "fill-[#cffafe] stroke-[#06b6d4]";
  const coreText = "fill-[#164e63]";
  const strategy = "fill-[#ede9fe] stroke-[#8b5cf6]";
  const strategyText = "fill-[#4c1d95]";
  const state = "fill-[#fef3c7] stroke-[#f59e0b]";
  const stateText = "fill-[#78350f]";
  const persist = "fill-[#fce7f3] stroke-[#ec4899]";
  const persistText = "fill-[#831843]";
  const arrow = "#64748b";

  return (
    <figure className="glass-card rounded-xl overflow-hidden">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-labelledby="orchestrator-title"
          className="w-full h-auto min-w-[640px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="orchestrator-title">Runtime architecture: Exchange → Orchestrator → Strategy / State / Persistence</title>

          <defs>
            <marker id="co-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={arrow} />
            </marker>
          </defs>

          {/* Exchange sources (left column) */}
          <rect x="20" y="40" width="150" height="60" rx="4" className={exchange} strokeWidth="1.5" />
          <text x="95" y="67" textAnchor="middle" fontSize="13" fontWeight="600" className={exchangeText}>Live Binance</text>
          <text x="95" y="84" textAnchor="middle" fontSize="11" className={exchangeText}>WebSocket candles + ticks</text>

          <rect x="20" y="130" width="150" height="60" rx="4" className={exchange} strokeWidth="1.5" />
          <text x="95" y="157" textAnchor="middle" fontSize="13" fontWeight="600" className={exchangeText}>BacktestExchange</text>
          <text x="95" y="174" textAnchor="middle" fontSize="11" className={exchangeText}>Redis-backed replay</text>

          <rect x="20" y="220" width="150" height="60" rx="4" className={exchange} strokeWidth="1.5" />
          <text x="95" y="247" textAnchor="middle" fontSize="13" fontWeight="600" className={exchangeText}>PaperBinance</text>
          <text x="95" y="264" textAnchor="middle" fontSize="11" className={exchangeText}>Simulated fills, live feed</text>

          {/* Arrows from each exchange into Orchestrator */}
          <line x1="172" y1="70" x2="298" y2="140" stroke={arrow} strokeWidth="1.5" markerEnd="url(#co-arrow)" />
          <line x1="172" y1="160" x2="298" y2="160" stroke={arrow} strokeWidth="1.5" markerEnd="url(#co-arrow)" />
          <line x1="172" y1="250" x2="298" y2="180" stroke={arrow} strokeWidth="1.5" markerEnd="url(#co-arrow)" />

          {/* Orchestrator (middle) */}
          <rect x="300" y="130" width="160" height="60" rx="4" className={core} strokeWidth="2" />
          <text x="380" y="157" textAnchor="middle" fontSize="14" fontWeight="700" className={coreText}>Orchestrator</text>
          <text x="380" y="174" textAnchor="middle" fontSize="11" className={coreText}>find_new_trades · position_check</text>

          {/* Strategy (right-top) */}
          <rect x="560" y="40" width="180" height="60" rx="4" className={strategy} strokeWidth="1.5" />
          <text x="650" y="62" textAnchor="middle" fontSize="13" fontWeight="600" className={strategyText}>Strategy (pluggable)</text>
          <text x="650" y="79" textAnchor="middle" fontSize="10" className={strategyText}>check_entry · open_position</text>
          <text x="650" y="92" textAnchor="middle" fontSize="10" className={strategyText}>exit_limits · check_exit</text>

          {/* State (right-middle) */}
          <rect x="560" y="130" width="180" height="60" rx="4" className={state} strokeWidth="1.5" />
          <text x="650" y="152" textAnchor="middle" fontSize="13" fontWeight="600" className={stateText}>State</text>
          <text x="650" y="169" textAnchor="middle" fontSize="10" className={stateText}>wallet · open positions</text>
          <text x="650" y="182" textAnchor="middle" fontSize="10" className={stateText}>MAX_COINS guard</text>

          {/* Persistence (right-bottom) */}
          <rect x="560" y="220" width="180" height="60" rx="4" className={persist} strokeWidth="1.5" />
          <text x="650" y="247" textAnchor="middle" fontSize="13" fontWeight="600" className={persistText}>PersistLayer</text>
          <text x="650" y="264" textAnchor="middle" fontSize="11" className={persistText}>crash-recovery snapshots</text>

          {/* Two-way arrows from Orchestrator */}
          <line x1="462" y1="140" x2="558" y2="70" stroke={arrow} strokeWidth="1.5" markerEnd="url(#co-arrow)" markerStart="url(#co-arrow)" />
          <line x1="462" y1="160" x2="558" y2="160" stroke={arrow} strokeWidth="1.5" markerEnd="url(#co-arrow)" markerStart="url(#co-arrow)" />
          <line x1="462" y1="180" x2="558" y2="250" stroke={arrow} strokeWidth="1.5" markerEnd="url(#co-arrow)" markerStart="url(#co-arrow)" />

          {/* Column labels */}
          <text x="20" y="22" fontSize="10" fontWeight="700" fill="#94a3b8" letterSpacing="0.08em">EXCHANGE SOURCES</text>
          <text x="300" y="118" fontSize="10" fontWeight="700" fill="#94a3b8" letterSpacing="0.08em">CORE</text>
          <text x="560" y="22" fontSize="10" fontWeight="700" fill="#94a3b8" letterSpacing="0.08em">STRATEGY · STATE · PERSISTENCE</text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        {caption}
      </figcaption>
    </figure>
  );
}

function CandleChartDeco() {
  const up = "#10b981";
  const down = "#f43f5e";
  const line = "#22d3ee";

  const candles: { x: number; wickTop: number; wickBot: number; bodyTop: number; bodyBot: number; green: boolean }[] = [
    { x: 20, wickTop: 28, wickBot: 86, bodyTop: 38, bodyBot: 76, green: true },
    { x: 44, wickTop: 34, wickBot: 84, bodyTop: 52, bodyBot: 72, green: false },
    { x: 68, wickTop: 22, wickBot: 78, bodyTop: 30, bodyBot: 60, green: true },
    { x: 92, wickTop: 18, wickBot: 68, bodyTop: 24, bodyBot: 50, green: true },
    { x: 116, wickTop: 30, wickBot: 72, bodyTop: 36, bodyBot: 58, green: false },
    { x: 140, wickTop: 10, wickBot: 60, bodyTop: 14, bodyBot: 44, green: true },
    { x: 164, wickTop: 6, wickBot: 50, bodyTop: 10, bodyBot: 32, green: true },
    { x: 188, wickTop: 20, wickBot: 54, bodyTop: 28, bodyBot: 48, green: false },
  ];

  const macd = [14, 10, -4, -8, 6, 12, 16, -10];
  const macdBaseY = 128;

  return (
    <svg viewBox="0 0 220 160" width="220" height="160" xmlns="http://www.w3.org/2000/svg">
      {candles.map((c, i) => (
        <g key={i}>
          <line x1={c.x} y1={c.wickTop} x2={c.x} y2={c.wickBot} stroke={c.green ? up : down} strokeWidth="1" />
          <rect
            x={c.x - 5}
            y={c.bodyTop}
            width="10"
            height={c.bodyBot - c.bodyTop}
            fill={c.green ? up : down}
            rx="1"
          />
        </g>
      ))}

      <polyline
        fill="none"
        stroke={line}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
        points="20,64 44,58 68,44 92,34 116,38 140,26 164,18 188,30"
      />

      {macd.map((v, i) => (
        <rect
          key={i}
          x={candles[i].x - 5}
          y={v > 0 ? macdBaseY - v : macdBaseY}
          width="10"
          height={Math.abs(v)}
          fill={v > 0 ? up : down}
          opacity="0.7"
          rx="1"
        />
      ))}

      <line x1="10" y1={macdBaseY} x2="210" y2={macdBaseY} stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

function ResultCard({ name, stats }: { name: string; stats: [string, string][] }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">{name}</div>
      <dl className="space-y-2">
        {stats.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 text-sm">
            <dt className="text-text-faint">{k}</dt>
            <dd className="text-text font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

