import { Clock, Calendar, MessageCircle, GripVertical } from "lucide-react";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const getPlatformIcon = (platform: string) => {
    const icons = {
      tiktok: (
        <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43Z"
              fill="white"
            />
          </svg>
        </div>
      ),
      instagram: (
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="5"
              ry="5"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1="17.5"
              y1="6.5"
              x2="17.51"
              y2="6.5"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </div>
      ),
      facebook: (
        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
              fill="white"
            />
          </svg>
        </div>
      ),
    };
    return icons[platform as keyof typeof icons] || null;
  };

  return (
    <div
      className="text-card-foreground overflow-hidden bg-white shadow-sm border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md relative select-none p-3 cursor-grab hover:cursor-grab"
      draggable="true"
      role="button"
      tabIndex={0}
      aria-disabled="false"
      aria-roledescription="sortable"
    >
      {/* Grip Handle */}
      <div className="absolute top-2 right-2 opacity-0 hover:opacity-60 transition-opacity pointer-events-none">
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      {/* Main Content */}
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-28 h-28 object-cover rounded-lg"
            draggable="false"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center h-28">
          <h4 className="font-medium text-gray-900 text-sm mb-2 leading-tight">
            {post.title} - {post.id}
          </h4>

          <div className="flex items-center text-gray-500 text-xs mb-2">
            <Calendar className="h-3 w-3 mr-1.5 flex-shrink-0" />
            <span>{post.date}</span>
          </div>

          <div className="flex items-center text-gray-500 text-xs mb-2">
            <Clock className="h-3 w-3 mr-1.5 flex-shrink-0" />
            <span>{post.time}</span>
          </div>

          <div className="flex items-center space-x-2">
            {post.platforms.map((platform) => (
              <div key={platform}>{getPlatformIcon(platform)}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-3 pt-2">
        <div className="flex items-center space-x-2">
          <span className="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6">
            <img
              className="aspect-square h-full w-full"
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=24&h=24&fit=crop&crop=face"
              alt="Avatar"
            />
          </span>
          <span className="text-gray-700 text-xs font-medium">
            {post.author}
          </span>
        </div>
        <div className="flex items-center text-gray-400 text-xs">
          <MessageCircle className="h-4 w-4 mr-1" />
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
