import AbstractMaterial from '@/app/base/AbstractMaterial';
import Group from '@/app/com/bean/Group';
import GroupBox from '@/app/com/main/box/GroupBox';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import GroupChatView from '@/app/com/main/view/GroupChatView';
import MessageAreaView from '@/app/com/main/view/MessageAreaView';


export default class GroupChatInfoManager extends AbstractMaterial {

    private chatType = 'group_chat';

    public showGroupChatById(groupId: string) {
        const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);
        const group: Group = groupBox.getGroup(groupId);
        if (group) {
            this.showGroupChat(group);
        }
    }

    public showGroupChat(group: Group) {
        const messageAreaView: MessageAreaView = this.appContext.getView(ViewEnum.MessageAreaView);
        messageAreaView.showType(this.chatType);

        const groupChatView: GroupChatView = this.appContext.getView(ViewEnum.GroupChatView);
        groupChatView.setGroup(group);
    }

    public isChatShowing(groupId: string): boolean {
        let showing = false;
        const groupChatView: GroupChatView = this.appContext.getView(ViewEnum.GroupChatView);
        const messageAreaView: MessageAreaView = this.appContext.getView(ViewEnum.MessageAreaView);
        showing = (messageAreaView.getType() === this.chatType && groupChatView.isShowing(groupId));
        return showing;
    }
}
