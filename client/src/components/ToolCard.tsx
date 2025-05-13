import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type ToolCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  className?: string;
  colorClass?: string;
};

const ToolCard = ({ 
  title, 
  description, 
  icon: Icon, 
  path, 
  className,
  colorClass = "bg-primary/10 text-primary",
}: ToolCardProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border/50 bg-card p-6 transition-all duration-300 card-hover",
        "hover:border-primary/20 hover:shadow-soft",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          colorClass
        )}>
          <Icon className="h-6 w-6" />
        </div>
        
        <div className="space-y-1">
          <h3 className="font-medium text-xl tracking-tight">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        
        <div className="mt-2 flex items-center text-sm font-medium text-primary">
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {path==="#"?"Coming soon":"Try it now"}
          </span>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 h-16 w-16 translate-x-4 translate-y-4 rotate-12 transform rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20" />
    </Link>
  );
};

export default ToolCard;
