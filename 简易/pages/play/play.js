import { game } from "../../game";
import { get_score } from "../../get_score";
import { robot } from "../../robot";


// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    counts: [],
    result: [],
    inputValue:'',
    new_game: new game,
    robot_1: new robot,
    get_score: new get_score,
    score: 0,
    round: 0,
    equal: 0,
  },
  
  get_ave(){

  },

  getInputValue(e){
    //console.log(e.detail.value)
    let input = e.detail.value
    input = input.split(' ')
    this.data.new_game.set_keep_arr(input);
    //console.log(c);
    this.setData({
      inputValue: e.detail.value
    })
  },

  Game_clear(){
    this.data.new_game.clear();
    this.setData({
    counts: [],
    result: [],
    inputValue:'',
    score: 0,
    round: 0,
    equal: 0,
    })
    this.data.new_game.creat_new_game();
    this.setData({
      result: this.data.new_game.result,
    })


  },

  Game_start(){
    this.setData({
      inputValue: '',
    })
    this.data.new_game.run_by_round();
    this.setData({
      result: this.data.new_game.result,
      score: this.data.new_game.score,
      counts: this.data.new_game.counts,
      round: this.data.new_game.round,
    })

    this.data.robot_1.set_arr(this.data.counts);
    let p = this.data.robot_1.get_p();
    this.data.robot_1.get_count(this.data.robot_1.arr,p);
    let ave = this.data.robot_1.get_ave();
    console.log("当前得分期望:"+ave);
    this.setData({
      equal: ave,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let new_game = new game;
    let robot_1 = new robot;
    this.setData({
      new_game: new_game,
      robot_1: robot_1,
    })
    this.data.new_game.creat_new_game();
    this.setData({
      result: this.data.new_game.result,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})