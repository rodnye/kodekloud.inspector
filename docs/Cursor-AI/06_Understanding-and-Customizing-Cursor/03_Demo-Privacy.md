# Demo Privacy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cursor-AI/Understanding-and-Customizing-Cursor/Demo-Privacy)

---

## Table of Contents

- Demo Privacy
  - Privacy Mode Overview
  - Privacy Policy Details
  - Codebase Indexing
  - Custom Security Rules
  - Conclusion
  - Links and References
  - Watch Video
    - Additional Policy Notes

---

## Content

Cursor AI

Understanding and Customizing Cursor

# Demo Privacy

Secure your development workflow with Cursor AI’s Privacy Mode, data handling guarantees, and custom security rules. In this guide, you’ll learn how to:

- Configure and compare Privacy Mode settings
- Understand Cursor’s privacy policy and data flow
- Enable semantic codebase indexing securely
- Define and apply custom security rules

## Privacy Mode Overview

Cursor AI offers a **Privacy Mode** setting that controls whether your code and prompts are stored or discarded. By default, Cursor sends an `X-Ghost-Mode` header on every request to keep your usage anonymous.

| Privacy Mode | Behavior                        | Data Retention     |
| ------------ | ------------------------------- | ------------------ |
| Enabled      | No storage of prompts or code   | Zero retention     |
| Disabled     | Prompts and telemetry collected | Used to improve AI |

> [!important]
> **Warning**
>
> If you’re working with sensitive, proprietary, or regulated code, **always enable Privacy Mode** to prevent any data persistence.

![The image shows a code editor interface with a sidebar of files and a settings panel open, displaying options for VS Code import, appearance, and privacy mode. A terminal is visible at the bottom with a command prompt.](https://kodekloud.com/kk-media/image/upload/v1752872795/notes-assets/images/Cursor-AI-Demo-Privacy/code-editor-vs-code-settings-terminal.jpg)

## Privacy Policy Details

Cursor’s official [Privacy Policy](https://cursor.com/privacy) outlines strict rules when Privacy Mode is on:

- TLDR: **Zero data retention** of your code, prompts, or interactions
- Other notes: No third-party sharing or AI training on your private code

When Privacy Mode is off, Cursor collects:

- Prompts and code snippets
- Editor actions and code edits
- Inference-provider telemetry to speed up responses

![The image shows a webpage from Cursor's privacy policy section, detailing information about "Privacy Mode" and data handling practices. It includes sections labeled "TLDR" and "Other notes" with bullet points explaining data retention and processing.](https://kodekloud.com/kk-media/image/upload/v1752872796/notes-assets/images/Cursor-AI-Demo-Privacy/cursor-privacy-policy-privacy-mode.jpg)

### Additional Policy Notes

- All requests, even with your own API key, route through Cursor’s backend for prompt assembly.
- Cursor crafts final prompts and context before reaching [OpenAI’s API](https://platform.openai.com/docs/api-reference).
- If you index your codebase, Cursor uploads snippets temporarily to compute embeddings, then discards plaintext.

![The image shows a webpage displaying the privacy policy of a website called Cursor, with sections explaining data retention and privacy mode settings.](https://kodekloud.com/kk-media/image/upload/v1752872797/notes-assets/images/Cursor-AI-Demo-Privacy/cursor-privacy-policy-webpage.jpg)

> [!important]
> **Note**
>
> Embeddings and metadata may be cached briefly to optimize search performance but are not stored long-term in plaintext.

![The image shows a webpage from Cursor's security section, specifically detailing their "Privacy Mode Guarantee." The page includes a sidebar with various security-related topics and a main section explaining how privacy mode works and its importance.](https://kodekloud.com/kk-media/image/upload/v1752872798/notes-assets/images/Cursor-AI-Demo-Privacy/cursor-privacy-mode-guarantee.jpg)

## Codebase Indexing

Cursor supports **semantic indexing** of your repositories. By default, files in `.gitignore` or `cursor.ignore` are omitted. Indexing works as follows:

1.  **Secure Chunk Upload**: Code is uploaded in encrypted chunks for embedding computation.
2.  **Embedding Generation**: Uses Merkle tree structures and Turbopuffer for integrity.
3.  **Ephemeral Storage**: Plaintext is discarded immediately; only embeddings & metadata remain temporarily.

For full details, see the [Cursor Security Documentation](https://cursor.com/security).

![The image shows a webpage from Cursor's security section, detailing their codebase indexing feature. It explains how the feature works, including the use of a Merkle tree and Turbopuffer for secure code indexing and retrieval.](https://kodekloud.com/kk-media/image/upload/v1752872800/notes-assets/images/Cursor-AI-Demo-Privacy/cursor-security-codebase-indexing.jpg)

## Custom Security Rules

Guide Cursor’s AI to generate secure code by defining custom rules.

1.  Create `security-best-practices.md` in your Cursor rules folder:

    ```
    # Security Best Practices
    Applies to: JavaScript, TypeScript, JSX, TSX, Python, Ruby


    - Never use `eval` or similar dynamic execution methods.
    - Sanitize all user inputs before processing.
    - Use parameterized queries for database access.
    - Employ secure, up-to-date encryption algorithms.
    - Do not hardcode credentials or secrets.
    - Validate and encode outputs to prevent injection attacks.
    ```

    ![The image shows a code editor with a document titled "Security Best Practices," listing guidelines for secure coding, authentication, and API endpoints. The editor sidebar displays a file directory with various text and Python files.](https://kodekloud.com/kk-media/image/upload/v1752872801/notes-assets/images/Cursor-AI-Demo-Privacy/security-best-practices-code-editor.jpg)

2.  For framework-specific rules, add files like `react-security.md`:

    ```
    # React Security Rules
    Applies to: React (JSX, TSX)


    - Avoid `dangerouslySetInnerHTML` without sanitation.
    - Leverage React’s built-in XSS protections.
    - Validate component props to enforce data integrity.
    ```

    ![The image shows a code editor with a file open titled "react-security.mdc," containing a list of React security rules and best practices. The sidebar displays a directory structure with various files and folders.](https://kodekloud.com/kk-media/image/upload/v1752872802/notes-assets/images/Cursor-AI-Demo-Privacy/react-security-rules-code-editor.jpg)

These rule sets ensure Cursor’s code suggestions adhere to your organization’s security standards.

## Conclusion

Enabling Privacy Mode and configuring custom security rules in Cursor AI protects your code and enhances compliance—at no extra cost. Whether you’re prototyping or working in a high-security environment, these features keep your data private and your workflows seamless.

## Links and References

- [Cursor Privacy Policy](https://cursor.com/privacy)
- [Cursor Security Documentation](https://cursor.com/security)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cursor-ai/module/fcc10c1c-5240-4626-9bfc-bf172a3a00c6/lesson/e40ccb9d-d7e4-4821-bca6-d6d3556a203e)**
>
> Watch video content
