# Configuring TypeScript - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-TypeScript/Configuring-TypeScript)

---

## Table of Contents

- Configuring TypeScript
  - Overview of tsconfig.json
  - Demonstrating a Compiler Option Change
  - Explaining Include and Exclude Options
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

CDK for Terraform with TypeScript

Introduction to TypeScript

# Configuring TypeScript

In this guide, we explain how to configure TypeScript using the tsconfig.json file. Located at the root of your project, tsconfig.json controls the behavior of the TypeScript compiler by defining compiler options and specifying which files to include or exclude.

## Overview of tsconfig.json

A typical tsconfig.json file may look like this:

```
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules"]
}
```

The key sections include:

- **compilerOptions**:
  - **target** and **module**: Define the JavaScript version and module system.
  - **strict**: Enables stricter type-checking options.
  - **esModuleInterop**: Ensures compatibility with various module systems.
  - **skipLibCheck** and **forceConsistentCasingInFileNames**: Enhance build performance and maintain consistency.
  - **outDir**: Indicates where the compiled JavaScript files will be output.

- **include** and **exclude**:
  - _include_: Specifies that all TypeScript files (`"**/*.ts"`) should be compiled.
  - _exclude_: Prevents directories like node_modules from being processed.

Frameworks or starter projects typically provide a default tsconfig.json, and beginners are advised to use this preset configuration with minimal modifications.

## Demonstrating a Compiler Option Change

A useful addition to your tsconfig.json is the "noUnusedLocals" option, which reports errors for variables declared but never used. Enabling this option improves code cleanliness by ensuring that any unused code is flagged during compilation.

To enable "noUnusedLocals", update your tsconfig.json as follows:

```
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules"]
}
```

After enabling this rule, TypeScript will generate errors if there are unused variables or imports. For example, you might see error messages like this:

```
[ERROR] 18:37:55 x Unable to compile TypeScript: index.ts(13,1): error TS2552: Cannot find name 'e'. Did you mean 'exports'?
index.ts(13,9): error TS1005: ';' expected.
[INFO] 18:37:59 Restarting: /root/code/index.ts has been modified
Compilation error in /root/code/index.ts
[ERROR] 18:38:01 x Unable to compile TypeScript: index.ts(13,24): error TS1009: '=>' expected.
[INFO] 18:38:01 Restarting: /root/code/index.ts has been modified
Importing in TypeScript! 5
[INFO] 18:42:35 Reinitializing TS compilation
root in ~/code via ⬢ v20.17.0 on ⬢ (us-east-1) took 5s
```

Consider the following TypeScript file that demonstrates importing modules and exporting a main function:

```
// Export a main entry point from this file
console.log('Importing in TypeScript!', _.add(2, 3));


export const main = () => {
    console.log('Main running');
};
```

If there are unused variables or erroneous imports, you might encounter error messages similar to these:

```
TSError: × Unable to compile TypeScript: tsconfig.json(8,5): error TS1005: ';' expected.
    at createTSError (/root/code/node_modules/ts-node/src/index.ts:859:12)
    at reportTSError (/root/code/node_modules/ts-node/src/index.ts:863:19)
    ...
```

For example, defining an unused variable like this:

```
const foo = "bar";
```

will trigger errors:

```
TS Error: x Unable to compile TypeScript: tsconfig.json(8,5): error TS1005: ';' expected.
    at createTSError (/root/code/node_modules/ts-node/src/index.ts:859:12)
    at reportTSError (/root/code/node_modules/ts-node/src/index.ts:863:19)
    ...
```

> [!important]
> **Tip**
>
> To resolve unused variable errors, either remove the redundant code or disable the rule by omitting "noUnusedLocals" from your tsconfig.json.

Below is an example tsconfig.json without the "noUnusedLocals" setting:

```
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules"]
}
```

After updating your configuration, running your development server should result in successful compilation. For example, executing the command below might produce output similar to:

```
root in ~/code via ⬢ v20.17.0 on ☁️ us-east-1 took 15m24s
$ yarn dev
[INFO] 18:44:00 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.2, typescript ver. 5.5.4)
Importing in TypeScript…
```

## Explaining Include and Exclude Options

The include and exclude properties in tsconfig.json are essential for precise file compilation:

- The **include** property (`"**/*.ts"`) instructs TypeScript to process all TypeScript files.
- The **exclude** property ensures that directories such as node_modules, which contain third-party or pre-compiled code, are omitted from the compilation process.

This configuration uses glob patterns to target the relevant parts of your project, thereby optimizing the build process.

![The image shows key configuration options for including and excluding files or directories in a compilation, with examples like "src/**/*" for inclusion and "node_modules" for exclusion.](https://kodekloud.com/kk-media/image/upload/v1752869612/notes-assets/images/CDK-for-Terraform-with-TypeScript-Configuring-TypeScript/file-configuration-options-inclusion-exclusion.jpg)

## Conclusion

Understanding and modifying tsconfig.json allows you to tailor the TypeScript compiler to your project’s specific requirements—whether enforcing strict type checking or managing file inclusions. In the next section, we will explore best practices for managing TypeScript projects.

For further reading, check out these resources:

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/eb523de4-1aeb-429a-820a-20d9f6426562/lesson/1d0f071e-8b66-4975-a8da-87532b09740b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/eb523de4-1aeb-429a-820a-20d9f6426562/lesson/66100c46-f1e8-4786-88fa-b39b634c0396)**
>
> Practice lab
