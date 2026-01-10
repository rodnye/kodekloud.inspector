# Demo Compiling Rust to WASM using wasm pack - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Compiling-to-WebAssembly/Demo-Compiling-Rust-to-WASM-using-wasm-pack)

---

## Table of Contents

- Demo Compiling Rust to WASM using wasm pack
  - 1. Install Rust via Rustup
  - 2. Verify Rust Installation
  - 3. Install wasm-pack
  - 4. Create a New Rust Library Project
  - 5. Configure Cargo.toml for WebAssembly
  - 6. Write the Rust Code
  - 7. Build the WASM Package
  - 8. Inspect the Output
  - References
  - Watch Video
  - Practice Lab

---

## Content

Exploring WebAssembly (WASM)

Compiling to WebAssembly

# Demo Compiling Rust to WASM using wasm pack

In this tutorial, you’ll learn how to set up Rust, install `wasm-pack`, create a Rust library, and compile it into a WebAssembly module ready for the web. By the end, you’ll have a simple “Hello” function exposed to JavaScript.

## 1\. Install Rust via Rustup

Rustup is the official toolchain manager for Rust that keeps your compiler and package manager up to date.

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

During the interactive installer, select option 1 to proceed with the default installation. Once complete, reload your shell to enable Cargo and Rust in your `PATH`:

```
source "$HOME/.cargo/env"
```

> [!important]
> **Warning**
>
> Make sure you run the installer in a secure environment. The `curl | sh` pattern executes remote scripts directly, so verify the source URL before proceeding.

## 2\. Verify Rust Installation

After installation, confirm that `rustup`, `rustc`, and `cargo` are available:

| Tool   | Command            | Sample Output                        |
| ------ | ------------------ | ------------------------------------ |
| rustup | `rustup --version` | rustup 1.27.0 (abcdef123 2023-10-05) |
| rustc  | `rustc --version`  | rustc 1.74.0 (799716c9 2023-11-13)   |
| cargo  | `cargo --version`  | cargo 1.74.0 (799716c9 2023-11-13)   |

If any of these commands fail, revisit the installer instructions or consult the [Rust installation guide](https://www.rust-lang.org/tools/install).

## 3\. Install wasm-pack

`wasm-pack` streamlines building, testing, and publishing Rust-generated WebAssembly packages.

```
cargo install wasm-pack
```

Wait for compilation to finish; you should see:

```
Installed package `wasm-pack v0.12.1` (executable `wasm-pack`)
```

> [!important]
> **Note**
>
> Ensure that `~/.cargo/bin` is in your `PATH`. You can add this line to your shell profile (`.bashrc`, `.zshrc`, etc.):
>
> ```
> export PATH="$HOME/.cargo/bin:$PATH"
> ```

## 4\. Create a New Rust Library Project

Generate a new library named `wasm-project` and navigate into it:

```
cargo new --lib wasm-project
cd wasm-project
```

Your directory layout should look like this:

```
wasm-project/
├── Cargo.toml
└── src/
    └── lib.rs
```

## 5\. Configure Cargo.toml for WebAssembly

Edit `Cargo.toml` and add a `[lib]` section to target a WebAssembly system library:

```
[package]
name = "wasm-project"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

- `cdylib`: instructs Cargo to produce a `.wasm` system library.
- `wasm-bindgen`: facilitates seamless interaction between Rust and JavaScript.

## 6\. Write the Rust Code

Open `src/lib.rs` and implement a simple greeting function:

```
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn greet_works() {
        assert_eq!(greet("Alice"), "Hello, Alice!");
    }
}
```

- `#[wasm_bindgen]` exposes `greet` to JavaScript.
- The test module ensures your function behaves as expected.

## 7\. Build the WASM Package

Compile your project for the web target:

```
wasm-pack build --target web
```

This creates a `pkg/` directory with:

- `wasm_project_bg.wasm` — the compiled WebAssembly binary
- JavaScript **glue code** (`wasm_project.js`) to load and call your module
- `package.json` for easy NPM integration

## 8\. Inspect the Output

Open your project in an editor (e.g., VS Code). You should see:

```
wasm-project/
├── Cargo.toml
├── pkg/
│   ├── wasm_project_bg.wasm
│   ├── wasm_project.js
│   └── package.json
└── src/
    └── lib.rs
```

In the generated JavaScript, note the import:

```
import * as wasm from "./wasm_project_bg.wasm";
```

You’ve now successfully written Rust code and compiled it into a reusable WebAssembly module!

## References

- [Rust Installation Guide](https://www.rust-lang.org/tools/install)
- [wasm-pack Documentation](https://rustwasm.github.io/wasm-pack/)
- [wasm-bindgen Guide](https://rustwasm.github.io/wasm-bindgen/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/2589f119-decc-4dae-b626-5a5841b86220/lesson/53ad3dcf-df4b-45bb-b526-1173ab9e6fe0)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/2589f119-decc-4dae-b626-5a5841b86220/lesson/219793ae-f963-4fbd-9338-3978b4db55be)**
>
> Practice lab
