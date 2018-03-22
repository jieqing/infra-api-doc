package org.jasonq.service.crawler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import tk.mybatis.spring.annotation.MapperScan;


/**
 * @author jq
 * @date 2018/3/6
 */
@SpringBootApplication(scanBasePackages = {"org.jasonq"})
@MapperScan(basePackages = "org.jasonq.service.crawler.core.repository.sql")
@EnableScheduling
// @ImportResource({"classpath:disconf.xml"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
