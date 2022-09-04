let isReverse = false
let showLabel = true
import { IPrice } from '../../../../domain'
export function getOption(source: { [key: string]: IPrice }) {
  let option

  const category = Object.keys(source)
  const data: [number, number, string][] = category.map((date) => {
    const item = source[date]
    return [item.min_price, item.max_price, '#ff5722']
  })

  let series: any = [...createSeries(data, '1', showLabel, isReverse)]

  let yAxis: any = {
    type: 'value',
  }

  let xAxis: any = {
    type: 'category',
    splitLine: {
      show: false,
    },
    data: category,
  }

  if (isReverse) {
    let a = xAxis
    xAxis = yAxis
    yAxis = a
  }

  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params: any) {
        var html = ''
        var axisValue = ''
        params.forEach((item: any) => {
          axisValue = item.axisValue
          const range = item.data.range
          html += item.marker + range[0] + ' - ' + range[1] + '<br/>'
        })
        const {
          name,
          data: { range },
        } = params[0]
        return axisValue + '<br/>' + html
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: xAxis,
    yAxis: yAxis,
    series: series,
  }

  return option
}
function createSeries(
  arr: Array<[number, number, string]>,
  name: string,
  showLabel: boolean,
  isReverse: boolean
) {
  let newSeries = []

  const { min, max, minLabel } = dataFormat(arr, name, isReverse)

  const maxPosition = isReverse ? 'right' : 'top'
  const minPosition = isReverse ? 'left' : 'bottom'

  newSeries = [
    {
      type: 'bar',
      stack: name,
      tooltip: {
        show: false,
      },
      // 透明
      itemStyle: {
        barBorderColor: 'rgba(0,0,0,0)',
        color: 'rgba(0,0,0,0)',
      },
      emphasis: {
        itemStyle: {
          barBorderColor: 'rgba(0,0,0,0)',
          color: 'rgba(0,0,0,0)',
        },
      },
      label: {
        show: false,
      },
      data: min,
    },
    {
      type: 'bar',
      stack: name,
      name: name,
      tooltip: {
        show: true,
      },
      label: {
        show: showLabel,
        position: maxPosition,
      },
      markPoint: {
        symbol: 'rect',
        // 图形上面的小头隐藏
        symbolSize: 0.000000000000001,
        label: {
          show: showLabel,
          position: minPosition,
        },
        data: minLabel,
      },
      data: max,
    },
  ]

  return newSeries
}

// 轴数据处理
function dataFormat(
  data: Array<[number, number, string]>,
  name: string,
  isReverse: boolean
) {
  let min: number[] = [] // 区间的最小值
  let max: Array<{
    value: number
    range: [number, number, string]
    name: string
    [key: string]: any
  }> = [] // 区间的最大值
  let minLabel: Array<{ value: number; coord: number[] }> = [] // 显示区间的最小值的 label 数据，在 max 上通过 markpoint 实现，以控制 label 颜色值和显示的柱子颜色值一致，并且显示隐藏有效

  data.forEach((item, i) => {
    min.push(item[0])

    // 横向：coord: [offsetx，y]，等同于 xAxis: offsetx, yAxis: y。其中，offsetx 表示偏移值，y 表示bar的索引。
    // 竖向：[x, offsety]
    const coord = isReverse ? [item[0], i] : [i, item[0]]
    minLabel.push({
      value: item[0], // 对值进行格式化
      coord: item[0] ? coord : [],
    })

    max.push({
      value: item[1] - item[0], // 差值作为叠加值
      range: item, // tooltip 显示
      name, // legend 显示
      label: {
        formatter: '' + item[1], // 最终值作为显示值
      },
      itemStyle: {
        color: item[2],
      },
    })
  })

  return {
    min,
    max,
    minLabel,
  }
}
