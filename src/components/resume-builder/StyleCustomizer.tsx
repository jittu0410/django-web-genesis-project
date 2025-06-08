
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useResumeBuilder } from './ResumeBuilderProvider';

export const StyleCustomizer = () => {
  const { selectedFont, setSelectedFont, selectedColor, setSelectedColor } = useResumeBuilder();

  const fonts = [
    { id: 'inter', name: 'Inter' },
    { id: 'roboto', name: 'Roboto' },
    { id: 'open-sans', name: 'Open Sans' },
    { id: 'lato', name: 'Lato' }
  ];

  const colors = [
    { id: 'blue', name: 'Blue', class: 'bg-blue-500' },
    { id: 'green', name: 'Green', class: 'bg-green-500' },
    { id: 'purple', name: 'Purple', class: 'bg-purple-500' },
    { id: 'red', name: 'Red', class: 'bg-red-500' },
    { id: 'gray', name: 'Gray', class: 'bg-gray-500' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Font Family</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {fonts.map((font) => (
            <Button
              key={font.id}
              variant={selectedFont === font.id ? "default" : "outline"}
              onClick={() => setSelectedFont(font.id)}
              size="sm"
            >
              {font.name}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Accent Color</Label>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {colors.map((color) => (
            <Button
              key={color.id}
              variant={selectedColor === color.id ? "default" : "outline"}
              onClick={() => setSelectedColor(color.id)}
              className="h-8 p-0"
            >
              <div className={`w-4 h-4 rounded ${color.class}`}></div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
