package com.im.server.general.business.push;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.im.server.bridge.net.WriteHandler;
import com.onlyxiahui.common.message.Head;
import com.onlyxiahui.common.message.push.PushMessage;
import com.onlyxiahui.im.message.data.FileData;

@Service
public class FilePush {

	@Resource
	WriteHandler writeHandler;


	public void pushGetOppositeFileAcceptInfo(String key, String receiveUserId, String sendUserId) {
		Head head = new Head();
		head.setAction("1.505");
		head.setMethod("1.2.0004");
		head.setTime(System.currentTimeMillis());
		head.setKey(key);

		PushMessage message = new PushMessage();
		message.setHead(head);
		message.put("receiveUserId", receiveUserId);
		message.put("sendUserId", sendUserId);
		writeHandler.push(receiveUserId, message);
	}

	public void pushReturnFileAcceptInfo(String key, String sendUserId, String receiveUserId, List<String> acceptTypeList) {
		Head head = new Head();
		head.setAction("1.505");
		head.setMethod("1.2.0005");
		head.setTime(System.currentTimeMillis());
		head.setKey(key);

		PushMessage m = new PushMessage();
		m.setHead(head);
		m.put("receiveUserId", receiveUserId);
		m.put("sendUserId", sendUserId);
		m.put("acceptTypeList", acceptTypeList);
		writeHandler.push(receiveUserId, m);
	}

	public void pushSendOfflineFile(String key, String receiveUserId, String sendUserId,FileData fileData) {
		Head head = new Head();
		head.setAction("1.505");
		head.setMethod("1.2.0006");
		head.setTime(System.currentTimeMillis());
		head.setKey(key);

		PushMessage message = new PushMessage();
		message.setHead(head);
		message.put("receiveUserId", receiveUserId);
		message.put("sendUserId", sendUserId);
		message.put("fileData", fileData);
		writeHandler.push(receiveUserId, message);
	}

	public void pushResponse(String key, String sendUserId, String receiveUserId, String actionType, String code, String message) {
		Head head = new Head();
		head.setAction("1.505");
		head.setMethod("1.2.0007");
		head.setTime(System.currentTimeMillis());
		head.setKey(key);

		PushMessage m = new PushMessage();
		m.setHead(head);
		m.put("receiveUserId", receiveUserId);
		m.put("sendUserId", sendUserId);
		m.put("actionType", actionType);
		m.put("code", code);
		m.put("message", message);
		writeHandler.push(receiveUserId, m);
	}

	public void pushCancel(String key, String receiveUserId, String sendUserId) {
		Head head = new Head();
		head.setAction("1.505");
		head.setMethod("1.2.0008");
		head.setTime(System.currentTimeMillis());
		head.setKey(key);

		PushMessage message = new PushMessage();
		message.setHead(head);
		message.put("receiveUserId", receiveUserId);
		message.put("sendUserId", sendUserId);
		writeHandler.push(receiveUserId, message);
	}

}
