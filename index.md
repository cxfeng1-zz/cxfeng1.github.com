---
layout: page
title: Keep Learning
tagline:  
---
{% include JB/setup %}

    
## 文章列表

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

<pre class="prettyprint">
class Voila {
public:
  // Voila
  static const string VOILA = "Voila";

  // will not interfere with embedded tags.
}
</pre>

