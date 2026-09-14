import { getCollection } from 'astro:content';

interface Chunk {
  articleSlug: string;
  heading: string;
  content: string;
  order: number;
}

function chunkBySection(markdownBody: string): { heading: string; content: string }[] {
  const sections = markdownBody.split(/^##\s+/m); // split on H2
  return sections
    .filter(s => s.trim())
    .map(s => {
      const [heading, ...rest] = s.split('\n');
      return { heading: heading.trim(), content: rest.join('\n').trim() };
    });
}