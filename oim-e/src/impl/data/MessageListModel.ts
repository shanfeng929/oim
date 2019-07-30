import IconItemData from '@/views/common/list/IconItemData';
import IconItemBox from '@/views/common/list/IconItemBox';

class MessageListModel {

    public list: IconItemData[] = [];
    public box: IconItemBox = new IconItemBox();

    private map: Map<string, IconItemData> = new Map<string, IconItemData>();

    public addOrUpdateItem(type: string, key: string, name: string, avatar: string, gray: boolean, onSelect: (key: string) => void, onDelete: (userId: string) => void): void {
        const id = this.getId(type, key);
        let item = this.map.get(id);
        if (!item) {
            item = new IconItemData();
            this.map.set(id, item);
            this.list.push(item);
        }
        item.key = key;
        item.name = name;
        item.avatar = avatar;
        item.gray = gray;
        item.onSelect = onSelect;
        item.onDelete = onDelete;
    }

    public isItemShowing(type: string, key: string): boolean {
        const id = this.getId(type, key);
        const item = this.map.get(id);
        let show: boolean = false;
        if (item) {
            show = item.active;
        }
        return false;
    }

    public removeItem(type: string, key: string): void {
        const id = this.getId(type, key);
        const item = this.map.get(id);
        this.map.delete(id);
        if (item) {
            const index = this.list.indexOf(item);
            if (index > -1) {
                this.list.splice(index, 1);
            }
        }
    }

    public setItemRed(type: string, key: string, red: boolean, count: number): void {
        const id = this.getId(type, key);
        const item = this.map.get(id);
        if (item) {
            item.red = red;
            item.redCount = count;
        }
    }

    public updateItemText(type: string, key: string, text: string, time: string): void {
        const id = this.getId(type, key);
        const item = this.map.get(id);
        if (item) {
            item.text = text;
            item.time = time;
        }
    }

    public selectItem(type: string, key: string) {
        const id = this.getId(type, key);
        const item = this.map.get(id);
        if (item) {
            this.box.select(item);
        }
    }

    public hasItem(type: string, key: string) {
        const id = this.getId(type, key);
        return this.map.has(id);
    }

    public clear() {
        this.list = [];
        this.map = new Map<string, IconItemData>();
        this.box = new IconItemBox();
    }

    private getId(type: string, key: string): string {
        const id = type + '_' + key;
        return id;
    }
}

export default new MessageListModel();
