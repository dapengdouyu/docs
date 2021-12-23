
import React from 'react';
class App extends React.Component{
  state={arr:[1,1,2,3]}

  render(){
      return (
        <div className="App">
          {
            this.state.arr.map(item=>(
              <li key={item}>{item}</li>
            ))
          }
          <button onClick={()=>{
            this.setState({arr:[2,3,1]})
          }}>+</button>
        </div>
      );
  }
}
//  currentIndex=1
// 1  1 2 3 
// 1  2 3 

// map={1:vodeNode.mountIndex=1,}


// 2 3 
// lastplaceIndex=0;
// oldVnode.mounINdex=2 

// mounINdex<lastPlaceIndex

// lastplaceIndex=2

// // oldVnode.mounINdex=3

// mountIndex=1,lastplaceIndex=3
// patch[{
//   type:Move,
//   mountindex:3
// }]
//2  3















// 1 1 2 3 

// map={1:1Node.index=1, 2:vNode.index=2,3:vnode.index=3}


// 2 3 1
//  lastplaceIndex=0


// index < lastplaceIndex

  // patch.push({
        // type: Update,
      //   mountIndex: index
      //  })


// 删除map中剩余的参数






// lastIndex=0;

















// 若 New fiber 为数组类型（存在多个节点）

// 第一次遍历，比较相同位置的新旧节点，判断 key 值是否一致

// 一致，则表示可复用，复用当前旧节点
// 不一致，则跳出循环


// 第一次遍历结束

// 若新节点已遍历完了、旧节点还有剩余，则删除旧节点，返回结果，结束调和过程
// 若旧节点遍历完了、新节点还有剩余，则遍历新节点创建新 Fiber，并插入，返回结果，结束调和过程
// 若新旧节点都有剩余，即第一次遍历时跳出循环了，则遍历 Old fiber 得到以 Key 值 或 索引 作为 键值，旧节点作为值的 Map，开始第二次遍历


// 第二次遍历，通过上一步得到的 Map，判断 Old fiber 中是否有相同 key 值的节点

// 存在，取出旧节点，复用旧节点，插入操作，之后删除 Map 中对应的旧节点
// 不存在，则新建（在 updateFromMap 中实现）




export default App;


// 1,1,2,3
// 2,3,1

// 2index=2 lastPlaceIndex=0
// 2

// 3index=3 lastPlaceIndex=2  
// 3

// 1Index=1 lastPlaceIndex=3
// Move 1