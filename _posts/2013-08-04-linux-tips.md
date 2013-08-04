---
layout: post
title: "Linux tips大全"
description: "Linux tips大全"
category: Linux
tags: [Linux]
---
{% include JB/setup %}

首先要学会的一个命令是`man`,如果忘了某个命令的用法,就试着去敲这个命令或者google之.

##基础

* 学习最基本的`Bash`,读完整个man page其实花不了太长的时间,bash非常强大而且总是可用
* 学习使用`vim`,在Linux下编辑基本没有其他选择(即使你大部分时间用Emacs和Eclipse)
* 了解`ssh`,以及一些无口令认证的基本知识,如`ssh-agent`,`ssh-add`等
* 熟悉bash的作业管理:`&`,`Ctrl-Z`,`Ctrl-C`,`jobs`,`fg`,`bg`,`kill`等等
* 基本的文件管理:`ls`和`ls -l`(`ls -l`结果的每一列代表什么?), `less`, `head`, `tail` 和 `tail -f`, `ln`和`ln -s`(硬链接和软链接的区别?), `chown`, `chmod`, `du`(快速查询硬盘占用空间:`du -sk *`), `df`, `mount`
* 基本的网络管理:`ip`或者`ifconfig`, `dig`
* 了解正则表达式以及`grep/egrep`的参数
* 学习使用`apt-get`或者`yum`来寻找和安装软件包.

##日常使用

* 在bash中, 可以使用`Ctrl-R`来搜索执行过的命令
* 在bash中, 可以使用`Ctrl-W`来删除最后一个单词, 使用`Ctrl-U`来删除一行. 运行`man readline` 查看readline手册, 里面有很多默认的快捷键. 
* 回到上次所在目录: `cd -`
* 使用强大的`xargs`(或者`parallel`).它允许你对输出执行其他某些命令, 你可以控制具体执行输出的哪一行(`-L`), 同样`-l{}`也是很方便的, 例子：

	find . -name \*.py | xargs grep some_function  
	cat hosts | xargs -I{} ssh root@{} hostname

* `pstree -p`是个很有用的命令, 用来查看进程树
* 使用`pgrep`和`pkill`来通过名称查找或者发信号给进程(`-f`比较有用)
* 了解你能发送给进程的信号. 例如, 要暂停一个进程, 使用`kill -STOP [pid]`. 所有的信号可以通过`man 7 signal`查到
* 使用`nohup` 或者 `disdown` 以使一个后台进程永远保持运行
* 通过`netstat -lntp`来检查哪些进程正在监听,也看一下`lsof`
* 在bash脚本中, 使用`set -x`来调试输出, 使用`set -e`可以在遇到错误的时候中止.还可以试试`trap`
* 在bash脚本中,shell子进程(用括号括起来)可以很方便的组合命令. 下面是一个暂时切换到其他工作目录的例子:

	\# do something in current dir  
	(cd /some/other/dir; other-command)  
	\# continue in original dir  

* 在bash中，有很多种变量扩展.检查一个变量是否存在: `${name:?error message}`.例如, 如果bash脚本需要有一个参数, 就可以写成`input_file=${1:?usage: $0 input_file}`. 算术扩展: `i=$(( (i+1) % 5 ))`. 序列:`{1..10}`. 修剪字符串: `${var%后缀}` 和 `${var#前缀}`.例子: 如果var=foo.pdf, 那么`echo ${var%.pdf}.txt`的结果是"foo.txt".
* 通过`<(命令)`, 一个命令的输出可以被当成一个文件. 例如, 比较本地和远程的/etc/hosts: `diff /etc/hosts <(ssh somehost cat /ect/hosts)`
* 了解bash中的here documents", 特别是`cat<<EOF`的用法
* 在bash中，将标准输出和错误同时重定向: `some-command >logfile 2>&1`. 对于输入来说, '</dev/null'是个不错的选择
* 通过`man ascii`可以查看ASCII码的表格
* 在远程ssh会话中，使用`screen`或者`dtach`来管理你的会话'
* 对于web调试, `curl`和`curl -I`很方便, 还有`wget`
* 将HTML转化成文本文件: `lynx -dump -stdin`
* 如果你必须处理xml, xmlstarlet是不错的选择
* 对ssh配置进行一些优化将非常有用;例如

##数据处理

* 了解`sort`和`uniq`(包括`uniq`的-u和-d参数)
* 使用`cut`, `paste`, `join`来处理文本文件
* 通过`sort`和`uniq`可以取文本文件的交集, 并集和不同.

	cat a b | sort | uniq > c   # c是并集  	
	cat a b | sort | uniq -d > c   # c 是交集  
	cat a b b | sort | uniq -u > c   # c 是 a-b

* 语言环境影响很多命令行工具，包括排序的顺序和性能.大部分Linux会将LANG和其他语言环境变量设置成US_EN或者ZH_CN这样的本地化值.这样会导致`sort`和其他命令运行很慢, 如果想使用传统的字节排序, 使用`export LC_ALL=C`(可以考虑将这条命令放入.bashrc中)
* 使用`awk`和`sed`对数据进行分割.例如,将一个文件中第三列的所有数字相加: `awk '{ x += $3 } END { print x }'`.这可能比用python要快三倍
* 使用`shuf`来打乱一个文件的所有行
* 了解`sort`的参数. 了解`-t`和`-k`是怎么工作的. 注意如果想按照第一个域进行排序用的是`-k1,1`; `-k1`意思是按照整行排序
* 稳定排序(`sort -s`)也很有用. 例如, 先按照第2个域排序,再按照第1个域排序: `sort -k1,1 | sort -s -k2,2`
* 如果你需要在命令行中输入tab，使用`Ctrl-V <tab>`或者`$'\t'`(后者更好因为可以复制粘贴)
* 转换编码可以使用`iconv`, 或者更高级的`uconv`;
* `split`可以将大文件分割成小文件

##系统调试

* 如果想要知道磁盘/cpu/网络的状态, 使用`iostat`, `netstat`, `top`, `dstat`. 
* 如果想要知道内存的状态, 使用`free`和`vmstat`.
* 对于java系统调试,你可以运行`kill -s <pid>`, 堆栈信息(包括垃圾回收信息)会被dump到标准错误或者logs中
* 使用`mtr`取代`traceroute`来查看网络状态
* 使用`iftop`或者`nethogs`查看哪些socket或者进程在使用带宽
* `ab`工具(来自Apache)用于查看网络服务器性能.对于更复杂的负载测试, 用`siege`
* 如果要更详细地调试网络, 使用`wireshark`或者`tshark`
* 了解`strace`和`ltrace`. 当程序失败,挂起或者崩溃的时候,用这两个命令来找原因，也可以了解到程序的性能. 注意参数`-c`和`-p`
* 使用`ldd`检查共享库
* 知道怎么用`gdb`连接到运行中的进程并获取到它的堆栈信息
* 使用/proc文件夹.例如:/proc/cpuinfo, /proc/xxx/cwd, /proc/xxx/exe, /proc/xxx/fd/, /proc/xxx/smaps
* 对于更深层次的系统分析, 看一下`stap`(systemtap)和`perf`
* 使用`dmesg`查看内核侦测信息(主要是硬件和驱动)






























