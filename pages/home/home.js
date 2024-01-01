const image = 'https://go.cdn.heytea.com/storage/image/2024/01/01/2e6a3eb5416545c9ae4164ac400baa93.jpeg';
const items = new Array(8).fill({ label: 'Frozen猿', image }, 0, 8);

const swiperList = [
  "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/f08c02795cea481e9d149a2bb93353dc.png",
  "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/1c67f9aab45d4db6bbc4842f4ed368d3.png",
  "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/a77139578ada4a0e96f777d60370e524.jpg",
  "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/883314bc5a22440f964542417c5f28db.jpg",
  "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/952bc6aa8d564d4a9aacaceba25dc62c.png",
  "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/58f841cb3a4545368e96bb0613462f03.jpg",
  "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/8ca4c50e8ed8410183c36f9c40720cb8.jpg",
  "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/e06330ff00164227be5444f6cdf80eac.jpg"
];

Page({
  offsetTopList: [],
  data: {
    current: 1,
    autoplay: true,
    duration: 500,
    interval: 5000,
    paginationPosition: 'bottom-right',
    swiperList,
    navigation: { type: 'fraction' },
    sideBarIndex: 0,
    scrollTop: 0,
    categories: [
      {
        label: '时令上新',
        title: '时令上新',
        icon: 'bad-laugh',
        badgeProps: {},
        items: items.slice(0, 3),
      },
      {
        label: '热饮推荐',
        title: '热饮推荐',
        icon: 'sinister-smile',
        badgeProps: {
          dot: true,
        },
        items: items.slice(0, 9),
      },
      {
        label: '轻负担推荐',
        title: '轻负担推荐',
        icon: 'smile',
        badgeProps: {},
        items: items.slice(0, 9),
      },
      {
        label: '清乳茶',
        title: '清乳茶',
        icon: 'joyful',
        badgeProps: {
          count: 6,
        },
        items: items.slice(0, 6),
      },
      {
        label: '清爽真果茶',
        title: '清爽真果茶',
        icon: 'excited',
        badgeProps: {},
        items: items.slice(0, 3),
      },
      {
        label: '传统真果茶',
        title: '传统真果茶',
        icon: 'awkward',
        badgeProps: {},
        items: items.slice(0, 3),
      },
      {
        label: '茗茶/咖啡/蛋糕',
        title: '茗茶/咖啡/蛋糕',
        icon: 'sleep',
        badgeProps: {},
        items: items.slice(0, 3),
      },
      {
        label: '吃点啥',
        title: '吃点啥',
        icon: 'uncomfortable',
        badgeProps: {},
        items: items.slice(0, 3),
      },
      {
        label: '小料&提示',
        title: '小料&提示',
        icon: 'joyful',
        badgeProps: {},
        items: items.slice(0, 3),
      },
      {
        label: '经典果茶',
        title: '经典果茶',
        icon: 'crack',
        badgeProps: {},
        items: items.slice(0, 3),
      },
    ],
  },
  onLoad() {
    const query = wx.createSelectorQuery().in(this);
    const { sideBarIndex } = this.data;

    query
      .selectAll('.title')
      .boundingClientRect((rects) => {
        this.offsetTopList = rects.map((item) => item.top);
        this.setData({ scrollTop: rects[sideBarIndex].top });
      })
      .exec();
  },
  onSideBarChange(e) {
    const { value } = e.detail;

    this.setData({ sideBarIndex: value, scrollTop: this.offsetTopList[value] });
  },
  onScroll(e) {
    const { scrollTop } = e.detail;
    const threshold = 50; // 下一个标题与顶部的距离

    if (scrollTop < threshold) {
      this.setData({ sideBarIndex: 0 });
      return;
    }

    const index = this.offsetTopList.findIndex((top) => top > scrollTop && top - scrollTop <= threshold);

    if (index > -1) {
      this.setData({ sideBarIndex: index });
    }
  },
});
