// 导入元数据支持
import 'reflect-metadata';
import AbstractMaterial from './AbstractMaterial';
import ActionBox from '@/app/base/box/ActionBox';
import NetServer from '@/app/base/net/NetServer';
import DataBackAction from '@/app/base/net/DataBackAction';
import ActionType from '@/app/base/ActionType';
import InvokeAction from '@/app/base/net/InvokeAction';
import PromptHandler from '@/app/base/net/PromptHandler';
import ViewType from '@/app/base/view/ViewType';
import View from '@/app/com/main/view/View';


type Material<T extends AbstractMaterial> = new(appContext: AppContext) => T;

class AppContext {
    public readonly netServer: NetServer = new NetServer();

    private actionBox: ActionBox = new ActionBox(this);
    private implMap: Map<any, any> = new Map<any, any>();
    private objectMap: Map<any, any> = new Map<any, any>();
    private promptHandler: PromptHandler = {
        prompt(message: string, type?: string): void {
            // do nothing
        },
    } as PromptHandler;

    constructor() {
        this.initialize();
        this.initializeNetServer();
    }

    public getObjectByClass<T>(clazz: new (...args: any[]) => T): T {
        let o = this.objectMap.get(clazz);
        if (!o) {
            o = new clazz();
            if (o instanceof AbstractMaterial) {
                o = new clazz(this);
            }
            this.objectMap.set(clazz, o);
        }
        // let paramtypes = Reflect.getMetadata('design:paramtypes', o, 'constructor')
        return o;
    }

    public getMaterial<T>(clazz: Material<AbstractMaterial>): T {
        // public getObjectByClass<T>(clazz: Constructor<T>): T {
        let o = this.objectMap.get(clazz);
        if (!o) {
            o = new clazz(this);
            this.objectMap.set(clazz, o);
        }
        if (o instanceof AbstractMaterial) {
            const ab = o as AbstractMaterial;
        }
        return o;
    }

    public getObject<T>(key: any): T {
        let o = this.objectMap.get(key);
        if (!o) {
            const v = this.implMap.get(key);
            if (v) {
                o = this.getMaterial(v);
            }
        }
        return o;
    }

    public getView<T>(key: any): T {
        let o = this.objectMap.get(key);
        if (!o) {
            const v = this.implMap.get(key);
            if (v) {
                o = this.getMaterial(v);
            }
        }
        return o;
    }


    public setPromptHandler(promptHandler: PromptHandler): void {
        this.promptHandler = promptHandler;
    }

    public putAction<T>(clazz: ActionType<AbstractMaterial>): void {
        // new clazz(this);
    }

    public connect(socketHost: string, onOpen?: () => void): boolean {
        const mark: boolean = this.netServer.connect(socketHost, onOpen);
        this.netServer.setSocketHost(socketHost);
        return mark;
    }

    public putView(view: any, viewImpl: ViewType<AbstractMaterial>): void {
        this.implMap.set(view, viewImpl);
    }

    public putViewObject(view: any, value: View): void {
        this.putObject(view, value);
    }

    public putObject(key: any, value: any): void {
        this.objectMap.set(key, value);
    }

    public send(data: any, back?: DataBackAction, parallel?: boolean) {
        this.netServer.send(data, back, parallel);
    }

    public prompt(message: string, title?: string, type?: string) {
        this.promptHandler.prompt(message, title, type);
    }

    public invokeAction(key: string, data: any): void {
        this.actionBox.invokeAction(key, data);
    }

    private initialize(): void {
        // TODO
    }

    private initializeNetServer(): void {
        const own = this;
        this.netServer.setAutoConnect(true);
        this.netServer.setInvokeAction({
            invoke(key: string, data: any): void {
                own.invokeAction(key, data);
            },
        } as InvokeAction);
        this.netServer.setPromptHandler({
            prompt(message: string, title?: string, type?: string): void {
                own.promptHandler.prompt(message, title, type);
            },
        } as PromptHandler);
    }
}

export default AppContext;
