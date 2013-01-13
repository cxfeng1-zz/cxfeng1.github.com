---
layout: post
title: "手把手教你用GitHub和jekyll搭建个人博客"
description: "手把手教你用GitHub和jekyll搭建个人博客"
category: InternetTechnology
tags: [GitHub, jekyll, Blog] 
---
{% include JB/setup %}

这几天有时间，鼓捣了一下[GitHub](https://github.com/)，顺便在GitHub上用jekyll搭建了自己的个人博客。凡事都需亲历亲为，原本以为很快能搭好的，结果中间出了各种问题，花了我一天多的时间，只能说自己还是Too young,Too simple。主要参照了[BeiYuu的博客](http://beiyuu.com/github-pages/)和[阮一峰的博客](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)，在此感谢两位大神。

在GitHub上搭建个人博客有以下主要优点：

* 轻量级的博客系统，没有麻烦的配置
* 使用标记语言，比如[Markdown](http://markdown.tw/)
+ 无需自己搭建服务器，GitHub提供每个站300MB的免费空间
+ 支持通过git跟踪所以内容，且很多牛人在使用，有大量模板
+ 无限流量
+ 可以绑定自己的域名

当然也有一些缺点：

+ 使用jekyll模板系统，相当于静态页发布，适合博客，文档介绍等。 动态程序的部分相当局限，比如没有评论，不过还好我们有解决方案
+ 基于Git，很多东西需要动手，对于不熟悉技术的人很难上手，不像Wordpress有强大的后台

大致就是这样了，下面就详细讲讲搭建步骤：  
  
 


##购买和绑定域名

免费域名有很多。 顶级域名首推大名鼎鼎的[.tk](www.dot.tk)域名了。.tk是太平洋一个岛国的国家顶级域名，但是由于国家太穷，所以连这个也卖了，被一家荷兰公司运营，目前可以免费注册使用。还有很多免费的2级域名，例如“.co.cc”等等。如何注册域名我就不多说了，基本和注册QQ号码差不多，只是有一点需要注意的就是DNS地址填写，这个我会在稍后专门说明。

收费域名就更多了，国内注册商的有万网，国外有[Godaddy](www.godaddy.com)等。推荐大家在国外注册，国内注册域名有很多弊端，这里就不多说了，Godaddy作为域名服务商做的还不赖，而且很重要的是支持支付宝。

因为伟大的GFW的存在，我们必须多做一些事情，流传Godaddy的域名解析服务器被墙掉，导致域名无法访问，不得已需要把域名解析服务迁移到国内比较稳定的服务商处，这个迁移对于域名来说没有什么风险，最终的控制权还是在Godaddy那里，你随时都可以改回去。

我们选择[DNSPod](https://www.dnspod.cn/Domain)的服务，他们的产品做得不错，易用、免费，收费版有更高端的功能，暂不需要。注册登录之后，按照DNSPod的说法，只需三步（我们插入一步）：

* 首先添加域名记录，可参考[DNSPod的帮助文档](https://www.dnspod.cn/Support)
* 在DNSPod自己的域名下添加一条[A记录](http://baike.baidu.com/view/65575.htm)，地址就是GitHub Pages的服务IP地址:204.232.175.78，这个地址可能每个人都不同，具体参照[GitHub](https://help.github.com/articles/setting-up-a-custom-domain-with-pages)
* 在域名注册商处修改DNS服务:去Godaddy修改Nameservers为这两个地址：f1g1ns1.dnspod.net、f1g1ns2.dnspod.net。如果你不明白在哪里修改，可以参考这里：[Godaddy注册的域名如何使用DNSPod](https://www.dnspod.cn/support/index/fid/119)
  
  

##学会使用Git和GitHub

Git是版本管理的未来，他的优点我不再赘述，相关资料很多。推荐[Git Tutorial](http://www.vogella.com/articles/Git/article.html)

要使用Git，得先安装它，在Linux下使用Git，会比较方便。Windows版现在GitHub提供native app，集成了Git bash的功能,参看[Git安装教程](https://help.github.com/articles/set-up-git),看到如下图片：

![pic](/images/native_app.jpg)

下载安装之后会看到两个东西，一个是GitHub客户端，一个是Git Shell，有了GitHub客户端，你可以进行代码提交，本地和GitHub库同步等操作，而不需要输入命令了:

![pic](/images/native_app2.jpg)

打开Git Shell,其他系统则打开终端(Terminal)，首先设置姓名和邮箱：

	$ git config --global user.name "Your Name Here"
	$ git config --global user.email "your_email@youremail.com"

你每次提交代码的时候都会以你设置的名字和邮箱显示。邮箱必须和GitHub上的一样，否则得去GitHub上[添加邮箱](https://help.github.com/articles/how-do-i-change-my-primary-email-address)。

###配置SSH keys

首先我们需要检查你电脑上现有的ssh key：

	$ cd ~/.ssh

因为已经存在key文件，所以需要备份旧的数据并删除：

	$ ls
	config	id_rsa	id_rsa.pub	known_hosts
	$ mkdir key_backup
	$ cp id_rsa* key_backup
	$ rm id_rsa*
	
输入下面的代码，就可以生成新的key文件，我们只需要默认设置就好，所以当需要输入文件名的时候，回车就好。

	$ ssh-keygen -t rsa -C "邮件地址@youremail.com"
	Generating public/private rsa key pair.
	Enter file in which to save the key (/Users/your_user_directory/.ssh/id_rsa):<回车就好>

然后系统会要你输入加密串([Passphrase](https://help.github.com/articles/working-with-ssh-key-passphrases))：

	Enter passphrase (empty for no passphrase):<输入加密串>
	Enter same passphrase again:<再次输入加密串>

最后看到这样的界面，就成功设置ssh key了：

![pic](/images/ssh-key-set.png)

在本机设置SSH Key之后，需要添加到GitHub上，以完成SSH链接的设置。

用文本编辑工具打开id_rsa.pub文件，如果看不到这个文件，你需要设置显示隐藏文件。准确的复制这个文件的内容，才能保证设置的成功。

在GitHub的主页右上角上点击account settings   按钮,选择SSH Keys项，把复制的内容粘贴进去，然后点击Add Key按钮即可：

![pic](/images/bootcamp_1_ssh.jpg)

可以输入下面的命令，看看设置是否成功，`git@github.com`的部分不要修改:

	$ ssh -T git@github.com

如果是下面的反应：

	The authenticity of host 'github.com (207.97.227.239)' can't be established.
	RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
	Are you sure you want to continue connecting (yes/no)?
	
不要紧张，输入yes就好，然后会看到：

	Hi <em>username</em>! You've successfully authenticated, but GitHub does not provide shell access.

好了，你已经可以成功连接GitHub了。

##使用GitHub Pages

与GitHub建立好链接之后，就可以方便的使用它提供的Pages服务，GitHub Pages分两种，一种是你的GitHub用户名建立的username.github.com这样的用户&组织页（站），另一种是依附项目的pages。

想建立个人博客是用的第一种，你需要建立一个名叫`username.github.com`的代码库，`username`必须是你GitHub的账号名称否则会建立失败,下面是自动生成[GitHub Pages的步骤](https://help.github.com/articles/creating-pages-with-the-automatic-generator)：

* 到username.github.com代码库的设置页面:

![pic](/images/repo-actions-settings.png)

* 点击"Automatic Page Generator"按钮
* 编辑主页内容，可以选择默认，点击"Continue To Layouts" 按钮
* 选一个你喜欢的主题
* 选好了之后，点击"Publish"

第一次页面生效需要一些时间，大概10分钟左右。生效之后，访问`username.github.com`就可以看到你的页面了，你可以将你的代码库clone到本地，提交你自己的东西，比如index.html，然后push到GitHub的master分支。

###绑定域名

我们在第一部分就提到了在DNS部分的设置，再来看在GitHub的配置，要想让`username.github.com`能通过你自己的域名来访问，需要在项目的根目录下新建一个名为`CNAME`的文件，文件内容就是你要绑定的域名，比如`Xiao82.tk`设置成功后，根据DNS的情况，最长可能需要一天才能生效，耐心等待吧。

##Jekyll模板系统

GitHub Pages为了提供对HTML内容的支持，选择了Jekyll作为模板系统，Jekyll是一个强大的静态模板系统，作为个人博客使用，基本上可以满足要求，也能保持管理的方便，你可以查看[Jekyll官方文档](https://github.com/mojombo/jekyll/blob/master/README.textile)。

Jekyll的核心其实就是一个文本的转换引擎，用你最喜欢的标记语言写文档，可以是Markdown、Textile或者HTML等等，再通过layout将文档拼装起来，根据你设置的URL规则来展现，这些都是通过严格的配置文件来定义，最终的产出就是web页面。

###搭建本地jekyll环境

这里主要介绍Win7下的安装过程，其他操作系统可以参照[jekyll安装](https://github.com/mojombo/jekyll/wiki/Install)。

下载最新的[RubyInstaller](http://rubyforge.org/frs/?group_id=167)(我下载的是[rubyinstaller-1.9.3-p362.exe](http://rubyforge.org/frs/download.php/76642/rubyinstaller-1.9.3-p362.exe)),添加Ruby文件夹下的bin目录到环境变量path中(不会设置环境变量？[点这里](http://softbbs.pconline.com.cn/1562878.html))

下载最新的[DevKit](https://github.com/oneclick/rubyinstaller/downloads/)(我下载的是[DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe](https://github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe)),运行解压，比如解压到C:\DevKit，打开终端cmd，输入下列命令进行安装

	cd C:\DevKit
	ruby dk.rb init
	ruby dk.rb install

PS:DevKit是windows平台下编译和使用本地C/C++扩展包的工具。它就是用来模拟Linux平台下的make,gcc,sh来进行编译。但是这个方法目前仅支持通过RubyInstaller安装的Ruby。完成上面的准备就可以安装Jekyll了,因为Jekyll是用Ruby编写的,最好的安装方式是通过RubyGems(gem):

	gem install jekyll

并使用命令jekyll --version检验是否安装成功, 一般而言，还要安装Rdiscount，这个用来解析Markdown标记的包，使用如下命令：

	gem install rdiscount

现在,Jekyll的本地环境就配置完成了。下面我们先使用现成的模板[jekyll-bootstrap](https://github.com/plusjade/jekyll-bootstrap)，的blog仓库做示例代码,点击其页面上的Clone in Windows按钮，就会调用你之前安装好的GitHub客户端，将该仓库的代码下载到本地。默认位置是我的文档下的GitHub文件夹内。让我们在本地测试看看下载得到的博客站点是否可以成长运行。打开终端命令行，进入到你clone得到的jekyllbootstrap.com目录下，运行以下命令：

	jekyll --server

打开浏览器，输入 http://127.0.0.1:4000 进行访问。如果出现问题的话，请参考[Jekyll 本地调试之若干问题](http://chxt6896.github.com/blog/2012/02/13/blog-jekyll-native.html)

###Jekyll基本结构

可以看到下载的博客站点目录有很多的文件，基本的jekyll结构如下：

    .
    |-- _config.yml
    |-- _includes
    |-- _layouts
    |   |-- default.html
    |   |-- post.html
    |-- _posts
    |   |-- 20011-10-25-open-source-is-good.markdown
    |   |-- 20011-04-26-hello-world.markdown
    |-- _site
    |-- index.html
    |-- assets
        |-- css
            |-- style.css
        |-- javascripts

**config.yml**是配置文件，用来定义你想要的效果，设置之后就不用关心了。[官方配置文档](https://github.com/mojombo/jekyll/wiki/configuration)有很详细的说明，确实需要了可以去这里查

**includes**可以用来存放一些小的可复用的模块，方便通过{ % include file.ext %}（去掉前两个{中或者{与%中的空格，下同）灵活的调用。这条命令会调用_includes/file.ext文件。

**layouts**是模板文件存放的位置。模板需要通过YAML front matter来定义，{ { content }}标记用来将数据插入到这些模板中来。

**posts**一般来说就是你的博客正文存放的文件夹。他的命名有严格的规定，必须是2012-02-22-artical-title.MARKUP这样的形式，MARKUP是你所使用标记语言的文件后缀名，根据_config.yml中设定的链接规则，可以根据你的文件名灵活调整，文章的日期和标记语言后缀与文章的标题的独立的。

**site**是Jekyll生成的最终的文档，不用去关心。最好把他放在你的.gitignore文件中忽略它。

##管理评论

模板部分到此就算是配置完毕了，但是Jekyll只是个静态页面的发布系统，如果想要评论呢？也很简单。

现在专做评论模块的产品有很多，比如[Disqus](http://disqus.com/)，还有国产的[多说](http://duoshuo.com/)，Disqus对现在各种系统的支持都比较全面，多说与国内的社交网络紧密结合，还是有很多亮点的，值得期待一下。我先选择了Disqus。

注册账号什么的就不提了，Disqus支持很多的博客平台，参见下图：

![pic](/images/disqus-site.jpg)

我们选择`Universal Code`就好,具体流程里面有介绍，这里就不多赘述了。

##代码高亮

如果写技术博客，代码高亮少不了，这里我选择了[Google Code Prettify](https://code.google.com/p/google-code-prettify/),

首先下载[prettify-1-Jun-2011.tar.bz2](https://code.google.com/p/google-code-prettify/downloads/list),在你的模板(比如/_includes/themes/twitter/default.html)的head标签中加入代码(根据自己情况调整css和js的路径)：

	<link href="{{ ASSET_PATH }}/google-code-prettify/src/prettify.css" type="text/css" rel="stylesheet" />
	<script type="text/javascript" src="{{ ASSET_PATH }}/google-code-prettify/src/prettify.js"></script>
</code>

在body标签中做如下修改：

	<body onload="prettyPrint()">

之后将代码放入< pre class="prettyprint">和< /pre>之间或者< code class="prettyprint">< /code>之间就可以显示代码高亮了。 效果：

<pre class="prettyprint">
class Voila {
public:
  // Voila
  static const string VOILA = "Voila";

  // will not interfere with embedded tags.
}
</pre>

###在Vim中设置markdown语法高亮

vim来写markdown是一个不错的选择，插件的安装和其他vim插件一样，都是拷贝相应文件到对应的目录。下载[markdown语法高亮插件](https://github.com/plasticboy/vim-markdown),将下载的zip文件解压后，会得到下面的目录结构：

	.
	|-- syntax
	|	|--mkd.vim
	|-- ftdetect
	|	|--mkd.vim

将两个 mkd.vim 分别复制到 $VIM 下对应的 syntax 和 ftdetect 文件夹中。Mac和Linux下一般是 ~/.vim/，如果没有对应的文件夹，用mkdir创建.Windows一般就是vim的安装目录下了。一切就是这么简单，复制到对应目录，然后重启你的vim就ok了。

##一些小问题

###Markdown 中文列表抽风问题

用 markdown 写带中文的列表时发现 jekyll 生成的网页中有的可以正常显示，有的则不行。折腾半天，发现如果列表项中含有英文字母等非中文字符，就可以正确显示，纯中文的那些打死也不行。

上网查后得知原来是 jeklly 默认 markdown 引擎 maruku 的问题，将引擎改为 rdiscount 即可。做法是修改 _config.yml 文件，在 pygments: true 上面添加一行 markdown: rdiscount

###GBK编码导致jekyll处理的bug

由于中文windows系统使用的GBK编码，GBK编码导致jekyll处理的bug，修改E:\Ruby192\lib\ruby\gems\1.9.1\gems\jekyll-0.11.2\lib\jekyll\convertible.rb这个文件，修改方式 [参考这里](https://github.com/imathis/octopress/issues/232#issuecomment-2480736)

	self.content = File.read(File.join(base, name))

换成：

	self.content = File.read(File.join(base, name), :encoding => "utf-8")

##总结

如果到这里你已经完成了博客的搭建，那么恭喜你！接下来就是持之以恒地写博客了。
