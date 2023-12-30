// pages/mine/mine.js
Component({
  data: {
    userInfo: {
      avatar: "",
      nick: "",
    },
    defaultAvatarUrl:
      'https://cdn-we-retail.ym.tencent.com/miniapp/usercenter/icon-user-center-avatar@2x.png',
    defaultNick: "微信用户"
  },
  methods: {
    onChooseAvatar(e) {
      const avatar = e.detail.avatarUrl
      console.log("avatar:", avatar)
      this.setData({
        "userInfo.avatar": avatar
      })
    },
    onInputChange(e) {
      console.log('nick', e.detail.value)
      this.setData({
        "userInfo.nick": e.detail.value
      })
    }
  }
})