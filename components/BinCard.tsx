import { format, isToday, isTomorrow } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { type BinColor } from '@/lib/bin-schedule';

interface BinCardProps {
  date: Date;
  color: BinColor;
  label: string;
  isNext: boolean;
}

export function BinCard({ date, color, label, isNext }: BinCardProps) {
  const isGreen = color === 'Green';
  
  let dateDisplay = format(date, 'EEEE, d MMMM');
  if (isToday(date)) dateDisplay = 'Today, ' + dateDisplay;
  else if (isTomorrow(date)) dateDisplay = 'Tomorrow, ' + dateDisplay;

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl p-6 shadow-lg transition-transform ${
        isNext 
          ? 'scale-105 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-950' 
          : 'opacity-90'
      } ${
        isGreen 
          ? 'bg-green-600 text-white ring-green-600' 
          : 'bg-zinc-900 text-white ring-zinc-900 dark:bg-zinc-800'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${isGreen ? 'text-green-100' : 'text-zinc-400'}`}>
            {label}
          </p>
          <h2 className="mt-1 text-xl font-bold">
            {dateDisplay}
          </h2>
          <div className="mt-4 flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              isGreen ? 'bg-green-500/50 text-white' : 'bg-zinc-700 text-zinc-200'
            }`}>
              {color} Lid
            </span>
          </div>
        </div>
        <div className={`rounded-full p-4 ${isGreen ? 'bg-green-500/30' : 'bg-zinc-800 dark:bg-zinc-700'}`}>
          <Trash2 className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
