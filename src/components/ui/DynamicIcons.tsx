import { icons } from "lucide-react";

interface DynamicIconProps {
    name: string,
    size: number,
}

export default function DynamicIcon({name, size = 28}: DynamicIconProps){
    const LucideIcon = icons[name as keyof typeof icons] || icons.CircleQuestionMark

    return<LucideIcon size={size} />
} 