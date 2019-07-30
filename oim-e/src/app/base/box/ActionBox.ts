import AppContext from '@/app/base/AppContext';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import actionMappingBox from '@/app/base/box/ActionMappingBox';

class ActionBox {

    private map: Map<string, object> = new Map<string, object>();

    public constructor(protected appContext: AppContext) {

    }


    public put(key: string, value: object): void {
        this.map.set(key, value);
    }

    public getAction(key: string): object {
        const clazz: any = actionMappingBox.getAction(key);
        let action: any = null;
        if (clazz) {
            action = this.appContext.getObjectByClass(clazz);
        }
        return action;
    }

    public invokeAction(key: string, data: any): void {
        const action: any = this.getAction(key);
        const methodKey: string = actionMappingBox.getMethod(key);
        if (action && methodKey) {
            action[methodKey](data);
        }
    }
}

export default ActionBox;
