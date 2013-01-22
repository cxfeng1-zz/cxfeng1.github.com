---
layout: page
title: 晓丰
tagline: 分享编程和技术的乐趣 
---
{% include JB/setup %}

![pic](/images/stars.jpg)

## 最新文章 

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

