---
layout: post
title: "Objective-C语法小结"
description: "Objective-C语法学习小结"
category: iOS
tags: [iOS]
---

从拿到MBP开始学习ios开发快一个月了，中间由于项目的原因，一直没时间做一个总结，Objective-C作为ios的开发语言，学习曲线还是比较高的，所以今天在这里记录一下，以备以后忘了- -.

##对象和方法

###创建对象

类似于Java, Objective-C用`class`来表示对象，每个对象有若干个成员变量和方法。如果你想要使用一个对象的实例，你首先必须有一个指向它的指针:

	Room *roomInstance;

`roomInstance`变量是一个指向`Room`对象实例的指针，当然，声明了这个指针并不代表创建了`Room`对象的实例，想要创建对象实例，首先需要调用`alloc`方法，该方法在内存中创建一个对象并返回指向它的指针：

	Room *roomInstance = [Room alloc];

`alloc`创建了一个对象实例，要使该对象有效，还得调用其初始化方法`init`:

	Room *roomInstance = [Room alloc] init];

`alloc`和`init`通常都是被连起来用的。  

<!-- more -->

###调用方法

对于初学者来说，Objective-C不一样也最让人不爽的可能就是方法调用的
形式上了，其用一对方括号`[]`来表示方法的调用，比如:

	[roomInstance addPerson:somePerson];

这个就是表示调用`roomInstance`对象的`addPerson`方法，并传入`somePerson`这个参数  
要是有多个参数，就这样表示：

	[roomInstance addPerson:somePerson withSex:male];

在Objective-C中，方法名是用来唯一区别方法的，也就是说，**方法是不能重载的**。我们不能在类中定义这样的两个方法：它们的名字相同，参数个数相同，参数类型不同，不同的返回值类型，否则编译器会报错。而`addPerson:`和`addPerson:withSex:`是两个不同的方法所以不会报错。

###释放对象

要释放一个对象，将其指针设置为`nil`就行了：

	roomInstance = nil;

其实真正的对象释放要复杂的多，只是这里我们假设有[ARC](http://clang.llvm.org/docs/AutomaticReferenceCounting.html)的帮助(具体的内存管理细节会在文章后面阐述，这里就不细说了)。  

当对象被设置成`nil`之后，如果是其他语言，对`nil`调用任何方法都是非法的，所以你要经常这么干:

	if(roomInstance) {
		[roomInstance addPerson:somePerson];
	}

而在Objective-C中，**对`nil`调用方法是不会引发异常的**(这点感觉比Java爽多了)，当然，方法也不会被成功调用。

###字符串

在Objecive-C中，字符串通常带有`@`符号，表示是一个`NSString`的对象：

	[roomInstance] addPerson:@"yinfeng"];

有人会问对象不都是通过`alloc`来创建的么？`@`是个特殊情况，它能用来快捷方便地创建字符串对象。  
如果想要格式化字符串，可以这样做：

	NSString *str = [NSString stringWithFormat:@"%@",somePerson];

这类似于C语言中的`printf`方法，其更强大的地方在于`%@`可以表示任何对象，它会调用对象的`description`方法(类似于Java的toString)并将`%@`替换成该方法返回的NSString值。

###数组

在Objective-C中，数组有`NSArray`和`NSMutableArray`,`NSArray`是不可变的，意味着当该对象初始化之后，你不能对其添加或者删除元素，当然获取数组中的元素是可以的。`NSMutableArray`是`NSArray`的子类，它能够让你动态添加和删除其中的对象。

	NSMutableArray *array = [[NSMutableArray alloc] init];
	[array addObject:object];

数组中保存的只是对象的指针，而且只能是Objective-C对象的指针，所以原型和结构体是不能添加到数组中去的。同时，由于数组保存的是指针，**一个数组能拥有不同类型的对象**(这个与其他语言有一些不同)。

对一个数组进行越界操作会抛出异常(异常通常意味着应用的crash, 关于异常这里也暂时不细说了)，所以你必须要关注数组的大小：

	int size = [array count];

注意你不能将`nil`添加到数组中，**如果要在数组中添加一个“空”，你必须使用`NSNull`**:

	[array addObejct:[NSNull null]];

获取数组中的元素，一般这样写：

	NSString *object = [array objectAtIndex:0];

###继承

像`NSMutableArray`一样，Objective-C中的类都处于一个继承层次当中，其中最上层的类是`NSObject`,其实现了最基本的方法，如`alloc`,`init`,`description`等。子类会继承超类的所有方法并可以覆盖其中的一些方法。比如，调用`NSObject`的`description`会返回该对象的类型和内存地址，类似于这样:`<Room:0x44222bf>`，`NSObject`的子类`NSArray`覆盖了`description`方法，并返回数组中每一个对象的`description`值。

###初始化方法

有时候，除了init方法，你可能还需要一些参数来初始化对象实例，你可以定义很多初始化方法，最后在初始化的时候指定一个:

	- (id)initWithNameAndSex:(NSString*)name
				         sex:(NSString*)sex

可以看到，该初始化方法是返回`id`的，那为什么返回`id`而不是`Person*`呢？这里有个问题，如果`Person`是有子类的，那么子类就会继承该方法以及它的返回类型，当子类调用该方法的时候，就无法返回子类的类型。所以，这里`id`代表初始化方法返回“任何对象”，我们就不用担心子类会发生什么了。

###isa

我们可以很确切的知道初始化返回的类型(我们怎么知道的？因为我们在调用alloc的时候自己指定的呀)。对象它自己也知道它自己的类型--多亏了`isa`指针。

每个对象都有一个叫`isa`的实例变量，当一个对象被类`alloc`创建的时候，该类就把该对象的`isa`变量设置为该类自己。我们称它为`isa`指针。
`isa`指针是Objective-C最强大的地方。在运行时，当对象要调用某方法时，该对象就找到`isa`指针，从指向的类中找出要运行的方法。

###self

在方法内部，`self`是隐式的本地变量，没有必要去声明它，它会自动指向调用该方法的对象(绝大多数面向对象的语言都有这个概念，有些语言称它为`this`)。`self`用来使对象能调用自己的方法：

	- (id)initWithOnePerson:(NSString*)name
						sex:(NSString*)sex {
		[self setName:name];
		[self setSex:sex];
		return self;
	}

###super

当我们覆盖某个父类的方法时，经常会需要保持父类方法的行为并且在此基础上做一些改变，`super`可以帮我们做到这一点:

	- (void)someMethod {
		[self doSomething];
		[super someMethod];
	}

`super`到底是怎样工作的？当对象调用某个方法的时候，会首先从该对象本身的类中搜索该方法，如果没有，就从父类中找；如果还没有，就再往上找直到找到该方法(如果到最上层都没找到，就会抛出异常).  
当你对`super`调用方法时，你其实是对`self`调用方法，只不过对对象本身方法的搜索被跳过了。

如果初始化方法失败了会返回`nil`，所以**最好将父类初始化方法的返回值存到`self`中并确保它不为`nil`**。

	- (id)initWithOnePerson:(NSString*)name
						sex:(NSString*)sex {
		self = [super init];
		if(self) {
			[self setName:name];
			[self setSex:sex];
		}
		return self;
	}

###异常

**Objective-C是一个动态类型的语言**，在编译期，它无法确保对象能正确调用方法，如果你调用一个不存在或者是未定义的方法就会抛异常。很多其他语言会用try-catch来处理异常，Objective-C也有这个功能但**我们不经常用它**，在Obejctive-C的世界里，异常等同于错误，**需要在代码里修复掉而不是在运行时再去处理**。

##内存管理

内存管理实际上就是在不需要对象的时候销毁它并释放它占用的堆空间，而在仍然需要这个对象的时候保留该空间，那我们如何判断一个对象该不该被释放呢？

* 一个对象，如果没有指针指向它，就该被释放，继续保留它占用的空间就相当于浪费宝贵的内存，我们称之为**内存泄露**
* 一个对象，如果至少有一个指针指向它，就不该被释放。如果释放了该对象，那么就会出现一种很危险的情况:对一个不存在的对象调用方法，这很可能导致应用crash, 我们称之为**过早回收**

###使用ARC

ARC (automatic reference counting)是iOS 5之后引入的一种内存管理机制，它能够自动帮你处理对象的释放和保留。有了它之后，在开发中就不必一直去关注哪些对象有指针在指向，哪些没有指针在指向。(虽然ARC帮你节省了大量的内存管理时间，但还是非常有必要去了解一下它背后的机制的)

###强引用和弱引用

到目前为止，我们所说的指针都是对所指对象的**强引用**，强引用是指指针成为了对象的"拥有者"，只要指针在，对象就会一直存活，相反，**弱引用**是指指针不实际“拥有”它所指向的对象。

弱引用主要是用来解决**依赖循环**的，如果两个对象AB都成为了另一个对象的强引用，那就意味着A拥有B,而B也拥有A, 这样就永远无法被`ARC`所销毁， 以致内存泄露。解决依赖循环的一个很好的办法就是使其中一个引用成为弱引用。

那如何判断哪个指针作为弱引用呢？你可以把依赖循环中的两个对象想象成父子关系，**父对象能"拥有"子对象，但子对象不能"拥有"父对象**，比如说，房间就是父对象，房间里面的人就是子对象。声明一个弱引用就像这样:

	__weak Room *room;

还要需要注意的一点就是弱引用可以知道它指向的对象何时被销毁，当所指向的对象被销毁了，弱引用自动被设置为`nil`。当`__unsafe_unretained`修饰指针时，也能起到类似弱引用的作用，唯一的区别就是当对象被销毁时它不会被自动设置成`nil`. 该修饰符主要是用来兼容iOS5之前的版本的，所以尽量不要用它。

###属性

属性的出现主要是为了节省大量的代码，当你声明一个属性时，你实际已经为它定义了get和set方法:

	@property NSString *name;

上面的代码等同于:

	- (void)setName:(NSString*)str;
	- (NSString*)name;


###synthesize

属性帮你自动声明了get和set方法，更进一步的，`synthesize`帮你自动定义了get和set方法的实现，它一般出现在.m实现文件中，用来修饰**属性**:
	@implement
	@synthesize name;

上面的代码等价于:

	- (void)setName:(NSString*)str {
		name = str;
	}
	- (NSString*)name {
		return name;
	}

你也可以一次`synthesize`多个属性:

	@synthesize name, sex, age, birthday;

但我们不能完全依赖于`synthesize`, 因为有时我们也需要自己实现get和set方法，庆幸的是，**自己实现get和set方法和`synthesize`不冲突**.自己的实现会覆盖`synthesize`自动生成的。

**目前，Xcode会在编译期自动生成`@synthesize`声明，所以我们只要声明属性就可以了**

###属性修饰符

每个属性可以被几个修饰符所修饰:

	@property (nonatomic, readwrite, strong) NSString *name;

属性修饰符主要用来改变`@synthesize`自动产生的代码，**如果你是自己实现get和set方法，那修饰符只是建议性的**.

一共有三种修饰符，每种修饰符都有两到三个选项，其中有一个选项是默认的，不用显示声明。  

第一种修饰符有两个选择:`nonatomic`和`atomic`.  
如果被`atomic`修饰，自动生成的get和set方法会保证get和set返回完整的值，而不去理会其他线程的set行为，举个例子，线程A执行到get方法中间的时候，线程B执行了set方法，那么线程A会得到B执行之前属性的值，而属性最后的值是B线程set的值。`@synthesize`自动生成的代码类似于这样子:(真实的实现还要复杂一些)

	- (void)setName:(NSString*)str {
		@synchronized(self) {
			name = str;
		}
	}
	- (NSString*)name {
		@synchronized(self) {
			return name;
		}
	}

`nonatomic`无法保证这一点，但是它在性能上要比`atomic`更快(因为没有锁的开销).  
但是`atomic`**并不保证线程安全**，如果A线程在执行get方法的同时，B和C线程也在执行set方法，那么A线程的结果可能有三种，而属性最后的值可能是B线程set方法中的值，也可能是C线程set方法中的值。  
为了性能，大部分时间我们都是选择`nonatomic`,像`NSString`,`NSArray`这样的不可变属性都是线程安全的，而对于UI的代码也是线程安全的，因为**UI的代码总是在主线程执行**。

第二种修饰符也是两个选择:`readwrite`和`readonly`，顾名思义，`readwrite`的属性同时声明了set和get方法，而`readonly`的属性只有get方法。

第三种修饰符用来描述属性的内存管理，默认选项是`assign`,`assign`一般用来描述非指针的原生类型，而对于对象指针来说，一般为`strong`或者`weak`，两者的区别前面已经阐述过。这里着重讲一下另外一个选择`copy`,一般来说，当你有一个属性指向一个有多个子类的对象时，安全的做法是拷贝一份该对象，而不是直接指向它:

	NSMutableString *mutableString = [[NSMutableString alloc] init];
	Person *person = [[Person alloc] initWithName:name];

上面的代码存在的问题是，`mutableString`可能在其他地方被修改了，而`person`根本不知道，这样就会导致该对象并没有按你期望的去初始化，防御性的办法就是将属性变成`copy`:

	@property (nonatomic, copy) NSString *name;

`copy`和`strong`一样都是强引用.当属性是`copy`修饰的，生成的set方法会有些变化:

	- (void)setName:(NSString*)str {
		name = [str copy];
	}

###pragma mark

`#pragma mark`可以对一个类的各个方法进行分组，方便查找，一个良好的方法分组应该是这样的:

	#pragma mark - Lifecycle

	- (instancetype)init {}
	- (void)dealloc {}
	- (void)viewDidLoad {}
	- (void)viewWillAppear:(BOOL)animated {}
	- (void)didReceiveMemoryWarning {}

	#pragma mark - Custom Accessors

	- (void)setCustomProperty:(id)value {}
	- (id)customProperty {}

	#pragma mark - IBActions

	- (IBAction)submitData:(id)sender {}

	#pragma mark - Public

	- (void)publicMethod {}

	#pragma mark - Private

	- (void)privateMethod {}

	#pragma mark - Protocol conformance
	#pragma mark - UITextFieldDelegate
	#pragma mark - UITableViewDataSource
	#pragma mark - UITableViewDelegate

	#pragma mark - NSCopying

	- (id)copyWithZone:(NSZone *)zone {}

	#pragma mark - NSObject

	- (NSString *)description {}

对应的XCode的Jump bar就会这样显示:

![pic](/images/jumpBar.jpg)

先写到这吧~
