<template>
  <!-- 1.展示事故数据 -->
  <!-- 2.展示地图中的事故点 -->
  <!-- 3.点击行，跳转事故点 -->
  <!-- 4.点击详情，展示事故详细数据 -->
  <div class="displayCard">
      <el-table :data="tableData" style="width: 100%" @row-click="clickRow">
          <el-table-column prop="event_num" label="编号" width="90">
          </el-table-column>
          <el-table-column prop="name" label="类型" width="90"> </el-table-column>
          <el-table-column label="操作">
              <template #default="scope">
                  <el-button size="small" @click.stop="handleClick(scope.row)" >详情</el-button>
              </template>
          </el-table-column>
      </el-table>
  </div>
  <el-dialog v-model="dialogVisible" title="事故详情" width="60%" :append-to-body="true" >
        <el-table :data="detailData" style="width: 100%" size="small" :max-height="400" @row-click.stop="clickRow">
            <el-table-column :show-overflow-tooltip="true" prop="event_num" label="编号" />
            <el-table-column :show-overflow-tooltip="true" prop="longtitude" label="坐标经度" />
            <el-table-column :show-overflow-tooltip="true" prop="latitude" label="坐标纬度" />
            <el-table-column prop="name" label="事故类型" />
            <el-table-column prop="area" label="事故区域" />
            <el-table-column prop="car_num" label="车牌号"  />
            <el-table-column prop="driver" label="事故人" />
            <el-table-column prop="level" label="事故等级"/>
            <el-table-column prop="phone" label="手机号"/>
        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script setup>
import { onMounted, watch, ref, inject,onUnmounted } from "vue";
// 引入pointLayer
import { PointLayer } from "@antv/l7";
const dialogVisible = ref(false)
const tableData = ref([]);
const detailData = ref([]);
const props = defineProps({
  dataSource: Array,
});
const handleClick = (row) => {
    const { event_num, lat,lng, name, area, car_num, driver, id, level, phone  } = row
    detailData.value= [
        {
            event_num,
            longtitude:lat,
            latitude: lng,
            name,
            area,
            car_num,
            id,
            driver,
            level,
            phone
        }
    ]
    dialogVisible.value = true
}

const { scene, map } = inject("$scene_map");
let pointLayer;
let markerLayer
const clickRow=(row)=>{
    markerLayer && scene.removeLayer(markerLayer)
    const {lng,lat} = row
    map.flyTo({
     center:[lng,lat],
     zoom:15,
     speed:0.4
    })
    const data =[{
      lng,lat
     }]
    markerLayer = new PointLayer({name:"事故点active"})
    .source([{ lng: lng, lat: lat } ],
    {
      parser: {
        type: 'json',
        x: 'lng',
        y: 'lat'
      }
    }
  )
    .shape('radar')
    .size(60)
    .animate(true)
    .color('#f00')
    scene.addLayer(markerLayer)
  }
const renderTable = () => {
  const data = [];
  //   tableData的数据处理
  props.dataSource.forEach((item) => {
      const {
          geometry,
          properties: { event_num, name, ...rest },
      } = item;
      data.push({
          lng: geometry.coordinates[0],
          lat: geometry.coordinates[1],
          name,
          event_num,
          ...rest,
      });
  });
  tableData.value = data;
  return data
}

const renderPoint = (data) => {
  // 地图中的事故点渲染
  pointLayer = new PointLayer({ name: "事故点" })
      .source(data, {
          parser: {
              type: "json",
              x: "lng",
              y: "lat",
          },
      })
      .shape("crash")
      .size(16);
  scene.addLayer(pointLayer);
}

const renderCard = () => {
  removeAll()
  // 渲染表格数据
  const data = renderTable()
  // 渲染地图标点
  renderPoint(data)
};

const removeAll=()=>{
  markerLayer&&scene.removeLayer(markerLayer)
  // 每次重新渲染的时候，去掉之前的pointLayer
  pointLayer && scene.removeLayer(pointLayer);
}

// 组件销毁的时候，要将元素都清除
onUnmounted(()=>{
  removeAll()
})

onMounted(() => {
  scene.addImage("crash", "/src/assets/crash.jpg");
  renderCard();
});

watch(()=>props.dataSource,() => {
  renderCard();
});

defineExpose({
  removeAll
})
</script>
<style scoped>
.displayCard {
  width: 270px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -305px;
  bottom: 75px;
  outline: none;
  color: #fff;
  background: #53697670;
  border-radius: 4px;
  box-shadow: 0 0 5px 3px #333;
  overflow-y: scroll;
  max-height: 500px;
}

.eleCeil {
  background: transparent;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.el-table) {
  background-color: transparent;
}

:deep(.el-table tr) {
  background-color: transparent;
  color: #fff;
  cursor: pointer;
}

:deep(.el-table tr:hover) {
  background-color: #333;
}

:deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
  background-color: transparent;
}

:deep(.el-table th.el-table__cell) {
  background-color: transparent;
}

:deep(.el-table td.el-table__cell) {
  border-bottom: none;
}

:deep(.el-table__inner-wrapper::before) {
  height: 0;
}

:deep(.cell) {
  white-space: nowrap;
}
.displayCard::-webkit-scrollbar{
    width: 10px;
    background: #53697670;
    border-radius:2px;
}

.displayCard::-webkit-scrollbar-thumb{
        background: #536976;
        border-radius:10px;
}
</style>
