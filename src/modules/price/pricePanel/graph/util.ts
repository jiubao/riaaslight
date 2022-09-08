import { IPrice } from '../../../../domain'
let isReverse = false
let showLabel = true
export function getOption(
  source: { [key: string]: IPrice },
  color: string | null
) {
  let option

  const category = Object.keys(source)
  const data: [number, number, string][] = category.map((date) => {
    const item = source[date]
    return [item.min_price, item.max_price, color || '#469CE2']
  })

  let series: any = [...createSeries(data, '1', showLabel, isReverse)]

  let yAxis: any = {
    type: 'value',
    name: 'unit：$',
    nameTextStyle: {
      color: '#86909C',
      fontWeight: 600,
      align: 'right',
      padding: [0, 25, 30, 0],
      fontSize: 14,
      fontFamily: 'PingFang SC',
    },
    axisLabel: {
      show: true,
      align: 'right',
      color: '#86909C',
      fontWeight: 600,
      fontSize: 14,
      margin: 30,
      fontFamily: 'PingFang SC',
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
  }

  let xAxis: any = {
    type: 'category',
    splitLine: {
      show: false,
    },
    axisLabel: {
      show: true,
      align: 'top',
      color: '#000000',
      fontWeight: 600,
      fontSize: 12,
      margin: 8,
      fontFamily: 'PingFang SC',
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#C9CDD4',
        width: 1.6,
      },
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
      left: 40,
      right: 18,
      bottom: 60,
      top: 80,
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
      barWidth: 35,
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
      barWidth: 35,
      markPoint: {
        symbol: 'rect',
        // 图形上面的小头隐藏
        symbolSize: 0.000000000000001,
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
  let minLabel: Array<{ value: number; coord: number[]; [key: string]: any }> =
    [] // 显示区间的最小值的 label 数据，在 max 上通过 markpoint 实现，以控制 label 颜色值和显示的柱子颜色值一致，并且显示隐藏有效

  data.forEach((item, i) => {
    min.push(item[0])

    // 横向：coord: [offsetx，y]，等同于 xAxis: offsetx, yAxis: y。其中，offsetx 表示偏移值，y 表示bar的索引。
    // 竖向：[x, offsety]
    const coord = isReverse ? [item[0], i] : [i, item[0]]
    minLabel.push({
      value: item[0], // 对值进行格式化
      coord: item[0] ? coord : [],
      label: {
        position: 'bottom',
        color: item[2],
        fontFamily: 'PingFang SC',
        fontSize: 16,
        fontWeight: 600,
      },
    })

    max.push({
      value: item[1] - item[0], // 差值作为叠加值
      range: item, // tooltip 显示
      name, // legend 显示
      label: {
        formatter: '' + item[1], // 最终值作为显示值
        color: item[2],
        fontFamily: 'PingFang SC',
        fontSize: 16,
        fontWeight: 600,
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
