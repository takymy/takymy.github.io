# Mykyta Chursin | Portfolio

This portfolio is built linearly using **Jekyll** an ultra-minimal static site generator. No heavy Javascript frameworks, just raw HTML/CSS wrapped in YAML data objects.

## Folder Structure

- `_data/`: Contains all of your text configuration in YAML lists. If you want to add/edit your skills, experience, projects, or achievements, edit the respective files in here. The website will automatically update.
- `_writeups/`: This is where your blog posts go.
- `_includes/` & `_layouts/`: The modular HTML structure of the website.
- `assets/css/main.css`: The central CSS stylesheet dictating the brutalist 0px border-radius styling.

## Managing Blog Posts

I have completely bypassed Jekyll's default, strict `_posts` requirement. You no longer need to name your files `YYYY-MM-DD-title.md` or use generator scripts!

To create a new blog post:

1. Simply create a new markdown file (e.g. `My Cool Analysis.md`) and drop it into the `_writeups/` folder.
2. Add the following YAML block to the very top of your file:

```yaml
---
layout: post
title: "My Cool Analysis"
date: 2026-03-01
---
```

3. Start typing your blog below the dashes! It will automatically appear on the `/blog` page.
