export const  usePeopleOutdoor_per= () => {
    const data = [
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
    ];
    const config = {
      appendPadding: 10,
      angleField: "value",
      colorField: "months",
      radius: 0.9,
      label: {
        type: "spider",
        labelHeight: 28,
        content: "{name}\n{percentage}",
        style: {
          /* 设置标注的颜色 */
          fill: "#fff",
          stroke: "black",
          shadowColor: "#652e80",
          shadowBlur: 20,
          cursor: "pointer",
        },
      },
      interactions: [{ type: "element-active" }],
      data,
      height: 240,
      legend: {
        position: "top",
        itemName: {
          style: {
            fill: "#fff",
          },
        },
      },
    };
    return {
      config,
      data,
    };
  };
  