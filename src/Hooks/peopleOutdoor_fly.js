import { ref } from "vue";

export const usePeopleOutdoor_fly = () => {
  const data = ref([
    {years: "2011", value: 117010},
    {years: "2012", value: 132417},
    {years: "2013", value: 148524},
    {years: "2014", value: 157596},
    {years: "2015", value: 164524},
    {years: "2016", value: 175669},
    {years: "2017", value: 183883},
    {years: "2018", value: 187699},
    { years: "2019", value: 203131 },
    {years: "2020", value: 115197 },
    { years: "2021", value: 174565 },
    { years: "2022", value: 115062 },
  ]);
  const green = "#00B96B";
  const yellow = "#fd7e14";
  const red = "#dc3545";
  const config = {
    xField: "years",
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
      if (value<=180000) {
        return green;
      } else if (value > 180000 && value < 200000) {
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
