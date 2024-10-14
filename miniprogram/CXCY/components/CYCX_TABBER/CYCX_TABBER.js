Component({
  properties: {
      idx: {
          type: Number,
          value: 0
      }
  },
  data: {
      tabBar: [
      {
        "current": 0,
        "pagePath": "../../pages/home_CXCY/home_CXCY",
        "text": "首页",
        "iconClass":"../../../pages/images/tabs/home0.png",
        "iconTopClass":""
      },{
        "current": 0,
        "pagePath": "../../pages/project/project",
        "text": "项目列表",
        "iconClass":"../../../pages/images/tabs/list0.png",
        "iconTopClass":""
      },
      {
        "current": 0,
        "pagePath": "../../pages/add/add",
        "text": "发布",
        "iconClass":"../../../pages/images/tabs/add0.png",
        "iconTopClass":""

      },
      {
        "current": 0,
        "pagePath": "../../pages/user/user",
        "text": "我的",
        "iconClass":"../../../pages/images/tabs/me0.png",
        "iconTopClass":""
      },
    ]
  },
  observers: {
    "idx": function (id) {
      var otabbar = this.data.tabBar;
      otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
      otabbar[id]['current'] = 1;
      this.setData({ tabBar: otabbar});
    }
  },
  methods: {
    goToTab: function(e){
      console.log(e)
      var url = e.currentTarget.dataset.url
      wx.navigateTo({
        url:url
      })
    }
  }
});