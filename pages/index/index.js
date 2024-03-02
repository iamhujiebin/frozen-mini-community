// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

var app = getApp();

Page({
    data: {
        motto: 'Hello MiniProgram',
        userInfo: {
            avatarUrl: defaultAvatarUrl,
            nickName: '',
        },
        hasUserInfo: false,
        canIUseGetUserProfile: wx.canIUse('getUserProfile'),
        canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    },
    // 事件处理函数
    onLoad() {
        console.log('onLoad')
        wx.login({
            success(res) {
                if (res.code) {
                    console.log("res:" + JSON.stringify(res))
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
    onChooseAvatar(e) {
        const {avatarUrl} = e.detail
        const {nickName} = this.data.userInfo
        this.setData({
            "userInfo.avatarUrl": avatarUrl,
            hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
        })
    },
    onInputChange(e) {
        const nickName = e.detail.value
        const {avatarUrl} = this.data.userInfo
        this.setData({
            "userInfo.nickName": nickName,
            hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
        })
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    },
})
