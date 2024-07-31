import {
    MessageCircle,
    BarChart2,
    ThumbsUp,
    ThumbsDown,
    Share,
  } from "lucide-react";
  
  interface PostStatsProps {
    viewsNumber: number;
    likes: number;
    disLikes: number;
    commentsCount: number;
  }
  
  const PostStats: React.FC<PostStatsProps> = ({
    viewsNumber,
    likes,
    disLikes,
    commentsCount,
  }) => {
    return (
      <div className="flex items-center w-full mt-5">
        <div className="flex-grow flex justify-evenly mr-20 items-center gap-5">
          <div className="flex items-center gap-2">
            {commentsCount}
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
            {disLikes}
            <ThumbsDown className="w-4 h-4" />
          </div>
          <Share className="w-4 h-4" />
        </div>
      </div>
    );
  };
  
  export default PostStats;
  