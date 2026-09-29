import { SITE_TITLE } from '../consts';

export const pageLabels: Record<string, string> = {
	'/': SITE_TITLE,
	'/home': SITE_TITLE,
	'/family-corner': `Family`,
	'/patient-space': `Patient`,
	'/researcher-hub': `Researcher`,
};

export function getPageLabel(path: string): string {
	return pageLabels[path] ?? SITE_TITLE;
}