---
layout: page
title: Team
permalink: /members/
---

{% assign pi       = site.members | where: "role", "pi"      | sort: "date_join" %}
{% assign postdocs = site.members | where: "role", "postdoc" | sort: "date_join" %}
{% assign phds     = site.members | where: "role", "phd"     | sort: "date_join" %}
{% assign ms       = site.members | where: "role", "ms"      | sort: "date_join" %}
{% assign visiting = site.members | where: "role", "visiting"| sort: "date_join" %}
{% assign interns  = site.members | where: "role", "intern"  | sort: "date_join" %}
{% assign alumni   = site.members | where: "role", "alumni"  | sort: "date_join" %}

{% assign visitors = visiting | concat: interns | sort: "date_join" %}

{% if pi.size > 0 %}
## Principal Investigator

<div class="member-grid">
  {% for person in pi %}
    {% include member-card.html member=person %}
  {% endfor %}
</div>
{% endif %}

{% if postdocs.size > 0 %}
## Postdoctoral Researchers

<div class="member-grid">
  {% for person in postdocs %}
    {% include member-card.html member=person %}
  {% endfor %}
</div>
{% endif %}

{% if phds.size > 0 %}
## Ph.D. Students

<div class="member-grid">
  {% for person in phds %}
    {% include member-card.html member=person %}
  {% endfor %}
</div>
{% endif %}

{% if ms.size > 0 %}
## M.S. Students

<div class="member-grid">
  {% for person in ms %}
    {% include member-card.html member=person %}
  {% endfor %}
</div>
{% endif %}

{% if visitors.size > 0 %}
## Visiting Students / Interns

<div class="member-grid">
  {% for person in visitors %}
    {% include member-card.html member=person %}
  {% endfor %}
</div>

<!--
| Name | Role | Period | Affiliation |
|------|------|--------|-------------|
{% for person in visitors %}| [{{ person.name }}]({{ person.url | relative_url }}) | {% if person.role == "visiting" %}Visiting Student{% elsif person.role == "intern" %}Intern{% else %}{{ person.role }}{% endif %} | {{ person.date_join }}–{{ person.date_exit }} | {{ person.affiliation }} |
{% endfor %}
-->

{% endif %}


## Join the Matiners!

Check out our [**Open Positions**](/joining-us/) to join our team!


{% if alumni.size > 0 %}
## Alumni

| Name | Role | Period | Affiliation |
|------|------|--------|-------------|
{% for person in alumni %}| [{{ person.name }}]({{ person.url | relative_url }}) | {% if person.position %}{{ person.position }}{% else %}{{ person.role }}{% endif %} | {{ person.date_join }}–{{ person.date_exit }} | {{ person.affiliation }} |
{% endfor %}
{% endif %}

