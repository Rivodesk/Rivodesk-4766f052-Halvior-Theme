import Link from 'next/link';

interface FooterProps {
  shopName: string;
}

export function Footer({ shopName }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-0 border-t"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
    >
      <div
        className="mx-auto px-6 lg:px-16 py-16"
        style={{ maxWidth: 'var(--container-max)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <p
              className="text-base font-medium tracking-[0.2em] uppercase mb-3"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
            >
              {shopName}
            </p>
            <p
              className="text-[13px] font-extralight"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Built to outlast.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p
              className="text-[10px] font-normal uppercase tracking-[0.2em] mb-5"
              style={{ color: 'var(--color-text)' }}
            >
              Shop
            </p>
            <ul className="space-y-3">
              {[
                { href: '/products', label: 'Alle producten' },
                { href: '/products', label: 'Essentials' },
                { href: '/products', label: 'Nieuwe drops' },
              ].map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-extralight transition-opacity hover:opacity-70"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p
              className="text-[10px] font-normal uppercase tracking-[0.2em] mb-5"
              style={{ color: 'var(--color-text)' }}
            >
              Info
            </p>
            <ul className="space-y-3">
              {[
                { href: '/orders', label: 'Bestelling volgen' },
                { href: '/checkout', label: 'Afrekenen' },
                { href: '/returns', label: 'Retourneren' },
              ].map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-extralight transition-opacity hover:opacity-70"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p
              className="text-[10px] font-normal uppercase tracking-[0.2em] mb-5"
              style={{ color: 'var(--color-text)' }}
            >
              Connect
            </p>
            <ul className="space-y-3">
              {[
                { href: 'https://instagram.com', label: 'Instagram' },
                { href: 'mailto:hello@halvior.com', label: 'Contact' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-extralight transition-opacity hover:opacity-70"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <span
            className="text-[9px] font-normal uppercase tracking-[0.15em]"
            style={{ color: 'var(--color-text-subtle)' }}
          >
            &copy; {year} {shopName}. Alle rechten voorbehouden.
          </span>
          <span
            className="text-[9px] font-normal uppercase tracking-[0.15em]"
            style={{ color: 'var(--color-text-subtle)' }}
          >
            Privacy &nbsp;&nbsp; Voorwaarden &nbsp;&nbsp; Cookies
          </span>
        </div>
      </div>
    </footer>
  );
}
