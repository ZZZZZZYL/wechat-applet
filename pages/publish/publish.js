// pages/publish/publish.js
Page({
  data:{
    msg:"点击选择，要勾选哦~"
  },
  staticObj:{
    type: 'sell'
  },
  choose(){
    wx.chooseLocation({
      success: (res)=> {
        console.log(res)
        this.setData({
          msg: res.address
        }),
        Object.assign(this.staticObj,{
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
  },
  radioChange(e){
    this.staticObj.type = e.detail.value;
  },
  inputmessage(e){
    this.staticObj.message = e.detail.value
  },
  inputcontact(e){
    this.staticObj.contact = e.detail.value;
  },
  submit(){
    if (this.data.msg =="点击选择，要勾选哦~" || !this.data.msg){
      wx.showToast({
        title: '请选择地点',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
      return;
    }
    if (!this.staticObj.message) {
      wx.showToast({
        title: '请填写说明',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
      return;
    }
    if (!this.staticObj.contact) {
      wx.showToast({
        title: '请填写联系方式',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
      return;
    }
    var data = Object.assign({},this.staticObj,{
      address: this.data.msg
    })
    console.log(data)
    wx.request({
      url: 'http://localhost:3000/list',
      data,
      header: {"content-type":"application/json"},
      method: 'POST',
      success: (res)=> {
        this.setData({
          flag: true
        })
      }
    })
  },
  goback() {
    wx.navigateBack()
  }

})