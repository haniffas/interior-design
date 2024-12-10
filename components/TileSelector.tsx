"use client";

import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';

interface TileSelectorProps {
  onSelectTile: (texture: string) => void;
}

export default function TileSelector({ onSelectTile }: TileSelectorProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onSelectTile(url);
    }
  }, [onSelectTile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.avif']
    },
    maxSize: 10485760, // 10MB
    onDrop
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "hover:border-primary"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Upload floor texture</p>
        <p className="text-sm text-muted-foreground mt-2">
          Drop an image here or click to select
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Supports: PNG, JPG, JPEG, AVIF (max 10MB)
        </p>
      </div>
    </div>
  );
}