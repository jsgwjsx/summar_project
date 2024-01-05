import { ref } from "vue";

export const usePeopleOutdoor = () => {
  const data = ref([
    { type: "汉阳区", value: 16254 },
    { type: "武昌区", value: 22135 },
    { type: "洪山区", value: 54484 },
    { type: "江夏区", value: 36541 },
    { type: "江汉区", value: 49472 },
    {type:"黄陂区",value:34521},
    {type:"其他",value:64521}

  ]);
  const green = "#00B96B";
  const yellow = "#fd7e14";
  const red = "#dc3545";
  const config = {
    xField: "type",
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
      if (value > 40000) {
        return red;
      } else if (value > 20000 && value < 40000) {
        return yellow;
      } else {
        return green;
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
