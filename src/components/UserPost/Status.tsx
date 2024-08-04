import { Badge } from "@/components/ui/badge";
import { PostStatus } from "@prisma/client";

const statusClasses = {
  ANSWERED: "bg-green-200 text-green-800",
  RESTRICTED: "bg-destructive text-destructive-foreground",
  OPEN: "bg-blue-200 text-blue-800",
  CLOSED: "bg-red-200 text-red-800",
};

const Status = ({ status }: { status: PostStatus }) => {
  // Determine the class based on the status
  const statusClass = statusClasses[status] || "bg-gray-200 text-gray-800";

  return <Badge className={statusClass}>{status}</Badge>;
};

export default Status