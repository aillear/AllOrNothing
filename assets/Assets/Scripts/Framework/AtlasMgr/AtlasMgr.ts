import engine from "engine";

export default function GetAtlasMgr(): AtlasMgr{
    return AtlasMgr.GetInstance();
}

export class AtlasMgr {
    private static  intance: AtlasMgr;
    public atlas:engine.Atlas;
    public diceInfo: string[] = [
        "Assets/Arts/Basic/1.png",
        "Assets/Arts/Basic/2.png",
        "Assets/Arts/Basic/3.png",
        "Assets/Arts/Basic/4.png",
        "Assets/Arts/Basic/5.png",
        "Assets/Arts/Basic/6.png",
    ];
    private constructor() {
        // 需要预加载
        this.atlas = engine.loader.getAsset<engine.Atlas>("Assets/Arts/basic.atlaspac");
        // if (this.atlas == null) {
        //     engine.loader.load<engine.Atlas>("Assets/Arts/basic.atlaspac").promise.then((atlas) => {
        //         this.atlas = atlas;
        //     });
        // }
    }

    public static GetInstance(): AtlasMgr {
        if (!this.intance) {
            this.intance = new AtlasMgr();
        }
        return this.intance;
    }
}
