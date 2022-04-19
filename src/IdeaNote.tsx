import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';


let itemsFromBackend: {id: string; content: string;}[] = [];

// アイデアのポストイットのデータが入る配列
if(localStorage.getItem('newData')){
  itemsFromBackend = JSON.parse(localStorage.getItem('newData'));
  console.log('ローカルストレージからアイデアを読み込み')
}else{
  console.log('ローカルストレージのアイデアは空でした．')
}

//　アイデアを貼り付けるボードの配列　ボードごとに所属するアイデアの配列を持つ
const columnsFromBackend: { [x: string]: { name: string; items: {id: string; content: string;}[]; }; } | (() => { [x: string]: { name: string; items: { id: string; content: string; }[]; }; }) = {
  [uuid()]: {
    name: "アイデアリスト",
    items: itemsFromBackend
  }
  //ここにグループを追加していけばグループを分けられる．
};

const onDragEnd = (result: DropResult, columns: { [x: string]: any; }, setColumns: { (value: React.SetStateAction<{ [x: string]: { name: string; items: { id: string; content: string; }[]; }; }>): void; (arg0: any): void; }) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function IdeaNote() {
  // ボードのデータを管理するstate
  const [columns, setColumns] = useState(columnsFromBackend);
  //　入力されたアイデアテキストを管理するstate
  const [ideaText, SetIdeaText] = useState<string>("");

  // 入力されたタイミングで実行される関数 
  const addColumnItem = (columnId: number, content: string) => {
    const newIdeaId = uuid()
    const createColumnItem = {id: newIdeaId, content}
    const newData = {...columns}//ボードのStateをコピー

    const key = Object.keys(newData)[0]//ボードのStateから，0番目のボードのKeyを取得
    newData[key].items.push(createColumnItem)// ボードのStateの0番目のitemsリストの末尾に新しいアイデアノートを追加
    setColumns(newData)//Stateを更新
    const newDataString = JSON.stringify(newData)
    localStorage.setItem('newData',newDataString);

    //　以下でリクエストを生成してAPIを叩く
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    const userID = localStorage.getItem('uuid');
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify(
      {
        "OperationType": "PUT", 
        "Keys": {
          "UserID":userID,
          "Theme":'test Theme',
          "Idea":content,
          "MediaTypeSent":'0',
          "MediaTypeImg":'0',
          "MediaTypeMov":"0",
          "GroupType":0
        }
      }
    );
    // create a JSON object with parameters for API call and store in a variable
    const redirectType:RequestRedirect = "follow";
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: redirectType
    };
    // make API call with parameters and use promises to get response
    fetch("https://h761wghroj.execute-api.ap-northeast-1.amazonaws.com/wb_dev", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }
  
  //カラムを追加する関数
  const addColumn = () => {
    const newColumnData = {...columns}　//ボードのStateをコピー
    const ideaNotes:{id: string; content: string;}[] = []
    const createColumn = {name:"new Group", items:ideaNotes}
    newColumnData[uuid()] = createColumn
    setColumns(newColumnData)
  }

  return (
    <>
      <input type="text" id="ideaText" value={ideaText} onChange={(e) => {
        SetIdeaText(e.target.value);
      }}/>
      {/* ここでaddColumnItemを呼び出す． */}
        <input type="button" value="アイデア確定" id="inputIdea" onClick={(e) => {
          addColumnItem(0, ideaText);
          SetIdeaText("");
      }}/>
 
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      
      <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
      </DragDropContext>
      {/* ここでカラム追加の処理ができる */}
      {/* <input type="button" value="+" id="addcolumn" onClick={(e) => {
          addColumn();
      }}/>     */}
      </div>
    </>
  );
}

export {IdeaNote};
