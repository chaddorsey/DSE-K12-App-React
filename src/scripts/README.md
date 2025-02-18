# Development Scripts

## Seeding Test Data

To seed test responses for a user:

```bash
# Default: 12 responses for user@test.com
npm run seed

# Custom email and count
npm run seed -- user@test.com 20
```

This will:
1. Look up the user by email
2. Generate random responses of different types
3. Save them to Firestore

### Response Types Generated:
- Multiple Choice (MC)
- Numeric (NM)
- Scale (SCALE)
- Segmented Slider (SEGMENTED_SLIDER) 