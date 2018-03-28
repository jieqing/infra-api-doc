package org.jasonq.service.crawler.task;

import org.apache.commons.lang3.RandomUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.constant.Constant;
import org.jasonq.service.crawler.api.facade.ICrawlerXinBangFacade;
import org.jasonq.service.crawler.core.po.AsyncWxPublicPo;
import org.jasonq.service.crawler.core.service.AsyncWxPublicService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.concurrent.ConcurrentLinkedQueue;


/**
 * 组装数据，通过调用多个service，facade来完成一个完整的业务功能 返回DTO
 *
 * @author jq
 */
@Service
public class AsyncCrawlerCompanyTask {

    private Logger logger = LogManager.getLogger(AsyncCrawlerCompanyTask.class);

    private ConcurrentLinkedQueue<String> concurrentLinkedQueue = new ConcurrentLinkedQueue<>();


    private String QCC_ZS_COOKIE =
            "UM_distinctid=16260309a3df8-0b2fec682364f9-3f3c5501-13c680-16260309a3e241; zg_did=%7B%22did%22%3A%20%2216260309da612-0d298d5816e542-3f3c5501-13c680-16260309da733%22%7D; _uab_collina=152205842159855832969351; PHPSESSID=f3mr9pje5gpa6i2ptjhpetges6; CNZZDATA1254842228=1912372726-1522026996-https%253A%252F%252Fwww.baidu.com%252F%7C1522113303; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1522032237,1522058422,1522058457,1522115211; hasShow=1; acw_tc=AQAAAM/5NUnsDg0ATRxWy6GUrXv66Yha; _umdata=55F3A8BFC9C50DDABF1AB4AE63C39FC3B9ABFBDA662ECDE95B50AF110BA2A538BBD0E6893AC64473CD43AD3E795C914C5A671E9E4E678F9B6DA8B6675B19F490; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201522118301748%2C%22updated%22%3A%201522118480581%2C%22info%22%3A%201522032221621%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.baidu.com%22%2C%22cuid%22%3A%20%223db1095e98c1f2ce19bf6321243e740e%22%7D; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1522118481";
    private String[] COOKIES = new String[]{};


    @Resource
    private AsyncWxPublicService asyncWxPublicService;
    @Resource
    private ICrawlerXinBangFacade crawlerXinBangFacade;

    @Scheduled(fixedDelay = 20 * 1000)
    public void run() {
        try {
            Thread.sleep(RandomUtils.nextInt(1, 14000));
        } catch (InterruptedException e) {
        }
        try {
            AsyncWxPublicPo asyncWxPublicPo = asyncWxPublicService.poll();
            if (asyncWxPublicPo == null) {
                return;
            }
            String publicName = asyncWxPublicPo.getPublicName();
            if (!asyncWxPublicService.isSearch(publicName)) {
                crawlerXinBangFacade.search(publicName, asyncWxPublicPo.getNonce(), asyncWxPublicPo.getXyz(), asyncWxPublicPo.getOrderBy(), asyncWxPublicPo.getFilter(), QCC_ZS_COOKIE);
            }
            asyncWxPublicPo.setIsSearch(Constant.YES);
            asyncWxPublicService.updateById(asyncWxPublicPo);
        } catch (Exception e) {
            logger.error("AsyncCrawlerCompanyTask", e);
        }
    }

//    @Scheduled(fixedDelay = 20 * 1000)
//    public void run() {
//        try {
//            Thread.sleep(RandomUtils.nextInt(1, 14000));
//        } catch (InterruptedException e) {
//
//        }
//        try {
//            GeogVillagePo geogVillagePo = asyncWxPublicService.poll();
//            String name = geogVillagePo.getName().replace("镇", "").replace("乡", "").replace("街道", "");
//            crawlerXinBangService.crawlerCompanyInfo(name, QCC_ZS_COOKIE);
//            geogVillagePo.setIsSearch(Constant.YES);
//            geogVillageRepository.updateById(geogVillagePo);
//        } catch (Exception e) {
//            logger.error("AsyncCrawlerCompanyTask", e);
//        }
//    }

}
