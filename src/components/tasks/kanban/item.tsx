import React from "react";
import { DragOverlay, useDraggable, UseDraggableArguments } from "@dnd-kit/core";

interface Props {
  id: string,
  data? : UseDraggableArguments["data"]
}

const KanbanItem = ({ children, id, data }: React.PropsWithChildren<Props>) => {

  // attributes - an object containing everything that we shuold use to spread ont he item to make it draggable
  // listeners - object containing event handlers to apply this element
  // setNodeRef - ref to the node
  // active - contains info about item currently being dragged
  const { attributes, listeners, setNodeRef, active } = useDraggable({id, data})

  return(
    <div
      style={{
        position: "relative"
      }}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: "8px",
          position: "relative",
          cursor: "grab"
        }}
      >
        {active?.id === id && (
          <DragOverlay zIndex={1000}>
            <div style={{
              borderRadius: "8px",
              boxShadow: "box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;",
              cursor: "grabbing"
            }}>
              {children}
            </div>
          </DragOverlay>
        )}
        {children}
      </div>
    </div>
  )
}

export default KanbanItem