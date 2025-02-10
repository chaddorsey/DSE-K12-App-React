import React, { useState, useCallback, useRef } from 'react';
import './BaseSlider.css';

interface BaseSliderProps {
  id: string;
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
  onComplete?: () => void;
}

export const BaseSlider: React.FC<BaseSliderProps> = ({
  id,
  min,
  max,
  step,
  defaultValue = 50,
  disabled = false,
  onChange,
  onComplete
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);
  const touchStartXRef = useRef<number>(0);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    
    // Snap to step if provided
    if (step) {
      const snappedValue = Math.round(value / step) * step;
      onChange(Math.min(Math.max(snappedValue, min), max));
      return;
    }

    onChange(Math.min(Math.max(value, min), max));
  }, [min, max, step, onChange]);

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLInputElement>) => {
    if (disabled) return;
    setIsDragging(true);
    touchStartXRef.current = event.touches[0].clientX;
    event.currentTarget.dataset.dragging = 'true';
  }, [disabled]);

  const handleTouchMove = useCallback((event: React.TouchEvent<HTMLInputElement>) => {
    if (!isDragging || disabled) return;
    
    event.preventDefault(); // Prevent scrolling
    
    const touch = event.touches[0];
    const slider = sliderRef.current;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    const value = Math.round((percentage / 100) * (max - min) + min);
    
    handleChange({ target: { value: value.toString() } } as React.ChangeEvent<HTMLInputElement>);
  }, [isDragging, disabled, min, max, handleChange]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.dataset.dragging = 'false';
    }
    onComplete?.();
  }, [isDragging, onComplete]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    const currentValue = parseInt(event.currentTarget.value, 10);
    let newValue = currentValue;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = currentValue + (step || 1);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = currentValue - (step || 1);
        break;
      default:
        return;
    }

    handleChange({ target: { value: newValue.toString() } } as React.ChangeEvent<HTMLInputElement>);
  }, [disabled, step, handleChange]);

  return (
    <div className="base-slider-container">
      <input
        ref={sliderRef}
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={defaultValue}
        disabled={disabled}
        onChange={handleChange}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onKeyDown={handleKeyDown}
        className="base-slider"
        style={{
          '--progress': `${((defaultValue - min) / (max - min)) * 100}%`
        } as React.CSSProperties}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={defaultValue}
      />
    </div>
  );
}; 