# TODO: The Archive Vault — Visual Certificate Gallery

## Steps

### 1. Create `src/components/ui/certificate-card.tsx`
- [x] Individual certificate "document card" component
- [x] Detects JPG vs PDF URL
- [x] JPG: grayscale image → color on hover
- [x] PDF: styled "archive document" cover with PDF icon
- [x] Uses `useTilt3D` for tilt-on-hover
- [x] Click triggers certificate modal
- [x] Category badge, score badge, metadata

### 2. Create `src/components/ui/certificate-modal.tsx`
- [x] Press-themed lightbox viewer
- [x] PDF: embedded via iframe (native browser viewer)
- [x] JPG: full-size image display
- [x] Metadata sidebar: title, platform, year, category, score
- [x] Prev/Next navigation with arrow keys
- [x] Escape to close
- [x] "Open in New Tab" button

### 3. Modify `src/components/Certifications.tsx`
- [x] Keep Featured section + Notable Achievements unchanged
- [x] Replace "Other certifications" text list with visual masonry gallery
- [x] Keep filter tabs and "View All / Show Less" functionality
- [x] Add CertificateModal with prev/next navigation
- [x] Import and wire up CertificateCard + CertificateModal

### 4. Verify
- [x] TypeScript compiles (`npm run typecheck`) ✅
- [x] Build succeeds (`npm run build`) ✅
- [x] Visual gallery renders correctly
- [x] Modal opens/closes/navigates correctly

