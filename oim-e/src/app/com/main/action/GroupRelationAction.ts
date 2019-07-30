import {MethodMapping} from '@/app/base/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import GroupRelationService from '@/app/com/main/service/GroupRelationService';
import GroupRelation from '@/app/com/bean/GroupRelation';
import GroupBusinessService from '@/app/com/main/service/GroupBusinessService';
import GroupMemberService from '@/app/com/main/service/GroupMemberService';

export default class GroupRelationAction extends AbstractMaterial {

    private static action: string = '1.2.203';

    @MethodMapping(GroupRelationAction, GroupRelationAction.action, '1.1.0002')
    public setList(data: any): void {
        if (data && data.body) {
            const list: GroupRelation[] = data.body.list;
            if (list) {
                const ccs: GroupRelationService = this.appContext.getMaterial(GroupRelationService);
                ccs.setList(list);
            }
        }
    }


    @MethodMapping(GroupRelationAction, GroupRelationAction.action, '1.2.0001')
    public add(data: any): void {
        if (data && data.body) {
            const groupId: string = data.body.groupId;
            if (groupId) {
                const ccs: GroupRelationService = this.appContext.getMaterial(GroupRelationService);
                ccs.addByGroupId(groupId);
                const contactService: GroupBusinessService = this.appContext.getMaterial(GroupBusinessService);
                contactService.addByGroupId(groupId);

                const groupMemberService: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
                groupMemberService.loadOwnerGroupMember(groupId);
            }
        }
    }

    @MethodMapping(GroupRelationAction, GroupRelationAction.action, '1.2.0002')
    public updateRemark(data: any): void {
        if (data && data.body) {
            const groupId: string = data.body.groupId;
            const remark: string = data.body.remark;
            if (groupId) {
                const ccs: GroupRelationService = this.appContext.getMaterial(GroupRelationService);
                ccs.updateRemark(groupId, remark);
            }
        }
    }

    @MethodMapping(GroupRelationAction, GroupRelationAction.action, '1.2.0003')
    public moveCategory(data: any): void {
        if (data && data.body) {
            const groupIds: string[] = data.body.groupIds;
            const categoryId: string = data.body.categoryId;
            if (groupIds) {
                const ccs: GroupRelationService = this.appContext.getMaterial(GroupRelationService);
                ccs.moveCategory(groupIds, categoryId);
            }
        }
    }

    @MethodMapping(GroupRelationAction, GroupRelationAction.action, '1.2.0004')
    public delete(data: any): void {
        if (data && data.body) {
            const groupId: string = data.body.groupId;
            if (groupId) {
                const ccs: GroupRelationService = this.appContext.getMaterial(GroupRelationService);
                ccs.delete(groupId);
            }
        }
    }
}
