# Slider Question Types Design

## Overview
Three new question types that capture user responses along continuous or discrete scales:
1. Slider: Continuous ratio between two options
2. Segmented Slider: Discrete points along a scale
3. X-Y Continuum: Two-dimensional continuous positioning

## Core Components

### Base Slider Component
```typescript
interface BaseSliderProps {
  id: string;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
  onComplete?: () => void;
}
```

### 1. Slider Question
```typescript
interface SliderQuestionType extends BaseQuestionType {
  type: 'SLIDER';
  leftOption: string;
  rightOption: string;
  defaultValue?: number; // 0.5 if not specified
}

interface SliderResponse {
  questionId: string;
  value: number;  // 0-1 ratio
  timestamp: number;
}
```

### 2. Segmented Slider Question
```typescript
interface SegmentedSliderQuestionType extends BaseQuestionType {
  type: 'SEGMENTED_SLIDER';
  segments: {
    value: number;
    label?: string;
  }[];
  defaultSegment?: number;
}

interface SegmentedSliderResponse {
  questionId: string;
  value: number;  // Discrete value from segments
  timestamp: number;
}
```

### 3. X-Y Continuum Question
```typescript
interface XYContinuumQuestionType extends BaseQuestionType {
  type: 'XY_CONTINUUM';
  xAxis: {
    left: string;
    right: string;
  };
  yAxis: {
    top: string;
    bottom: string;
  };
  defaultPosition?: { x: number; y: number };
}

interface XYContinuumResponse {
  questionId: string;
  position: {
    x: number;  // 0-1 ratio
    y: number;  // 0-1 ratio
  };
  timestamp: number;
}
```

## Implementation Phases

### Phase 1: Base Slider Component
1. Create reusable slider component
2. Implement touch/mouse drag handling
3. Add snap-to-grid functionality
4. Style customization support

### Phase 2: Slider Question
1. Implement SliderQuestion component
2. Add option labels
3. Style slider track and thumb
4. Add submit button
5. Handle response validation

### Phase 3: Segmented Slider
1. Extend base slider for segments
2. Add snap-to-segment behavior
3. Implement segment labels
4. Style segment markers
5. Handle response validation

### Phase 4: X-Y Continuum
1. Create draggable dot component
2. Implement axis labels
3. Add pulsing animation
4. Handle boundary constraints
5. Style grid and axes
6. Handle response validation

## Testing Strategy

### Unit Tests
1. Value calculations
2. Boundary conditions
3. Touch/mouse event handling
4. Segment snapping
5. Response validation

### Integration Tests
1. Question rendering
2. Response handling
3. State management
4. Animation behavior

### UI Tests
1. Drag interactions
2. Visual feedback
3. Responsive layout
4. Touch device support

## Styling Considerations

### Slider Components
```css
.slider-track {
  height: 4px;
  background: #e9ecef;
  border-radius: 2px;
}

.slider-thumb {
  width: 20px;
  height: 20px;
  background: #007bff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.segment-marker {
  width: 2px;
  height: 12px;
  background: #dee2e6;
}

.xy-grid {
  background: linear-gradient(#e9ecef 1px, transparent 1px),
              linear-gradient(90deg, #e9ecef 1px, transparent 1px);
  background-size: 20px 20px;
}
```

## Accessibility Considerations
1. Keyboard navigation support
2. ARIA labels for sliders
3. High contrast visual indicators
4. Touch target sizes
5. Screen reader descriptions 