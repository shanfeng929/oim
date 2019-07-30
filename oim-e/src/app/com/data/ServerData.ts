import ServerAddress from '@/app/com/bean/ServerAddress';

export default class ServerData {
    /**
     * 服务名
     */
    public name: string = '';
    /**
     * 服务编码
     */
    public code: string = '';
    /**
     * 服务描述
     */
    public description: string = '';
    /**
     * 是否启用：0：否、1：是
     */
    public isEnabled: string = '0';

    public addressList: ServerAddress[] = [];
}
