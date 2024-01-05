import { ref } from "vue";

export const usePeopleOutdoor_month= () => {
  const data = ref([
    {months: "1月", value:8750},
    {months: "2月", value: 15071},
    {months: "3月", value: 16671},
    {months: "4月", value: 9020},
    {months: "5月", value: 23347},
    {months: "6月", value: 20014},
    {months: "7月", value: 13004},
    {months: "8月", value: 6004},
    { months: "9月", value: 6140 },
    {months: "10月", value: 30024 },
    { months: "11月", value: 9640 },
    { months: "12月",value: 6785 },
  ]);
  const green = "#00B96B";
  const yellow = "#fd7e14";
  const red = "#dc3545";
  const config = {
    xField: "months",
    yField: "value",
    seriesField: "value",
    label: {
      // 可手动配置 label 数据标签位置
      position: "top", // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    color: ({ value }) => {
      if (value<=10000) {
        return green;
      } else if (value >10000 && value <15000) {
        return yellow;
      } else {
        return red;
      }
    },
    legend: false,
    height: 240,
  };
  return {
    config,
    data
  }
};
