---
layout: post
title: "手把手教你用Github和jekyll搭建个人博客(上)"
description: "手把手教你用Github和jekyll搭建个人博客"
category: InternetTechnology
tags: [Github, jekyll, Blog] 
---
{% include JB/setup %}

这几天有时间，鼓捣了一下[Github](https://github.com/)，顺便在Github上用jekyll搭建了自己的个人博客。凡事都需亲历亲为，原本以为很快能搭好的，结果中间出了各种问题，花了我一天多的时间，只能说自己还是Too young,Too simple。主要参照了[BeiYuu的博客](http://beiyuu.com/github-pages/)和[阮一峰的博客](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)，在此感谢两位大神。

在Github上搭建个人博客有以下主要优点：

* 轻量级的博客系统，没有麻烦的配置
* 使用标记语言，比如[Markdown](http://markdown.tw/)
+ 无需自己搭建服务器，Github提供每个站300MB的免费空间
+ 支持通过git跟踪所以内容，且很多牛人在使用，有大量模板
+ 无限流量
+ 可以绑定自己的域名

当然也有一些缺点：

+ 使用jekyll模板系统，相当于静态页发布，适合博客，文档介绍等。 动态程序的部分相当局限，比如没有评论，不过还好我们有解决方案
+ 基于Git，很多东西需要动手，对于不熟悉技术的人很难上手，不像Wordpress有强大的后台

大致就是这样了，下面就详细讲讲搭建步骤。
  
  

##购买和绑定域名

免费域名有很多。 顶级域名首推大名鼎鼎的[.tk](www.dot.tk)域名了。.tk是太平洋一个岛国的国家顶级域名，但是由于国家太穷，所以连这个也卖了，被一家荷兰公司运营，目前可以免费注册使用。还有很多免费的2级域名，例如“.co.cc”等等。如何注册域名我就不多说了，基本和注册QQ号码差不多，只是有一点需要注意的就是DNS地址填写，这个我会在稍后专门说明。

收费域名就更多了，国内注册商的有万网，国外有[Godaddy](www.godaddy.com)等。推荐大家在国外注册，国内注册域名有很多弊端，这里就不多说了，Godaddy作为域名服务商做的还不赖，而且很重要的是支持支付宝。

因为伟大的GFW的存在，我们必须多做一些事情，流传Godaddy的域名解析服务器被墙掉，导致域名无法访问，不得已需要把域名解析服务迁移到国内比较稳定的服务商处，这个迁移对于域名来说没有什么风险，最终的控制权还是在Godaddy那里，你随时都可以改回去。

我们选择[DNSPod](https://www.dnspod.cn/Domain)的服务，他们的产品做得不错，易用、免费，收费版有更高端的功能，暂不需要。注册登录之后，按照DNSPod的说法，只需三步（我们插入一步）：

* 首先添加域名记录，可参考[DNSPod的帮助文档](https://www.dnspod.cn/Support)
* 在DNSPod自己的域名下添加一条[A记录](http://baike.baidu.com/view/65575.htm)，地址就是Github Pages的服务IP地址:204.232.175.78，这个地址可能每个人都不同，具体参照[Github](https://help.github.com/articles/setting-up-a-custom-domain-with-pages)
* 在域名注册商处修改DNS服务:去Godaddy修改Nameservers为这两个地址：f1g1ns1.dnspod.net、f1g1ns2.dnspod.net。如果你不明白在哪里修改，可以参考这里：[Godaddy注册的域名如何使用DNSPod](https://www.dnspod.cn/support/index/fid/119)
  
  

##学会使用Git和Github

Git是版本管理的未来，他的优点我不再赘述，相关资料很多。推荐[Git Tutorial](http://www.vogella.com/articles/Git/article.html)

要使用Git，得先安装它，在Linux下使用Git，会比较方便。Windows版现在Github提供native app，集成了Git bash的功能,参看[Git安装教程](https://help.github.com/articles/set-up-git),看到如下图片：

![pic](/images/native_app.jpg)

下载安装之后会看到两个东西，一个是Github客户端，一个是Git Shell，有了Github客户端，你可以进行代码提交，本地和Github库同步等操作，而不需要输入命令了:

![pic](/images/native_app2.jpg)

打开Git Shell,其他系统则打开终端(Terminal)，首先设置姓名和邮箱：

	git config --global user.name "Your Name Here"
	git config --global user.email "your_email@youremail.com"

你每次提交代码的时候都会以你设置的名字和邮箱显示。邮箱必须和Github上的一样，否则得去Github上[添加邮箱](https://help.github.com/articles/how-do-i-change-my-primary-email-address).


