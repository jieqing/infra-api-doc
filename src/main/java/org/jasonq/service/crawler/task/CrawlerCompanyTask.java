package org.jasonq.service.crawler.task;

import java.util.concurrent.ConcurrentLinkedQueue;

import javax.annotation.Resource;

import org.apache.commons.lang3.RandomUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.util.StringUtil;
import org.jasonq.service.crawler.core.service.CompanyService;
import org.jasonq.service.crawler.core.service.CrawlerXinBangService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


/**
 * 组装数据，通过调用多个service，facade来完成一个完整的业务功能 返回DTO
 * 
 * @author jq
 *
 */
@Service
public class CrawlerCompanyTask {

    private Logger logger = LogManager.getLogger(CrawlerCompanyTask.class);

    private ConcurrentLinkedQueue<String> concurrentLinkedQueue = new ConcurrentLinkedQueue<>();

    @Resource
    private CompanyService companyService;
    @Resource
    private CrawlerXinBangService crawlerXinBangService;

    @Scheduled(fixedDelay = 120 * 1000)
    public void run() {
        try {
            Thread.sleep(RandomUtils.nextInt(1, 60000));
            searchOne();
        }
        catch (InterruptedException e) {
        }
    }

    public void searchOne() {
        String companyName = concurrentLinkedQueue.poll();
        if (companyService.selectByName(companyName) == null) {
            crawlerXinBangService.crawlerCompanyInfo(companyName);
        }
        else {
            searchOne();
        }
    }

    public boolean addAsyncSearchQueue(String companyName) {
        if (StringUtil.isEmpty(companyName)) {
            return true;
        }
        return concurrentLinkedQueue.offer(companyName);
    }

}
