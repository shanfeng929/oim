package com.im.server.general.business.action;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.im.server.general.common.bean.UserCategory;
import com.im.server.general.common.service.UserCategoryService;
import com.onlyxiahui.common.message.result.ResultMessage;
import com.onlyxiahui.general.annotation.action.ActionMapping;
import com.onlyxiahui.general.annotation.action.MethodMapping;
import com.onlyxiahui.general.annotation.parameter.Define;
import com.onlyxiahui.net.session.SocketSession;

/**
 * 描述：
 * 
 * @author XiaHui
 * @date 2016年1月8日 下午8:12:59
 * @version 0.0.1
 */
@Component
@ActionMapping(value = "1.102")
public class UserCategoryAction {
	@Resource
	private UserCategoryService userCategorySerivce;

	/**
	 * 新增联系人分组
	 * @param userMessage
	 * @param dataWrite
	 * @return
	 */
	@MethodMapping(value = "1.1.0001")
	public ResultMessage addUserCategory(SocketSession socketSession, @Define("userCategory") UserCategory userCategory) {
		if (null == userCategory.getUserId() || "".equals(userCategory.getUserId())) {
			userCategory.setUserId(socketSession.getKey());
		}
		return userCategorySerivce.addUserCategory(userCategory);
	}

	/**
	 * 修改分组名
	 * @param socketSession
	 * @param userId
	 * @param id
	 * @param name
	 * @return
	 */
	@MethodMapping(value = "1.1.0003")
	public ResultMessage updateUserCategoryName(
			SocketSession socketSession,
			@Define("userId") String userId,
			@Define("userCategoryId") String id,
			@Define("userCategoryName") String name) {
		userId = socketSession.getKey();
		return userCategorySerivce.updateUserCategoryName(id, name);
	}
}
