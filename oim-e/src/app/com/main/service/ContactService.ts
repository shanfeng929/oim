import AbstractMaterial from '@/app/base/AbstractMaterial';
import ContactListManager from '@/app/com/main/manager/ContactListManager';
import User from '@/app/com/bean/User';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import UserSender from '@/app/com/main/sender/UserSender';
import UserBox from '@/app/com/main/box/UserBox';
import ContactListBox from '@/app/com/main/box/ContactListBox';
import BaseUtil from '@/app/lib/util/BaseUtil';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
import ContactManager from '@/app/com/main/manager/ContactManager';
import UserChatItemManager from '@/app/com/main/manager/UserChatItemManager';

export default class ContactService extends AbstractMaterial {

    public setList(list: User[]): void {
        if (list) {
            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            ccm.setUserList(list);

            const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
            for (const data of list) {
                const id = data.id;

                if (userChatItemManager.hasItem(id)) {
                    userChatItemManager.addOrUpdateChatItemById(id);
                }
            }
        }
    }

    public addByUserId(userId: string) {
        if (userId) {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {
                        const user: User = data.body.user;
                        if (user) {
                            own.add(user);
                        }
                    }
                },
            } as AbstractDataBackAction;
            const userSender: UserSender = this.appContext.getMaterial(UserSender);
            userSender.getUser(userId, back);
        }
    }

    public add(user: User): void {
        if (user) {
            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            ccm.addOrUpdateUser(user);
        }
    }

    public getShowNameById(userId: string): string {
        const contactManager: ContactManager = this.appContext.getMaterial(ContactManager);
        return contactManager.getShowNameById(userId);
    }

    public getShowName(user: User): string {
        const contactManager: ContactManager = this.appContext.getMaterial(ContactManager);
        return contactManager.getShowName(user);
    }
}
