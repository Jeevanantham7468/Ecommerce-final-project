import React from 'react';
import { Star } from 'lucide-react';

export default function Rating({ value = 0, text = '', size = 'w-4 h-4' }) {
  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              value >= star
                ? 'text-amber-400 fill-amber-400'
                : value >= star - 0.5
                ? 'text-amber-400 fill-amber-200'
                : 'text-slate-300'
            }`}
          />
        ))}
      </div>
      {text && <span className="text-xs text-slate-500 font-medium ml-1.5">{text}</span>}
    </div>
  );
}
