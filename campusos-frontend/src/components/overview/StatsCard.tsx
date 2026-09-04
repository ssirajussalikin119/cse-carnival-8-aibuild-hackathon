import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
  delay?: number;
}

const colorMap: Record<string, { bg: string; icon: string; border: string; glow: string }> = {
  blue: { 
    bg: 'bg-blue-500/10', 
    icon: 'text-blue-400', 
    border: 'border-blue-500/20',
    glow: 'shadow-blue-500/10'
  },
  purple: { 
    bg: 'bg-purple-500/10', 
    icon: 'text-purple-400', 
    border: 'border-purple-500/20',
    glow: 'shadow-purple-500/10'
  },
  green: { 
    bg: 'bg-green-500/10', 
    icon: 'text-green-400', 
    border: 'border-green-500/20',
    glow: 'shadow-green-500/10'
  },
  orange: { 
    bg: 'bg-orange-500/10', 
    icon: 'text-orange-400', 
    border: 'border-orange-500/20',
    glow: 'shadow-orange-500/10'
  },
  yellow: { 
    bg: 'bg-yellow-500/10', 
    icon: 'text-yellow-400', 
    border: 'border-yellow-500/20',
    glow: 'shadow-yellow-500/10'
  },
  pink: { 
    bg: 'bg-pink-500/10', 
    icon: 'text-pink-400', 
    border: 'border-pink-500/20',
    glow: 'shadow-pink-500/10'
  },
};

export default function StatsCard({ title, value, icon: Icon, color, subtitle, delay = 0 }: StatsCardProps) {
  const colors = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ 
        y: -4, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="glass-card rounded-2xl p-6 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 tracking-wide uppercase text-xs">{title}</p>
          <p className="text-3xl font-bold text-white mt-2 tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <motion.div 
          className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Icon size={22} className={colors.icon} />
        </motion.div>
      </div>
      <div className={`mt-4 h-1 w-16 rounded-full ${colors.bg} ${colors.border} border`}>
        <div className={`h-full w-8 rounded-full bg-gradient-custom ${colors.glow}`} />
      </div>
    </motion.div>
  );
}