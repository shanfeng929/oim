import AbstractMaterial from '@/app/base/AbstractMaterial';
import User from '@/app/com/bean/User';
import UserBox from '@/app/com/main/box/UserBox';
import UserChatManager from '@/app/com/main/manager/UserChatManager';
import Content from '@/app/com/data/chat/content/Content';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserSender from '@/app/com/main/sender/UserSender';
import UserChatInfoManager from '@/app/com/main/manager/UserChatInfoManager';
import UserChatItemManager from '@/app/com/main/manager/UserChatItemManager';
import UserMessageUnreadBox from '@/app/com/main/box/UserMessageUnreadBox';
import CoreContentUtil from '@/app/com/main/util/CoreContentUtil';
import PromptManager from '@/app/com/main/manager/PromptManager';
import SoundType from '@/app/com/main/component/SoundType';
import AllMessageUnreadBox from '@/app/com/main/box/AllMessageUnreadBox';
import MessageAllUnreadManager from '@/app/com/main/manager/MessageAllUnreadManager';


export default class UserChatService extends AbstractMaterial {

    public chat(isReceive: boolean, sendUserId: string, receiveUserId: string, content: Content) {
        const own = this;
        const ub: UserBox = this.appContext.getMaterial(UserBox);
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);

        const ownUserId = pb.getUserId();
        const ownUser: User = pb.getUser();
        const isOwn: boolean = sendUserId === ownUserId;

        const showUserId: string = (isOwn) ? receiveUserId : sendUserId;
        const ud: User = ub.getUser(showUserId);

        const showUserData: User = ud;
        const chatUserData: User = (isOwn) ? ownUser : ud;

        if (null == showUserData) {
            const dataBackAction: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {

                        const user: User = data.body.user;
                        if (null != user) {
                            ub.putUser(user);
                            const showUser = user;
                            const chatUser = (isOwn) ? ownUser : user;
                            own.showChatMessage(isReceive, isOwn, showUser, chatUser, content);
                        }
                    }
                },
            } as DataBackAction;
            const userSender: UserSender = this.appContext.getMaterial(UserSender);
            userSender.getUser(showUserId, dataBackAction);
        } else {
            this.showChatMessage(isReceive, isOwn, showUserData, chatUserData, content);
        }
    }

    public showChatMessage(isReceive: boolean, isOwn: boolean, showUser: User, chatUser: User, content: Content) {
        const userId = showUser.id;
        const ucm: UserChatManager = this.appContext.getMaterial(UserChatManager);
        ucm.chat(isReceive, isOwn, showUser, chatUser, content);

        const userChatInfoManager: UserChatInfoManager = this.appContext.getMaterial(UserChatInfoManager);
        const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
        const userMessageUnreadBox: UserMessageUnreadBox = this.appContext.getMaterial(UserMessageUnreadBox);
        const allMessageUnreadBox: AllMessageUnreadBox = this.appContext.getMaterial(AllMessageUnreadBox);
        const messageAllUnreadManager: MessageAllUnreadManager = this.appContext.getMaterial(MessageAllUnreadManager);

        const showTime = CoreContentUtil.getChatShowTime(content.timestamp);
        const text = CoreContentUtil.getText(content);

        if (!userChatItemManager.hasItem(userId)) {
            userChatItemManager.addOrUpdate(showUser);
        }

        userChatItemManager.updateItemText(userId, text, showTime);
        const isChatShowing: boolean = userChatInfoManager.isChatShowing(userId);
        const isTabShowing: boolean = messageAllUnreadManager.isMessageItemShowing();
        if ((!isChatShowing || !isTabShowing) && !isOwn) {
            userMessageUnreadBox.plusUnread(userId);
            allMessageUnreadBox.plusUnread();

            const totalUnreadCount = allMessageUnreadBox.getTotalUnreadCount();
            const unreadCount = userMessageUnreadBox.getUnreadCount(userId);
            const red = unreadCount > 0;
            const totalRed = totalUnreadCount > 0;
            userChatItemManager.setItemRed(userId, red, unreadCount);
            messageAllUnreadManager.setMessageItemRed(totalRed, totalUnreadCount);

            const promptManager: PromptManager = this.appContext.getMaterial(PromptManager);
            promptManager.playSound(SoundType.TYPE_MESSAGE);
            // promptManager.put()
        }
    }

    public loadHistory(userId: string, startMessageKey: string, count: number) {
        const ucm: UserChatManager = this.appContext.getMaterial(UserChatManager);
        ucm.loadHistory(userId, startMessageKey, count);
    }
}
