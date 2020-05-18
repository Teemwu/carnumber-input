# carnumber-input
微信小程序车牌录入，在[此文](https://juejin.im/post/5c4e7069e51d454b0d75d3db)基础上进行修改。

## 预览
![效果](2020-05-18%2022-13-14.2020-05-18%2022_16_40.gif)

## 使用
```javascript
// index.js
Page({
  data: {
    isShowKB: false,
    placeholder: '京A66666'
  },
  showKB() {
    this.setData({
      isShowKB: true
    })
  },
  confirm(e) {
    console.log(e.detail);
  }
})
```

```html
<!-- index.wxml -->
<carnumber-input value="粤C" 
                 placeholder="{{placeholder}}" 
                 show="{{isShowKB}}"
                 bind:confirm="confirm">
</carnumber-input>
```

## 属性
| 属性        | 类型    | 默认值 | 描述                   |
| :---------- | :------ | :----- | :--------------------- |
| value       | String  | ''     | 填充默认车牌前缀或车牌 |
| placeholder | String  | ''     | 显示提示到车牌         |
| show        | Boolean | false  | 控制组件到显示和隐藏   |

## 事件
| 名称    | 返回值类型 | 描述                   |
| :------ | :--------- | :--------------------- |
| confirm | String     | 车牌号                 |
| cancel  | 无         | 点击组件关闭按钮时触发 |
