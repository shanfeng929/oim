package com.im.server.general.business.push;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.im.server.bridge.net.WriteHandler;
import com.onlyxiahui.common.message.Head;
import com.onlyxiahui.common.message.push.PushMessage;

@Service
public class RemotePush {

	@Resource
	WriteHandler writeHandler;

	/**
	 * 服务器收到客户端后
	 * 
	 * @param userId
	 */
	public void pushReceivedRemoteAddress(String userId) {
		Head head = new Head();
		head.setAction("1.504");
		head.setMethod("1.2.0002");
		head.setTime(System.currentTimeMillis());
		PushMessage message = new PushMessage();
		message.setHead(head);
		writeHandler.push(userId, message);
	}

	public void pushRequestRemoteControl(String key, String receiveUserId, String sendUserId) {
		Head head = new Head();
		head.setAction("1.504");
		head.setMethod("1.2.0004");
		head.setTime(System.currentTimeMillis());
		head.setKey(key);

		PushMessage message = new PushMessage();
		message.setHead(head);
		message.put("receiveUserId", receiveUserId);
		message.put("sendUserId", sendUserId);
		writeHandler.push(receiveUserId, message);
	}

	public void pushResponseRemoteControl(String key, String sendUserId, String receiveUserId, String actionType, String code, String message) {
		Head head = new Head();
		head.setAction("1.504");
		head.setMethod("1.2.0005");
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

	public void pushRequestRemoteAssist(String key, String receiveUserId, String sendUserId) {
		Head head = new Head();
		head.setAction("1.504");
		head.setMethod("1.2.0006");
		head.setTime(System.currentTimeMillis());
		head.setKey(key);

		PushMessage message = new PushMessage();
		message.setHead(head);
		message.put("receiveUserId", receiveUserId);
		message.put("sendUserId", sendUserId);
		writeHandler.push(receiveUserId, message);
	}

	public void pushResponseRemoteAssist(String key, String sendUserId, String receiveUserId, String actionType, String code, String message) {
		Head head = new Head();
		head.setAction("1.504");
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

	public void pushReleaseRemoteControl(String key, String receiveUserId, String sendUserId) {
		Head head = new Head();
		head.setAction("1.504");
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
