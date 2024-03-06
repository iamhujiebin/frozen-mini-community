// pages/shop/shop.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        query: {},
        shopList: [],
        page: 1,
        pageSize: 10,
        total: 0,
        isLoading: false // 节流阀,下拉触底比网络请求快多了导致的
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            query: options
        })
        this.getShopList()
    },

    getShopList() {
        this.setData({
            isLoading: true
        })
        wx.showLoading({
            title: '数据加载中...',
        })
        wx.request({
            url: `https://applet-base-api-t.itheima.net/categories/${this.data.query.id}/shops`,
            method: "GET",
            data: {
                _page: this.data.page,
                _limit: this.data.pageSize,
            },
            success: (res) => {
                console.log(res)
                this.setData({
                    total: res.header["X-Total-Count"] - 0, // 字符串-0可以快速成为数字
                    shopList: [...this.data.shopList, ...res.data],
                })
            },
            fail: e => {
                console.error(e)
            },
            complete: () => {
                wx.hideLoading()
                this.setData({
                    isLoading: false
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (this.data.isLoading) return
        this.setData({
            page: this.data.page + 1
        })
        this.getShopList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})