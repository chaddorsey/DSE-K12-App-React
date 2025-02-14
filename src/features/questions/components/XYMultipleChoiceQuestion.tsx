import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { MultipleChoiceQuestion } from '../types';
import type { QuestionResponse } from '../types/question';
import { describeArc } from '../utils/svgHelpers';
import { generateDistinctColors } from '../utils/colorHelpers';
import classNames from 'classnames';
import './XYMultipleChoiceQuestion.css';
import { animated, useSpring } from '@react-spring/web';

interface Props {
  question: MultipleChoiceQuestion;
  onAnswer: (response: QuestionResponse) => void;
  config: any;
  disabled?: boolean;
}

interface TouchState {
  identifier: number;
  startX: number;
  startY: number;
}

interface SegmentedPolarState {
  selectedSegment: string | null;
  intensity: number;
  isDragging: boolean;
  dragStartPos?: { x: number; y: number };
  dragStartAngle?: number;
  pendingSelection?: {
    segmentId: string;
    intensity: number;
  };
  isConfirmed: boolean;
  dotPosition: {
    x: number;
    y: number;
  };
  hoveredSegment: string | null;
  touchIdentifier?: number;
}

export const XYMultipleChoiceQuestion: React.FC<Props> = ({
  question,
  onAnswer,
  config,
  disabled = false
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchState, setTouchState] = useState<TouchState | null>(null);
  const [touchingIndex, setTouchingIndex] = useState<number | null>(null);
  const [polarState, setPolarState] = useState<SegmentedPolarState>({
    selectedSegment: null,
    intensity: config?.intensity?.defaultValue ?? 0.5,
    isDragging: false,
    isConfirmed: false,
    dotPosition: { x: 100, y: 100 },
    hoveredSegment: null
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const isQuadrantMode = question.options.length === 4;
  const colors = generateDistinctColors(question.options.length);

  const handleSelection = (index: number) => {
    if (disabled) return;
    setSelectedIndex(index);
    onAnswer({
      questionId: question.id,
      value: index,
      timestamp: Date.now()
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (disabled) return;

    let nextIndex = currentIndex;
    if (isQuadrantMode) {
      switch (e.key) {
        case 'ArrowRight':
          nextIndex = currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex;
          break;
        case 'ArrowLeft':
          nextIndex = currentIndex % 2 === 1 ? currentIndex - 1 : currentIndex;
          break;
        case 'ArrowDown':
          nextIndex = currentIndex < 2 ? currentIndex + 2 : currentIndex;
          break;
        case 'ArrowUp':
          nextIndex = currentIndex >= 2 ? currentIndex - 2 : currentIndex;
          break;
        default:
          return;
      }
    } else {
      // Polar navigation
      const totalOptions = question.options.length;
      switch (e.key) {
        case 'ArrowRight':
          nextIndex = (currentIndex + 1) % totalOptions;
          break;
        case 'ArrowLeft':
          nextIndex = (currentIndex - 1 + totalOptions) % totalOptions;
          break;
        default:
          return;
      }
    }

    if (nextIndex !== currentIndex) {
      e.preventDefault();
      const elements = containerRef.current?.querySelectorAll('[role="radio"]');
      (elements?.[nextIndex] as HTMLElement)?.focus();
    }
  };

  // Define handleDrag first
  const handleDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!polarState.isDragging || disabled) return;
    e.preventDefault(); // Prevent scrolling on touch

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // Calculate relative position within SVG (0-200 range)
    const svgX = ((clientX - rect.left) / rect.width) * 200;
    const svgY = ((clientY - rect.top) / rect.height) * 200;

    // Calculate angle and distance from center
    const dx = svgX - 100;
    const dy = svgY - 100;
    const angle = Math.atan2(dy, dx);
    const distance = Math.hypot(dx, dy);

    // Constrain distance to radius
    const maxRadius = 90;
    const clampedDistance = Math.min(distance, maxRadius);
    
    // Calculate final position
    const finalX = 100 + Math.cos(angle) * clampedDistance;
    const finalY = 100 + Math.sin(angle) * clampedDistance;

    // Update dot position immediately
    setPolarState(prev => ({
      ...prev,
      dotPosition: { x: finalX, y: finalY },
      pendingSelection: {
        segmentId: getSegmentFromAngle(angle),
        intensity: clampedDistance / maxRadius
      }
    }));
  }, [polarState.isDragging, disabled]);

  // Helper to get segment from angle
  const getSegmentFromAngle = useCallback((angle: number) => {
    const normalizedAngle = ((angle * 180 / Math.PI) + 360) % 360;
    const segmentAngle = 360 / config.segments.length;
    const segmentIndex = Math.floor(normalizedAngle / segmentAngle);
    return config.segments[segmentIndex].id;
  }, [config.segments]);

  // Then define touch handlers that use handleDrag
  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = Array.from(e.touches).find(
      t => t.identifier === polarState.touchIdentifier
    );
    if (!touch) return;
    
    handleDrag({ touches: [touch], preventDefault: () => {} } as any);
  }, [polarState.touchIdentifier, handleDrag]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const touch = Array.from(e.changedTouches).find(
      t => t.identifier === polarState.touchIdentifier
    );
    if (!touch) return;

    setPolarState(prev => ({
      ...prev,
      isDragging: false,
      touchIdentifier: undefined
    }));

    if (!config.requireConfirmation) {
      handleConfirmSelection();
    }
  }, [polarState.touchIdentifier, config.requireConfirmation]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    
    setPolarState(prev => ({
      ...prev,
      isDragging: true,
      touchIdentifier: touch.identifier
    }));
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    setPolarState(prev => ({ ...prev, isDragging: true }));
  };

  const handleDragEnd = () => {
    if (!polarState.isDragging || disabled) return;

    setPolarState(prev => ({
      ...prev,
      isDragging: false,
      hoveredSegment: null
    }));

    if (polarState.pendingSelection) {
      if (config.requireConfirmation) {
        // Wait for confirmation
      } else {
        handleConfirmSelection();
      }
    }
  };

  const handleSegmentedPolarGesture = (e: React.TouchEvent | React.MouseEvent) => {
    if (disabled || !config.segments) return;

    const isTouch = 'touches' in e;
    const clientX = isTouch ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = isTouch ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    const dx = clientX - center.x;
    const dy = clientY - center.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const normalizedAngle = (angle + 360) % 360;
    const distance = Math.min(1, Math.hypot(dx, dy) / (rect.width / 2));

    const segmentAngle = 360 / config.segments.length;
    const segmentIndex = Math.floor(normalizedAngle / segmentAngle);
    const segment = config.segments[segmentIndex];

    if (isTouch && e.type === 'touchstart') {
      setPolarState(prev => ({
        ...prev,
        isDragging: true,
        dragStartPos: { x: clientX, y: clientY },
        dragStartAngle: normalizedAngle
      }));
    }

    // Apply smooth intensity changes during drag
    const newIntensity = Math.max(0, Math.min(1, distance));
    
    const newSelection = {
      segmentId: segment.id,
      intensity: newIntensity
    };

    if (config.requireConfirmation) {
      setPolarState(prev => ({
        ...prev,
        pendingSelection: newSelection,
        isConfirmed: false
      }));
    } else {
      setPolarState(prev => ({
        ...prev,
        selectedSegment: segment.id,
        intensity: newIntensity,
        isConfirmed: true
      }));

      onAnswer({
        questionId: question.id,
        value: newSelection,
        timestamp: Date.now()
      });
    }
  };

  const handleConfirmSelection = () => {
    if (!polarState.pendingSelection) return;

    setPolarState(prev => ({
      ...prev,
      selectedSegment: prev.pendingSelection!.segmentId,
      intensity: prev.pendingSelection!.intensity,
      isConfirmed: true
    }));

    onAnswer({
      questionId: question.id,
      value: polarState.pendingSelection,
      timestamp: Date.now()
    });
  };

  const handleSegmentKeyDown = (e: React.KeyboardEvent, segmentId: string) => {
    if (disabled) return;

    const intensityStep = 0.1;
    let newIntensity = polarState.intensity;
    let newSegmentId = segmentId;

    const currentIndex = config.segments.findIndex(s => s.id === segmentId);
    const totalSegments = config.segments.length;

    switch (e.key) {
      // Existing intensity controls
      case ' ':
      case 'Enter':
        handleSegmentedPolarGesture(e as any);
        break;
      case 'ArrowUp':
        e.preventDefault();
        newIntensity = Math.min(1, polarState.intensity + intensityStep);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newIntensity = Math.max(0, polarState.intensity - intensityStep);
        break;
      case 'Home':
        e.preventDefault();
        newIntensity = 0;
        break;
      case 'End':
        e.preventDefault();
        newIntensity = 1;
        break;

      // Add segment navigation
      case 'ArrowLeft':
        e.preventDefault();
        newSegmentId = config.segments[(currentIndex - 1 + totalSegments) % totalSegments].id;
        break;
      case 'ArrowRight':
        e.preventDefault();
        newSegmentId = config.segments[(currentIndex + 1) % totalSegments].id;
        break;
      case 'PageUp':
        e.preventDefault();
        newSegmentId = config.segments[(currentIndex - 2 + totalSegments) % totalSegments].id;
        break;
      case 'PageDown':
        e.preventDefault();
        newSegmentId = config.segments[(currentIndex + 2) % totalSegments].id;
        break;
      default:
        // Number keys 1-9 for direct segment selection
        const numKey = parseInt(e.key);
        if (!isNaN(numKey) && numKey > 0 && numKey <= totalSegments) {
          e.preventDefault();
          newSegmentId = config.segments[numKey - 1].id;
        }
        return;
    }

    if (newSegmentId !== segmentId || newIntensity !== polarState.intensity) {
      setPolarState(prev => ({
        ...prev,
        selectedSegment: newSegmentId,
        intensity: newIntensity
      }));

      onAnswer({
        questionId: question.id,
        value: {
          segmentId: newSegmentId,
          intensity: newIntensity
        },
        timestamp: Date.now()
      });

      // Focus the new segment if we've changed segments
      if (newSegmentId !== segmentId) {
        const newSegmentElement = containerRef.current?.querySelector(
          `[data-segment-id="${newSegmentId}"]`
        ) as HTMLElement;
        newSegmentElement?.focus();
      }
    }
  };

  const markerSpring = useSpring({
    cx: 100,
    cy: polarState.selectedSegment ? 100 - (polarState.intensity * 90) : 100,
    opacity: polarState.selectedSegment ? 1 : 0,
    config: { tension: 280, friction: 24 }
  });

  const renderSegmentedPolar = () => {
    const segments = config.segments;
    const segmentAngle = 360 / segments.length;
    const intensityLabels = config.intensity?.labels || {
      0: 'Low',
      0.5: 'Medium',
      1: 'High'
    };

    return (
      <div className="polar-container segmented">
        <div className="visually-hidden" role="note">
          Keyboard shortcuts: Space/Enter to select, Up/Down arrows to adjust intensity,
          Left/Right arrows to move between segments, PageUp/PageDown to skip segments,
          Home/End for min/max intensity, number keys 1-{config.segments.length} for direct selection
        </div>
        <svg viewBox="0 0 200 200">
          {/* Define gradients */}
          <defs>
            {/* Create a radial gradient for each segment color */}
            {segments.map((segment, index) => (
              <radialGradient
                key={segment.id}
                id={`gradient-${segment.id}`}
                gradientUnits="userSpaceOnUse"
                cx="100"
                cy="100"
                r="90"
              >
                <stop offset="0%" stopColor={segment.color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={segment.color} stopOpacity="1" />
              </radialGradient>
            ))}
          </defs>

          {/* Update segments with enhanced ARIA */}
          {segments.map((segment, index) => {
            const startAngle = index * segmentAngle;
            const isSelected = polarState.selectedSegment === segment.id;
            const currentIntensity = isSelected ? polarState.intensity : 0;
            const intensityLabel = Object.entries(intensityLabels)
              .reduce((closest, [value, label]) => {
                return Math.abs(Number(value) - currentIntensity) < 
                       Math.abs(Number(closest[0]) - currentIntensity) 
                       ? [value, label] 
                       : closest;
              }, ['0', intensityLabels[0]])[1];

            return (
              <g 
                key={segment.id} 
                className="segment-group"
                role="radio"
                data-segment-id={segment.id}
                aria-checked={isSelected}
                aria-label={segment.label}
                aria-description={`${segment.description || ''}. 
                  ${isSelected ? `Current intensity: ${intensityLabel} 
                  (${Math.round(currentIntensity * 100)}%)` : ''}`}
                tabIndex={0}
                onKeyDown={(e) => handleSegmentKeyDown(e, segment.id)}
                data-hovered={polarState.hoveredSegment === segment.id}
              >
                <path
                  d={describeArc(100, 100, 90, startAngle, startAngle + segmentAngle)}
                  className="segment"
                  style={{ 
                    fill: `url(#gradient-${segment.id})`,
                    opacity: isSelected ? 1 : 0.7
                  }}
                />
                <text
                  className="segment-label"
                  transform={`
                    rotate(${startAngle + segmentAngle/2} 100 100)
                    translate(0 -75)
                  `}
                >
                  {segment.label}
                </text>
              </g>
            );
          })}

          {/* Update intensity rings with ARIA labels */}
          <g className="intensity-rings" aria-hidden="true">
            {[0.25, 0.5, 0.75].map(radius => (
              <g key={radius}>
                <circle
                  cx="100"
                  cy="100"
                  r={90 * radius}
                  className="intensity-ring"
                />
                <text
                  x="105"
                  y={100 - (90 * radius)}
                  className="intensity-ring-label"
                >
                  {Math.round(radius * 100)}%
                </text>
              </g>
            ))}
          </g>

          {/* Draggable dot */}
          <g 
            className={classNames('draggable-dot', {
              'dragging': polarState.isDragging,
              'pending': !!polarState.pendingSelection && !polarState.isConfirmed,
              'confirmed': polarState.isConfirmed
            })}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            style={{ cursor: 'grab' }}
          >
            <circle
              cx={polarState.dotPosition.x}
              cy={polarState.dotPosition.y}
              r="6"
              className="dot-handle"
            />
          </g>

          {/* Add confirmation button */}
          {polarState.pendingSelection && !polarState.isConfirmed && (
            <button
              className="confirm-selection"
              onClick={handleConfirmSelection}
              aria-label="Confirm selection"
            >
              Confirm Selection
            </button>
          )}

          {/* Center Text */}
          <text 
            x="100" 
            y="100" 
            className="center-text"
            aria-hidden="true"
          >
            {question.text}
          </text>
        </svg>
      </div>
    );
  };

  const updateDotPosition = useCallback((x: number, y: number) => {
    requestAnimationFrame(() => {
      setPolarState(prev => ({
        ...prev,
        dotPosition: { x, y }
      }));
    });
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => handleDrag(e as any);
    const handleGlobalMouseUp = () => handleDragEnd();
    const handleGlobalTouchMove = (e: TouchEvent) => handleDrag(e as any);
    const handleGlobalTouchEnd = () => handleDragEnd();

    if (polarState.isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove);
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [polarState.isDragging]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const options = { passive: false };
    
    container.addEventListener('touchstart', handleTouchStart, options);
    container.addEventListener('touchmove', handleTouchMove, options);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  return (
    <div className="xy-multiple-choice" ref={containerRef}>
      {isQuadrantMode ? (
        <div className="quadrant-grid" role="radiogroup">
          {question.options.map((option, index) => (
            <button
              key={index}
              role="radio"
              aria-checked={selectedIndex === index}
              className={classNames('quadrant', {
                'selected': selectedIndex === index,
                'touching': touchingIndex === index
              })}
              style={{ backgroundColor: colors[index] }}
              onClick={() => handleSelection(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onTouchStart={(e) => handleTouchStart(e)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              {option}
            </button>
          ))}
        </div>
      ) : config.type === 'segmented-continuous' ? (
        renderSegmentedPolar()
      ) : (
        <div className="polar-container" role="radiogroup">
          <svg viewBox="0 0 200 200">
            {question.options.map((option, index) => {
              const segmentAngle = 360 / question.options.length;
              const startAngle = index * segmentAngle;
              return (
                <path
                  key={index}
                  role="radio"
                  aria-checked={selectedIndex === index}
                  aria-label={option}
                  d={describeArc(100, 100, 90, startAngle, startAngle + segmentAngle)}
                  className={classNames('segment', {
                    'selected': selectedIndex === index,
                    'touching': touchingIndex === index
                  })}
                  style={{ fill: colors[index] }}
                  onClick={() => handleSelection(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onTouchStart={(e) => handleTouchStart(e)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={handleTouchEnd}
                  tabIndex={0}
                />
              );
            })}
            <text x="100" y="100" className="center-text">
              {question.text}
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}; 