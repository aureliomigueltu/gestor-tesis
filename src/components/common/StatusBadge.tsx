import React from 'react';
import { ThesisSectionStatus } from '../../types/thesis';
import { CheckCircle2, Clock, AlertTriangle, PlayCircle, HelpCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: ThesisSectionStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  showIcon = true 
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Aprobado':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-emerald-600/10',
          dot: 'bg-emerald-500',
          icon: CheckCircle2,
          label: 'Aprobado'
        };
      case 'En desarrollo':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-300 ring-blue-600/10',
          dot: 'bg-blue-500',
          icon: PlayCircle,
          label: 'En desarrollo'
        };
      case 'En revisión':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300 ring-amber-600/10',
          dot: 'bg-amber-500',
          icon: Clock,
          label: 'En revisión'
        };
      case 'Observado':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-300 ring-rose-600/10 animate-pulse-subtle',
          dot: 'bg-rose-500',
          icon: AlertTriangle,
          label: 'Observado'
        };
      case 'Pendiente':
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-300 ring-slate-500/10',
          dot: 'bg-slate-400',
          icon: HelpCircle,
          label: 'Pendiente'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium'
  }[size];

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  }[size];

  return (
    <span 
      id={`badge-${status.toLowerCase().replace(/\s+/g, '-')}`}
      className={`inline-flex items-center rounded-full border shadow-xs whitespace-nowrap transition-colors ${config.bg} ${sizeClasses}`}
    >
      {showIcon && <Icon size={iconSizes} className="shrink-0" />}
      <span>{config.label}</span>
    </span>
  );
};
