//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgSrc: '',
    lvjingSele: 0,
    lvjingArr: [
      {
        name: '原图',
        value: 'draw'
      }, {
        name: '对折1',
        value: 'duizhe01'
      }, {
        name: '对折2',
        value: 'duizhe01'
      }, {
        name: '镜像反转',
        value: 'mirror'
      }, {
        name: '灰色调',
        value: 'gray'
      }, {
        name: '黑白',
        value: 'heibai'
      }, {
        name: '反色(黑白)',
        value: 'heibai2'
      }, {
        name: '反色(底片)',
        value: 'inverse'
      }, {
        name: '浮雕',
        value: 'rilievo'
      }, {
        name: '高对比度',
        value: 'duibidu'
      }, {
        name: '冷色调',
        value: 'lengse'
      }, {
        name: '暖色调',
        value: 'nuanse'
      }, {
        name: '模糊',
        value: 'vague'
      }, {
        name: '马赛克',
        value: 'masaike'
      }, {
        name: '小方格',
        value: 'fangge'
      }, {
        name: '水印',
        value: 'shuiyin'
      }
    ],
    ctx: {},
    canvasData: [],
    canvasData_old: [],
    canvasSrc: '',
    len: 0,
    originalWidth: 0,
    originalHeight: 0,
    waitingShow: 'none',
    disBtn: true
  },

  //事件处理函数
  chooseImg(e){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success(res){
        that.setData({
          waitingShow: 'block',
          imgSrc: res.tempFilePaths[0]
        });
      }
    });
  },
  imgLoad(e) {
    let that = this;
    let ctx = wx.createCanvasContext('canvas');
    
    let url = this.data.imgSrc;

    let w = e.detail.width;
    let h = e.detail.height;
    let whL = w/h;

    let cW = this.data.canvasWidth;
    let cH = cW/whL;

    this.setData({
      originalWidth: w,
      originalHeight: h,
      canvasHeight: cH
    });
    ctx.drawImage(url, 0, 0, w, h, 0, 0, cW, cH);
    ctx.draw(false,function(){
      setTimeout(function(){
        wx.canvasToTempFilePath({
          canvasId: 'canvas',
          x: 0,
          y: 0,
          width: cW,
          height: cH,
          destWidth: w,
          destHeight: h,
          success(res) {
            that.setData({
              canvasSrc: res.tempFilePath,
              disBtn: false,
              waitingShow: 'none'
            })
          }
        });
      },100);
    });
  },
  bindLvjingChange(e){ 
    this.setData({
      lvjingSele: e.detail.value
    });
  },
  imgViewShow(e){
    wx.previewImage({
      urls: [this.data.imgSrc,this.data.canvasSrc],
      current: this.data.imgSrc
    });
  },
  saveImg(e){
    
  },








  //第一次渲染完成
  onReady(e){
    let that = this
    let query = wx.createSelectorQuery()
    query.select("#canvas").boundingClientRect(function(res){
      that.setData({
        canvasWidth: res.width
      })
    }).exec()
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
})