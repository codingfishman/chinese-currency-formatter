const ChinesesCurrencyFormatter = require('../src/index.js')

describe('测试中文的格式化', () =>{
  it('包含所有中文', () => {
    const result = ChinesesCurrencyFormatter(987650321.46)
    expect(result).toEqual('玖亿捌仟柒佰陆拾伍万零叁佰贰拾壹圆肆角陆分')
  })

  it('undefined', () => {
    const result = ChinesesCurrencyFormatter(undefined)
    expect(result).toEqual('无效金额')
  })

  it('100000000', () => {
    const result = ChinesesCurrencyFormatter(100000000)
    expect(result).toEqual('壹亿圆整')
  })

  it('0', () => {
    const result = ChinesesCurrencyFormatter(0)
    expect(result).toEqual('零圆整')
  })

  it('0.12', () => {
    const result = ChinesesCurrencyFormatter(0.12)
    expect(result).toEqual('壹角贰分')
  })

  it('0.1', () => {
    const result = ChinesesCurrencyFormatter(0.12)
    expect(result).toEqual('壹角贰分')
  })

  it('1元钱', () => {
    const result = ChinesesCurrencyFormatter(1)
    expect(result).toEqual('壹圆整')
  })

  it('987', () => {
    const result = ChinesesCurrencyFormatter(987)
    expect(result).toEqual('玖佰捌拾柒圆整')
  })

  it('654.28', () => {
    const result = ChinesesCurrencyFormatter(654.28)
    expect(result).toEqual('陆佰伍拾肆圆贰角捌分')
  })

  it('986768584978.88', () => {
    const result = ChinesesCurrencyFormatter(986768584978.88)
    expect(result).toEqual('玖仟捌佰陆拾柒亿陆仟捌佰伍拾捌万肆仟玖佰柒拾捌圆捌角捌分')
  })

  it('10100', () => {
    const result = ChinesesCurrencyFormatter(10326.88)
    expect(result).toEqual('壹万零叁佰贰拾陆圆捌角捌分')
  })

  it('20030', () => {
    const result = ChinesesCurrencyFormatter(20030)
    expect(result).toEqual('贰万零叁拾圆整')
  })

  it('40005', () => {
    const result = ChinesesCurrencyFormatter(40005)
    expect(result).toEqual('肆万零伍圆整')
  })

  it('205000', () => {
    const result = ChinesesCurrencyFormatter(205000)
    expect(result).toEqual('贰拾万零伍仟圆整')
  })

  it('215000', () => {
    const result = ChinesesCurrencyFormatter(215000)
    expect(result).toEqual('贰拾壹万伍仟圆整')
  })

  it('210600.11', () => {
    const result = ChinesesCurrencyFormatter(210600.11)
    expect(result).toEqual('贰拾壹万零陆佰圆壹角壹分')
  })

  it('3529806.22', () => {
    const result = ChinesesCurrencyFormatter(3529806.22)
    expect(result).toEqual('叁佰伍拾贰万玖仟捌佰零陆圆贰角贰分')
  })

  it('43529806.99', () => {
    const result = ChinesesCurrencyFormatter(43529806.99)
    expect(result).toEqual('肆仟叁佰伍拾贰万玖仟捌佰零陆圆玖角玖分')
  })

  it('943529806.99', () => {
    const result = ChinesesCurrencyFormatter(943529806.99)
    expect(result).toEqual('玖亿肆仟叁佰伍拾贰万玖仟捌佰零陆圆玖角玖分')
  })

  it('1043529806.99', () => {
    const result = ChinesesCurrencyFormatter(1043529806.99)
    expect(result).toEqual('壹拾亿零肆仟叁佰伍拾贰万玖仟捌佰零陆圆玖角玖分')
  })

  it('2143529806.99', () => {
    const result = ChinesesCurrencyFormatter(2143529806.99)
    expect(result).toEqual('贰拾壹亿肆仟叁佰伍拾贰万玖仟捌佰零陆圆玖角玖分')
  })
})