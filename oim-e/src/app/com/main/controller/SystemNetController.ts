import AbstractMaterial from '@/app/base/AbstractMaterial';
import SystemNetSender from '@/app/com/main/sender/SystemNetSender';


export default class SystemNetController extends AbstractMaterial {

    /**
     * 发送心跳
     */
    public heartbeat(): void {
        const sns: SystemNetSender = this.appContext.getMaterial(SystemNetSender);
        sns.heartbeat();
    }
}
