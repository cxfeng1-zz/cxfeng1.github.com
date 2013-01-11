---
layout: post
title: "手把手教你用Github和jekyll搭建个人博客(上)"
description: "手把手教你用Github和jekyll搭建个人博客"
category: 互联网技术
tags: [Github, jekyll, Blog] 
---
{% include JB/setup %}

这几天有时间，鼓捣了一下[Github](https://github.com/)，顺便在Github上用jekyll搭建了自己的个人博客。凡事都需亲历亲为，原本以为很快能搭好的，结果中间出了各种问题，花了我一天多的时间，只能说自己还是Too young,Too simple。主要参照了[BeiYuu的博客](http://beiyuu.com/github-pages/)和[阮一峰的博客](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)，在此感谢两位大神。

在Github上搭建个人博客有以下主要优点：
+轻量级的博客系统，没有麻烦的配置
+使用标记语言，比如[Markdown](http://markdown.tw/)
+无需自己搭建服务器，Github提供每个站300MB的免费空间
+支持通过git跟踪所以内容，且很多牛人在使用，有大量模板
+无限流量
+可以绑定自己的域名

当然也有一些缺点：
+使用jekyll模板系统，相当于静态页发布，适合博客，文档介绍等。 动态程序的部分相当局限，比如没有评论，不过还好我们有解决方案
+基于Git，很多东西需要动手，对于不熟悉技术的人很难上手，不像Wordpress有强大的后台

大致就是这样了，下面就详细讲讲搭建步骤。

