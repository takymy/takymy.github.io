---
layout: post
title: "Neovim and why I love it"
date: 2026-03-01
---

## What is Neovim?

**Neovim** is a modern, terminal-based text editor that can be turned into a full-blown IDE. It has an insane amount of customization available through plugins, letting you configure it for basically anything — from LaTeX editing to creating a Coq formal verification workstation.

At its core, it is a fork of Vim.

To understand Neovim, you need to understand _Vi_ first. Vi was created in the 1970s. It was built for terminals. No mouse. No fancy UI. Just raw, keyboard-driven editing. Vim came later (“Vi Improved”), adding scripting, plugins, and better usability.

Neovim takes that foundation and modernizes it.

Large parts of Vim’s codebase were rewritten to make it cleaner and more maintainable. It introduced a proper built-in API. Plugin management became easier. The UI was separated from the core editor, meaning Neovim can run in terminals, GUI frontends, or even embedded environments.

To say it straight: it’s a modal text editor.

By modal, I mean your keyboard behaves differently depending on the mode. In normal mode, keys navigate and manipulate text. In insert mode, they type text. It sounds strange at first — and it feels even stranger when you try it.

Modern Neovim setups often evolve into fully personalized IDEs.

At first it feels weird, and you might ask: why even consider it over something like VSCode, JetBrains IDEs tailored to specific languages, or AI-assisted editors?

The answer is simple.

After some time, you stop thinking in characters and start thinking in structure.

You invent your own keymaps. You shape the editor around your workflow. You replace patterns with regex in seconds. You search entire projects with ripgrep. You split windows ten different ways. You view the same file from multiple positions at once.

Eventually, your setup feels like home. Not a product you installed — but a tool you built.

And that changes how you code.

## Why do programmers love it?

Because it optimizes for speed of thought.

You don’t reach for the mouse. You don’t context-switch. Your hands stay on the keyboard. Movements become muscle memory.

It’s closer to playing an instrument than using an app.

I’ve played electric guitar for five years, and the comparison isn’t dramatic. At some point, you stop thinking about finger placement and start thinking about expression. Neovim feels the same way once it clicks.

## The Philosophy of Neovim

Neovim assumes you’re willing to invest time into mastering your tools.

In return, it gives you leverage.

It’s not beginner-friendly.  
It’s not point-and-click.  
It’s not trying to be trendy.

It’s built for precision.

And that’s exactly why I chose it as the inspiration behind my portfolio website design.

## My Setup and Keymaps

**Leader Key:** `<Space>`

Over time I built a workflow that feels natural to me. These are the core bindings that shape how I move.

---

### Window Management

| Keybinding | Action                        |
| ---------- | ----------------------------- |
| `ss`       | Horizontal split (top/bottom) |
| `sv`       | Vertical split (side-by-side) |
| `sh`       | Move to left window           |
| `sj`       | Move to bottom window         |
| `sk`       | Move to top window            |
| `sl`       | Move to right window          |
| `<C-S-h>`  | Decrease window width         |
| `<C-S-l>`  | Increase window width         |
| `<C-S-k>`  | Increase window height        |
| `<C-S-j>`  | Decrease window height        |

---

### Tabs & Buffers

| Keybinding | Action              |
| ---------- | ------------------- |
| `te`       | Open new empty tab  |
| `tw`       | Close current tab   |
| `<Tab>`    | Next tab/buffer     |
| `<S-Tab>`  | Previous tab/buffer |

---

### Telescope (Fuzzy Finder)

| Keybinding | Action                                                    |
| ---------- | --------------------------------------------------------- |
| `;f`       | Find files (respects `.gitignore`, includes hidden files) |
| `;r`       | Live grep                                                 |
| `\\`       | List open buffers                                         |
| `;;`       | Resume last picker                                        |
| `;e`       | Diagnostics list                                          |
| `;s`       | Functions & variables (Treesitter)                        |
| `sf`       | File browser at current buffer path                       |

File browser (when active):

| Keybinding | Action                |
| ---------- | --------------------- |
| `N`        | Create file/directory |
| `h`        | Parent directory      |
| `<C-u>`    | Move up 10 items      |
| `<C-d>`    | Move down 10 items    |

---

### NvimTree

| Keybinding  | Action           |
| ----------- | ---------------- |
| `<leader>e` | Toggle file tree |

Inside NvimTree:

| Keybinding   | Action                       |
| ------------ | ---------------------------- |
| `l` / `<CR>` | Open file / expand directory |
| `t`          | Open in new tab              |
| `h`          | Close parent directory       |
| `H`          | Toggle hidden files          |
| `a`          | Create file/directory        |
| `d`          | Delete                       |
| `r`          | Rename                       |

---

### Diagnostics, Git & Tools

| Keybinding  | Action                    |
| ----------- | ------------------------- |
| `<C-j>`     | Next diagnostic           |
| `<C-k>`     | Previous diagnostic       |
| `;c`        | Open LazyGit              |
| `<leader>d` | Open Database UI (Dadbod) |

---

### Notes

- Netrw and default UI elements are disabled in favor of NvimTree and Telescope.
- Auto-formatting and linting run automatically via lazy.nvim extras (Prettier, ESLint, etc.).
