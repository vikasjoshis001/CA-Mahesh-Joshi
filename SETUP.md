# Project Setup Instructions

## ⚠️ Important: Node.js Version Requirement

This project **requires Node.js 20 or higher**. It will NOT work with Node 18.

---

## 🔧 One-Time Setup

### Step 1: Verify nvm is installed

Open your terminal and run:

```bash
nvm --version
```

If you see a version number, nvm is installed ✅

If not, install nvm:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Then **restart your terminal**.

---

### Step 2: Install Node 20

```bash
nvm install 20
```

---

### Step 3: Configure Your IDE Terminal

**For VS Code:**
1. Open VS Code settings (Cmd+,)
2. Search for "terminal integrated shell"
3. Add this to your settings.json:

```json
{
  "terminal.integrated.shellArgs.osx": [
    "-l"
  ]
}
```

This ensures the terminal loads your shell profile (which includes nvm).

**OR** simply add this to your `~/.zshrc` or `~/.bash_profile`:

```bash
# Load nvm automatically
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Then **restart your IDE**.

---

## 🚀 Running the Project

### Method 1: Using the helper script (Easiest)

Simply run:

```bash
./dev.sh
```

This script will:
- Automatically switch to Node 20
- Verify the correct version is active
- Clean the cache
- Start the dev server

---

### Method 2: Manual commands

Every time you open a new terminal for this project:

```bash
# 1. Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 2. Switch to Node 20
nvm use 20

# 3. Verify (should show v20.x.x)
node -v

# 4. Start dev server
npm run dev
```

---

## 🔍 Troubleshooting

### Error: "Cannot find native binding"

This means your terminal is using Node 18 instead of Node 20.

**Fix:**

1. Close your IDE completely
2. Open terminal
3. Run:
   ```bash
   # Load nvm
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

   # Switch to Node 20
   nvm use 20

   # Set as default
   nvm alias default 20

   # Navigate to project
   cd /Users/vikasjoshis001/Desktop/Projects/camaheshjoshi

   # Clean reinstall
   rm -rf node_modules package-lock.json .next
   npm install

   # Run
   ./dev.sh
   ```

---

### Verify Your Setup

Run these commands to verify everything is correct:

```bash
# Should show v20.x.x (NOT v18!)
node -v

# Should show 10.x.x
npm -v

# Should work without errors
npm run build
```

---

## 📝 Quick Reference

**Start dev server:**
```bash
./dev.sh
```

**Build for production:**
```bash
nvm use 20 && npm run build
```

**Run linter:**
```bash
npm run lint
```

---

## ✅ Checklist Before First Run

- [ ] nvm installed
- [ ] Node 20 installed (`nvm install 20`)
- [ ] Terminal loads nvm automatically
- [ ] `node -v` shows v20.x.x (not v18!)
- [ ] Dependencies installed with Node 20
- [ ] `.next` cache cleared

---

## 🆘 Still Having Issues?

1. **Close your IDE completely**
2. **Open a fresh terminal**
3. **Run this complete reset:**

```bash
# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install and use Node 20
nvm install 20
nvm use 20
nvm alias default 20

# Navigate to project
cd /Users/vikasjoshis001/Desktop/Projects/camaheshjoshi

# Complete clean
rm -rf node_modules package-lock.json .next

# Reinstall
npm install

# Run
./dev.sh
```

This will give you a completely fresh start with Node 20.
