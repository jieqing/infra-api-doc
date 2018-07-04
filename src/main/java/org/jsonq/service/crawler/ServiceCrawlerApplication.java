package org.jsonq.service.crawler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;
import tk.mybatis.spring.annotation.MapperScan;


/**
 * @author jq
 * @date 2018/3/6
 */
@SpringBootApplication(scanBasePackages = {"org.jsonq"})
@MapperScan(basePackages = "org.jsonq.service.crawler.repository.sql")
@EnableScheduling
@EnableDiscoveryClient
//不加basePackages扫描不到接口jar中的配置
@EnableFeignClients(basePackages = "org.jsonq")
// @ImportResource({"classpath:disconf.xml"})
public class ServiceCrawlerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceCrawlerApplication.class, args);
    }

}
