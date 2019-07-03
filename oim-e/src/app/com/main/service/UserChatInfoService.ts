import AbstractMaterial from '@/app/base/AbstractMaterial';
import User from '@/app/com/bean/User';
import UserChatInfoManager from '@/app/com/main/manager/UserChatInfoManager';
import UserChatItemManager from '@/app/com/main/manager/UserChatItemManager';
import UserMessageUnreadBox from '@/app/com/main/box/UserMessageUnreadBox';
import AllMessageUnreadBox from '@/app/com/main/box/AllMessageUnreadBox';
import MessageAllUnreadManager from '@/app/com/main/manager/MessageAllUnreadManager';
import UserChatManager from '@/app/com/main/manager/UserChatManager';


export default class UserChatInfoService extends AbstractMaterial {

    public showUserChatById(userId: string) {
        const userChatInfoManager: UserChatInfoManager = this.appContext.getMaterial(UserChatInfoManager);
        userChatInfoManager.showUserChatById(userId);

        const userChatManager: UserChatManager = this.appContext.getMaterial(UserChatManager);
        const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
        const userMessageUnreadBox: UserMessageUnreadBox = this.appContext.getMaterial(UserMessageUnreadBox);
        const allMessageUnreadBox: AllMessageUnreadBox = this.appContext.getMaterial(AllMessageUnreadBox);
        const messageAllUnreadManager: MessageAllUnreadManager = this.appContext.getMaterial(MessageAllUnreadManager);

        const unreadCount = userMessageUnreadBox.getUnreadCount(userId);
        allMessageUnreadBox.minusUnread(unreadCount);

        const totalUnreadCount = allMessageUnreadBox.getTotalUnreadCount();
        const totalRed = totalUnreadCount > 0;
        messageAllUnreadManager.setMessageItemRed(totalRed, totalUnreadCount);

        userMessageUnreadBox.setUnreadCount(userId, 0);
        userChatItemManager.setItemRed(userId, false, 0);

        userChatManager.firstLoadHistory(userId, '', 10);
    }

    public showUserChat(user: User) {
        const userChatInfoManager: UserChatInfoManager = this.appContext.getMaterial(UserChatInfoManager);
        userChatInfoManager.showUserChat(user);

        const userId = user.id;

        const userChatManager: UserChatManager = this.appContext.getMaterial(UserChatManager);
        const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
        const userMessageUnreadBox: UserMessageUnreadBox = this.appContext.getMaterial(UserMessageUnreadBox);
        const allMessageUnreadBox: AllMessageUnreadBox = this.appContext.getMaterial(AllMessageUnreadBox);
        const messageAllUnreadManager: MessageAllUnreadManager = this.appContext.getMaterial(MessageAllUnreadManager);

        const unreadCount = userMessageUnreadBox.getUnreadCount(userId);
        allMessageUnreadBox.minusUnread(unreadCount);

        const totalUnreadCount = allMessageUnreadBox.getTotalUnreadCount();
        const totalRed = totalUnreadCount > 0;
        messageAllUnreadManager.setMessageItemRed(totalRed, totalUnreadCount);

        userMessageUnreadBox.setUnreadCount(userId, 0);
        userChatItemManager.setItemRed(userId, false, 0);

        userChatManager.firstLoadHistory(userId, '', 10);
    }
}
