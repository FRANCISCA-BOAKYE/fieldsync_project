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
}
export default StatCard;
