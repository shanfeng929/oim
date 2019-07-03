import {MethodMapping} from '@/app/base/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import User from '@/app/com/bean/User';
import ContactService from '@/app/com/main/service/ContactService';
import SystemInformationService from '@/app/com/main/service/SystemInformationService';
import SystemInformType from '@/app/com/main/data/SystemInformType';

export default class ContactAction extends AbstractMaterial {

    private static action: string = '1.2.101';

    @MethodMapping(ContactAction, ContactAction.action, '1.1.0002')
    public setList(data: any): void {
        if (data && data.body) {
            const list: User[] = data.body.list;
            if (list) {
                const ccs: ContactService = this.appContext.getMaterial(ContactService);
                ccs.setList(list);
            }
        }
    }

    @MethodMapping(ContactAction, ContactAction.action, '1.2.0001')
    public addApply(data: any): void {
        if (data && data.body) {
            const systemInformationService: SystemInformationService = this.appContext.getMaterial(SystemInformationService);
            systemInformationService.inform(SystemInformType.TYPE_APPLY_HANDLE, '添加好友请求');
        }
    }
}
