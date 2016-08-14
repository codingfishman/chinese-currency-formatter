'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*
 * 中文格式化金额,最大支持9999亿。
 */
var ChineseNumbeMap = {
  0: '零',
  1: '壹',
  2: '贰',
  3: '叁',
  4: '肆',
  5: '伍',
  6: '陆',
  7: '柒',
  8: '捌',
  9: '玖'
};

function getChineseFromNumber(number) {
  var intNumber = parseInt(number);
  return ChineseNumbeMap['' + intNumber];
}

// 格式化 千 的数据，单独出来，因为单位多数以此分隔
function formatThousand(thousandData) {
  var thousandStr = '';
  var houndredStr = '';
  var tenStr = '';
  var numberStr = '';

  var thousand = '';
  var hundred = '';
  var ten = '';
  var number = '';

  thousand = parseInt(thousandData / 1000);
  // 当超过一千时，进行千位的处理
  if (thousand >= 1) {
    thousandStr = getChineseFromNumber(thousand) + '仟';
    thousandData = thousandData - thousand * 1000;
  }

  hundred = parseInt(thousandData / 100);
  if (hundred >= 1) {
    thousandData = thousandData - hundred * 100;
  }

  ten = thousandData / 10;

  number = thousandData % 10;

  if (hundred < 1 && ten < 1 && number === 0) {
    hundred = ten = number = '';
  } else {

    houndredStr = hundred < 1 ? '零' : getChineseFromNumber(hundred) + '佰';
    tenStr = ten < 1 ? '零' : getChineseFromNumber(ten) + '拾';
    numberStr = number < 1 ? '' : getChineseFromNumber(number);
  }

  var formattedStr = thousandStr + houndredStr + tenStr + numberStr;

  // 针对1001这种，要转换两个连续的零为一个零;如果第一个值为零，删除;如果最后为0，比如 两百零，也去除
  formattedStr = formattedStr.replace(/零零/, '零').replace(/^零/, '').replace(/零$/, '');

  return formattedStr;
}

function formatDecimal(decimalStr) {
  var newFloat = parseFloat(parseFloat(decimalStr).toFixed(2));
  // 先将小数乘以一百
  var plussedDecimal = newFloat * 100;
  var tenPercentStr = ''; // 角
  var percentStr = ''; // 分

  var tenPercent = plussedDecimal / 10;
  var percent = plussedDecimal % 10;

  tenPercentStr = tenPercent >= 1 ? getChineseFromNumber(tenPercent) + '角' : '零角';
  percentStr = percent >= 1 ? getChineseFromNumber(percent) + '分' : '';

  return tenPercentStr + percentStr;
}

function formatCurrency(originNumber) {
  var numberString = '' + originNumber;
  var decimalStr = '';
  var fullIntegerStr = '';

  var hundredMillionStr = ''; // 亿的中文值
  var tenThousandStr = ''; // 万的中文值
  var intNumberStr = ''; // 整数位的中文值

  var pointerIndex = numberString.indexOf('.');

  if (pointerIndex > 0) {
    decimalStr = numberString.substr(pointerIndex);
    fullIntegerStr = numberString.substr(0, pointerIndex);
  } else {
    fullIntegerStr = numberString;
  }

  // 计算亿的部分
  var hundredMillion = 0;
  hundredMillion = parseInt(originNumber / 100000000);
  // 注意，1/1000000000，当执行parseInt的时候，是以指数 1+e-10来标识的，parseInt后仍然是1
  if (hundredMillion >= 1 && originNumber >= 100000000) {
    if (hundredMillion > 9999) {
      return '数额过大';
    }
    hundredMillionStr = formatThousand(hundredMillion);

    originNumber = originNumber - hundredMillion * 100000000;
  }

  // 计算万的部分
  var tenThousand = parseInt(originNumber / 10000);
  if (tenThousand >= 1) {
    tenThousandStr = formatThousand(tenThousand);
    originNumber = originNumber - tenThousand * 10000;
  }

  // 形如 一亿零九百万，或十亿零两千万这种结构, 在相应单位上面，都相差10及以上
  if (hundredMillion >= 10 && hundredMillion % 10 === 0 || hundredMillion >= 1 && tenThousand < 1000 && tenThousand !== 0) {
    tenThousandStr = '零' + tenThousandStr;
  }

  var intNumber = originNumber;
  intNumberStr = formatThousand(intNumber);

  hundredMillionStr = hundredMillionStr ? hundredMillionStr + '亿' : '';
  tenThousandStr = tenThousandStr ? tenThousandStr + '万' : '';

  // 形如 一万零六百 这种结构的数据,壹拾万零六千
  if (tenThousand >= 10 && tenThousand % 10 === 0 || tenThousand >= 1 && intNumber < 1000 && intNumber !== 0) {
    intNumberStr = '零' + intNumberStr;
  }

  fullIntegerStr = hundredMillionStr + tenThousandStr + intNumberStr;
  fullIntegerStr = fullIntegerStr ? fullIntegerStr + '圆' : '';

  if (decimalStr) {
    decimalStr = formatDecimal(decimalStr);
  } else {
    fullIntegerStr = fullIntegerStr ? fullIntegerStr + '整' : '零圆整';
  }

  return fullIntegerStr + decimalStr;
}

function ChineseCurrencyFormatter(passedInData) {
  var type = typeof passedInData === 'undefined' ? 'undefined' : _typeof(passedInData);
  if (type === 'undefined') {
    return '无效金额';
  }
  var numberToFormat = parseFloat(passedInData);
  return formatCurrency(numberToFormat);
}

module.exports = ChineseCurrencyFormatter;