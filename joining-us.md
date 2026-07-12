---
layout: page
title: Joining Us
permalink: /joining-us/
---

MATINE ({{ site.description }}) is a research group at the KAIST Graduate School of Culture Technology. We study musical instruments, musicians, and music-making tools through the lens of signal processing, physics-based simulation, acoustic measurement, and mechanical engineering. The primary technologies our lab employs are (but not limited to):

1. **physics-based sound simulation** through high-performance computing,
2. **instrument making** and design based on mechanics, electronics, and material processing, and
3. **reverse-engineering** of physical properties through acoustic measurement and transducer engineering.

Regardless of your level of interest in the above methodologies, our lab welcomes anyone from diverse backgrounds who has a new problem definition or can propose a new methodology for solving problems.


### Location

The lab is located at {{ site.lab_address.line1 }}, {{ site.lab_address.line2 }}.


## Open Positions

| Position | Status | Season |
|----------|-------:|-------:|
{% for post in site.joining_us %}{% unless post.draft %}| [{{ post.title }}]({{ post.url | relative_url }}) | {{ post.status }} | {{ post.season }} |
{% endunless %}{% endfor %}


