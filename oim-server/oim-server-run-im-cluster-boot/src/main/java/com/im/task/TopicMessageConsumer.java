package com.im.task;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;

import com.im.server.general.business.mq.MessageData;
import com.im.server.general.business.mq.MessageQueueReadHandler;
import com.onlyxiahui.common.lib.util.OnlyJsonUtil;

/**
 * @author: XiaHui
 * @date: 2018-03-02 11:27:23
 */
public class TopicMessageConsumer implements MessageListener {

	@Resource
	MessageQueueReadHandler messageQueueReadHandler;

	@Override
	public void onMessage(Message message) {
		try {
			String json = new String(message.getBody());
			MessageData md = OnlyJsonUtil.jsonToObject(json, MessageData.class);
			String type = md.getType();
			String key = md.getKey();
			List<String> keyList = md.getKeyList();
			String data = md.getData();

			if (MessageData.type_one.equals(type)) {
				messageQueueReadHandler.push(key, data);
			}

			if (MessageData.type_all.equals(type)) {
				messageQueueReadHandler.push(data);
			}

			if (MessageData.type_without_one.equals(type)) {
				messageQueueReadHandler.pushWithout(key, data);
			}

			if (MessageData.type_without_list.equals(type)) {
				messageQueueReadHandler.pushWithout(keyList, data);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
