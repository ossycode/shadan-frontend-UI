import { Post } from "@/types/post";

interface DragPreviewProps {
  post: Post;
}

const DragPreview = ({ post }: DragPreviewProps) => {
  return (
    <div className="bg-gray-300 border-2 border-dashed border-gray-400 rounded-xl p-3">
      {/* Main Content Area - matches PostCard structure */}
      <div className="flex gap-3">
        {/* Image placeholder */}
        <div className="flex-shrink-0 w-28 h-28 bg-gray-400 rounded-lg"></div>

        {/* Content area placeholder */}
        <div className="flex-1 min-w-0 h-28"></div>
      </div>

      {/* Bottom Section - matches PostCard bottom spacing */}
      <div className="mt-3 pt-2 h-6"></div>
    </div>
  );
};

export default DragPreview;
