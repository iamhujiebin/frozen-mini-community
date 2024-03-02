const image = 'https://go.cdn.heytea.com/storage/image/2024/01/01/2e6a3eb5416545c9ae4164ac400baa93.jpeg';
const items = new Array(8).fill({
    label: 'Frozen猿',
    image
}, 0, 8);

var app = getApp();

Page({
    offsetTopList: [],
    data: {
        current: 1,
        autoplay: true,
        duration: 500,
        interval: 5000,
        paginationPosition: 'bottom-right',
        swiperList: [
            "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/e06330ff00164227be5444f6cdf80eac.jpg"
        ],
        navigation: {
            type: 'fraction'
        },
        sideBarIndex: 0,
        scrollTop: 0,
        categories: [{
            label: '时令上新',
            title: '时令上新',
            icon: 'bad-laugh',
            badgeProps: {},
            items: items.slice(0, 3),
        },],
    },
    onLoad() {
        var that = this
        // 获取banner
        wx.request({
            url: app.globalData.domain + '/v1.0/banners', // only in 真机调试
            method: 'GET',
            success: function (res) {
                let pics = []
                res.data.data.map(item => {
                    pics.push(item.PicUrl)
                })
                console.log("pics:", pics)
                that.setData({
                    swiperList: pics,
                });
            },
            fail: function (e) {
                console.log('http fail:', e)
            }
        })

        // 获取category
        wx.request({
            url: app.globalData.domain + '/v1.0/category',
            method: 'GET',
            success: function (res) {
                let cateogories = [];
                res.data.data.map((item, index) => {
                    cateogories.push({
                        label: item.label,
                        title: item.title,
                        icon: item.icon,
                        badgeProps: {
                            dot: item.dot,
                            count: item.dotCount
                        },
                        items: items.slice(0, index + 1),
                    })
                })
                that.setData({
                    categories: cateogories
                }, function () { // setData后可以直接跟数据变化后的函数！
                    // 计算sidebar对应锚点top,需要在数据初始化后才执行
                    const query = wx.createSelectorQuery().in(that);
                    const {
                        sideBarIndex
                    } = that.data;

                    query
                        .selectAll('.title')
                        .boundingClientRect((rects) => {
                            const swiperDiff = 196 // 因为增加了sidebar,所以需要扣除掉, 196 是debug出来的,
                            this.offsetTopList = rects.map((item) => item.top - swiperDiff); // 
                            this.setData({
                                scrollTop: rects[sideBarIndex].top - swiperDiff
                            });
                        })
                        .exec();
                })
            },
            fail: function (e) {
                console.log('http fail:', e)
            }
        })

    },
    onSideBarChange(e) {
        const {
            value
        } = e.detail;

        this.setData({
            sideBarIndex: value,
            scrollTop: this.offsetTopList[value]
        });
    },
    onScroll(e) {
        const {
            scrollTop
        } = e.detail;
        const threshold = 50; // 下一个标题与顶部的距离

        if (scrollTop < threshold) {
            this.setData({
                sideBarIndex: 0
            });
            return;
        }

        const index = this.offsetTopList.findIndex((top) => top > scrollTop && top - scrollTop <= threshold);

        if (index > -1) {
            this.setData({
                sideBarIndex: index
            });
        }
    },
});