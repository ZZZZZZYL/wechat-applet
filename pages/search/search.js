// pages/search/search.js
Page({
  data: {
    msg: ''
  },
  input(e){
    this.setData({
      msg: e.detail.value
    })
  },
  search(){
    wx.request({
      url: 'http://localhost:3000/list',
  //这儿必须用q，表示全文查找
      data: {
        q: this.data.msg
      },
      header: {"content-type":"application/type"},
      method: 'GET',
      success: (res)=> {
        this.setData({
          list: res.data
        })
      }
    })
  },
  godetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/detail/detail/?id='+e.currentTarget.id
    })
  },
  onLoad: function (options) {
  
  }
})