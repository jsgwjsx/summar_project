<template>
  <div class="g2-left">
    <Panel style="margin-bottom: 20px;">
      <template v-slot:header> 武汉各区今日出行人口统计 </template>
      <ColumnChart v-bind="outdoorConfig" :data="outdoorData"></ColumnChart>
    </Panel>
    <Panel>
      <template v-slot:header> 武汉各区实时公交在线表 </template>
      <RoseChart v-bind="busOnlineConfig" :data="busOnlineData"></RoseChart>
    </Panel>
  </div>
  <div class="g2-right">
    <Panel style="margin-bottom: 20px;">
      <template v-slot:header> 武汉各区旅游人口统计(单位:万) </template>
      <PieChart v-bind="populationConfig" :data="populationData"></PieChart>
    </Panel>
    <panel>
         <template v-slot:header>武汉三甲医院</template>
         <div class="hospital">
             <div class="item" v-for="item in hosiptal">
                 <p>
                  {{ item.title }}
                  <span>{{ item.amount }}{{ item.unit }}</span>
                 </p>
                 <img :src="item.imgSrc" alt="图片丢失了">
            </div>
         </div>
    </panel>
    <panel>
         <template v-slot:header>武汉内高校与学生统计</template>
         <div class="schools">
             <div class="item" v-for="(item,index) in schools">
                 <p>
                  {{ item.title }}
                  <span> {{item.num }}</span>
                 </p>
                 <img :src="item.imgSrc" alt="图片丢失了">
            </div>
         </div>
    </panel>
  </div>
</template>

<script setup>
import Panel from "../components/Panel.vue";
import { ColumnChart, RoseChart,PieChart } from "@opd/g2plot-vue";
import { usePeopleOutdoor } from "../Hooks/peopleOutdoor";
import { useBusOnline } from "../Hooks/busOnline";
import {usePopulation} from '../Hooks/population'
import {inject} from 'vue'
const { scene, map } = inject("$scene_map");
const { config: outdoorConfig, data: outdoorData } = usePeopleOutdoor();
const { config: busOnlineConfig, data: busOnlineData } = useBusOnline();
const { config: populationConfig, data: populationData } = usePopulation();

const hosiptal = [
      {
        title:"医院",
        unit:'家',
        amount:30,
        imgSrc:'./src/assets/icon/医院.png'

      },
      {
        title:"门诊部",
        unit:'个',
        amount:300,
        imgSrc:'./src/assets/icon/门诊.png'

      },
      {
        title:"病床",
        unit:'张',
        amount:3000,
        imgSrc:'./src/assets/icon/病床.png'

      }
    ]
const schools=[
  {
    title:'学校',
    num:'134家',
    imgSrc:'/src/assets/icon/学校.png'
  },{
    title:'学生',
    num:'147万',
    imgSrc:'/src/assets/icon/学生.png'
  }
]
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
