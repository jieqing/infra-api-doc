package org.jsonq.service.crawler.task;

import org.apache.commons.lang3.RandomUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.constant.Constant;
import org.jsonq.service.crawler.api.ifacade.ICrawlerXinBangFacade;
import org.jsonq.service.crawler.po.AsyncWxPublicPo;
import org.jsonq.service.crawler.service.AsyncWxPublicService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.concurrent.ConcurrentLinkedQueue;


/**
 * 异步爬公众号
 *
 * @author jq
 */
@Service
public class AsyncCrawlerCompanyTask {

    private Logger logger = LogManager.getLogger(AsyncCrawlerCompanyTask.class);

    private ConcurrentLinkedQueue<String> concurrentLinkedQueue = new ConcurrentLinkedQueue<>();


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
                crawlerXinBangFacade.search(publicName, asyncWxPublicPo.getNonce(), asyncWxPublicPo.getXyz(), asyncWxPublicPo.getOrderBy(), asyncWxPublicPo.getFilter());
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
//            crawlerXinBangService.searchCompanyFromQicChaCha(name, QCC_ZS_COOKIE);
//            geogVillagePo.setIsSearch(Constant.YES);
//            geogVillageRepository.updateById(geogVillagePo);
//        } catch (Exception e) {
//            logger.error("AsyncCrawlerCompanyTask", e);
//        }
//    }

}
