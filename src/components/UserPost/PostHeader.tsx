import { PostStatus } from "@prisma/client";
import ProfileImage from "../ProfileImage";
import Status from "./Status";
import { Dot } from "lucide-react";

interface PostHeaderProps {
  authorImage: string;
  title: string;
  status: PostStatus;
  createdAt: Date;
}

const PostHeader: React.FC<PostHeaderProps> = ({ authorImage, title, status, createdAt }) => (
  <div className="flex items-center gap-2">
    <ProfileImage size={10} img={authorImage} />
    <div className="grid gap-2">
      <p className="text-xl font-medium leading-none truncate w-[600px] text-pretty">
        {title}
      </p>
      <div className="text-sm text-muted-foreground flex items-center">
        <Status status={status} />
        <Dot /> {new Date(createdAt).toLocaleDateString()}
      </div>
    </div>
  </div>
);

export default PostHeader;
