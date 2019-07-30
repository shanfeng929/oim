import Content from '@/app/com/data/chat/content/Content';
import Item from '@/app/com/data/chat/content/Item';
import DateUtil from '@/app/lib/util/DateUtil';

export default class CoreContentUtil {

    public static getChatShowTime(timestamp: number) {
        let time = '';
        const date = (timestamp) ? new Date(timestamp) : new Date();
        const dateTimestamp = new Date().getTime();
        const isOverDay = (dateTimestamp - timestamp) > (1000 * 60 * 60 * 12);
        time = (isOverDay) ? DateUtil.format('MM-dd hh:mm:ss', date) : DateUtil.format('hh:mm:ss', date);
        return time;
    }

    public static getText(content: Content): string {
        let sb = '';
        if (null != content) {
            const sections = content.sections;
            if (null != sections) {
                for (const s of sections) {
                    const items = s.items;
                    if (null != items) {
                        for (const i of items) {
                            if (Item.TYPE_TEXT === (i.type)) {
                                sb = sb + (i.value);
                            }
                            if (Item.TYPE_FACE === (i.type)) {
                                sb = sb + ('[表情]');
                            }
                            if (Item.TYPE_IMAGE === (i.type)) {
                                sb = sb + ('[图片]');
                            }
                            if (sb.length > 60) {
                                break;
                            }
                        }
                    }
                }
            }
        }
        return sb.toString();
    }

    public static getItemSize(content: Content): number {
        let size = 0;
        if (null != content) {
            const sections = content.sections;
            if (null != sections) {
                for (const s of sections) {
                    const items = s.items;
                    if (items) {
                        size = size + items.length;
                    }
                }
            }
        }
        return size;
    }

    public static getImageItemList(content: Content): Item[] {
        const imageList: Item[] = [];
        if (null != content) {
            const sections = content.sections;
            if (null != sections) {
                for (const s of sections) {
                    const items = s.items;
                    if (items) {
                        for (const i of items) {
                            if (Item.TYPE_IMAGE === i.type) {
                                imageList.push(i);
                            }
                        }
                    }
                }
            }
        }
        return imageList;
    }
}
