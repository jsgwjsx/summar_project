<template>
    <div class="footer">
      <div class="item" v-for="(item,index) in ifrender?funcItems:funcItems2">
        <DrawTools v-if="item.grade>=100">
            <button class="item-btn" @click="item.trigger">
              <i :class="['iconfont',item.icon]"></i>
          </button>
        </DrawTools>
          <button class="item-btn" @click="item.trigger" v-else="item.grade<=70">
              <i :class="['iconfont',item.icon]"></i>
          </button>
          
          <p>{{index === funcItems.length-1?mark:item.title }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  
  import { LineLayer} from '@antv/l7';
  import { computed, inject,onMounted,ref,defineEmits} from 'vue';
  import DrawTools from './drawtools.vue'
  const {scene,map} = inject('$scene_map')
  let layer;
  let ifrender = ref(true)
  let isRotate = ref(true)
  let fly_to_near = ref(true) 
  //定义一个状态

  let isinwuhan=ref(true)
  let g2Visible = ref(true)
  let flyChart = ref(false)
  let Scenelist = ref(false)
  var renderlist=[]
  //控制地球自转
  const rotate=()=>{
    let zoom = map.getZoom();
    if(zoom<=5){
        let center = map.getCenter();
        center.lng += 10;
        map.easeTo({center,duration:1000,easing:(n)=>n})
    }
  }
  //初始化时候开始自转
onMounted(()=>{
    rotate()
    //地球动作结束时，再次调用地球自转函数
  scene.on('moveend',()=>{
    isRotate.value&&rotate()
   })
})
  
const toggleRotate = ()=>{
    isRotate.value = !isRotate.value
    if(!isRotate.value){
        map.stop()
    }else{
        rotate()
    }
}
const togglelist=()=>{
   ifrender.value = !ifrender.value
}
const emit = defineEmits(['controlCenter','controlflyroad','controlScene'])

const controlCenter = ()=>{
    g2Visible.value = !g2Visible.value
    flyChart.value = false
    Scenelist.value =false
    emit('controlScene',Scenelist.value)
    emit('controlflyroad',flyChart.value)
    emit('controlCenter',g2Visible.value)

  }
const controlflyroad = ()=>{
  flyChart.value = true
  g2Visible.value = false
  Scenelist.value =false
  emit('controlScene',Scenelist.value)
  emit('controlflyroad',flyChart.value)
  emit('controlCenter',g2Visible.value)
}
const mark = computed(()=>{
    return isRotate.value?'停止自转':'开始自转'
     
})
const fly_road=()=>{
  if(fly_to_near.value){
   
      map.flyTo({
     center:[114.221126,30.773671],
     zoom:13,
      pitch: 60,
      bearing: 40,
    })
    fetch(
     " http://localhost:8080/fly_path"
  )
    .then(res => res.json())
    .then(data => {
       layer = new LineLayer({})
        .source(data, {
          parser: {
            type: 'geojson',
            x: 'start station longitude',
            y: 'start station latitude',
            x1: 'end station longitude',
            y1: 'end station latitude'
          }
        })
        .size(1)
        .shape('arc3d')
        .color('white')
        .style({
          blur: 0.9
        });
      scene.addLayer(layer);
       renderlist.push('line-3droad')
       fly_to_near.value =false
    });

  }else{
    map.flyTo({
     center:[114.221126,30.773671],
     zoom:5.2,
      pitch: 45,
      bearing: 40,
    })
    controlflyroad()
    fly_to_near.value=true

  }

}
scene.on('moveend', () => {
 
let zooms = map.getZoom();
if(zooms<4){
 
    if(renderlist[0]){
       scene.removeLayer(layer)
    }else{
        return
    }
    renderlist=[]
}
})
const locationsearch=()=>{
    

      map.flyTo({
       center:[114.30,30.50],
       zoom:7.8,
       pitch:40,
  
      })

}

const flywuhan=()=>{
   if(isinwuhan.value){
    map.flyTo({
     center:[114.30,30.50],
     zoom:1,
     pitch: -60,
      bearing: -40,
    })
   }else{
    map.flyTo({
     center:[114.30,30.50],
     zoom:13,
      pitch: 60,
      bearing: 40,
    })
    
   }
   isinwuhan.value = !isinwuhan.value
}
const scenceSearch=()=>{
    Scenelist.value =true
    flyChart.value = false 
    g2Visible.value =false
    emit('controlScene',Scenelist.value)
    emit('controlflyroad',flyChart.value)
    emit('controlCenter',g2Visible.value)
}
const funcItems2 =[
      {
          title:'区域查询',
          icon:'icon-fuwudiqiu',
          trigger:locationsearch,
          grade:70
      },{
          title:'景区查询',
          icon:'icon-supervision-full',
          trigger:scenceSearch,
          grade:70
      },{
          title:'航线查询',
          icon:'icon-icon-test',
          trigger:fly_road,
          grade:70
      },
      {
        title:'返回',
        icon:'icon-kongzhi',
        trigger:togglelist,
        grade:70
      }
  ].reverse()
  
  const funcItems=[
      {
          title:"",
          icon:'icon-fuwudiqiu',
          trigger:toggleRotate,
          grade:70
      },{
          title:'控制中心',
          icon:'icon-supervision-full',
          trigger:controlCenter,
          grade:70
      },{
          title:'飞行武汉',
          icon:'icon-icon-test',
          trigger:flywuhan,
          grade:70
      },{
          title:'范围查询',
          icon:'icon-paint',
          trigger:rotate,
          grade:100
      },
      {
        title:'更多功能',
        icon:'icon-kongzhi',
        trigger:togglelist,
        grade:70
      }
  ].reverse()
  
  
  </script>
  <style scoped>
  .footer{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 8vh;
      z-index: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url('../assets/xzd-header.png') no-repeat;
      background-size: cover;
      transform: rotate(180deg);
  }
  
  .item{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-right: 15px;
      margin-bottom: -20px;
      font-size: 14px;
      transform: rotate(180deg);
  }
  
  .item-btn{
      border-radius: 50%;
      background-color: #53697670;
      background: linear-gradient(to bottom, rgba(0, 128, 255, 0.377), rgba(0, 128, 255, 0.281));
      padding: 15px;
      outline: none;
      border: none;
      box-shadow: 0 0 5px 3px rgb(34, 32, 32);
      cursor: pointer;
      color: #fff;
      margin-bottom: 4px;
  }
  
  .item-btn:hover{
      background-color: #536976c4;
      background: linear-gradient(to bottom, rgba(0, 128, 255, 0.577), rgba(0, 128, 255, 0.581));
  }
  </style>