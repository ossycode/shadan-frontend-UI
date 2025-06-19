import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
  DragUpdate,
} from "@hello-pangea/dnd";
import { Plus, MoreHorizontal, MoreVertical } from "lucide-react";
import PostCard from "./PostCard";
import DragPreview from "./DragPreview";
import ContentModal from "./ContentModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Post } from "@/types/post";
import { ContentForm } from "@/schemas/post";

export interface Column {
  id: string;
  title: string;
  count: number;
  posts: Post[];
}

interface KanbanBoardProps {
  columns: Column[];
  onColumnsChange: (columns: Column[]) => void;
  onPostSubmit: (postData: Partial<Post> & { columnId?: string }) => void;
}

const KanbanBoard = ({
  columns,
  onColumnsChange,
  onPostSubmit,
}: KanbanBoardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [triggerColumnId, setTriggerColumnId] = useState<string>("");
  const [draggedPost, setDraggedPost] = useState<Post | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [originalIndex, setOriginalIndex] = useState<number | null>(null);
  const [originalColumn, setOriginalColumn] = useState<string | null>(null);

  const onDragStart = (start: DragStart) => {
    const sourceColumn = columns.find(
      (col) => col.id === start.source.droppableId
    );
    if (sourceColumn) {
      const draggedPost = sourceColumn.posts[start.source.index];
      setDraggedPost(draggedPost);
      setOriginalIndex(start.source.index);
      setOriginalColumn(start.source.droppableId);
    }
  };

  const onDragUpdate = (update: DragUpdate) => {
    if (update.destination) {
      console.log("Drag update destination", update.destination);
      setDragOverColumn(update.destination.droppableId);
      setDragOverIndex(update.destination.index);
    } else {
      setDragOverColumn(null);
      setDragOverIndex(null);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    setDraggedPost(null);
    setDragOverColumn(null);
    setDragOverIndex(null);
    setOriginalIndex(null);
    setOriginalColumn(null);

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const sourceColumnIndex = columns.findIndex(
      (col) => col.id === source.droppableId
    );
    const destColumnIndex = columns.findIndex(
      (col) => col.id === destination.droppableId
    );

    const sourceColumn = columns[sourceColumnIndex];
    const destColumn = columns[destColumnIndex];

    const sourcePosts = [...sourceColumn.posts];
    const destPosts =
      sourceColumn === destColumn ? sourcePosts : [...destColumn.posts];

    const [movedPost] = sourcePosts.splice(source.index, 1);
    destPosts.splice(destination.index, 0, movedPost);

    const newColumns = [...columns];
    newColumns[sourceColumnIndex] = {
      ...sourceColumn,
      posts: sourcePosts,
      count: sourcePosts.length,
    };

    if (sourceColumn !== destColumn) {
      newColumns[destColumnIndex] = {
        ...destColumn,
        posts: destPosts,
        count: destPosts.length,
      };
    }

    onColumnsChange(newColumns);
  };

  const handleAddContent = (columnId?: string) => {
    setEditingPost(null);
    setTriggerColumnId(columnId || "idea");
    setIsModalOpen(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: Partial<Post>) => {
    onPostSubmit({
      ...formData,
      columnId: editingPost ? undefined : triggerColumnId,
    });
    handleModalClose();
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPost(null);
    setTriggerColumnId("");
  };

  // Get all posts from all columns
  const allPosts = columns.flatMap((column) => column.posts);

  return (
    <>
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <div className="overflow-x-auto pb-4 ">
          <div className="flex gap-4 min-w-max">
            {columns.map((column) => (
              <div
                key={column.id}
                className="bg-gray-50 rounded-lg w-[320px] flex flex-col h-[calc(100vh-200px)] m-2"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">
                      {column.title}
                    </h3>
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-semibold">
                      {column.count}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAddContent(column.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden ">
                  <ScrollArea className="h-full">
                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`p-4 min-h-full ${
                            snapshot.isDraggingOver ? "bg-gray-50" : ""
                          }`}
                        >
                          {column.posts.length === 0 ? (
                            <div className="text-center py-20">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                              </div>
                              <p className="text-gray-500 text-sm mb-4">
                                No content currently. Board is empty
                              </p>
                              <button
                                onClick={() => handleAddContent(column.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                              >
                                Add Content
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {column.posts.map((post, index) => (
                                <div key={post.id} className="relative">
                                  {/* Show drag preview at the correct position with absolute positioning */}
                                  {draggedPost &&
                                    dragOverColumn === column.id &&
                                    dragOverIndex ===
                                      (dragOverColumn === originalColumn
                                        ? dragOverIndex >= originalIndex
                                          ? index - 1
                                          : index
                                        : index) && (
                                      <div className="absolute top-0 left-0 w-full pointer-events-none z-10">
                                        <DragPreview post={draggedPost} />
                                      </div>
                                    )}
                                  <Draggable
                                    draggableId={post.id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() => handleEditPost(post)}
                                      >
                                        <PostCard post={post} />
                                      </div>
                                    )}
                                  </Draggable>
                                </div>
                              ))}
                              {/* Show drag preview at the end if dropping at the end */}
                              {draggedPost &&
                                dragOverColumn === column.id &&
                                dragOverIndex ===
                                  (dragOverColumn === originalColumn
                                    ? dragOverIndex >= originalIndex
                                      ? column.posts.length - 1
                                      : column.posts.length
                                    : column.posts.length) && (
                                  <div className="pointer-events-none">
                                    <DragPreview post={draggedPost} />
                                  </div>
                                )}
                            </div>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </ScrollArea>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DragDropContext>

      <ContentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        editingPost={editingPost}
        triggerColumnId={triggerColumnId}
        allPosts={allPosts}
      />
    </>
  );
};

export default KanbanBoard;
