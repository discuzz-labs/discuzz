import { ReactNode } from "react";

interface StatItemProps {
  value: number;
  icon: ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ value, icon }) => (
  <div className="flex items-center gap-2">
    <p>{value}</p>
    {icon}
  </div>
);

export default StatItem;
