import { Draggable } from "react-beautiful-dnd";
import React, { useMemo } from "react";
import { LoremIpsum } from "lorem-ipsum";

interface Props {
  item: IItem;
  index: number;
}

const lorem = new LoremIpsum();

const ListItem: React.FC<Props> = ({ item, index }) => {
  const randomHeader = useMemo(() => lorem.generateWords(3), []);

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="drag-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="card-header">{randomHeader}</div>
            <span>Content</span>
            <div className="card-footer">
              <span>{item.content}</span>
              <div className="author">{item.id}</div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
