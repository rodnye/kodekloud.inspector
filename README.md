# KodeKloud Inspector

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)

This tool scrapes course documentation from KodeKloud notes and converts HTML content into Markdown format. The generated Markdown files are organized in a structured directory hierarchy that mirrors the course navigation, making it easy to browse, search, and archive course materials offline.

Target website: https://notes.kodekloud.com/

## 📚 Extracted Course Documentation

All courses have been successfully scraped and are available in the `/docs` directory:

**[View Scraped Course Documentation](https://github.com/rodnye/kodekloud.inspector/tree/output/markdown/docs)**

> [!important]
> Scraping all courses can take a significant amount of time due to the extensive number of courses available. The tool processes pages sequentially within parallel batches, and depending on your configuration and network speed, the complete run may take from several minutes to hours. Use the `MAX_COURSES` setting to limit the number of courses for testing or partial runs.

## Installation

```bash
pnpm install
pnpm exec playwright install
```

## Configuration

Copy `.env.example` to `.env` and adjust the settings:

```bash
cp .env.example .env
```

Available options:

- `BASE_URL` - Target website URL
- `HEADLESS` - Run browser in headless mode
- `PARALLEL_BATCHES` - Number of concurrent batches
- `MAX_COURSES` - Limit number of courses to process (0 = no limit)
- `FORCE_DOWNLOAD` - Force re-download even if markdown file already exists (default: false)
- `EXECUTABLE_PATH` - Custom Chrome executable path

## Usage

Run the scraper:

```bash
pnpm scrape
```

Output is generated in the `output/` directory.

## GitHub Actions

Manual workflow dispatch available for publishing output to the `output/markdown` branch.

---

> [!warning]
> This project is for **educational purposes only**. It demonstrates:
>
> - Web scraping fundamentals
> - Github Actions automation
> - Browser automation with Playwright
>
> Always respect website terms of service and robots.txt files when scraping.

---

_Educational template for web scraping and TypeScript development :)_
