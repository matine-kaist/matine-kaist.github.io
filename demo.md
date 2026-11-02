---
layout: page
title: Demo
permalink: /demo/
---

<div class="news-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 25px;">
  {% assign demo_items = site.demo | sort: "date" | reverse %}
  {% for demo in demo_items %}
    {% unless demo.draft %}
      {% include demo-card.html demo=demo %}
    {% endunless %}
  {% endfor %}
</div>

<style>
@media (max-width: 900px) {
  .news-grid { grid-template-columns: repeat(2, 1fr) !important; }
}
@media (max-width: 560px) {
  .news-grid { grid-template-columns: 1fr !important; }
}
</style>
