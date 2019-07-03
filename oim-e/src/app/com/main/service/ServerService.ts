import AbstractMaterial from '@/app/base/AbstractMaterial';
import serverClient from '@/app/com/main/http/api/ServerClient';
import ServerData from '@/app/com/data/ServerData';
import ServerBox from '@/app/com/main/box/ServerBox';
import ServerAddress from '@/app/com/bean/ServerAddress';

export default class ServerService extends AbstractMaterial {

    public loadServerAddress(back: (success: boolean, message?: string) => void): void {
        const serverBox: ServerBox = this.appContext.getMaterial(ServerBox);
        const addressBack = (data: any) => {
            let success = false;
            if (data && data.info) {
                const info = data.info;
                if (info.success && data.body) {
                    success = true;
                    const list: ServerData[] = data.body.list as ServerData[];
                    serverBox.addList(list);
                }
            }
            back(success);
        };
        serverClient.getAddressList(addressBack);
    }

    public getAddress(code: string, protocol: string): ServerAddress | null {
        const serverBox: ServerBox = this.appContext.getMaterial(ServerBox);
        return serverBox.getAddress(code, protocol);
    }
}
