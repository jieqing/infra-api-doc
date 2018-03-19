var myChart;
var option;

myChart = echarts.init(document.getElementById('avgspeedchar'));
option = {
    tooltip: {
        formatter: "{a} <br/>{c} {b}"
    },
    series: [
        {
            name: '当前速度',
            type: 'gauge',
            center: ['65%', '55%'],
            min: 0,
            max: 220,
            splitNumber: 11,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 4
                }
            },
            axisTick: {            // 坐标轴小标记
                length: 8,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length: 15,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            title: {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic'
                }
            },
            detail: {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            data: [{value: 0, name: 'km/h'}]
        },
        {
            name: '当前电量',
            type: 'gauge',
            center: ['24%', '60%'],    // 默认全局居中
            radius: '50%',
            min: 0,
            max: 100,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.2, '#ff4500'],[0.8, '#48b'],[1, '#228b22']],
                    width: 4
                }
            },
            axisTick: {            // 坐标轴小标记
                length: 8,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length: 13,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                width: 5
            },
            title: {
                offsetCenter: [0, '-30%']       // x, y，单位px
            },
            detail: {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            data: [{value: 10, name: '电量%'}]
        }
    ]
}
myChart.setOption(option, true);
