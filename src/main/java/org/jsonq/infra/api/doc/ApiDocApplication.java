package org.jsonq.infra.api.doc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.scheduling.annotation.EnableScheduling;
import tk.mybatis.spring.annotation.MapperScan;


/**
 * @author jq
 * @date 2018/3/6
 */
@SpringBootApplication(scanBasePackages = {"org.jsonq"})
@MapperScan(basePackages = "org.jsonq.infra.api.doc.respository.sql")
@EnableScheduling
@EnableDiscoveryClient
//@EnableFeignClients(basePackages = "org.jsonq")
public class ApiDocApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiDocApplication.class, args);
    }

}
