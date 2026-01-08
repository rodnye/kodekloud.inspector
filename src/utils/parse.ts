import { Locator } from 'playwright';
import { md } from './md-builder';

interface ParsedNode {
  tag: string | null;
  src?: string;
  href?: string;
  content: string | ParsedNode[];
}
export const locatorToMd = async (locator: Locator) => {
  /**
   * Extract the DOM structure of the locator
   */
  const node = await locator.evaluate((el) => {
    interface ParsedNode {
      tag: string | null;
      src?: string;
      href?: string;
      content: string | ParsedNode[];
    }
    const parse = (node: Node): ParsedNode => {
      console.log(node);
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        if (/(svg|hr)/.test(element.tagName.toLowerCase())) {
          // empty elements
          return { tag: element.tagName.toLowerCase(), content: '' };
        }
        if (element.tagName.toLowerCase() === 'img') {
          return {
            tag: 'img',
            src: element.getAttribute('src') || '',
            content: Array.from(element.childNodes).map(parse),
          };
        }
        if (element.tagName.toLowerCase() === 'a') {
          return {
            tag: 'a',
            href: element.getAttribute('href') || '',
            content: Array.from(element.childNodes).map(parse),
          };
        }
        return {
          tag: element.tagName.toLowerCase(),
          content: Array.from(element.childNodes).map(parse),
        };
      }
      return { tag: null, content: node.textContent || '' };
    };
    return parse(el);
  });

  /**
   * Recursively parse the DOM structure and convert it to markdown
   */
  const parse = ({ tag, content }: ParsedNode): string => {
    if (tag === null || typeof content === 'string') {
      return content as string;
    }

    if (tag === 'div' && content[0]?.tag === 'svg') {
      // is a tip block
      const contents = content[1]?.content;
      if (!Array.isArray(contents))
        throw new Error('Tip block missing content. Fatal error, this is not the correct syntax');

      return '> [!important]\n> ' + md.joinln(contents.map(parse)).replace('\n', '\n> ');
    }

    const parsedListItems = content.map(parse);

    if (tag === 'ul') {
      return md.unordered(parsedListItems);
    }
    if (tag === 'ol') {
      return md.ordered(parsedListItems);
    }

    const parsedContent = md.joinln(parsedListItems, '\n\n');

    if (/(p|code|span|div)/.test(tag)) {
      return parsedContent;
    }
    if (tag === 'pre') {
      return md.codeBlock(parsedContent);
    }
    if (tag === 'a') {
      return md.link(node.href!, parsedContent);
    }
    if (tag === 'br') {
      return '\n';
    }
    if (tag === 'hr') {
      return md.horizontalRule();
    }
    if (/^(h[1-6])$/.test(tag)) {
      return md.header(parsedContent, parseInt(tag[1]));
    }
    if (tag === 'img') {
      return `![${parsedContent}](${node.src!})`;
    }

    throw new Error(`Fatal. Unknown tag: ${tag}`);
  };

  return md.build([parse(node)]);
};
