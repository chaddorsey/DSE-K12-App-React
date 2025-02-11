# Avatar Grid Progressive Selection Mode Design

## Overview
The progressive selection mode is a specialized interaction pattern for the avatar grid that helps users build recognition of their peers through gradual, structured selection steps.

## Core Requirements
1. Support natural progression through recognition levels
2. Provide clear visual feedback
3. Maintain accessibility
4. Track and persist progress

## Recognition Progression Flow
Users move through recognition levels in this order:
1. **Face Recognition** - "I recognize their face"
2. **Name Recognition** - "I know their name"
3. **Interaction Recognition** - "I've talked with them"
4. **Deep Recognition** - "I know them well"

## Interaction Design

### Selection Mode
- Toggle between standard and progressive selection modes
- Visual indicator of current mode
- Keyboard shortcut (Ctrl/Cmd + P) for mode switching

### Progressive Selection Flow
1. **Initial State**
   - All avatars start unselected
   - Clear visual indication of current recognition level being selected
   - Helper text explains current selection criteria

2. **Selection Process**
   - Click/tap avatar to mark current recognition level
   - Visual feedback shows progression:
     - Subtle glow for face recognition
     - Name badge highlight for name recognition
     - Chat bubble indicator for interaction
     - Strong highlight for deep recognition
   - Keyboard navigation support (arrow keys + space/enter)

3. **Level Transition**
   - Auto-advance to next level when done with current
   - Option to manually switch levels
   - Clear transition animation
   - Screen reader announcements

### Visual Design
- Color coding for different recognition levels
- Progressive visual treatments that build on each other
- High contrast mode support
- Focus indicators for keyboard navigation

### Data Model
```typescript
interface ProgressiveSelection {
  userId: string;
  recognitionLevel: RecognitionLevel;
  timestamp: number;
  confidence?: number;
}

type RecognitionLevel = 'FACE' | 'NAME' | 'TALKED' | 'KNOW_WELL';
```

### Accessibility Considerations
1. **Keyboard Navigation**
   - Arrow keys for grid navigation
   - Space/Enter for selection
   - Escape to exit progressive mode
   - Tab for level switching

2. **Screen Reader Support**
   - Announce current selection mode
   - Indicate recognition level being selected
   - Confirm selections
   - Progress updates

3. **Visual Accessibility**
   - High contrast mode support
   - Clear focus indicators
   - Multiple visual cues (not just color)

## Implementation Phases

### Phase 1: Basic Progressive Selection
- [ ] Add mode toggle
- [ ] Implement basic selection flow
- [ ] Add visual indicators
- [ ] Basic keyboard support

### Phase 2: Enhanced Interaction
- [ ] Add animations
- [ ] Improve visual feedback
- [ ] Add confidence tracking
- [ ] Implement auto-advance

### Phase 3: Accessibility & Polish
- [ ] Full keyboard navigation
- [ ] Screen reader improvements
- [ ] High contrast mode
- [ ] Performance optimization

## Success Metrics
1. Selection accuracy (compared to standard mode)
2. Time to complete selections
3. User confidence ratings
4. Accessibility compliance score

## Open Questions
1. Should we allow backward revision of recognition levels?
2. How to handle batch selections for known groups?
3. Should confidence scores be explicit or implicit?
4. How to handle network latency during selections? 