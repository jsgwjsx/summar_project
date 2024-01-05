export const useBusOnline_flytrend = () => {
    const data = [
        {years: "2011", value: 4},
        {years: "2012", value: 13.17},
        {years: "2013", value: 12.16},
        {years: "2014", value: 6.11},
        {years: "2015", value:4.4},
        {years: "2016", value: 6.8},
        {years: "2017", value: 4.7},
        {years: "2018", value: 2.1},
        { years: "2019", value:8.2 },
        {years: "2020", value:-43.3 },
        { years: "2021", value: 51.5 },
        { years: "2022", value: -34.1},
    ];
    const config = {
      appendPadding: 10,
      xField: "years",
      yField: "value",
      seriesField: "value",
      radius: 0.9,
      label: {
        offset: -15,
      },
      interactions: [{ type: "element-active" }],
      height: 240,
      legend: true,
    };
    return {
      config,
      data,
    };
  };
  