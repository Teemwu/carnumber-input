const INPUT_NUM = 8 // 车牌号输入框个数
const EmptyArray = new Array(INPUT_NUM).fill('') // ['','','','','','','','']

// 车牌输入框的下标
const INPUT_INDEX = {
  FIRST: 0,
  SECOND: 1,
}

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: EmptyArray
    }
  },
  observers: {
    'value': function (val) {
      if (val) {
        val.split('').forEach((item, index) => {
          EmptyArray[index] = item
        })
        this.setData({
          carNumArr: EmptyArray,
          selectInputIndex: val.length
        })
      }
    }
  },
  data: {
    // 键
    provinceArr: [
      '京',
      '沪',
      '粤',
      '津',
      '冀',
      '晋',
      '蒙',
      '辽',
      '吉',
      '黑',
      '苏',
      '浙',
      '皖',
      '闽',
      '赣',
      '鲁',
      '豫',
      '鄂',
      '湘',
      '军',
      '桂',
      '琼',
      '渝',
      '川',
      '贵',
      '云',
      '藏',
      '陕',
      '兰',
      '济',
      '甘',
      '青',
      '宁',
      '新',
      '使',
      '警',
      '北',
      '无'
    ],
    strArrOne: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
    strArrTwo: ['L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'],
    strArrThree: ['W', 'X', 'Y', 'Z', '港', '澳', '学', '领'],
    numArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    hiddenPro: false, // 隐藏省份键盘
    hiddenStr: true, // 隐藏数字字母键盘
    carNumArr: EmptyArray,
    selectInputIndex: 0,
    btnDisabled: true,
  },
  methods: {
    proTap(e) {
      // 点击省份
      let province = e.currentTarget.dataset.province
      const { carNumArr, selectInputIndex } = this.data
      this.setData({
        hiddenPro: true,
        hiddenStr: false,
      })
      carNumArr[selectInputIndex] = province
      // 选择车牌号时触发
      this.setData({
        carNumArr,
        // 选中一个后，下一个输入框聚焦
        selectInputIndex:
          selectInputIndex !== carNumArr.length - 1
            ? selectInputIndex + 1
            : selectInputIndex,
        btnDisabled: this.btnDisabled(),
      })
    },
    strTap(e) {
      // 点击字母数字
      const str = e.currentTarget.dataset.str
      const { carNumArr, selectInputIndex } = this.data
      carNumArr[selectInputIndex] = str
      this.setData({
        carNumArr,
        // 选中一个后，下一个输入框聚焦
        selectInputIndex:
          selectInputIndex !== carNumArr.length - 1
            ? selectInputIndex + 1
            : selectInputIndex,
        btnDisabled: this.btnDisabled(),
      })
    },
    kbtrigger() {
      this.setData({
        hiddenPro: false,
        hiddenStr: true,
      })
    },
    inputCarNum(e) {
      const { index } = e.currentTarget.dataset
      this.setData({
        showCarKeyboard: true,
        selectInputIndex: index,
      })
      if (index === INPUT_INDEX.FIRST) {
        // 第一个输入框展示省份键盘，第二个展示字母数字输入框(数字不可点),以后就是数字字母输入框(都可点)
        this.setData({
          hiddenPro: false,
          hiddenStr: true,
        })
      } else if (index === INPUT_INDEX.SECOND) {
        this.setData({
          hiddenPro: true,
          hiddenStr: false,
        })
      } else {
        this.setData({
          hiddenPro: true,
          hiddenStr: false,
        })
      }
    },
    backSpace() {
      // 删除
      const { carNumArr, selectInputIndex } = this.data
      carNumArr[selectInputIndex] = ''
      this.setData(
        {
          carNumArr,
          selectInputIndex:
            selectInputIndex !== INPUT_INDEX.FIRST
              ? selectInputIndex - 1
              : selectInputIndex,
          btnDisabled: this.btnDisabled(),
        },
        () => {
          if (this.data.selectInputIndex === INPUT_INDEX.FIRST) {
            // 这里必须要用this.data.selectInputIndex，用最新的
            this.setData({
              hiddenPro: false,
              hiddenStr: true,
            })
          }
        }
      )
    },
    // 只有输入内容的车牌号位数合法时，展示确认按钮
    btnDisabled() {
      const { carNumArr } = this.data
      const disabled = carNumArr.some((item, index) => {
        if (index !== carNumArr.length - 1) {
          return !item
        }
        return false
      })
      return disabled
    },
    cancel() {
      this.setData({ carNumArr: EmptyArray, show: false })
      this.triggerEvent('cancel')
    },
    confirm() {
      const carNum = this.data.carNumArr.join('')
      this.setData({
        show: false
      })
      this.triggerEvent('confirm', carNum)
    },
  },
})
