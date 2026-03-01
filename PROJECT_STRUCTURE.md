# Project Structure Overview

This document explains the architecture and structure of your Jekyll-based portfolio website.

## Core Setup

Jekyll is a static site generator. It takes your raw content (Markdown files, YAML data files), applies layouts and styling, and "builds" a complete HTML website into the `_site/` directory. GitHub Pages runs this build process automatically when you push your code.

### Directory Breakdown

- **`_config.yml`**
  This is the master configuration file for Jekyll. It holds global variables like your site title, author information, social URLs, and Jekyll plugins. These variables are accessed in your HTML using `{{ site.title }}`, etc.

- **`_data/`**
  This folder acts as your database. It contains YAML (`.yml`) files listing your skills, projects, experience, achievements, etc. By keeping data here, your HTML files stay clean, and you can easily loop through the data (e.g., `{% for project in site.data.projects %}`).

- **`_includes/`**
  Contains reusable HTML snippets (components) like `header.html` and `footer.html`. These are injected into other layouts using the `{% include header.html %}` command, so you only have to write your navigation bar once.

- **`_layouts/`**
  These are the wrapper templates for your content.
  - `default.html`: The master wrapper containing the HTML skeleton, header, and footer.
  - `page.html`: A layout for standard pages (like your homepage), wrapping content inside `default.html`.
  - `post.html`: A layout specifically designed for rendering your Markdown blog posts and write-ups.

- **`_writeups/` (or `_posts/`)**
  This is where your actual blog content lives. Every file here should be a Markdown (`.md`) file starting with a date in the format `YYYY-MM-DD-title.md`. Jekyll automatically converts these Markdown files into HTML and makes them available on your blog page.

- **`assets/`**
  Contains all your static files.
  - `assets/css/main.css`: Your single, unified stylesheet housing all CSS variables, typography, and responsive design rules.
  - `assets/js/script.js`: Your JavaScript file powering the interactive hacker terminal and dynamic typing logo elements.
  - `assets/images/`: (If applicable) where you would store site images.

- **`index.html`**
  Your homepage. It loops over the `_data/` files to dynamically render your Hero, About Me, Experience, Projects, and Achievements sections.

- **`blog.html`**
  The central hub for your writing. It loops through `site.posts` (or `site.writeups` depending on your collection configuration) to display a list of all your Markdown articles with links to their full pages.

- **`Gemfile`**
  A Ruby dependency file telling the server (and GitHub Pages) which version of Jekyll and which plugins to install in order to build your site properly.

- **`.gitignore`**
  A configuration file for Git. It tells source control to ignore auto-generated build files (like the `_site/` directory) and system caching files so that your GitHub repository stays clean and contains only the source code.
