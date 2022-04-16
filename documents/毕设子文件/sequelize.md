## 使用场景

考虑到数据库表是一个二维表，包含多行多列，例如一个`pets`的表：

```
mysql> select * from pets;
+----+--------+------------+
| id | name   | birth      |
+----+--------+------------+
|  1 | Gaffey | 2007-07-07 |
|  2 | Odie   | 2008-08-08 |
+----+--------+------------+
2 rows in set (0.00 sec)
```

每一行可以用一个JavaScript对象表示，例如第一行：

```
{
    "id": 1,
    "name": "Gaffey",
    "birth": "2007-07-07"
}
```

这就是传说中的ORM技术：Object-Relational Mapping，把关系数据库的表结构映射到对象上。

ORM所做的工作就是使应用层读写都是js对象，Sequelize帮我们把对象变成数据库中的行





## 模型定义

模型是[Sequelize](https://so.csdn.net/so/search?q=Sequelize&spm=1001.2101.3001.7020)中的重要部分。是数据库表的一个抽象。在Sequelize中，模型是一个继承了Model的类。

在Sequelize中，Models可以通过以下两种等价方式定义：

1. 直接调用sequelize.define(modelName,  attributes, options)方法。

2. 继承Model并且调用init(attributes，options)方法。

Model定义后，可以通过sequelize.models.modelName访问该模型。

sequelize.define内部也是通过调用Model.init方法实现的。



### 方式一：[sequelize.define](https://www.cnblogs.com/zjknb/p/12149420.html)

schema:数据表模型实例
modules：实体模型
controllers：控制器

从上层至下层：routes > controllers > modules(model)>schema



## Model同步

https://www.cnblogs.com/zzsdream/p/11065626.html



1.可以通过调用model.sync(options)同步模型和数据库表，这个方法只能同步一个模型

- **User.sync()**：如果数据库表不存在，则创建数据库表，如果存在，则不做任何操作

- **User.sync({ force: true })**：如果数据库表已经存在，则先删除数据库表，然后重新创建数据表

- **User.sync({ alter: true })**： 这个会比较数据库表当前状态（比如数据库表的列及数据类型等）与模型的不同之处，然后修改数据库表不同的地方以匹配模型。

  

