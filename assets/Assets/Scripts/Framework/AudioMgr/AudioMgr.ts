import engine from 'engine'
import Utility from '../Uitility';
import AudioInfoMap from './AudioInfoMap';
import { SAction1 } from '../Delegate/Delegate';
import GetPublicComponentMgr from '../PublicConponent/PublicComponent';


export default function GetAudioMgr() {
    return AudioMgr.GetInstance();
}

export enum E_SoundType {
    Test,
    UI,
    Effects,
}


export class SoundInfo{
    public path:string;
    public type:E_SoundType;

    public constructor(name:string, type:E_SoundType, fileExt: string = "wav" ,index: number = -1){
        this.type = type;
        
        // 获取路径
        this.path = `${E_SoundType[type]}/${name}`;
        if (!AudioInfoMap.has(this.path)) {
            console.error("No AudioClip Called", name);
        }
        if (index == -1){
            index = Utility.RandomInt(0, AudioInfoMap.get(this.path));
        }

        this.path = `Assets/Audios/Sound/${this.path}/${name}_${index}.${fileExt}`;

    }
}

export class AudioMgr {
    private static instance: AudioMgr;

    public AudioObj: engine.Entity;

    private BGM: engine.AudioSource;
    private _BGMVolume: number;


    private playingSoundMap: Map<E_SoundType, Array<engine.AudioSource>>;
    private soundVolume: Map<E_SoundType, number>;
    private preparedSource: Array<engine.AudioSource>;

    private constructor() {
        // 初始化一下
        this.BGM = null;
        this._BGMVolume = 0.5;
        this.playingSoundMap = new Map<E_SoundType, Array<engine.AudioSource>>([]);
        this.soundVolume = new Map<E_SoundType, number>([]);
        this.preparedSource = new Array<engine.AudioSource>();

        this.AudioObj = engine.game.createEntity2D("AudioObj");
        engine.game.markAsPersist(this.AudioObj);   // 不销毁, 内存不要钱
        // TODO: 设置各个音量
        for (let i = 0; i <= E_SoundType.Effects; i++) {
            this.SetSoundVolume(i, 1);
        }

        // 检测是否有声音播放完毕
        GetPublicComponentMgr().AddUpdateListener((dt)=>{this.CheckDoneSource();});
        
    }

    public static GetInstance(): AudioMgr {
        if (!this.instance) {
            this.instance = new AudioMgr();
        }
        return this.instance;
    }

    // 音乐相关
    public PlayBGM(name: string): void {
        if (this.BGM == null) {
            this.BGM = this.AudioObj.addComponent<engine.AudioSource>(engine.AudioSource);
        }

        // 直接异步加载了
        engine.loader.load<engine.AudioClip>("Assets/Audios/BGM/"+name).promise.then((clip) => {
            clip.preloadAudioData = true;
            this.BGM.clip = clip;
            this.BGM.volume = this._BGMVolume;
            this.BGM.play();    
        }); 
    }

    public get BGMVolume(): number {
        return this._BGMVolume;
    }

    public set BGMVolume(value: number) {
        this._BGMVolume = value;
        if (this.BGM!= null) {
            this.BGM.volume = value;
        }
    }

    public StopBGM(): void {
        if (this.BGM!= null) {
            this.BGM.stop();
        }
    }

    public PauseBGM(): void{
        if (this.BGM!= null) {
            this.BGM.pause();
        }
    }

    // 音效相关
    public PlaySound(info: SoundInfo, callBack: SAction1<engine.AudioSource> = null): void{
        engine.loader.load<engine.AudioClip>(info.path).promise.then((clip)=>{
            let source:engine.AudioSource = this.GetFreeSource();
            clip.preloadAudioData = true;
            source.clip = clip;
            source.volume = this.soundVolume.get(info.type);

            if (!this.playingSoundMap.has(info.type)) {
                this.playingSoundMap.set(info.type, new Array<engine.AudioSource>());
            }

            this.playingSoundMap.get(info.type).push(source);
            source.play();
            if (callBack!= null) {callBack(source);}
        })
    }

    // 停止播放某个音效,需要指定类型.
    public StopSound(type: E_SoundType, source: engine.AudioSource): void {
        if (!this.playingSoundMap.has(type)) return;

        const index = this.playingSoundMap.get(type).indexOf(source);
        if (index == -1) return;
        
        this.playingSoundMap.get(type).splice(index, 1);
        source.stop();
        source.active = false;
        this.preparedSource.push(source);
    }

    // 设置某个类型的音效的音量
    public SetSoundVolume(type :E_SoundType, volume: number): void{
        volume = Utility.Clamp01(volume);
        // 第一次创建
        if (!this.soundVolume.has(type)) {
            this.soundVolume.set(type, volume);
            return;
        }

        // 已经存在
        this.soundVolume.set(type, volume);
        // 已经存在播放ing的声音
        if (this.playingSoundMap.has(type)) {
            for (let source of this.playingSoundMap.get(type)) {
                source.volume = volume;
            }
        }
    }

    // 得到某个类型的音效的音量
    public GetSoundVolume(type :E_SoundType): number{
        if (!this.soundVolume.has(type)) { return -1;}
        return this.soundVolume.get(type);
    }

    // 得到可用的source
    private GetFreeSource(): engine.AudioSource {
        let free: engine.AudioSource;
        if (this.preparedSource.length == 0) {
            free = this.AudioObj.addComponent<engine.AudioSource>(engine.AudioSource);
        }
        else {
            free = this.preparedSource.pop();
        }
        free.active = true;
        return free;
    }

    // 检测是否有声音播放完毕
    private CheckDoneSource(): void {
        for (let i = 0; i < E_SoundType.Effects; i++) {
            if (!this.playingSoundMap.has(i)) continue;
            let value = this.playingSoundMap.get(i);
            for( let i = value.length - 1; i >= 0; i--) {
                if (!value[i].playing) {
                    let source: engine.AudioSource = value[i];
                    value.splice(i, 1);
                    source.active = false;
                    this.preparedSource.push(source);
                }
            }
        }
    }
}