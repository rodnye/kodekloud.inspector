import urlJoin from 'url-join';
import { config } from '../config';
import { scrapePageContent } from '../crawler/content';
import { NavigationItem } from '../types';
import { buildPageContentMarkdown } from './content';
import { writeFile, access } from 'fs/promises';
import path from 'path';
import { mkdirSync } from 'fs';
import { crawlPageContentNavigation } from '../crawler/page-navigation';
import { retryAndRetry } from '../utils/error';

const errors: Error[] = [];

export const getErrorsRegistryOfCourses = () => errors;

/**
 * Create directory based on url and scrap a course
 * - Write the course in output subfolder
 */
export const writeCourse = async (link: NavigationItem) => {
  const fullHref = urlJoin(config.baseUrl, link.href!);

  try {
    const navigation = await retryAndRetry(async () => await crawlPageContentNavigation(fullHref));

    // navigate for each navigation link
    const recursiveNavigation = async (
      items: NavigationItem[],
      parentPath = path.join(config.outputDir, 'docs'),
    ) => {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const currentIndex = (i + 1).toString().padStart(2, '0');
        try {
          if (item.href) {
            // is a page
            const baseFileName = item.href.split('/').pop()!;
            const enumeratedFileName = `${currentIndex}_${baseFileName}.md`;
            const filePath = path.join(parentPath, enumeratedFileName);

            // Check if file already exists
            if (!config.forceDownload) {
              try {
                await access(filePath);
                console.debug(`Skipping ${item.href} - already downloaded`);
                continue;
              } catch {
                // File doesn't exist, proceed with download
              }
            }

            const pageContent = await scrapePageContent(urlJoin(config.baseUrl, item.href));
            const markdown = await buildPageContentMarkdown(pageContent);

            await writeFile(filePath, markdown);
          } else if (item.children) {
            // is a folder
            const reference = item.children[0].href!;
            const baseFolderName = path.join(reference, '..').split('/').pop()!;
            const enumeratedFolderName = `${currentIndex}_${baseFolderName}`;
            const folderPath = path.join(parentPath, enumeratedFolderName);

            mkdirSync(folderPath, {
              recursive: true,
            });

            await recursiveNavigation(item.children, folderPath);
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          const errorWithUrl = new Error(
            `Failed to process ${item.href || 'unknown'}: ${errorMessage}`,
          );

          if (item.href) {
            errors.push(errorWithUrl);
          } else {
            errors.push(error as Error);
          }

          console.warn(errorWithUrl);
        }
      }
    };

    await recursiveNavigation(
      navigation!,
      path.join(config.outputDir, link.href!.split('/').slice(0, 3).join('/')),
    );
  } catch (error) {
    errors.push(error as Error);
    console.warn(error);
  }
};
