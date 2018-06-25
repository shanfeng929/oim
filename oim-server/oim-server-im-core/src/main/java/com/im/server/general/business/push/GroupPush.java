package com.im.server.general.business.push;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.im.server.bridge.net.WriteHandler;
import com.im.server.general.common.bean.Group;
import com.im.server.general.common.bean.GroupCategoryMember;
import com.im.server.general.common.bean.GroupMember;
import com.onlyxiahui.common.message.Head;
import com.onlyxiahui.common.message.push.PushMessage;

/**
 * @author: XiaHui
 * @date: 2016年8月26日 上午9:21:41
 */
@Service
public class GroupPush {
	@Resource
	WriteHandler writeHandler;

	public void addGroup(String key, Group group,GroupCategoryMember groupCategoryMember,GroupMember groupMember ,List<String> userIdList) {
		PushMessage message = new PushMessage();
		Head head = new Head();
		head.setAction("1.201");
		head.setMethod("1.2.0008");
		head.setKey(key);
		head.setTime(System.currentTimeMillis());
		message.setHead(head);
		message.put("group", group);
		message.put("groupCategoryMember", groupCategoryMember);
		message.put("groupMember", groupMember);
		writeHandler.push(userIdList, message);
	}
	
	
	public void pushUpdateGroup(String key, Group group, List<String> userIdList) {
		PushMessage message = new PushMessage();
		Head head = new Head();
		head.setAction("1.201");
		head.setMethod("1.2.0009");
		head.setKey(key);
		head.setTime(System.currentTimeMillis());
		message.setHead(head);
		message.put("group", group);
		writeHandler.push(userIdList, message);
	}
}
