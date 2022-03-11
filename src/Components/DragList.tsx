import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import "./index.css";

const getItems = (count: number, prefix: string) =>
  Array.from({ length: count }).map(() => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      prefix,
      content: `item ${randomId}`,
    };
  });

const removeFromList = (list: IItem[], index: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return removed;
};

const addToList = (list: IItem[], index: number, element: IItem) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};
const lists: string[] = ["todo", "inProgress", "done"];

const initialTodos: IElement = {
  done: getItems(7, "done"),
  inProgress: getItems(7, "inProgress"),
  todo: getItems(7, "todo"),
};

const DragList = () => {
  const [elements, setElements] = useState(initialTodos);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const listCopy: IElement = { ...elements };

    const sourceList: IItem[] = listCopy[source.droppableId as keyof IElement];

    const removedElement = removeFromList(sourceList, source.index);

    const newSourceList: IItem[] = sourceList.filter(
      (list) => list !== removedElement
    );

    listCopy[source.droppableId as keyof IElement] = newSourceList;

    const destinationList: IItem[] =
      listCopy[destination.droppableId as keyof IElement];

    listCopy[destination.droppableId as keyof IElement] = addToList(
      destinationList,
      destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  return (
    <div className="container">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="list-grid">
          {lists.map((listKey) => (
            <DraggableElement
              elements={elements[listKey as keyof IElement]}
              key={listKey}
              prefix={listKey}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DragList;
