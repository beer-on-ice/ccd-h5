import echarts from "echarts";
const rightIcon = require("../assets/images/right-arrow.png");
const leftIcon = require("../assets/images/left-arrow.png");

// 产品数据图
export function calcPieChart(themeData, data = {}) {
  let dataValue = Math.round(100 * data.rate);
  let backgroundValue = 100 - dataValue;
  return {
    tooltip: {
      show: false
    },
    series: [
      {
        type: "pie",
        radius: ["170%", "240%"],
        hoverAnimation: false,
        hoverOffset: false,
        avoidLabelOverlap: false,
        startAngle: 140,
        center: ["50%", "140%"],
        label: {
          show: false,
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: dataValue,
            name: "sdfs",
            itemStyle: {
              color: {
                type: "linear",
                colorStops: [
                  {
                    offset: 0,
                    color: themeData[0] // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: themeData[1] // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            value: backgroundValue,
            itemStyle: {
              color: "#EEEEEE"
            },
            emphasis: {
              itemStyle: {
                color: "#EEEEEE"
              }
            }
          },
          {
            value: 260,
            itemStyle: {
              color: "transparent"
            }
          }
        ]
      }
    ]
  };
}
// 运行状态图两个
export function calcRunChart(chartData) {
  let totalValue = chartData.reduce((prev, curr) => prev + curr.value, 0);
  let seriesData = chartData.map(item => {
    return {
      value: item.value,
      name: item.name
    }
  });
  return {
    series: [
      {
        name: "",
        type: "pie",
        radius: "90%",
        center: ["0%", "50%"],
        avoidLabelOverlap: false,
        startAngle: 90,
        hoverOffset: 0,
        itemStyle: {
          normal: {
            borderColor: "transparent",
            borderWidth: 20
          },
          emphasis: {
            borderColor: "transparent",
            borderWidth: 20
          }
        },
        label: {
          normal: {
            show: false,
            position: "inside",
            formatter: "{c}%"
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 50,
            name: "",
            itemStyle: {
              normal: { color: "#F0F4F8" },
              emphasis: { color: "#F0F4F8" }
            }
          },
          {
            value: 50,
            name: "",
            itemStyle: {
              normal: { color: "transparent" },
              emphasis: { color: "transparent" }
            },
            label: {
              show: true,
              position: "center",
              formatter: function() {
                return "{kong|}{icon|}";
              },
              rich: {
                kong: {
                  padding: [0, 20, 0, 20]
                },
                icon: {
                  width: 20,
                  height: 20,
                  backgroundColor: {
                    image: rightIcon
                  }
                }
              }
            }
          }
        ]
      },
      {
        name: "",
        type: "pie",
        radius: ["105%", "155%"],
        center: ["0%", "50%"],
        avoidLabelOverlap: false,
        startAngle: 90,
        color: ["#47E5EF", "#5182FF", "#8651FF", "#DD32F9", "#FF7F57"],
        label: {
          normal: {
            show: false,
            position: "inside",
            formatter: "{c}%"
          },
          emphasis: {
            show: false,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: seriesData.concat([{
          value: totalValue,
          name: "",
          itemStyle: {
            normal: { color: "transparent" },
            emphasis: { color: "transparent" }
          },
          label: { normal: { show: false } }
        }])
      }
    ]
  };
}

export function calcYanChart(totalData) {
  let yanSeriesData = totalData.rateD;
  let extraData = 1 - totalData.rateD;
  return {
    series: [
      {
        name: "",
        type: "pie",
        radius: "90%",
        center: ["0%", "50%"],
        avoidLabelOverlap: false,
        startAngle: 90,
        hoverOffset: 0,
        itemStyle: {
          normal: {
            borderColor: "transparent",
            borderWidth: 20
          },
          emphasis: {
            borderColor: "transparent",
            borderWidth: 20
          }
        },
        label: {
          normal: {
            show: false,
            position: "inside",
            formatter: "{c}%"
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 50,
            name: "",
            itemStyle: {
              normal: { color: "#F0F4F8" },
              emphasis: { color: "#F0F4F8" }
            }
          },
          {
            value: 50,
            name: "",
            itemStyle: {
              normal: { color: "transparent" },
              emphasis: { color: "transparent" }
            },
            label: {
              show: true,
              position: "center",
              formatter: function() {
                return "{kong|}{icon|}";
              },
              rich: {
                kong: {
                  padding: [0, 20, 0, 20]
                },
                icon: {
                  width: 20,
                  height: 20,
                  backgroundColor: {
                    image: leftIcon
                  }
                }
              }
            }
          }
        ]
      },
      {
        name: "",
        type: "pie",
        radius: ["105%", "150%"],
        center: ["0%", "50%"],
        avoidLabelOverlap: false,
        startAngle: 90,
        color: ["#FF8B72", "#F0F4F8"],
        label: {
          normal: {
            show: false,
            position: "inside",
            formatter: "{c}%"
          },
          emphasis: {
            show: false,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: yanSeriesData, name: "延期清算" },
          { 
            value: extraData, 
            name: "背景", 
            itemStyle: {
              emphasis: { color: '#F0F4F8' }
            } 
          },
          {
            value: 1,
            name: "",
            itemStyle: {
              normal: { color: "transparent" },
              emphasis: { color: "transparent" }
            },
            label: { normal: { show: false } }
          }
        ]
      }
    ]
  };
}

//  投向行业
export function calcIndustryChart() {
  return {
    grid: {
      top: "30px",
      left: "4%",
      right: "0px",
      bottom: "0px",
      backgroundColor: "#fff",
      height: "75%",
      width: "92%"
    },
    xAxis: [
      {
        show: false,
        type: "category",
        data: []
      }
    ],
    yAxis: [
      {
        show: false,
        type: "value"
      }
    ],
    series: [
      {
        name: "背景",
        type: "bar",
        emphasis: {
          itemStyle: {
            color: "transparent"
          }
        },
        barWidth: 70,
        barCategoryGap: 10,
        color: "#F3F3F3",
        label: {
          show: true,
          position: "top",
          distance: -10,
          color: "#007BFF",
          padding: [5, 6],
          backgroundColor: "#fff",
          borderRadius: 5,
          formatter: function(label) {
            return label.dataIndex + 1;
          }
        },
        data: []
      },
      {
        name: "直接访问",
        type: "bar",
        barWidth: 70,
        barCategoryGap: 10,
        barGap: "-100%",
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(0,220,255,0.27)"
          },
          {
            offset: 1,
            color: "rgba(0,123,255,0.8)"
          }
        ]),
        label: {
          show: true,
          position: "insideBottom",
          color: "#000",
          fontSize: 13,
          formatter: function(label) {
            return (label.data.rate * 100).toFixed(2) + '%';
          }
        },
        data: []
      }
    ],
    dataZoom: [
      {
        type: "inside",
        disabled: false,
        xAxisIndex: 0,
        zoomLock: true,
        preventDefaultMouseMove: false
      }
    ]
  };
}

// 类型分析
export function calcAnalyzeChart(dataList = [], colorList, type = 'fund') {
  let scaleData = dataList.map(item => {
    return {
      name: type === 'fund' ? item.type : item.codeDesc,
      value: item.count
    }
  });
  let productTotal = scaleData.reduce((prev, curr) => prev + curr.value, 0);
  var data = [];
  for (var i = 0; i < scaleData.length; i++) {
    data.push({
      value: scaleData[i].value,
      name: scaleData[i].name,
      itemStyle: {
        normal: {
          color: colorList[i],
          shadowBlur: 10,
          shadowColor: colorList[i]
        }
      }
    });
  }
  return {
    series: [
      {
        name: "",
        type: "pie",
        clockWise: false,
        radius: ["50%", "55%"],
        center: ["50%", "60%"],
        // hoverAnimation: false,
        label: {
          // show: false,
          position: 'center',
          formatter: function() {
            return `{a|${productTotal}}`+ '\n' +'{b|产品总数}'
          },
          rich: {
            a: {
              fontSize: 30,
              color: '#666666',
              fontWeight: 'bold',
            },
            b: {
              fontSize: 14,
              color: '#999',
              marginTop: 5
            }
          }
        },
        emphasis: {
          label: {
            show: true,
            position: 'outside',
            // color: '#000'
          }
        },
        data: data
      },
      {
        name: "",
        type: "pie",
        clockWise: false,
        radius: ["52%", "55%"],
        center: ["50%", "60%"],
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            position: 'outside',
          }
        },
        data: data
      }
    ]
  };
}

// 发行时间
export function calcPublicChart(dataList, color) {
  let xAxis = dataList.map(item => item.time);
  let seriesData = dataList.map(item => item.count);
  return {
    grid: {
      top: "30px",
      left: "4%",
      right: "0px",
      bottom: "0px",
      backgroundColor: "#fff",
      height: "75%",
      width: "92%"
    },
    xAxis: {
      type: 'category',
      data: xAxis,
      axisTick: {
        show: false
      },
      axisLine: {
        color: '#EEEEEE'
      },
      axisLabel: {
        fontSize: 12,
        color: '#aaa'
      }
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        data: seriesData,
        type: 'line',
        smooth: true,
        symbolSize: 13,
        itemStyle: {
          borderWidth: 2,
          borderColor: color,
          color: color
        }
      }
    ],
  }
}