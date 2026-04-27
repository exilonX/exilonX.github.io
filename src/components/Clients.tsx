import { useApp } from '../context'
import { t } from '../i18n'
import { useFadeIn } from '../hooks/useFadeIn'

interface Client {
  name: string
  logo: string
  isPng?: boolean
  whiteBg?: boolean
  descEn: string
  descRo: string
}

interface PaymentProvider {
  name: string
  logo: string
  color: string
  invertOnDark?: boolean
}

const clients: Client[] = [
  {
    name: 'VTEX',
    logo: '/logos/vtex.png',
    isPng: true,
    descEn: 'Global E-commerce Platform',
    descRo: 'Platforma E-commerce Globala',
  },
  {
    name: 'OBI',
    logo: '/logos/obi.svg',
    descEn: 'European DIY Retail Chain',
    descRo: 'Retea Retail DIY Europeana',
  },
  {
    name: 'ROeID',
    logo: '/logos/roeid.png',
    whiteBg: true,
    descEn: 'Romanian National eID',
    descRo: 'eID National Romania',
  },
  {
    name: 'Inspectia Muncii',
    logo: '/logos/reges.svg',
    descEn: 'Romanian Labor Inspection',
    descRo: 'Inspectia Muncii Romania',
  },
  {
    name: 'OJP4Danube',
    logo: '',
    descEn: 'EU Cross-Border Transport',
    descRo: 'Transport Transfrontalier EU',
  },
]

const paymentProviders: PaymentProvider[] = [
  {
    name: 'Adyen',
    logo: '/logos/adyen.svg',
    color: '#0ABF53',
    invertOnDark: true,
  },
  {
    name: 'Stripe',
    logo: '/logos/stripe.svg',
    color: '#635BFF',
    invertOnDark: true,
  },
  { name: 'PayU', logo: '/logos/payu.svg', color: '#A6C307' },
  { name: 'Checkout.com', logo: '/logos/checkoutcom.svg', color: '#00D957' },
  { name: 'Netopia', logo: '/logos/netopia.svg', color: '#1E88E5' },
  { name: 'Oney', logo: '/logos/oney.svg', color: '#FF6900' },
  { name: 'Przelewy24', logo: '/logos/p24.svg', color: '#D13239' },
  { name: 'Mokka', logo: '/logos/mokka.svg', color: '#8B5CF6' },
  { name: 'TBI Bank', logo: '/logos/tbi.svg', color: '#0EA5E9' },
  { name: 'ING', logo: '/logos/ing.svg', color: '#FF6200' },
]

// Custom Danube SVG since no external logo
function DanubeLogo() {
  return (
    <svg viewBox="0 0 80 40" width="64" height="32" fill="none">
      <path
        d="M4 28c6-4 12 4 20 0s14-6 22-2 14 4 20-2"
        stroke="#FBBF24"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M4 20c6-4 12 4 20 0s14-6 22-2 14 4 20-2"
        stroke="#FBBF24"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="18" cy="10" r="2" fill="#FBBF24" />
      <circle cx="30" cy="7" r="2" fill="#FBBF24" />
      <circle cx="44" cy="9" r="2" fill="#FBBF24" />
      <circle cx="58" cy="6" r="2" fill="#FBBF24" />
    </svg>
  )
}

export function Clients() {
  const { lang } = useApp()
  const tr = t(lang)
  const ref = useFadeIn<HTMLElement>()

  return (
    <section className="py-24 px-6 fade-in" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="section-label">{tr.clients.label}</div>
        <h2 className="text-3xl md:text-5xl font-bold text-text mb-2">
          {tr.clients.title}
        </h2>
        <p className="text-text-muted mb-12">{tr.clients.subtitle}</p>

        {/* Client cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {clients.map((client) => (
            <div
              key={client.name}
              className="glass-card rounded-xl p-5 flex flex-col items-center justify-center text-center gap-4 min-h-[150px]"
            >
              <div
                className={`h-12 flex items-center justify-center ${client.whiteBg ? 'bg-white rounded-md px-3 py-1' : ''}`}
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className={`max-h-10 max-w-[120px] object-contain ${client.isPng ? '' : 'dark:brightness-100'}`}
                  />
                ) : (
                  <DanubeLogo />
                )}
              </div>
              <div>
                <div className="font-semibold text-sm text-text">
                  {client.name}
                </div>
                <div className="text-xs text-text-faint mt-0.5">
                  {lang === 'en' ? client.descEn : client.descRo}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment providers with real logos */}
        <div className="glass-card rounded-xl p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-accent mb-5">
            {tr.clients.paymentProviders}
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {paymentProviders.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-center h-14 px-3 rounded-lg bg-bg-muted border border-border hover:border-primary/50 transition-all hover:scale-105 cursor-default group"
                title={p.name}
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className={`max-h-8 max-w-full object-contain ${p.invertOnDark ? 'dark:invert dark:brightness-100' : ''}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
