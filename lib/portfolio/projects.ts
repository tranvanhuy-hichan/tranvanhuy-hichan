import { loadPortfolioData } from './dataLoader';

/** Server-safe accessor for the localized project list. */
export function getAllProjects(locale: 'en' | 'vi' = 'en'): any[] {
  return loadPortfolioData()[locale].projects;
}
