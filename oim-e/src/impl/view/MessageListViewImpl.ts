import MessageListView from '@/app/com/main/view/MessageListView';

import messageListModel from '@/impl/data/MessageListModel';
import AbstractMaterial from '@/app/base/AbstractMaterial';

export default class MessageListViewImpl extends AbstractMaterial implements MessageListView {


    public addOrUpdateItem(type: string, key: string, name: string, avatar: string, gray: boolean, onSelect: (key: string) => void, onDelete: (userId: string) => void): void {
        messageListModel.addOrUpdateItem(type, key, name, avatar, gray, onSelect, onDelete);
    }

    public isItemShowing(type: string, key: string): boolean {
        return messageListModel.isItemShowing(type, key);
    }

    public removeItem(type: string, key: string): void {
        messageListModel.removeItem(type, key);
    }

    public setItemRed(type: string, key: string, red: boolean, count: number): void {
        count = (count > 99) ? 99 : count;
        messageListModel.setItemRed(type, key, red, count);
    }

    public updateItemText(type: string, key: string, text: string, time: string): void {
        messageListModel.updateItemText(type, key, text, time);
    }

    public selectItem(type: string, key: string) {
        messageListModel.selectItem(type, key);
    }

    public hasItem(type: string, key: string): boolean {
        return messageListModel.hasItem(type, key);
    }

    public clear(): void {
        messageListModel.clear();
    }
}
