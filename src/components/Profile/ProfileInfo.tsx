
import { Badge } from "@/components/ui/badge";
import ProfileImage from "@/components/ProfileImage";
import getUserLevel from "@/services/points";

interface ProfileInfoProps {
  name: string;
  email: string;
  points: number;
}

export default function ProfileInfo({ name, email, points }: ProfileInfoProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-2xl font-bold">{name}</p>
        <p className="text-muted-foreground">{email}</p>
      </div>
      <div className="flex flex-col gap-2 justify-center items-end">
        <Badge>{getUserLevel(points).name}</Badge>
        <p>{points}</p>
      </div>
    </div>
  );
}
