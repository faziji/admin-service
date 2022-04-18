## uses

#### 职能定位

采购部门：系统管理（手动录入投标书、供应商评分）

专家评审：供应商权限审核、采购审核 1

财务部门：采购审核、发票管理 2



<hr/>



## ems

#### 信息管理



##### 征询意见√

consultation ： 采购部门或管理员创建、发布  => 添加评论功能



##### 采购公告

采购公告 purchase_announcement ：采购部门创建



##### 结果公告

结果公告 result_announcement 采购部门或管理员创建、发布



##### 更正公告 

更正公告 correct_announcement 采购部门或管理员创建、发布



**需要接口：**

创建、删除、修改、查看

create、delete、update、get

- 创建
  - 创建征询意见 createConsultation
  - 创建采购公告 createPurchaseAnnouncement
  - 创建结果公告 createResultAnnouncement
  - 创建更正公告 createCorrectAnnouncement

字段： createdAt updatedAt

```json
// 1必传 0选传
id id号码
name 文件名  1
description 描述 0
publishTime 发布时间 0
startTime 开始时间 1
endTime 结束时间 1
status 状态 （0未发布、1已发布、2已结束、3已终止、4已生成结果公告）1
publisher 发布人 1

hash 资源哈希码 1
key 资源key值 1

viewTime 阅读次数 1

attachment 附件{ 0
	hash 资源哈希码
    key 资源key值
    name 文件名
}[]

association 关联公示0
    {
        hash 资源哈希码
        key 资源key值
        name 文件名
    }[]

createdAt 创建时间 1
updatedAt 更新时间 1
```

- 创建、创建并发布

优化：创建时判断不能同名

前台列表显示：

- 条数：1 2 3 4 
- 公告名 name
- 发布时间 publishTime
- 距离结束时间

- 需要添加审核人字段



**采购管理:**

- status 4财务审核中、5专家审核中
- preReviewer、currentReviewer、nextReviewer 审核人/审核部门





#### 招投标管理

##### 投标管理

所有项目：供应商提供报价的信息 => 可以查看当前投标情况

###### 结算（是否已结算）

- 未到结束时间，无法结算

- 结算=》生成结算结果

  

成交结果链接 合同管理

成交结果链接发票管理

1. 生成结果

   1. 判断采购公告状态是否结算，status为4已结算，status 状态 （0未发布、1已上线、2已结束、3已终止、4已生成结果公告）1

   2. 操作，生成结果 / 查看结果 0

   3. 调用createResult接口，修改结果公告状态

   4. 同分，参考供应商评分

      





##### 成交结果

所有项目的最终成交结果 => 完成之后需要查看是否有对的结果公告 => 没有结果公告的话需要手动为对应的项目添加结果公告 => 去评分

- 结果字段：result
- 中标公司信息：resultCompony





<hr/>

#### 财务管理

默认加载所有列表，若有`成交结果id`的话直接加载弹窗内容

##### 合同管理

```json
// 必填
签约客户名称 name 1 -
成交结果Id resultId -
成交结果名称 resultName -
签约公司社会统一信用码 username 1 -
签约公司名称 contractName -
我方公司信 company 1 -
我方公司名称 company 1 -
合同名称  contractName 1 -
合同生效时间 effectTime 1 -
合同约定生效方式 chapter 1 盖章后生效chapter -
合同约定失效效方式 unusedMode 1 履行完终止time - 
主合同编号 id 1 -
采购负责人 mangerName 1
税率 taxRate 1  6 | 12
发票类型 invoiceType 1 
合同分数 num 1

// 选填
上传附件 file 数组[] 0
合同备注说明 remark 0
```



##### 发票管理

```json
发票编号 id 1
成交结果id resultId 1 // 获取成交结果的所有列表
成交结果名称 resultName
公司名称 companyName
银行 bank
账号 account
发票金额 amount
邮编 postcode
地址 address
电话 phone
传真 fax
发票附件 attachment 1
```







<hr/>

#### 用户管理√

用户角色

**前台**

- 游客：前台无需登录 visitor
- 供应商：注册申请 => 需要专家评审审核 supplier 或 采购部门

**后台**

- 企业：采购部门procurement、财务部门financial、专家评审部门specialist => 由人事部门管理
- 企业人事部门 hr => 人事部门管理，不能操作自己 
- 企业、开发最高管理员super-admin





##### 供应商注册 

（采购部门/专家信息录入）supplier  录入的形式默认通过

[同意协议确认](http://zbzx.scut.edu.cn:8888/ECP/OrgInfoControllerCgjy.do?method=registration&jgtype=00)=> 

```json
// 供应商 supplier
// 用户基本信息
id 1
用户名 username 1 请输社会统一信用代码（调用第三方接口）
公司名称 companyName 1  与企业公章相符，不含其他字符
密码 password 1
联系人姓名 name
联系人电话 phone 1
联系人邮箱 email 1
邀请人 inviter 0 没有则无需填写
备注 note 0

// 默认
头像（先默认）avatar 1
身份权限role supplier-reviewing => supplier => supplier-unaccess  申请中账户无法投标 不通过 =>unacess、reviewInfo
审核人 reviewer 0
创建时间 createAt
更新时间 update
状态 status （默认：enable）"enable"|| "disable" => 
评分 score 默认 60 需要设置评分体系（100分值） 内部使用=> 不对外开放

// 完善信息时填写
头像 avatar 0
收款账户 shoukuanAccount 0 银行卡
付款账户 fukuanAccount 0 银行卡
付款人/付款公司 fukuan 0 
收款人/收款公司 shoukuan 0 
```

- status 登录时判断是否停用
- 投标时判断是否审核通过
- 创建时间需要转化.format("YYYY-MM-DD HH:mm:ss")格式
- 优化审核不通过的情况
- 加入时间joinDate



##### 企业员工信息

```json
// 基本信息
用户名 username 1 -
密码 password 1 -
联系电话 phone 1 -
身份证号 idNumber 1 -
姓名 name 1 -
邮箱 email 1 - 
加入日期 joinDate 1 -
身份权限 role 1 采购/财务/专家/管理员 -

// 默认
id 1 -
公司名称 companyName 1 -
头像 avatar 1 -
状态 status 1（默认：enable）"enable"启用中 || "disable" 已禁用 -

创建时间  createAt -
更新时间 updateAt -

// 完善信息
银行卡号 creditCardNumber 0 -
出生年月日 birthday 0 -
工作地点 workPlace 0 -
工号 employeeId: "zhuxiangfa" 0 （以后再生成唯一工号）-
```

注意

- status 登录时判断是否停用
- ~~bug：更新出生年月日不同步问题~~ =>数据初始化问题



投标需要在有限时间内报名，报名结束终止即开始投标

采购列表需要多一个报名字段  applySuppliers : Array





## FD

#### 供应商登录

登录后信息展示

```json
公司名 companyName
全国统一信用代码 username
联系人姓名 name
头像 avatar
身份权限 supplier 正常 || supplier-reviewing申请中 || supplier-unaccess已拒绝
账号状态 enable正常 || disable 已被禁用
```

待优化

- 后期可使用联系人手机号或信用代码登录





#### 供应商注册

supplier-reviewing => supplier => supplier-unaccess

需要考虑审核不通过的情况，审核中也能正常登录，修改审核信息



#### 供应商信息修改

可以修改的字段：name phone email 

（完善信息）

```json
// 不能修改
统一信用代码 username 
公司名 companyName
身份权限 role

// 可以直接修改的字段
联系人姓名 name
联系人电话 phone 
联系人邮箱 email 
备注 note
邀请人 inviter

// 完善信息
收款账户 shoukuanAccount 0 银行卡
付款账户 fukuanAccount 0 银行卡
付款人/付款公司 fukuan 0 
收款人/收款公司 shoukuan 0 
```





（更改密码、忘记密码）password => 添加一个密保问题：用于修改密码



####  投标公告更多页面





#### 投标信息筛选



#### 报名 => 投标

账号是否申请成功 => role为supplier => 考虑supplier-unaccess、supplier-reviewing、以及没有登录的情况

###### 投标条件：

- 不为已投标
- 已登录，身份为supplier

后台导入：增、删、查

数据库

```js
// 数据库字段
编号 id 
采购公告编号 announcementId
供应商编号 supplierId
附件 file
金额 amount
投标时间 createdAt
更新时间 updatedAt

// 管理实际显示字段
编号 id  1
采购公告ID announcementId 1 // 必传
采购公告名称 announcementName 1// 必传
供应商编号 supplierUsername 1// 必传
供应商名称 supplierName 1// 必传
投标时间 createdAt 1
更新时间 updatedAt 1
// 金额
附件 file 0 
金额 amount 1
```

- 管理系统先复制一份采购公告

- 数据库所有设置可为空，前端做限制即可

#### 注意

- 投标未开始无法预览、投标结果与投标ing可以预览供应商列表





#### 我的投标 

=> 投标管理：根据username获取自身投标信息





#### 关注投标信息（待定）





