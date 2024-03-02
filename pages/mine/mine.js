// pages/mine/mine.js
var app = getApp();

Page({
    data: {
        userInfo: {
            avatar: "",
            nick: "",
        },
        defaultAvatarUrl:
            'https://cdn-we-retail.ym.tencent.com/miniapp/usercenter/icon-user-center-avatar@2x.png',
        defaultNick: "微信用户"
    },
    // 事件处理函数
    onLoad() {
        console.log('onLoad')
        var that = this
        wx.login({
            success(res) {
                if (res.code) {
                    wx.request({
                        url: app.globalData.domain + '/v1.0/auth/code',
                        method: 'POST',
                        data: {
                            code: res.code,
                        },
                        success: function (res) {
                            console.log('http success:' + JSON.stringify(res))
                            if (res.data?.data) {
                                app.globalData.userInfo = {
                                    id: res.data.data.id,
                                    avatar: res.data.data.avatar,
                                    nick: res.data.data.nick
                                }
                                console.log('globalInfo', app.globalData.userInfo)
                                that.setData({
                                    "userInfo.avatar": app.globalData.userInfo.avatar,
                                    "userInfo.nick": app.globalData.userInfo.nick,
                                })
                            }
                        },
                        fail: function (e) {
                            console.log('http fail:', e)
                        }
                    })
                } else {
                    console.log("登录失败")
                }
            }
        })
    },
    onShow() {
        console.log("onShow")
        this.setData({
            "userInfo.avatar": app.globalData.userInfo.avatar,
            "userInfo.nick": app.globalData.userInfo.nick,
        })
    },
    onChooseAvatar(e) {
        const that = this
        const avatar = e.detail.avatarUrl
        app.globalData.userInfo.avatar = avatar
        wx.request({
            url: app.globalData.domain + '/v1.0/user/update',
            method: 'POST',
            data: {
                id: app.globalData.userInfo.id,
                avatar: avatar,
            },
            success: function (res) {
                that.setData({
                    "userInfo.avatar": avatar
                })
            },
            fail: function (e) {
                console.log('http fail:', e)
            }
        })
    },
    onInputChange(e) {
        var that = this
        const nick = e.detail.value
        app.globalData.userInfo.nick = nick
        wx.request({
            url: app.globalData.domain + '/v1.0/user/update',
            method: 'POST',
            data: {
                id: app.globalData.userInfo.id,
                nick: nick,
            },
            success: function (res) {
                that.setData({
                    "userInfo.nick":nick
                })
            },
            fail: function (e) {
                console.log('http fail:', e)
            }
        })
    }
})