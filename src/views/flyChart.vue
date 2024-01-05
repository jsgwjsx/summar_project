<template>
    <div class="g2-left">
      <Panel style="margin-bottom: 20px;">
        <template v-slot:header> 武汉天河机场近几年出航次数图 </template>
        <LineChart v-bind="outdoorConfig" :data="outdoorData_fly"></LineChart>
      </Panel>
      <Panel>
        <template v-slot:header> 武汉天河机场出航增速变化图(%) </template>
        <LineChart v-bind="busOnlineConfig" :data="busOnlineData_flytrend"></LineChart>
      </Panel>
    </div>
    <div class="g2-right">
      <Panel style="margin-bottom: 20px;">
        <template v-slot:header> 武汉2022年各月份出行人口统计 </template>
        <ColumnChart v-bind="populationConfig" :data="populationData_month"></ColumnChart>
      </Panel>
      <Panel style="margin-bottom: 20px;">
        <template v-slot:header> 武汉2022年各月份出行人口统计 </template>
        <PieChart v-bind="populationConfigs" :data="populationData_per"></PieChart>
      </Panel>
      
    </div>
  </template>
  
  <script setup>
  import Panel from "../components/Panel.vue";
  import { ColumnChart,PieChart,LineChart } from "@opd/g2plot-vue";
  import { usePeopleOutdoor_fly } from "../Hooks/peopleOutdoor_fly.js";
  import { useBusOnline_flytrend } from "../Hooks/busOnline_flytrend.js";
  import { usePeopleOutdoor_month} from '../Hooks/population_month.js'
  import { usePeopleOutdoor_per} from "../Hooks/usePeopleOutdoor_per"
  const { config: outdoorConfig, data: outdoorData_fly } = usePeopleOutdoor_fly();
  const { config: busOnlineConfig, data:busOnlineData_flytrend} = useBusOnline_flytrend();
  const { config: populationConfig, data: populationData_month } =  usePeopleOutdoor_month();
  const {config: populationConfigs, data:populationData_per} = usePeopleOutdoor_per()
  </script>
  <style scoped>
  .g2-left {
    position: absolute;
    left: 1vw;
    top: 70px;
    width: 25vw;
  }
  
  .g2-right {
    width: 25vw;
    position: absolute;
    left: 74vw;
    top: 70px;
  }
  .hospital,.schools{
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .item{
    display: flex;
    flex-direction: column;
    align-items: center;
   justify-content: space-between;
   font-weight: bold;
   height: 80px; 
  }
  .item>p>span{
    margin-left: 5px;
  
  }
  .item>img{
    margin-top: 15px;
    width: 50px;
    height: 50px;
  
  }
  .item:nth-child(2)>img{
    width:30px;
    height: 30px;
    margin-bottom: 10px;
  }
  
  .schools .item:nth-child(2)>img{
    width: 50px;
    height: 50px;
    margin-bottom:0;
  }
  </style>
  