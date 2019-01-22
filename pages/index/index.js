//index.js
//获取应用实例
const app = getApp()
//引入滤镜对象
import Filter from '../../utils/Filter.js'

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
        value: 'duizhe02'
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
      },
    ], 
    canvasSrc: '', 
    originalWidth: 0,
    originalHeight: 0,
    waitingShow: 'none',
    disBtn: true,
    infoShow: 'none'
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
    let cH = Math.ceil(cW/whL);

    this.setData({
      lvjingSele: 0,
      originalWidth: w,
      originalHeight: h,
      canvasHeight: cH
    });
    // ctx.drawImage(url, 0, 0, w, h, 0, 0, cW, cH);
    ctx.drawImage(url, 0, 0, cW, cH);
    ctx.draw(false,function(){
      wx.canvasGetImageData({
        canvasId: 'canvas',
        x: 0,
        y: 0,
        width: cW,
        height: cH,
        success(res){
          console.log(res)
          let resString = JSON.stringify(res)
          let resObj = JSON.parse(resString)
          Filter.len = res.data.length;
          Filter.imgData = res;
          Filter.imgData_old = resObj;
          that.setData({
            disBtn: false,
            waitingShow: 'none'
          })
        } 
      })
    });
  },
  bindLvjingChange(e){
    let that = this
    let i = e.detail.value
    this.setData({
      lvjingSele: i
    });
    that.setData({
      disBtn: true,
      waitingShow: 'block'
    })
    Filter.drawFun(function(){})
    let filterName = this.data.lvjingArr[i].value + 'Fun';
    Filter[filterName](function(){
      console.log(Filter)
      let data = Filter.imgData.data;
      let w = Filter.imgData.width;
      let h = Filter.imgData.height;
      wx.canvasPutImageData({
        canvasId: 'canvas',
        data: data,
        x: 0,
        y: 0,
        width: w,
        height: h,
        fail(ress){console.log("失败")},
        success(ress){
          console.log("成功")
          wx.canvasToTempFilePath({
            canvasId: 'canvas',
            x: 0,
            y: 0,
            width: that.data.canvasWidth,
            height: that.data.canvasHeight,
            destWidth: that.data.originalWidth,
            destHeight: that.data.originalHeight,
            success(res) {
              that.setData({
                canvasSrc: res.tempFilePath,
                disBtn: false,
                waitingShow: 'none'
              })
            }
          });
        }
      });
    })    
  },
  imgViewShow(e){
    wx.previewImage({
      urls: [this.data.imgSrc,this.data.canvasSrc],
      current: this.data.imgSrc
    });
  },
  saveImg(e){
    let that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.canvasSrc,
      success(res) {
        that.setData({
          infoShow: 'block'
        })
        setTimeout(function(){
          that.setData({
            infoShow: 'none'
          })
        },2000)
      }
    })
  },


  //第一次渲染完成 
  onReady(e){ 
    let that = this
    let query = wx.createSelectorQuery()
    query.select("#canvas").boundingClientRect(function(res){
      console.log(res)
      that.setData({
        canvasWidth: res.width
      })
    }).exec()
  },
  onLoad: function () {

  },
})