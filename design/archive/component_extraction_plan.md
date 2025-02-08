# Component Extraction Plan

## Current State
- App.js (~1300 lines) contains:
  - Authentication UI/logic
  - Network status handling
  - Route management
  - Error handling
  - State management
  - Multiple UI components

## Phase 1: Initial Component Extraction (Week 1)

### 1. Identify Component Boundaries
Current components mixed in App.js:
- NetworkStatusDisplay
- AuthenticationForms
- ErrorDisplay
- LoadingIndicators
- Navigation components
- Content containers

### 2. Extraction Order
1. Pure UI Components First
   ```typescript
   // Extract to src/components/common/
   - LoadingSpinner
   - ErrorDisplay
   - StatusIndicator
   ```

2. Stateful UI Components
   ```typescript
   // Extract to src/components/
   - NetworkStatus
   - NavigationBar
   - ContentContainer
   ```

3. Form Components
   ```typescript
   // Extract to src/components/forms/
   - LoginForm
   - RegisterForm
   - ResetPasswordForm
   ```

### 3. TDD-Based Extraction Process
For each component:

1. **Test Analysis & Setup**
   ```typescript
   // 1a. Identify existing behavior
   - Map current component behavior in App.js
   - Document expected props and state
   - List all user interactions
   - Catalog expected error states
   
   // 1b. Create test file structure
   src/components/__tests__/ComponentName.test.tsx
   ```

2. **Write Initial Tests**
   ```typescript
   // 2a. Core rendering tests
   describe('ComponentName', () => {
     it('should render successfully')
     it('should match snapshot')
     it('should handle required props')
   })

   // 2b. Interaction tests
   describe('user interactions', () => {
     it('should handle clicks/inputs')
     it('should update state correctly')
   })

   // 2c. Error state tests
   describe('error handling', () => {
     it('should display error messages')
     it('should recover from errors')
   })
   ```

3. **Component Implementation**
   ```typescript
   // 3a. Create minimal component
   export const ComponentName: React.FC<IProps> = () => {
     // Implement to make tests pass
   }

   // 3b. Iteratively add features
   - Add state management
   - Implement error handling
   - Add performance monitoring
   ```

4. **Integration Testing**
   ```typescript
   // 4a. Create integration tests
   describe('ComponentName Integration', () => {
     it('should work with parent components')
     it('should handle context/providers')
   })
   ```

5. **App.js Integration**
   ```typescript
   // 5a. Replace in App.js with new component
   - Add new component import
   - Replace old implementation
   - Run full test suite
   ```

6. **Verification**
   - All tests passing
   - No regressions in App.js
   - Performance metrics maintained
   - Error handling verified
   - Accessibility tests pass

### 4. Example Extraction: LoadingSpinner (✅ Completed)

Lessons Learned:
1. Test Structure
   ```typescript
   // Split tests by concern
   - Unit tests (LoadingSpinner.test.tsx)
     - Core rendering
     - Props handling
     - Accessibility
     - Performance monitoring
   
   - Integration tests (LoadingSpinner.integration.test.tsx)
     - Error boundary compatibility
     - Dynamic state handling
     - Multiple instance behavior
   ```

2. Component Structure
   ```typescript
   src/components/LoadingSpinner/
   ├── LoadingSpinner.tsx        // Main component
   ├── LoadingSpinner.css        // Styles
   ├── __tests__/               // Test files
   │   ├── LoadingSpinner.test.tsx
   │   └── LoadingSpinner.integration.test.tsx
   └── index.ts                 // Public API
   ```

3. Key Patterns Established
   - Use aria-* props for accessibility
   - Performance monitoring hook integration
   - CSS-based animations for performance
   - Clear prop type documentation
   - Integration test patterns

### 5. Next Component: ErrorDisplay
Following the same pattern, but with added focus on:
- Error message formatting
- Error recovery actions
- State management testing
- Accessibility for error states

## Success Criteria
- App.js reduced to routing and layout
- Each component properly typed and tested
- No functionality regressions
- Improved test coverage
- Cleaner git blame/history
- Comprehensive test coverage (>90%)
- Integration tests for all components
- Performance testing baselines established
- Accessibility testing integrated
- Error recovery scenarios covered

## Monitoring During Extraction
- Test coverage metrics
- Performance benchmarks
- Error rates
- Build size impact
- Integration test results

## Next Steps
1. Set up testing infrastructure
2. Create test templates
3. Begin with smallest pure component
4. Progress through component hierarchy

After component extraction:
1. Move to feature-based organization
2. Implement proper state management
3. Add error boundaries
4. Enhance routing structure 