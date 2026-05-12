'use client';
import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = { success: CheckCircle, error: AlertCircle, info: Info };
  const Icon = icons[toast.type];
  const colors = {
    success: 'border-l-4 border-l-green-500',
    error: 'border-l-4 border-l-red-500',
    info: 'border-l-4 border-l-blue-500',
  };
  const iconColors = { success: 'text-green-500', error: 'text-red-500', info: 'text-blue-500' };

  return (
    <div className={`animate-slide-up card-elevated-md flex items-start gap-3 p-4 w-80 ${colors[toast.type]}`}>
      <Icon size={18} className={`${iconColors[toast.type]} shrink-0 mt-0.5`} />
      <p className="text-sm text-foreground flex-1 font-medium">{toast.message}</p>
      <button onClick={() => onDismiss(toast.id)} className="shrink-0 hover:opacity-70 transition-opacity">
        <X size={14} className="text-muted-foreground" />
      </button>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return { toasts, addToast, dismissToast };
}