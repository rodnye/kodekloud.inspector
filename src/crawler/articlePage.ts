import { createPage } from '../core/browser';
import { locatorToMd } from '../utils/parse';

export const crawlArticlePage = async (url: string) => {
  const page = await createPage();
  //const result: string[] = [];

  await page.goto(url);
  const childs = page.locator('header+div article > div');
  return locatorToMd(childs.first());
  /*for (const locator of childs) {
    const tagName = await locator.evaluate((el) => el.nodeName);

    if (/^(H[1-6])$/.test(tagName)) {
    }
  }
  /**const turndown = new TurndownService({
    hr: '---',
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
  });
  turndown.addRule('parse-tips', {
    filter: (node) => node.nodeName === 'DIV' && node.childNodes[0]?.nodeName === 'svg',
    replacement: (content) =>
      '> [!important]' +
      content
        .trim()
        .split('\n')
        .reduce(
          (previous, line, i) => previous + '\n> ' + (i === 0 ? `**${line.trim()}**` : line.trim()),
          '',
        ),
  });
  return turndown.turndown(html);*/
  return '';
};
