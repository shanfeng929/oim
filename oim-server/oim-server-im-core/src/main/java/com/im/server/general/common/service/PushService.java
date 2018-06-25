package com.im.server.general.common.service;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.im.server.bridge.net.WriteHandler;
import com.onlyxiahui.common.message.Head;
import com.onlyxiahui.common.message.result.ResultBodyMessage;

/**
 * @author Only
 * @date 2016年5月20日 上午11:45:04
 */
@Service
public class PushService {
	
	protected final Logger logger = LogManager.getLogger(this.getClass());
	
	@Resource
	WriteHandler dataHandler;


	public void pushToAll(String method, Object body) {
		Head head = new Head();
		head.setAction("1.700");
		head.setMethod(method);
		head.setTime(System.currentTimeMillis());
		ResultBodyMessage m = new ResultBodyMessage();
		m.setHead(head);
		m.setBody(body);
		dataHandler.push(m);
	}

	public void pushToUser(String userId, String method, Object body) {
		Head head = new Head();
		head.setAction("1.700");
		head.setMethod(method);
		head.setTime(System.currentTimeMillis());
		ResultBodyMessage m = new ResultBodyMessage();
		m.setHead(head);
		m.setBody(body);
		dataHandler.push(userId, m);
	}
}
