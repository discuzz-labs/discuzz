import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import config from "@/lib/config";

interface RestrictedBadgeProps {
  reason: string;
}

const RestrictedBadge: FC<RestrictedBadgeProps> = ({ reason }) => (
  <Popover>
    <PopoverTrigger>
      <Badge className="bg-destructive text-destructive-foreground">
        Restricted
      </Badge>
    </PopoverTrigger>
    <PopoverContent>
      Reason: {reason}<br />
      <p className="text-sm font-thin">
        Unfair! Contact support {config.site.supportEmail}
      </p>
    </PopoverContent>
  </Popover>
);

export default RestrictedBadge;
