---
layout: post
title: "判定一个点是否在多边形内部"
description: "如何快速而又优雅地判定一个点是否在多边形内部"
category: Programming
tags: [Algorithm]
---
{% include JB/setup %}

##问题 
假设我们有一个多边形由n个点组成`Pn={p1,p2,p3,p4,p5...pn} ` , 求一个点`p(x,y)`是否在多边形内？  
在图形编程中，坐标的利用是不可忽视的。在这里判断一个点是否在多边行内部（可以包括线上）就要利用到各个点的坐标关系。下面开始讨论具体的方法。

##解决  

首先要讲究速度，在运行复杂的算法之前，我们首先做一个简单的判定。在多边形的顶点中分别找出X座标和Y座标的最小/最大值。比如，你有点`(9,1),(4,3),(2,7),(8,2),(3,6)`所围成的多边形。那么Xmin为2, Xmax为9, Ymin为1 而 Ymax为7。现在我们知道你的多边形中没有一个点的X座标比2小或者比9大，也没有一个点的Y座标比1小或者比7大。这样你就可以快速排除很多不在多边形中的点：
```    
// p is your point, p.x is the x coord, p.y is the y coord
if (p.x < Xmin || p.x > Xmax || p.y < Ymin || p.y > Ymax) {
// Definitely not within the polygon!
}
```
这是第一个判定条件，如果在这一步已经把问题所要求的`p(x,y)`排除在多边形之外了(虽然这只是个非常粗糙的测试！)，那么就没必要进行下面判定了，非常"速度"吧？  

如果上面的判定没排除掉`p(x,y)`，说明这个点是在多边形的座标边界之内的，但并不意味着这个点就在多边形内了。我们需要一个更复杂一点的算法去判定这个点是否真在多边形内，当然我们有很多选择。以下是一些多边形的例子(凸多边形、凹多边形、"有洞"的多边形）

![pic](/images/polygon.jpg)

最简单的方法是使用**射线法**，因为它能适用于所有类型的多边形，不用考虑特殊的情况而且速度也比较快。该算法的思想很简单：在多边形外面任意一点画一条虚拟的射线到`p(x,y)`然后计算该射线与多边形上的边相交的次数。如果该次数是偶数，说明`p(x,y)`在多边形外，如果是奇数，则在多边形内。

对于那些离多边形的边非常非常近的点来说(玩找茬的高手都看不出这些点到底在里面还是外面...），**环绕数算法**更准确，对于这些点由于浮点数精度和舍入的问题，射线法可能会失败。但是环绕数算法速度很慢很慢，如果你不在意这些很近很近的点，就简单点吧！

还记得上面的那些边界座标吧？我们可以这样画射线：

* `(Xmin - e, p.y)` 到`p(x,y)`
* `p(x,y)`到`(Xmax + e, p.y)` 
* `(p.x, Ymin - e)`到`p(x,y)`
*  `p(x,y)`到`(p.x, Ymax + e)`

随便选一条吧，只要记住这个射线的起始点分别是多边形外和`p(x,y)`.  
那e又是干什么的？e相当于边界外的一个缓冲区，因为上面说过，射线法对于离多边形很近的点会失败。e应该选多大？不用太大，取决于你的多边形的座标大小，你可以将e取为1.0，但如果你多边形的座标都很小，0.001都足够大了，或者你可以这样计算e:

    e = ((Xmax - Xmin) / 100)

到这里我们有射线了！那么问题从"这个点是否在多边形内"变成了"射线和多边形的边相交几次"，那么现在我们需要的是边了，每条边都是由两个顶点定义的：

    边1: (X1/Y1)-(X2/Y2)
    边2: (X2/Y2)-(X3/Y3)
    边3: (X3/Y3)-(X4/Y4)
    :

把射线和多边形的每一条边都想象成一个向量，射线跟每一条边不是相交一次就是不相交。

```
// Test the ray against all sides
int intersections = 0;
for (side = 0; side < numberOfSides; side++) {
    // Test if current side intersects with ray.
    // If yes, intersections++;
}
if ((intersections & 1) == 1) {
    // Inside of polygon
} else {
    // Outside of polygon
}
```

快要完成了，最后就是怎么判断两个向量是否相交，以下是相关代码：

```
#define NO 0
#define YES 1
#define COLLINEAR 2

int areIntersecting(
    float v1x1, float v1y1, float v1x2, float v1y2,
    float v2x1, float v2y1, float v2x2, float v2y2
) {
    float d1, d2;
    float a1, a2, b1, b2, c1, c2;

    // Convert vector 1 to a line (line 1) of infinite length.
    // We want the line in linear equation standard form: A*x + B*y + C = 0
    // See: http://en.wikipedia.org/wiki/Linear_equation
    a1 = v1y2 - v1y1;
    b1 = v1x1 - v1x2;
    c1 = (v1x2 * v1y1) - (v1x1 * v1y2);

    // Every point (x,y), that solves the equation above, is on the line,
    // every point that does not solve it, is either above or below the line.
    // We insert (x1,y1) and (x2,y2) of vector 2 into the equation above.
    d1 = (a1 * v2x1) + (b1 * v2y1) + c1;
    d2 = (a1 * v2x2) + (b1 * v2y2) + c1;

    // If d1 and d2 both have the same sign, they are both on the same side of
    // our line 1 and in that case no intersection is possible. Careful, 0 is
    // a special case, that's why we don't test ">=" and "<=", but "<" and ">".
    if (d1 > 0 && d2 > 0) return NO;
    if (d1 < 0 && d2 < 0) return NO;

    // We repeat everything above for vector 2.
    // We start by calculating line 2 in linear equation standard form.
    a2 = v2y2 - v2y1;
    b2 = v2x1 - v2x2;
    c2 = (v2x2 * v1y1) - (v2x1 * v2y2);

    // Calulate d1 and d2 again, this time using points of vector 1
    d1 = (a2 * v1x1) + (b2 * v1y1) + c2;
    d2 = (a2 * v1x2) + (b2 * v1y2) + c2;

    // Again, if both have the same sign (and neither one is 0),
    // no intersection is possible.
    if (d1 > 0 && d2 > 0) return NO;
    if (d1 < 0 && d2 < 0) return NO;

    // If we get here, only three possibilities are left. Either the two
    // vectors intersect in exactly one point or they are collinear
    // (they both lie both on the same infinite line), in which case they
    // may intersect in an infinite number of points or not at all.
    if ((a1 * b2) - (a2 * b1) == 0.0f) return COLLINEAR;

    // If they are not collinear, they must intersect in exactly one point.
    return YES;
}
```

##这么长？我和我的小伙伴们都惊呆了，有木有再简单一点的？

**当然有。**

```
int pnpoly(int nvert, float *vertx, float *verty, float testx, float testy)
{
  int i, j, c = 0;
  for (i = 0, j = nvert-1; i < nvert; j = i++) {
    if ( ((verty[i]>testy) != (verty[j]>testy)) &&
     (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) )
       c = !c;
  }
  return c;
}
```
参数：

* nvert: 多边形的顶点数
* vertx, verty: 顶点X座标和Y座标分别组成的数组
* testx, testy: 需要测试的点的X座标和Y座标

7行代码，简洁，明了，当然，如果你的多边形是可能"有孔"的，还是需要单独考虑的。

