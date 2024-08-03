// utils/alertUtils.ts
import { Info, TriangleAlert, Ban } from "lucide-react";

type AlertType = "error" | "info" | "warning";

export const getAlertStyles = (type: AlertType): string => {
  switch (type) {
    case "error":
      return "border-red-800 bg-destructive text-destructive-foreground";
    case "info":
      return "border-zinc-700 bg-muted text-muted-foreground";
    case "warning":
      return "border-yellow-700 bg-warning text-warning-foreground";
    default:
      return "";
  }
};

export const getAlertIcon = (type: AlertType): JSX.Element | null => {
  switch (type) {
    case "info":
      return <Info />;
    case "error":
      return <Ban />;
    case "warning":
      return <TriangleAlert />;
    default:
      return null;
  }
};
