import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableImage = ({
  id,
  image,
  title,
}: {
  id: string;
  image: string;
  title: string;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.1 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="relative border border-gray-200 aspect-square rounded overflow-hidden transition-opacity duration-150"
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-sm font-semibold text-center px-2">
        {title}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        className="absolute top-2 right-2 text-white"
      >
        <path
          fill="currentColor"
          d="M12 2c1.845 0 3.33 0 4.54.088L13.1 7.25H8.4L11.9 2zM3.464 3.464c1.253-1.252 3.158-1.433 6.632-1.46L6.599 7.25H2.104c.147-1.764.503-2.928 1.36-3.786"
        ></path>
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M2 12c0-1.237 0-2.311.026-3.25h19.948C22 9.689 22 10.763 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12m11.014.585C14.338 13.44 15 13.867 15 14.5s-.662 1.06-1.986 1.915c-1.342.866-2.013 1.299-2.514.98c-.5-.317-.5-1.176-.5-2.895s0-2.578.5-2.896s1.172.115 2.514.981"
          clipRule="evenodd"
        ></path>
        <path
          fill="currentColor"
          d="M21.896 7.25c-.147-1.764-.503-2.928-1.36-3.786c-.598-.597-1.344-.95-2.337-1.16L14.9 7.25z"
        ></path>
      </svg>
    </div>
  );
};

export default SortableImage;
