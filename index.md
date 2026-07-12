---
layout: home
permalink: /
---

Welcome to the **{{ site.description }} ({{ site.title }})**.

MATINE Lab is a research group at the KAIST Graduate School of Culture Technology.
Our lab studies musical instruments, audio devices, and music-making tools, through the lens of signal processing, physics-based simulation, acoustic measurement, and mechanical engineering.
Occasionally, we also make music, musical instruments, and instrument-making tools, and we are always interested in collaborating with musicians, instrument makers, and researchers.

<hr style="border: none; border-top: 1px solid var(--color-border); margin: 40px 0;">

<!-- (2) Three Latest News in a Card View Layout -->
## Latest News

<div class="news-cards-container" style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 25px;">
  {% for post in site.news limit:3 %}
  <div class="news-card" style="flex: 1; min-width: 280px; border: 1px solid var(--color-border); border-radius: 0.75rem; overflow: hidden; display: flex; flex-direction: column; background-color: var(--color-card-bg); transition: transform 0.2s, box-shadow 0.2s;">
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
  {% endfor %}
</div>

<div style="text-align: right; margin-bottom: 50px;">
  <a href="{{ '/news/' | relative_url }}" class="btn-learn-more" style="padding: 0.4rem 1.2rem;">View All News →</a>
</div>

<!-- (3) Featured Research, as configured by site.featured_research in _config.yml -->
## Featured Research

<div class="pub-cards-container" style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 25px;">
{% for pub_key in site.featured_research %}
{% bibliography --file publication --query @*[key={{ pub_key }}] --template pub_card_home %}
{% endfor %}
</div>

<div style="text-align: right; margin-bottom: 50px;">
  <a href="{{ '/research/publications/' | relative_url }}" class="btn-learn-more" style="padding: 0.4rem 1.2rem;">View All Publications →</a>
</div>

<!-- (4) Collaboration Inquiry Guide -->
## Call for Collaborations

New collaborations are always welcome. Connect with us to explore opportunities for joint research, instrument-making projects, and partnerships.

<div class="collab-card">
  <div>
    <h4 style="margin-top: 0; margin-bottom: 0.5rem; font-size: 1.1rem;">Why Collaborate with MATINE Lab?</h4>
    <ul style="margin-top: 0; padding-left: 1.25rem; line-height: 1.7;">
      <li style="margin-bottom: 0.35rem;">Cutting-edge research in musical acoustics, differentiable digital signal processing, physics-based simulation, and audio effects.</li>
      <li style="margin-bottom: 0.35rem;">Dedicated engagement bridging heritage instrument preservation with modern scientific innovation.</li>
      <li style="margin-bottom: 0.35rem;">Strong commitment to collaborative design alongside musicians, instrument makers, and international research frameworks.</li>
    </ul>
  </div>

  <div>
    <h4 style="margin-top: 0; margin-bottom: 0.5rem; font-size: 1.1rem;">Get In Touch</h4>
    <ul style="list-style: none; padding-left: 0; margin-top: 0; line-height: 1.7; color: var(--color-muted);">
      <li style="margin-bottom: 0.25rem;"><strong style="color: var(--color-text);">📩 Lab Director:</strong> Prof. Jin Woo Lee (<code><a href="https://jin-woo-lee.github.io">jin-woo-lee.github.io</a></code>)</li>
      <li><strong style="color: var(--color-text);">📍 Lab Location:</strong>
        <ul style="list-style: none; padding-left: 1; margin-top: 0; line-height: 1.7; color: var(--color-muted);">
            <li>{{ site.lab_address.line1 }}</li>
            <li>{{ site.lab_address.line2 }}</li>
        </ul>
      </li>
    </ul>
    <div style="text-align: right;">
        <a href="{{ '/research/collaborations/' | relative_url }}" class="btn-learn-more">View Our Collaborators →</a>
    </div>
  </div>
</div>
