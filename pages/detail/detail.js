// pages/detail/detail.js
Page({
  data: {
    item: '',
  },
  onLoad: function (e) {
    wx.request({
      url: 'http://localhost:3000/list/'+e.id,
      header: {"content-type":"application/json"},
      method: 'GET',
      success: (res)=> {
        this.setData({
          item: res.data
        })
      }
    })
  },

})