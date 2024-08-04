import { Bookmark, Edit, Trash } from "lucide-react";
import useBookmark from "@/hooks/useBookmark";
import useUnbookmark from "@/hooks/useUnbookmark";
import useDeletePost from "@/hooks/useDeletePost";
import routes from "@/services/routes";
import Link from "next/link";

interface PostActionsProps {
  viewerId: string;
  postId: string;
  isOwner: boolean;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onDelete: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  viewerId,
  postId,
  isOwner,
  isBookmarked,
  onBookmarkToggle,
  onDelete,
}) => {
  const bookmark = useBookmark();
  const unBookmark = useUnbookmark();
  const deletePost = useDeletePost(viewerId);

  const toggleBookmark = async () => {
    if (!isBookmarked) {
      bookmark.mutate({ userId: viewerId, postId });
    } else {
      unBookmark.mutate({ userId: viewerId, postId });
    }
    onBookmarkToggle();
  };

  const handleDelete = async () => {
    await deletePost.mutateAsync({ userId: viewerId, postId });
    onDelete();
  };

  return (
    <div className="flex flex-col justify-start items-center gap-5">
      <Bookmark
        onClick={toggleBookmark}
        className={`w-5 transition-colors hover:fill-blue-500 ${isBookmarked ? "fill-blue-500" : ""}`}
      />
      {isOwner && (
        <>
        <Trash
          onClick={handleDelete}
          className="w-5 hover:fill-destructive transition-colors"
        />
      <Link href={`${routes.post.edit.path}/${viewerId}`}>
        <Edit className="w-5 hover:fill-muted-background" />
      </Link>
      </>
      )}
    </div>
  );
};

export default PostActions;
