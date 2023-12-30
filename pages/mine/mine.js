// pages/mine/mine.js
Component({
  data: {
    userInfo: {
      avatar: "",
      nick: "🐎结冰01💪",
    },
    defaultAvatarUrl:
      'https://cdn-we-retail.ym.tencent.com/miniapp/usercenter/icon-user-center-avatar@2x.png',
  },
  methods: {
    onChooseAvatar(e) {
      wx.chooseAddress()
      const {avatar} = e.detail
      const {nick} = this.data.userInfo
      this.setData({
        "userInfo.avatar":avatar
      })
    }
  }
})