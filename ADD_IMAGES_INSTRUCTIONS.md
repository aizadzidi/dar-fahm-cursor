# 📸 How to Add Images to Your Darul Fahmi Website

The website is currently showing placeholder icons because the actual image files need to be saved to the `images/` directory. Here's how to add them:

## 🎯 **Step-by-Step Instructions:**

### 1. **Save the Images**
You need to save the 4 images you shared with these **exact filenames**:

```
images/
├── maisarah.jpg      ← First image (woman with hijab)
├── fahmi.jpg         ← Second image (young man in library)  
├── ammar.jpg         ← Third image (man in business suit)
└── dr-abdur-rahim.jpg ← Fourth image (elderly scholar)
```

### 2. **Method A: Manual Download**
1. Right-click on each image you shared
2. Select "Save Image As..." 
3. Navigate to: `/Users/aizadhazidi/Desktop/dar-fahm-cursor/images/`
4. Save with the exact filename:
   - `maisarah.jpg` (Ustazah Maisarah)
   - `fahmi.jpg` (Amirul Fahmi - Founder)
   - `ammar.jpg` (Ustaz Ammar)
   - `dr-abdur-rahim.jpg` (Dr. V. Abdur Rahim)

### 3. **Method B: Using Terminal**
If you have the image files downloaded somewhere else, you can copy them:

```bash
# Navigate to your project
cd /Users/aizadhazidi/Desktop/dar-fahm-cursor/images

# Copy your images (replace SOURCE_PATH with actual path)
cp /path/to/your/maisarah-image.jpg maisarah.jpg
cp /path/to/your/fahmi-image.jpg fahmi.jpg  
cp /path/to/your/ammar-image.jpg ammar.jpg
cp /path/to/your/dr-rahim-image.jpg dr-abdur-rahim.jpg
```

### 4. **Verify Images Are Added**
```bash
cd /Users/aizadhazidi/Desktop/dar-fahm-cursor/images
ls -la
```

You should see:
```
maisarah.jpg
fahmi.jpg
ammar.jpg
dr-abdur-rahim.jpg
README.md
```

## ✅ **Once Images Are Added:**

1. **Refresh your browser** - The images should automatically appear
2. **No code changes needed** - The HTML is already set up to use these images
3. **Fallback system** - If any image fails to load, it will show a professional icon placeholder

## 🎨 **Image Requirements:**

- **Format**: JPG, PNG, or WebP
- **Size**: Minimum 300x300 pixels (will be cropped to square)
- **Quality**: Good resolution for web display
- **File size**: Recommended under 1MB each for fast loading

## 🔧 **Technical Details:**

The website uses:
- `object-fit: cover` to ensure images display properly
- Automatic fallback to icons if images don't load
- Responsive sizing for all devices
- Hover effects and professional styling

## 🆘 **Troubleshooting:**

**Images still not showing?**
1. Check exact filename spelling (case-sensitive)
2. Ensure images are in `/images/` folder
3. Try hard refresh (Cmd+Shift+R on Mac)
4. Check browser console for errors (F12 → Console)

**Need different image names?**
Edit the `src` attributes in `index.html`:
```html
<img src="images/your-filename.jpg" alt="...">
```

---

💡 **Tip**: The website will work perfectly with the icon placeholders too, but real photos make it much more personal and professional!
