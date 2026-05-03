const legal = [
  { href: '#', label: 'Política de privacidad' },
  { href: '#', label: 'Tratamiento de datos' },
  { href: '/#contacto', label: 'Contacto' },
] as const

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-bold text-brand-900">+Ganancias</p>
            <p className="mt-1 text-sm text-slate-600">
              Diagnosticamos <span className="text-slate-300" aria-hidden>•</span>{' '}
              Planificamos <span className="text-slate-300" aria-hidden>•</span> Acompañamos
            </p>
            <p className="mt-3 max-w-md text-sm text-slate-600">
              Información clara para tomar mejores decisiones financieras.
            </p>
          </div>
          <ul className="flex flex-wrap gap-6" aria-label="Enlaces legales">
            {legal.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-slate-700 hover:text-emerald-700"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 border-t border-slate-200/80 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} +Ganancias. Colombia.
        </p>
      </div>
    </footer>
  )
}
