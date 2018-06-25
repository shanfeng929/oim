package com.oim.core.business.service;

import java.io.File;

import com.oim.core.business.box.PersonalBox;
import com.oim.core.business.manager.SettingManager;
import com.oim.core.business.sender.FileSender;
import com.oim.core.business.view.ChatListView;
import com.oim.core.business.view.FileUploadView;
import com.oim.core.common.action.CallBackAction;
import com.onlyxiahui.app.base.AppContext;
import com.onlyxiahui.app.base.component.AbstractService;
import com.onlyxiahui.im.bean.UserData;
import com.onlyxiahui.im.message.data.FileData;

/**
 * @author XiaHui
 * @date 2018-01-20 12:31:15
 */
public class UserSendChatService extends AbstractService {

	public UserSendChatService(AppContext appContext) {
		super(appContext);
	}

	public void sendUserFile(final String receiveUserId, final File file) {

		if (null != file && file.exists()) {
			SettingManager sm = appContext.getManager(SettingManager.class);
			if (file.length() > sm.getChatSetting().getFileLimitSize()) {
				ChatListView clv = appContext.getSingleView(ChatListView.class);
				clv.showPrompt(sm.getChatSetting().getFileLimitInfo());
				return;
			}
			sendFile(receiveUserId, file);
		}
	}

	private void sendFile(final String receiveUserId, final File file) {
		PersonalBox pb = appContext.getBox(PersonalBox.class);
		UserData user = pb.getUserData();
		final String sendUserId = (null == user) ? null : user.getId();
		CallBackAction<FileData> callBackAction = new CallBackAction<FileData>() {

			@Override
			public void execute(FileData fileData) {
				FileSender fs = appContext.getSender(FileSender.class);
				fs.sendOfflineFile(receiveUserId, sendUserId, fileData);
			}
		};
		FileUploadView fuv = this.appContext.getSingleView(FileUploadView.class);
		fuv.fileUpload(file, callBackAction);
	}
}
