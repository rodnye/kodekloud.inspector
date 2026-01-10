# Implement and manage secrets in GitHub Actions and Azure Pipelines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-a-Strategy-for-Managing-Sensitive-Information-in-Automation/Implement-and-manage-secrets-in-GitHub-Actions-and-Azure-Pipelines)

---

## Table of Contents

- Implement and manage secrets in GitHub Actions and Azure Pipelines
  - Secrets Management Comparison
  - Managing Secrets in GitHub Actions
  - Managing Secrets in Azure Pipelines
  - Using Azure Key Vault for Secret Management
  - CI/CD Secrets Management Best Practices
  - Common Pitfalls in Secrets Management
  - References
  - Watch Video
    - GitHub Actions Best Practices
    - Azure Pipelines Best Practices
    - Prerequisites for Azure Key Vault Integration
    - Principle of Least Privilege
    - Regular Secret Rotation
    - Monitoring and Auditing

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement a Strategy for Managing Sensitive Information in Automation

# Implement and manage secrets in GitHub Actions and Azure Pipelines

Secrets—like API keys, passwords, and tokens—are critical for accessing protected resources in your CI/CD pipelines. Mishandling these credentials can expose your infrastructure to unauthorized access and data breaches. This article covers secure storage, access, and best practices for secrets in GitHub Actions and Azure Pipelines, plus integration with Azure Key Vault.

![The image illustrates the risks of improperly managed secrets, highlighting potential security vulnerabilities with icons like a broken shield, bug, and error message. It emphasizes using secure methods to store and handle secrets to maintain system integrity.](https://kodekloud.com/kk-media/image/upload/v1752867938/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-and-manage-secrets-in-GitHub-Actions-and-Azure-Pipelines/risks-of-improperly-managed-secrets.jpg)

Both GitHub Actions and Azure Pipelines provide built-in secret management to keep sensitive data out of your code and logs.

![The image is an overview diagram showing GitHub Actions and Azure Pipelines, highlighting their role in enabling automation of software development workflows.](https://kodekloud.com/kk-media/image/upload/v1752867939/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-and-manage-secrets-in-GitHub-Actions-and-Azure-Pipelines/github-actions-azure-pipelines-overview.jpg)

## Secrets Management Comparison

| Feature                    | GitHub Actions                             | Azure Pipelines                       |
| -------------------------- | ------------------------------------------ | ------------------------------------- |
| Storage Location           | Repository > Settings > Secrets            | Pipeline Variables (Secret-enabled)   |
| Syntax in Workflow         | `${{ secrets.SECRET_NAME }}`               | `$(VARIABLE_NAME)`                    |
| Integration with Key Vault | Via Actions (e.g., azure/keyvault-secrets) | `UseKeyVault@1` task                  |
| Secret Rotation            | Manual/API                                 | Manual/API or automated via Key Vault |

## Managing Secrets in GitHub Actions

Store secrets in your repo settings:

1.  Go to **Settings** > **Secrets** > **Actions** in your repository.
2.  Click **New repository secret**.
3.  Enter a descriptive name and the secret value.
4.  Save.

![The image provides instructions for setting up secrets in GitHub Actions, showing a navigation path in the GitHub settings menu.](https://kodekloud.com/kk-media/image/upload/v1752867940/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-and-manage-secrets-in-GitHub-Actions-and-Azure-Pipelines/github-actions-secrets-setup-instructions.jpg)

Access secrets in workflows:

> [!important]
> **Warning**
>
> Never print secrets in plain text. Always reference them using `${{ secrets.NAME }}` to keep them masked in logs.

![The image is a guide on setting up secrets in GitHub Actions, showing a prompt to click on "New repository secret" in a repository with no secrets.](https://kodekloud.com/kk-media/image/upload/v1752867940/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-and-manage-secrets-in-GitHub-Actions-and-Azure-Pipelines/github-actions-setup-secrets-guide.jpg)

```
# .github/workflows/deploy.yml
name: Deploy Application


on:
  push:
    branches: [ main ]


jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      API_KEY: ${{ secrets.API_KEY }}    # Secure reference
    steps:
      - name: Checkout code
        uses: actions/checkout@v2


      - name: Call API
        run: |
          curl -H "Authorization: Bearer $API_KEY" https://api.example.com
```

### GitHub Actions Best Practices

- Use clear, descriptive names (e.g., `DB_CONN_STRING`).
- Rotate secrets regularly to reduce risk.
- Restrict secrets to the least-privileged repos and workflows.
- Avoid hard-coding secrets—always reference the secure store.

![The image provides best practices for GitHub Actions, emphasizing using meaningful names for secrets and regularly rotating them to minimize exposure risk. It includes visual elements like a title graphic and a chart icon.](https://kodekloud.com/kk-media/image/upload/v1752867942/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-and-manage-secrets-in-GitHub-Actions-and-Azure-Pipelines/github-actions-best-practices-secrets.jpg)

![The image provides best practices for GitHub Actions, advising to limit the scope of secrets and avoid hard-coding them, using GitHub's secure storage instead. It includes illustrative icons and is copyrighted by KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752867944/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-and-manage-secrets-in-GitHub-Actions-and-Azure-Pipelines/github-actions-best-practices-secrets-2.jpg)

## Managing Secrets in Azure Pipelines

In Azure Pipelines, mark variables as secret:

1.  Open your pipeline in Azure DevOps.
2.  Select **Variables** > **Pipeline Variables**.
3.  Click **Add**, name your variable, enable **Keep this value secret**, and set its value.
4.  Save the pipeline.

![The image provides instructions for setting up secrets in Azure Pipelines, showing navigation to pipeline variables and the option to add a new variable.](https://kodekloud.com/kk-media/image/upload/v1752867944/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-and-manage-secrets-in-GitHub-Actions-and-Azure-Pipelines/azure-pipelines-secrets-setup-instructions.jpg)

Use secrets in scripts:

```
# azure-pipelines.yml
steps:
  - script: |
      echo "Calling API with key $(API_KEY)"
    displayName: "Use Secret Variable"
```

### Azure Pipelines Best Practices

- Integrate with Azure Key Vault for higher security.
- Grant variable access only to necessary pipelines or stages.
- Audit and rotate secrets on schedule.
- Use environment-specific variables to isolate credentials.

## Using Azure Key Vault for Secret Management

Azure Key Vault centralizes storage for secrets, keys, and certificates, offering:

- Fine-grained access control (RBAC and policies).
- Audit logging of all secret operations.
- Automated secret rotation and versioning.
- Secure retrieval via REST API or SDKs.

Platforms like GitHub Actions and Azure Pipelines can fetch secrets at runtime without exposing them in code.

![The image illustrates the integration of GitHub Actions and Azure Pipelines, highlighting the retrieval of secrets during workflow or pipeline execution.](https://kodekloud.com/kk-media/image/upload/v1752867945/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-and-manage-secrets-in-GitHub-Actions-and-Azure-Pipelines/github-actions-azure-pipelines-secrets-integration.jpg)

### Prerequisites for Azure Key Vault Integration

1.  Active Azure subscription.
2.  Existing Key Vault with stored secrets.
3.  Service Principal (SP) with `Key Vault Secrets User` role.
4.  SP credentials saved as GitHub secrets or Azure DevOps service connection.

![The image outlines four prerequisites for retrieving secrets from Azure Key Vault in Azure Pipelines: creating a Key Vault, adding secrets, configuring a service principal, and adding credentials to service connections.](https://kodekloud.com/kk-media/image/upload/v1752867946/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-and-manage-secrets-in-GitHub-Actions-and-Azure-Pipelines/azure-key-vault-secrets-prerequisites.jpg)

## CI/CD Secrets Management Best Practices

### Principle of Least Privilege

Only grant users and services the minimum permissions needed. In Azure Pipelines, use the `UseKeyVault@1` task:

```
# azure-pipelines.yml
trigger:
  branches:
    include: [ main ]


pool:
  vmImage: ubuntu-latest


variables:
  - group: KeyVaultSecrets


steps:
  - task: UseKeyVault@1
    inputs:
      azureSubscription: 'your-service-connection'
      KeyVaultName: 'your-keyvault-name'
      SecretsFilter: 'MY_SECRET'
      RunAsPreJob: true


  - script: echo "Secret Value: $(MY_SECRET)"
    displayName: 'Retrieve and Display Secret'
```

### Regular Secret Rotation

- Schedule periodic rotations to limit exposure.
- Automate rotation workflows using Key Vault features or custom scripts.

### Monitoring and Auditing

- Enable logging for every secret access attempt.
- Set up alerts for unauthorized access or policy breaches.
- Review audit logs regularly to ensure compliance.

![The image outlines best practices for managing secrets, including the principle of least privilege, regular secret rotation, and monitoring and auditing. Each section provides brief guidelines on how to implement these practices effectively.](https://kodekloud.com/kk-media/image/upload/v1752867947/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-and-manage-secrets-in-GitHub-Actions-and-Azure-Pipelines/best-practices-managing-secrets-guidelines.jpg)

## Common Pitfalls in Secrets Management

- Hard-coding secrets in repositories.
- Sharing secrets via unencrypted channels (email, chat).
- Skipping documentation for rotation and revocation procedures.

Avoid these issues by centralizing secrets in GitHub Secrets, Azure Key Vault, or similar vault services, and maintain clear, versioned documentation.

![The image outlines common pitfalls in secrets management, including hard-coding secrets in code, sharing secrets through insecure channels, and lack of documentation, with suggestions to avoid each issue.](https://kodekloud.com/kk-media/image/upload/v1752867948/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-and-manage-secrets-in-GitHub-Actions-and-Azure-Pipelines/secrets-management-pitfalls-and-solutions.jpg)

## References

- [GitHub Actions: Encrypting secrets](https://docs.github.com/actions/security-guides/encrypted-secrets)
- [Azure Pipelines: Variables](https://docs.microsoft.com/azure/devops/pipelines/process/variables)
- [Azure Key Vault Documentation](https://docs.microsoft.com/azure/key-vault/)
- [Azure DevOps: Service connections](https://docs.microsoft.com/azure/devops/pipelines/library/service-endpoints)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/2f8974b7-9aa9-46b8-a562-d7ed568269af/lesson/e7ae2ff7-6486-4b98-8500-46471399a8bb)**
>
> Watch video content
