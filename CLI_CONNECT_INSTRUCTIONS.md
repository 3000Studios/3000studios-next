# 🔌 How to Connect via CLI

To connect to Vercel and manage your deployments directly from your terminal, follow these steps:

## 1. Login to Vercel

Run the following command in your terminal:

```powershell
npx vercel login
```

1. Select **GitHub** using the arrow keys and Enter.
2. A browser window will open. Log in with your GitHub account (`3000Studios`).
3. Click **"Verify"** or **"Authorize"** in the browser.
4. The terminal should show "Success!".

## 2. Deploy Manually (Optional)

Once logged in, you can trigger a manual deployment:

```powershell
# Deploy to Production
npx vercel --prod
```

## 3. View Logs

To view live logs from the CLI:

```powershell
npx vercel logs https://3000studios-next.vercel.app
```

(Replace the URL with your specific deployment URL if needed)

## ⚠️ Troubleshooting

If you see an SSL error (`sslv3 alert bad record mac`):
- This often indicates a proxy, VPN, or antivirus is interfering with the connection.
- Try temporarily disabling your VPN or antivirus.
- Alternatively, you can try setting this environment variable (use with caution):
  `$env:NODE_TLS_REJECT_UNAUTHORIZED=0` AND THEN run the command.
