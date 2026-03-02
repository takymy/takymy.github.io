# Mykyta Chursin | Portfolio

I built this portfolio using **Jekyll** (an ultra-minimal static site generator). No heavy Javascript frameworks, just raw HTML/CSS wrapped in YAML data objects.

## Folder Structure

- `_data/`: Contains all of my text configuration in YAML lists. If I want to add/edit my skills, experience, projects, or achievements. The website will automatically update.
- `_posts/`: All my blog posts in markdown format.
- `_includes/` & `_layouts/`: The modular HTML structure of the website.
- `assets/css/main.css`: The central CSS stylesheet dictating the brutalist NO ROUNDER CORNERS STYLING.

## Managing Blog Posts

I have completely bypassed Jekyll's default, strict `_posts` requirement. You no longer need to name your files `YYYY-MM-DD-title.md` or use generator scripts!

To create a new blog post:

1. I Simply need to create a new markdown file (e.g. `Essay on how I love functional programming.md`) and drop it into the `_posts/` folder.
2. And also add the following YAML block to the very top of your file:

```yaml
---
layout: post
title: "Essay on how I love functional programming"
date: 2026-03-01
---
```
