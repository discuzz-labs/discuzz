import {
    MessageCircle,
    BarChart2,
    ThumbsUp,
    ThumbsDown,
    Share,
  } from "lucide-react";
  import StatItem from "./StateItem";
  
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
          <StatItem
            value={commentsCount}
            icon={<MessageCircle className="w-4 h-4" />}
          />
          <StatItem value={viewsNumber} icon={<BarChart2 className="w-4 h-4" />} />
          <StatItem value={likes} icon={<ThumbsUp className="w-4 h-4" />} />
          <StatItem value={disLikes} icon={<ThumbsDown className="w-4 h-4" />} />
          <Share className="w-4 h-4" />
        </div>
      </div>
    );
  };
  
  export default PostStats;
  