<template>
      <SmartCity/>
      <MapControl/>
      <G2Chart v-if="g2Visible"/>
       <flyChart v-if="flyVisible"></flyChart>
        <Scenelist v-if="SceneVisible"></Scenelist>
      <BottomTools @controlCenter="controlCenter" @controlflyroad="controlflyroad" @controlScene=" controlScene"></BottomTools>
</template>

<script setup>
import { ref} from 'vue';
import SmartCity from '../components/SmartCity.vue';
import MapControl from '../components/MapControl.vue';
import G2Chart from './G2Chart.vue';
import flyChart from './flyChart.vue';
import Scenelist from './SceneSearch.vue'
import BottomTools from '../components/BottomTools.vue'
const g2Visible = ref(true);
const flyVisible = ref(false);
const SceneVisible = ref(false);
const controlCenter=(value)=>{
   g2Visible.value=value;
  
}
const controlflyroad=(value)=>{
    flyVisible.value = value
}
const controlScene=(value)=>{
    SceneVisible.value = value
}
</script>
<style scoped>
</style>