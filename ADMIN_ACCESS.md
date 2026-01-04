# Admin Access Instructions

## Default Passwords

The admin panel at `/admin` accepts either of these passwords:

- `88888888`
- `Bossman3000!!!`

## How to Access

1. Navigate to: <https://3000studios.com/admin>
2. Enter one of the passwords above
3. Click "Access Admin Panel"

## Password Configuration

The password is set in `/app/admin/page.tsx`:

```typescript
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '88888888';
```

You can also use the hardcoded fallback: `Bossman3000!!!`

## Session Storage

Once authenticated, the session is stored in `sessionStorage` with key `admin-auth`.
This means you'll need to re-authenticate if you:

- Close the browser tab
- Clear browser data
- Open in a new tab/window

## Troubleshooting

If you can't access the admin panel:

1. Clear your browser cache and cookies
2. Try in an incognito/private window
3. Make sure JavaScript is enabled
4. Check browser console for errors (F12)

## Security Note

For production, set the `NEXT_PUBLIC_ADMIN_PASSWORD` environment variable in Vercel to a secure password.
