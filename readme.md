中文的金额是一个有丰富意义的场景，本组件用于将金额显示为中文大写的金额。

## 如何使用

```js
const ChinesesCurrencyFormatter = require('chinese-currency-formatter')

const chsCurrency = ChinesesCurrencyFormatter(987650321.46) // 玖亿捌仟柒佰陆拾伍万零叁佰贰拾壹圆肆角陆分
```

更多的调用示例可参考[单元测试](/spec/index-spec.js)

## 变更
1.0.0 自该版本起，不再作为React组件存在，因为其方法其实完全可以脱离React，也方便更普通的场景调用。
> 如果您使用了之前的版本，给您带来不便，还请谅解。
