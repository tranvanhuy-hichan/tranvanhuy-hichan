/**
 * The one place that knows the brand and the domains of this portfolio (and where the store lives).
 * Env (all optional, defaults are the current domains):
 *   NEXT_PUBLIC_ROOT_DOMAIN     root domain shared with the store, e.g. "htstudio.cloud"
 *   NEXT_PUBLIC_PORTFOLIO_URL   full URL of this portfolio, defaults to https://portfolio.<root>
 *   NEXT_PUBLIC_STORE_URL       full URL of the store, defaults to https://www.<root>
 */
export const BRAND = { name: 'HTStudio', owner: 'Trần Văn Huy', role: 'Software Developer @ HTStudio' } as const;

export const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'tranvanhuy.io.vn';
export const PORTFOLIO_URL = (process.env.NEXT_PUBLIC_PORTFOLIO_URL || `https://portfolio.${ROOT_DOMAIN}`).replace(/\/$/, '');
export const STORE_URL = (process.env.NEXT_PUBLIC_STORE_URL || `https://www.${ROOT_DOMAIN}`).replace(/\/$/, '');
export const PORTFOLIO_HOST = new URL(PORTFOLIO_URL).host;
