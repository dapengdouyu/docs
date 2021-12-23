<template>
  <div class="hello">
    <li v-for="item in arr" :key="item">
      {{ item }}
    </li>
    <button @click="handlerClick">+</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    arr: [1, 1, 2, 3],
  }),
  methods: {
    handlerClick: function () {
      this.arr = [2,3,1];
    },
  },
  mounted(){
    
  }
};

// 1 2 3    1
// 2 3 1

// map={1:1,2:2,3:3}
// 1





// 
// 双指针 oldStartIndex=0 oldEndIndex=7 newStartIndex=0 newEndIndex=4  尽可能复用
// 创建map 映射表 {'1':1,2:2,}
// 头比头 oldStartIndex newStartIndex
// 尾比尾 oldEndIndex newEndIndex
// 头和尾比 oldStartIndex newEndIndex
// 尾和头比 oldEndIndex newStartIndex
//  暴力比对 新的节点到老的中查找，存在复用，不存在创建插入 从映射表中查找到index 进行交换

// oldStartIndex <= oldEndIndex
</script>


