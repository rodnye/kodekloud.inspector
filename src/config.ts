import 'dotenv/config';
import path from 'node:path';

export const config = {
  executablePath: process.env.EXECUTABLE_PATH,
  baseUrl: process.env.BASE_URL || 'https://notes.kodekloud.com',
  headless: process.env.HEADLESS !== 'false',
  includeNavigation: process.env.INCLUDE_NAVIGATION === 'true' || true,
  outputDir: path.join(__dirname, '../output'),
  parallelBatches: process.env.PARALLEL_BATCHES ? parseInt(process.env.PARALLEL_BATCHES, 10) : 3,
  maxCourses: process.env.MAX_COURSES ? parseInt(process.env.MAX_COURSES, 10) : 0, // 0 means no limit
  forceDownload: process.env.FORCE_DOWNLOAD === 'true',
};
