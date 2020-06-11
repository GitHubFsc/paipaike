// components/multiSelector/multiSelector.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Array,
    },
    placeholder: {
      type: String,
      value: ''
    },

    placeholderClass: {
      type: String,
      value: 'input-placeholder'
    },
    placeholderStyle: String,
    disabled: {
      type: Boolean,
      value: false
    },
    value: Array,
    itemId: Array,

    selected: Array,


    showValue: { //显示选择的结果还是选择的内容
      type: Boolean,
      value: true
    },
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    confirmButtonText: {
      type: String,
      value: '确定'
    }
  },

  observers: {
    selected(n) {
      this.setData({
        selecteds: n
      })

    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    modalOpen: false,
    opacityAnimation: {},
    popAnimation: {},
    selecteds: [],
    tempValue: [],
    tempSelected: [],
    dataItem: [],
    changed: false //一个flag
  },

  ready() {
    // console.log(this.properties.selected)
    //初始化已选择
    // console.log('this.properties',this.properties)
    // console.log('this.properties.items',this.properties.items)
    // const value = this.data.value;
    //   const items = this.data.items;
    //   console.log(n)
    //   const selected = [];
    //   for (let i = 0; i < value.length; i++) {
    //     for (let j = 0; j < items.length; j++) {
    //       if (value[i] === items[j].id) {
    //         selected.push(items[j].value);
    //         items[j].checked = true;
    //         break;
    //       }
    //     }
    //   }
    //   this.setData({
    //     items: items,
    //     selected: selected
    //   })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindCheckboxChange(e) {
      const value = e.detail.value;
      // console.log(value)
      const items = this.data.items;
      items.forEach(item => {
        item.checked = false
      });
      const selecteds = [];
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < items.length; j++) {
          if (value[i] === items[j].id) {
            items[j].checked = true;
            // console.log(items[j].value)
            selecteds.push(items[j].value);
            break;
          }
        }
      }
      this.setData({
        changed: true,
        items: items,
        tempValue: value,
        selecteds: selecteds,
        tempSelected: selecteds
      })
    },
    showModal(e) {
      // if(this.data.disabled){
      //   return;
      // }
      // this.triggerEvent('modalopen');
      //先将原来的选择结果备份
      const value = this.data.value;
      const items = this.data.items;
      // console.log(items)
      // items.forEach(item => { item.checked = false });

      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < items.length; j++) {
          if (value[i] === items[j].id) {
            items[j].checked = true;
            break;
          }
        }
      }

      var opacityAnimation = wx.createAnimation({
        duration: 200,
        timingFunction: '"linear"',
        delay: 0
      });
      opacityAnimation.opacity(1).step();
      this.setData({
        changed: false,
        items: items,
        modalOpen: true
      })
    },
    hideModal(e) {
      // console.log(e)
      // this.triggerEvent('modalclose');
      const action = e.currentTarget.dataset.action || 'cancel';
      var opacityAnimation = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear',
        delay: 0
      });
      opacityAnimation.opacity(0).step();
      this.setData({
        modalOpen: false
      })

      // if (action === 'cancel' || !this.data.changed) {
      //   this.setData({
      //     tempValue: [],
      //     tempSelected: [],
      //     modalOpen: false
      //   })
      // } else {
      //   this.setData({
      //     value: this.data.tempValue,
      //     selected: this.data.tempSelected,
      //     modalOpen: false
      //   });
      this.triggerEvent('change', {
        value: this.data.tempValue
      });
      // }
    }
  }
})