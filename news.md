---
layout: page
title: News
permalink: /news/
---

<div class="news-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 25px;">
  {% assign news_items = site.news | sort: "date" | reverse %}
  {% for post in news_items %}
    {% unless post.draft %}
    <div class="news-card" style="border: 1px solid var(--color-border); border-radius: 0.75rem; overflow: hidden; display: flex; flex-direction: column; background-color: var(--color-card-bg); transition: transform 0.2s, box-shadow 0.2s;">
      <div class="news-card-image" style="height: 180px; width: 100%; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; justify-content: center; overflow: hidden; background-color: var(--color-bg);">
        {% if post.image %}
          <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" style="width: 100%; height: 100%; object-fit: cover;" onerror="swapToDefaultNewsImage(this)">
        {% else %}
          <div class="news-card-image-default" role="img" aria-label="MATINE Lab Logo"></div>
        {% endif %}
      </div>
      <div class="news-card-content" style="padding: 1.25rem; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span class="news-card-date" style="font-size: 0.85rem; color: var(--color-muted);">{{ post.date | date: "%Y.%m" }}</span>
          <h3 style="margin: 0.4rem 0 0.75rem 0; font-size: 1.15rem; line-height: 1.4;"><a href="{{ post.url | relative_url }}" style="text-decoration: none; color: inherit;">{{ post.title }}</a></h3>
          <p style="font-size: 0.9rem; color: var(--color-muted); line-height: 1.6; margin: 0;">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
        </div>
        <div style="margin-top: 1.25rem;">
          <a href="{{ post.url | relative_url }}" class="btn-learn-more">Read more</a>
        </div>
      </div>
    </div>
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
