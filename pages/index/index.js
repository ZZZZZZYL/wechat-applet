//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    longitude: "",
    latitude: "",   
    controls: [{
      id: 1,
      iconPath: '/resources/center.png',
      position: {
        top: app.globalData.windowHeight - 80,
        left: 20,
        width: 30,
        height: 30
      },
      clickable: true
    },
      {
        id: 2,
        iconPath: '/resources/pin.png',
        position: {
          left: (app.globalData.windowWidth - 20) / 2,
          top: (app.globalData.windowHeight - 20 ) /2 - 40,
          width: 20,
          height: 20
        },
        clickable: true
      }]
  },
  controltap(e) {
    console.log(e.controlId)
  },
  onShow(){
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function(res) {},
      fail: function(res) {},
      complete: (res)=> {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
    }),
    this.getMarkers();
  },
  getMarkers(){
      wx.request({
        url: 'http://localhost:3000/list',
        header: {'content-type':"application/json"},
        method: 'GET',
        success: (res)=> {
          let markers = res.data.map((item)=>{
            return{ iconPath: "/resources/"+item.type+".png",
              id: item.id,
                latitude:item.latitude,
                  longitude: item.longitude,
                    width: 50,
                      height: 50}
          })
          this.setData({
            markers
          })
        },
       
      })
  },
  onReady(){
   this.mapCtx =  wx.createMapContext('map');
  },
  controltap(){
    this.mapCtx.moveToLocation()
  },
  onShareAppMessage : function(res){
    return {
      title: '萌宠交易平台',
      path: '/pages/index'
    }
  },
  gopublish(){
    wx.navigateTo({
      url: '/pages/publish/publish'
    })
  },
  gosearch(){
    wx.navigateTo({
      url: '/pages/search/search',
      success: function(res) {}
    })
  },
  markertap(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.markerId
    })
  }

})