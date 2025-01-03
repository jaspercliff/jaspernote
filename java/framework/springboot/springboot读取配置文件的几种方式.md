# 读取配置文件

## @Value
@Value 注解被用来从外部配置文件（通常是一个 XML 文件或一个 properties 文件）中注入一个布尔值到 subSeqEnable 字段上。、
"${test.Seq.enable:true}" 表示从配置文件中读取 tae.subSeq.enable 属性的值，如果没有找到则默认为 true。