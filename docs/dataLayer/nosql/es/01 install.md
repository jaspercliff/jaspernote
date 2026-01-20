[Install Elasticsearch with Docker | Elasticsearch Guide [8.12] | Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)
在 Elasticsearch 的运行过程中，需要创建大量的虚拟内存区域
`/etc/sysctl.conf` 添加或修改以下行来增加 `vm.max_map_count` 的值：
`vm.max_map_count=262144`
sudo sysctl -p 生效