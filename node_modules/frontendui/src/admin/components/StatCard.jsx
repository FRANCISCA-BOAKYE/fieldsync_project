import { TrendingUp, TrendingDown } from "lucide-react";

// Building the color map for the cards
const COLOUR_MAP = {
  amber: {
    bar: "bg-amber-400", //top of the card
    iconBg: "bg-amber-50", //background color of icon
    iconText: "text-amber-600", //color of the text or icon
    value: "text-amber-600", // color of the number on the card
  },
  blue: {
    bar: "bg-blue-500",
    iconBg: "bg-blue-50",
    iconText: "text-blue-600",
    value: "text-blue-600",
  },
  green: {
    bar: "bg-green-500",
    iconBg: "bg-green-50",
    iconText: "text-green-600",
    value: "text-green-600",
  },
  navy: {
    bar: "bg-[#1E3A5F]",
    iconBg: "bg-slate-100",
    iconText: "text-[#1E3A5F]",
    value: "text-[#1E3A5F]",
  },
};

//statcard function with props
function StatCard({
  label,
  value,
  icon: Icon,
  color = "blue",
  trend,
  onClick,
}) {
  //expression for accessing the value from coloutmap
  const c = COLOUR_MAP[color] ?? COLOUR_MAP.blue;
  return (
    // styling the card to make it responsive if its is clikable
    <div
      onClick={onClick}
      className={`relative bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-150 ${onClick ? "cursor-pointer hover:shadow-md hover:border-gray-200" : ""}`}
    >
      <div className={`h-1 w-full ${c.bar}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3"></div>
      </div>
    </div>
  );
}
export default StatCard;
