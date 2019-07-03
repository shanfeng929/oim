import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';

export default class ContactRelationSender extends AbstractMaterial {

    private action: string = '1.2.103';

    public getList(back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        this.appContext.netServer.send(m, back, parallel);
    }


    public getRelation(contactUserId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = {};
        m.body.contactUserId = contactUserId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public updateRemark(contactUserId: string, remark: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0005');
        m.body = {};
        m.body.contactUserId = contactUserId;
        m.body.remark = remark;
        this.appContext.netServer.send(m, back, parallel);
    }

    public moveCategory(contactUserIds: string[], categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.contactUserIds = contactUserIds;
        m.body.categoryId = categoryId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public delete(contactUserId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.contactUserId = contactUserId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public updateBlocked(contactUserId: string, isBlocked: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0008');
        m.body = {};
        m.body.contactUserId = contactUserId;
        m.body.isBlocked = isBlocked;
        this.appContext.netServer.send(m, back, parallel);
    }
}
