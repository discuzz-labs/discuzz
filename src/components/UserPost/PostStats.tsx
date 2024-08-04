import { BarChart2, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";

interface PostStatsProps {
  comments: number;
  viewsNumber: number;
  likes: number;
  dislikes: number;
}

const PostStats: React.FC<PostStatsProps> = ({ comments, viewsNumber, likes, dislikes }) => (
  <div className="flex items-center justify-evenly">
    <div className="flex items-center gap-2">
      {comments}
      <MessageCircle className="w-4 h-4" />
    </div>
    <div className="flex items-center gap-2">
      <p>{viewsNumber}</p>
      <BarChart2 className="w-4 h-4" />
    </div>
    <div className="flex items-center gap-2">
      {likes}
      <ThumbsUp className="w-4 h-4" />
    </div>
    <div className="flex items-center gap-2">
      {dislikes}
      <ThumbsDown className="w-4 h-4" />
    </div>
  </div>
);

export default PostStats;
