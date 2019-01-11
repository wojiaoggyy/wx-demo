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
    len: 0,
    originalWidth: 0,
    originalHeight: 0
  },
  //事件处理函数
  chooseImg(e){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success(res){
        that.setData({
          imgSrc: res.tempFilePaths[0]
        })
      }
    })
  },
  imgLoad(e){
    let that = this
    this.setData({
      originalWidth: e.detail.width,
      originalHeight: e.detail.height,
    })
    let ctx = wx.createCanvasContext('2d')
    ctx.drawImage(that.data.imgSrc, 0, 0, 600, 763)
    ctx.draw()
  },
  bindLvjingChange(e){
    console.log(this)
    this.setData({
      lvjingSele: e.detail.value
    })
  },
  //canvas相关方法__开始
  onReady(e){
    let that = this
    
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