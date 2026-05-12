import { PageContent, NavigationItem } from '../types';
import { md } from '../utils/md-builder';
import { parseHtmlToMarkdown } from '../utils/parser';

const buildNavigationMarkdown = (items: NavigationItem[], baseUrl: string, level = 0): string[] => {
  const lines: string[] = [];
  const indent = '  '.repeat(level);

  items.forEach((item) => {
    if (item.href) {
      const fullUrl = item.href.startsWith('http')
        ? item.href
        : new URL(item.href, baseUrl).toString();
      lines.push(`${indent}- ${md.link(item.text, fullUrl)}`);
    } else {
      lines.push(`${indent}- **${item.text}**`);
    }

    if (item.children && item.children.length > 0) {
      lines.push(...buildNavigationMarkdown(item.children, baseUrl, level + 1));
    }
  });

  return lines;
};

export const buildPageContentMarkdown = async (pageContent: PageContent): Promise<string> => {
  const sections: string[] = [];

  // Title
  sections.push(md.header(pageContent.title, 1));

  // URL
  sections.push(md.link('Source URL', pageContent.url));
  sections.push(md.horizontalRule());

  // Headings structure
  if (pageContent.headings.length > 0) {
    sections.push(md.header('Table of Contents', 2));
    const tocItems = pageContent.headings.map((h) => {
      const indent = '  '.repeat(Math.max(0, h.level - 1));
      return `${indent}- ${h.text}`;
    });
    sections.push(tocItems.join('\n'));
    sections.push(md.horizontalRule());
  }

  // Main content
  sections.push(md.header('Content', 2));

  sections.push(parseHtmlToMarkdown(pageContent.htmlContent));

  return md.build(sections);
};
