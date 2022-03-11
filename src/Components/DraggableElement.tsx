import React from "react";
import { Droppable } from "react-beautiful-dnd";
import "./index.css";
import ListItem from "./ListItem";

interface Props {
  elements: IItem[];
  prefix: string;
}

const DraggableElement: React.FC<Props> = ({ prefix, elements }) => {
  return (
    <div className="droppable-styles">
      <div className="column-header">{prefix}</div>
      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((item, index) => (
              <ListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DraggableElement;
