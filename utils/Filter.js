//声明一个filter对象  存储滤镜相关方法
let filter = {
  imgData: {},
  imgData_old: {},
  len: 0,
  //原画
  drawFun: function (callbackFn) {
    for (let i = 0; i < this.len; i++) {
      this.imgData.data[i] = this.imgData_old.data[i]
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //灰色调
  grayFun: function (callbackFn) {
    for (let i = 0; i < this.len; i += 4) {
      let r = this.imgData.data[i];
      let g = this.imgData.data[i + 1];
      let b = this.imgData.data[i + 2];

      this.imgData.data[i] = r * 0.3 + g * 0.59 + b * 0.11;
      this.imgData.data[i + 1] = r * 0.3 + g * 0.59 + b * 0.11;
      this.imgData.data[i + 2] = r * 0.3 + g * 0.59 + b * 0.11;
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //黑白
  heibaiFun: function (callbackFn) {
    for (let i = 0; i < this.len; i += 4) {
      let r = this.imgData.data[i];
      let g = this.imgData.data[i + 1];
      let b = this.imgData.data[i + 2];

      this.imgData.data[i] = this.imgData.data[i + 1] = this.imgData.data[i + 2] = ((r + g + b) / 3 > 128) ? 255 : 0;
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //反色
  inverseFun: function (callbackFn) {
    for (let i = 0; i < this.len; i += 4) {
      this.imgData.data[i] = 255 - this.imgData.data[i];
      this.imgData.data[i + 1] = 255 - this.imgData.data[i + 1];
      this.imgData.data[i + 2] = 255 - this.imgData.data[i + 2];
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //反色黑白
  heibai2Fun: function (callbackFn) {
    for (let i = 0; i < this.len; i += 4) {
      this.imgData.data[i] = this.imgData.data[i + 1] = this.imgData.data[i + 2] = 255 - this.imgData.data[i + 1];
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //高对比度
  duibiduFun: function (callbackFn) {
    for (let i = 0; i < this.len; i += 4) {
      this.imgData.data[i] *= 1.25;
      this.imgData.data[i + 1] *= 1.25;
      this.imgData.data[i + 2] *= 1.25;
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //暖色调
  nuanseFun: function (callbackFn) {
    for (let i = 0; i < this.len; i += 4) {
      this.imgData.data[i] *= 1.05;
      this.imgData.data[i + 1] *= 0.95;
      this.imgData.data[i + 2] *= 0.9;
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //冷色调
  lengseFun: function (callbackFn) {
    for (let i = 0; i < this.len; i += 4) {
      this.imgData.data[i] *= 0.9;
      this.imgData.data[i + 1] *= 0.95;
      this.imgData.data[i + 2] *= 1.05;
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //浮雕
  rilievoFun: function (callbackFn) {
    for (let i = 0; i < this.imgData.width; i++) {
      for (let j = 0; j < this.imgData.height; j++) {
        let pre = (i - 1 + j * this.imgData.width) * 4;
        let ind = (i + j * this.imgData.width) * 4;
        let next = (i + 1 + j * this.imgData.width) * 4;

        this.imgData.data[ind + 0] = this.imgData_old.data[next + 0] - this.imgData_old.data[pre + 0] + 128;
        this.imgData.data[ind + 1] = this.imgData_old.data[next + 1] - this.imgData_old.data[pre + 1] + 128;
        this.imgData.data[ind + 2] = this.imgData_old.data[next + 2] - this.imgData_old.data[pre + 2] + 128;
      }
    }
    for (let i = 0; i < this.len; i += 4) {
      let r = this.imgData.data[i];
      let g = this.imgData.data[i + 1];
      let b = this.imgData.data[i + 2];

      this.imgData.data[i] = r * 0.3 + g * 0.59 + b * 0.11;
      this.imgData.data[i + 1] = r * 0.3 + g * 0.59 + b * 0.11;
      this.imgData.data[i + 2] = r * 0.3 + g * 0.59 + b * 0.11;
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //对折1
  duizhe01Fun: function (callbackFn) {
    for (let i = 1; i <= this.imgData.width / 2; i++) {
      for (let j = 1; j <= this.imgData.height; j++) {
        let chushi = ((j - 1) * this.imgData.width + i) * 4;
        let mubiao = ((j - 1) * this.imgData.width + (this.imgData.width - i)) * 4;

        this.imgData.data[mubiao + 0] = this.imgData.data[chushi + 0];
        this.imgData.data[mubiao + 1] = this.imgData.data[chushi + 1];
        this.imgData.data[mubiao + 2] = this.imgData.data[chushi + 2];
        this.imgData.data[mubiao + 3] = this.imgData.data[chushi + 3];

      }
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //对折2
  duizhe02Fun: function (callbackFn) {
    for (let i = 1; i <= this.imgData.width / 2; i++) {
      for (let j = 1; j <= this.imgData.height; j++) {
        let chushi = ((j - 1) * this.imgData.width + i) * 4;
        let mubiao = ((j - 1) * this.imgData.width + (this.imgData.width - i)) * 4;

        this.imgData.data[chushi + 0] = this.imgData.data[mubiao + 0];
        this.imgData.data[chushi + 1] = this.imgData.data[mubiao + 1];
        this.imgData.data[chushi + 2] = this.imgData.data[mubiao + 2];
        this.imgData.data[chushi + 3] = this.imgData.data[mubiao + 3];

      }
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //镜像反转
  mirrorFun: function (callbackFn) {
    for (let i = 1; i <= this.imgData.width; i++) {
      for (let j = 1; j <= this.imgData.height; j++) {
        let chushi = ((j - 1) * this.imgData.width + i) * 4;
        let mubiao = ((j - 1) * this.imgData.width + (this.imgData.width - i)) * 4;
        this.imgData.data[mubiao + 0] = this.imgData_old.data[chushi + 0];
        this.imgData.data[mubiao + 1] = this.imgData_old.data[chushi + 1];
        this.imgData.data[mubiao + 2] = this.imgData_old.data[chushi + 2];
        this.imgData.data[mubiao + 3] = this.imgData_old.data[chushi + 3];
      }
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //模糊
  vagueFun: function (callbackFn) {
    let gaussMatrix = [],
      radius = 10,
      sigma,
      gaussSum = 0,
      x, y,
      r, g, b, a,
      i, j, k;


    radius = Math.floor(radius) || 3;
    sigma = sigma || radius / 3;

    a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
    b = -1 / (2 * sigma * sigma);
    //生成高斯矩阵
    for (i = 0, x = -radius; x <= radius; x++ , i++) {
      g = a * Math.exp(b * x * x);
      gaussMatrix[i] = g;
      gaussSum += g;

    }
    //归一化, 保证高斯矩阵的值在[0,1]之间
    for (i = 0, i < gaussMatrix.length; i++;) {
      gaussMatrix[i] /= gaussSum;
    }
    //x 方向一维高斯运算
    for (y = 0; y < this.imgData.height; y++) {
      for (x = 0; x < this.imgData.width; x++) {
        r = g = b = a = 0;
        gaussSum = 0;
        for (j = -radius; j <= radius; j++) {
          k = x + j;
          if (k >= 0 && k < this.imgData.width) {//确保 k 没超出 x 的范围
            //r,g,b,a 四个一组
            i = (y * this.imgData.width + k) * 4;
            r += this.imgData.data[i] * gaussMatrix[j + radius];
            g += this.imgData.data[i + 1] * gaussMatrix[j + radius];
            b += this.imgData.data[i + 2] * gaussMatrix[j + radius];
            // a += this.imgData.data[i + 3] * gaussMatrix[j];
            gaussSum += gaussMatrix[j + radius];
          }
        }
        i = (y * this.imgData.width + x) * 4;
        // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
        // console.log(gaussSum)
        this.imgData.data[i] = r / gaussSum;
        this.imgData.data[i + 1] = g / gaussSum;
        this.imgData.data[i + 2] = b / gaussSum;
      }
    }
    //y 方向一维高斯运算
    for (x = 0; x < this.imgData.width; x++) {
      for (y = 0; y < this.imgData.height; y++) {
        r = g = b = a = 0;
        gaussSum = 0;
        for (j = -radius; j <= radius; j++) {
          k = y + j;
          if (k >= 0 && k < this.imgData.height) {//确保 k 没超出 y 的范围
            i = (k * this.imgData.width + x) * 4;
            r += this.imgData.data[i] * gaussMatrix[j + radius];
            g += this.imgData.data[i + 1] * gaussMatrix[j + radius];
            b += this.imgData.data[i + 2] * gaussMatrix[j + radius];
            // a += this.imgData.data[i + 3] * gaussMatrix[j];
            gaussSum += gaussMatrix[j + radius];
          }
        }
        i = (y * this.imgData.width + x) * 4;
        this.imgData.data[i] = r / gaussSum;
        this.imgData.data[i + 1] = g / gaussSum;
        this.imgData.data[i + 2] = b / gaussSum;
      }
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //马赛克
  masaikeFun: function (callbackFn) {
    let arr = [];
    let r = 0, g = 0, b = 0, a = 0;
    let number = 10;//颗粒度大小
    for (let i = 0; i < this.imgData.width; i += number) {
      for (let j = 0; j < this.imgData.height; j += number) {
        r = 0;
        g = 0;
        b = 0;
        arr = [];
        for (let x = 0; x < number; x++) {
          arr.push(this.imgData.data.slice((i + (j + x) * this.imgData.width) * 4, (i + (j + x) * this.imgData.width + number) * 4));
        }
        for (let x = 0; x < arr.length; x++) {
          for (let y = 0; y < arr[x].length; y++) {
            if ((y - 0) % 4 == 0) {
              r += arr[x][y];
            }
            if ((y - 1) % 4 == 0) {
              g += arr[x][y];
            }
            if ((y - 2) % 4 == 0) {
              b += arr[x][y];
            }
          }
        }
        r = r / (number * number);
        g = g / (number * number);
        b = b / (number * number);
        for (let x = 0; x < number; x++) {
          for (let y = 0; y < number; y++) {
            this.imgData.data[(i + (j + x) * this.imgData.width + y) * 4] = r;
            this.imgData.data[(i + (j + x) * this.imgData.width + y) * 4 + 1] = g;
            this.imgData.data[(i + (j + x) * this.imgData.width + y) * 4 + 2] = b;
          }
        }
      }
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //方格
  fanggeFun: function (callbackFn) {
    let arr = [];
    let number = 20;//半径
    let r = 0, g = 0, b = 0, a = 0;
    for (let i = 0; i < this.imgData.width; i += number) {
      for (let j = 0; j < this.imgData.height; j += number) {
        r = 0;
        g = 0;
        b = 0;
        arr = [];
        for (let x = 0; x < number; x++) {
          for (let y = 0; y < number; y++) {
            if (x == 0 || y == 0) {
              this.imgData.data[(i + (j + x) * this.imgData.width + y) * 4] = 188;
              this.imgData.data[(i + (j + x) * this.imgData.width + y) * 4 + 1] = 188;
              this.imgData.data[(i + (j + x) * this.imgData.width + y) * 4 + 2] = 188;
              this.imgData.data[(i + (j + x) * this.imgData.width + y) * 4 + 3] = 255;
            }
            if ((x == 0 && y == 0) || (x == 0 && y == number) || (y == 0 && x == number) || (y == number && x == number)) {
              this.imgData.data[(i + (j + x) * this.imgData.width + y) * 4] = 0;
              this.imgData.data[(i + (j + x) * this.imgData.width + y) * 4 + 1] = 0;
              this.imgData.data[(i + (j + x) * this.imgData.width + y) * 4 + 2] = 0;
              this.imgData.data[(i + (j + x) * this.imgData.width + y) * 4 + 3] = 255;
            }
          }
        }
      }
    }
    setTimeout(function () { callbackFn()},1500)
  },
  //未知
  unknownFun: function (callbackFn) {
    for (let i = 0; i < this.imgData.width; i++) {
      for (let j = 0; j < this.imgData.height; j++) {
        let pre = (i - 1 + j * this.imgData.width) * 4;
        let ind = (i + j * this.imgData.width) * 4;
        let next = (i + 1 + j * this.imgData.width) * 4;

        this.imgData.data[ind + 0] = Math.sqrt(Math.pow(this.imgData_old.data[next + 0], 2) - Math.pow(this.imgData_old.data[pre + 0], 2));
        this.imgData.data[ind + 1] = Math.sqrt(Math.pow(this.imgData_old.data[next + 1], 2) - Math.pow(this.imgData_old.data[pre + 1], 2));
        this.imgData.data[ind + 2] = Math.sqrt(Math.pow(this.imgData_old.data[next + 2], 2) - Math.pow(this.imgData_old.data[pre + 2], 2));
      }
    }
    setTimeout(function () { callbackFn()},1500)
  },
}

module.exports = filter