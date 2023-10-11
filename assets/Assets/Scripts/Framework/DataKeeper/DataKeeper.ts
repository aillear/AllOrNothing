
export default function GetDataKeeper(){
    return DataKeeper.GetInstance();
}

export class DataKeeper{
    private static instance: DataKeeper;
    private dataMap: Map<string, any>;

    private constructor(){
        this.dataMap = new Map<string, any>();
    }

    public static GetInstance(): DataKeeper{
        if (!this.instance) {
            this.instance = new DataKeeper();
        }
        return this.instance;
    }

    public GetData(key: string) {
        return this.dataMap.get(key);
    }

    public SetData(key: string, value: any) {
        this.dataMap.set(key, value);
    }
}