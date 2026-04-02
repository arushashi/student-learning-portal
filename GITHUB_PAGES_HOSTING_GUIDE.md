# GitHub Pages Hosting Guide - System Design Learning Portal

## 🚀 **Complete Step-by-Step Guide**

### 📋 **Prerequisites**
- GitHub account (free)
- Git installed on your system
- The student-learning-portal folder ready

---

## 🎯 **Step 1: Create GitHub Repository**

1. **Go to GitHub**: https://github.com
2. **Sign in** to your account
3. **Click "+"** (top right) → "New repository"
4. **Repository settings**:
   - **Repository name**: `student-learning-portal`
   - **Description**: `System Design Learning Portal - Interactive educational platform`
   - **Visibility**: Public (required for free GitHub Pages)
   - **Add a README**: ✅ Uncheck (we have our own)
   - **Add .gitignore**: ✅ Uncheck
   - **Choose a license**: ✅ Uncheck (or choose MIT)
5. **Click** "Create repository"

---

## 🎯 **Step 2: Initialize Local Git Repository**

Open Command Prompt/PowerShell and run:

```bash
# Navigate to your project folder
cd "C:\Users\Shashidhar_Panchanan\OneDrive - Dell Technologies\Desktop\Windsurf_Test\student-learning-portal"

# Initialize Git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit - System Design Learning Portal"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/student-learning-portal.git

# Push to GitHub
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` with your actual GitHub username.

---

## 🎯 **Step 3: Enable GitHub Pages**

1. **Go to your repository** on GitHub
2. **Click "Settings"** (tab)
3. **Scroll down** to "Pages" section
4. **Source settings**:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. **Click "Save"**

**Your site will be live at**: `https://YOUR_USERNAME.github.io/student-learning-portal`

---

## 🎯 **Step 4: Fix Relative Path Issues**

GitHub Pages requires absolute paths. Update your files:

### Update `index.html`
```html
<!-- Change -->
<link rel="stylesheet" href="assets/css/styles.css">

<!-- To -->
<link rel="stylesheet" href="/student-learning-portal/assets/css/styles.css">
```

### Update all `pages/*.html` files
```html
<!-- Change -->
<link rel="stylesheet" href="../assets/css/styles.css">

<!-- To -->
<link rel="stylesheet" href="/student-learning-portal/assets/css/styles.css">
```

### Update all JavaScript references
```html
<!-- Change -->
<script src="assets/js/script.js"></script>

<!-- To -->
<script src="/student-learning-portal/assets/js/script.js"></script>
```

---

## 🎯 **Step 5: Alternative - Use Base URL Method**

Instead of changing all paths, you can use the base URL method:

### Add to `<head>` of all HTML files:
```html
<base href="/student-learning-portal/">
```

This makes all relative paths work correctly on GitHub Pages.

---

## 🎯 **Step 6: Final Push and Deploy**

After making path corrections:

```bash
# Add changes
git add .

# Commit changes
git commit -m "Fix paths for GitHub Pages deployment"

# Push to GitHub
git push origin main
```

---

## 🎯 **Step 7: Verify Deployment**

1. **Wait 2-5 minutes** for GitHub Pages to build
2. **Visit your site**: `https://YOUR_USERNAME.github.io/student-learning-portal`
3. **Test all features**:
   - Homepage loads
   - Search works
   - Navigation to topic pages
   - Interactive features (quizzes, accordions)

---

## 🔧 **Troubleshooting Common Issues**

### **Issue 1: 404 Errors for CSS/JS**
**Solution**: Use absolute paths or base URL method

### **Issue 2: Navigation not working**
**Solution**: Update all `href` paths to be absolute

### **Issue 3: External resources not loading**
**Solution**: Use HTTPS for all external resources

### **Issue 4: GitHub Pages not updating**
**Solution**: 
- Check GitHub Pages build status in Settings → Pages
- Wait up to 10 minutes for changes to propagate
- Clear browser cache

---

## 🚀 **Advanced Options**

### **Option 1: Custom Domain**
1. **Buy a domain** (optional)
2. **Add CNAME file** to root: `yourdomain.com`
3. **Configure DNS** settings
4. **Update GitHub Pages** settings with custom domain

### **Option 2: GitHub Actions for Auto-Deploy**
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

---

## 📊 **GitHub Pages Benefits**

### ✅ **Free Hosting**
- No cost for public repositories
- Unlimited bandwidth
- Custom domain support

### ✅ **Automatic HTTPS**
- Free SSL certificate
- HTTPS enforced by default
- Secure by default

### ✅ **CDN Integration**
- Fast global CDN
- Automatic caching
- High availability

### ✅ **Version Control**
- Git-based deployment
- Rollback capability
- Branch-based deployments

---

## 🎯 **Quick Start Checklist**

### **Before You Start**:
- [ ] GitHub account created
- [ ] Git installed locally
- [ ] Project folder ready

### **Repository Setup**:
- [ ] Create GitHub repository
- [ ] Initialize local Git
- [ ] Add remote origin
- [ ] Push initial code

### **GitHub Pages Setup**:
- [ ] Enable Pages in Settings
- [ ] Choose deployment branch
- [ ] Wait for initial deployment

### **Path Fixes**:
- [ ] Add base URL or fix absolute paths
- [ ] Test all navigation
- [ ] Verify external resources

### **Final Deployment**:
- [ ] Push final changes
- [ ] Verify site is live
- [ ] Test all functionality

---

## 🎉 **Success!**

Your System Design Learning Portal will be live at:
`https://YOUR_USERNAME.github.io/student-learning-portal`

### **What You Get**:
- 🌐 **Live website** accessible globally
- 🔒 **Free HTTPS** certificate
- ⚡ **Fast CDN** delivery
- 📱 **Responsive design** on all devices
- 🔄 **Easy updates** via Git
- 💰 **Zero hosting costs**

### **Next Steps**:
1. Share your portal with others
2. Add more content if needed
3. Customize with your branding
4. Monitor usage with GitHub Analytics

---

## 📞 **Need Help?**

If you encounter any issues:
1. **Check GitHub Pages documentation**
2. **Verify file paths are correct**
3. **Ensure repository is public**
4. **Wait for GitHub Pages to build**

**Your System Design Learning Portal is ready for the world! 🚀**
