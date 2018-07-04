package org.jsonq.infra.api.doc.task;

import org.apache.commons.lang3.RandomUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.util.StringUtil;
import org.jsonq.infra.api.doc.facade.CrawlerXinBangFacade;
import org.jsonq.service.crawler.core.service.CompanyService;
import org.jsonq.service.crawler.facade.CrawlerXinBangFacade;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.concurrent.ConcurrentLinkedQueue;


/**
 * 离线爬公众号
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
    private CrawlerXinBangFacade crawlerXinBangFacade;

    @Scheduled(fixedDelay = 20 * 1000)
    public void run() {
        try {
            Thread.sleep(RandomUtils.nextInt(1, 40000));
            searchOne();
        }
        catch (InterruptedException e) {
        }
    }

    public void searchOne() {
        String companyName = concurrentLinkedQueue.poll();
        if (StringUtil.isEmpty(companyName)) {
            return;
        }
        if (companyService.selectByName(companyName) == null) {
            crawlerXinBangFacade.crawlerCompanyInfo(companyName);
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
