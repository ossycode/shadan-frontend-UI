import { Info, User, X } from "lucide-react";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { Column } from "./KanbanBoard";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useState } from "react";
import SortableImage from "./SortableImage";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  setOpenPreview: (value: boolean) => void;
  openPreview: boolean;
  columns: Column[];
  onColumnsChange: (columns: Column[]) => void;
}

const PreviewView = ({
  setOpenPreview,
  openPreview,
  columns,
  onColumnsChange,
}: Props) => {
  const initialImages = columns.flatMap((col) =>
    col.posts.map((post) => ({
      id: post.id,
      image: post.image,
      title: post.title,
      columnId: col.id,
    }))
  );

  const [images, setImages] = useState(initialImages);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((img) => img.id === active.id);
    const newIndex = images.findIndex((img) => img.id === over.id);
    const reordered = arrayMove(images, oldIndex, newIndex);
    setImages(reordered);

    const updatedColumns = columns.map((col) => {
      const fullPostsInCol = reordered
        .filter((img) => img.columnId === col.id)
        .map((img) => {
          const fullPost = col.posts.find((p) => p.id === img.id);
          return fullPost!;
        });

      return {
        ...col,
        posts: fullPostsInCol,
        count: fullPostsInCol.length,
      };
    });

    onColumnsChange(updatedColumns);
  };

  return (
    <Dialog open={openPreview} onOpenChange={() => setOpenPreview(false)}>
      <DialogContent className="">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-80 flex justify-end z-50">
          <div className="w-1/2 bg-white h-full shadow-lg py-4 px-8 flex flex-col transform transition-all duration-300 ease-in-out translate-x-0 animate-slide-in">
            <button
              className="cursor-pointer absolute right-3 p-1 hover:bg-gray-200 rounded-lg"
              onClick={() => setOpenPreview(false)}
            >
              <X width={20} height={20} />
            </button>
            <div className="">
              <h2 className="text-xl font-semibold mb-2 mt-1">
                Instagram Feed
              </h2>
              <p className="text-md text-gray-500">
                Click and drag to reorder unscheduled content
              </p>
              <div className="flex items-center justify-between  px-3 pb-2 pt-8 ">
                <p className="flex gap-2 items-center text-sm text-gray-500">
                  Not seeing certain posts? <Info width={18} height={18} />
                </p>

                <Button variant="outline" size="sm" className="h-8 text-md">
                  <User width={15} height={15} />
                  @gaeilgeoirguides
                </Button>
              </div>
            </div>

            <div className=" flex-1 overflow-hidden ">
              <ScrollArea className="h-full">
                <div className="px-3 overflow-hidden ">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    onDragStart={(e) => setActiveId(String(e.active.id))}
                  >
                    <SortableContext
                      items={images.map((img) => img.id)}
                      strategy={rectSortingStrategy}
                    >
                      <div className="grid grid-cols-2 lg:grid-cols-3 ">
                        {images.map((img) => (
                          <SortableImage
                            key={img.id}
                            id={img.id}
                            image={img.image}
                            title={img.title}
                          />
                        ))}
                      </div>
                    </SortableContext>

                    <DragOverlay>
                      {activeId ? (
                        <div className="w-full aspect-square rounded overflow-hidden border border-gray-300 shadow-lg">
                          <img
                            src={images.find((i) => i.id === activeId)?.image}
                            alt=""
                            className="w-full h-full object-cover "
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-sm font-semibold text-center px-2">
                            {images.find((i) => i.id === activeId)?.title}
                          </div>
                        </div>
                      ) : null}
                    </DragOverlay>
                  </DndContext>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default PreviewView;
