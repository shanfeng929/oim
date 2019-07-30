import AbstractMaterial from '@/app/base/AbstractMaterial';
import SystemInformationDataManager from '@/app/com/main/manager/SystemInformationDataManager';
import SystemInformationItemManager from '@/app/com/main/manager/SystemInformationItemManager';
import SystemInformationDataService from '@/app/com/main/service/SystemInformationDataService';

export default class SystemInformationItemEvent extends AbstractMaterial {

    public onSelect(key: string): void {
        const systemInformationDataService: SystemInformationDataService = this.appContext.getMaterial(SystemInformationDataService);
        systemInformationDataService.showByType(key);
    }

    public onDelete(key: string): void {
        const systemInformationDataManager: SystemInformationDataManager = this.appContext.getMaterial(SystemInformationDataManager);
        const systemInformationItemManager: SystemInformationItemManager = this.appContext.getMaterial(SystemInformationItemManager);
        systemInformationItemManager.deleteItem(key);
    }
}
