// app.js
App({
    onLaunch() {
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    globalData: {
        userInfo: {},
        // domain: "https://api.frozenhu.cn:8080"
        domain: "http://127.0.0.1:7100"
    }
})
