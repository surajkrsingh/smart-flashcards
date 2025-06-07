# Smart Flashcards

**Contributors:** BuddyLMS Inc  
**Plugin Name:** Smart Flashcards  
**Plugin URI:** https://buddylms.com/smart-flashcards/  
**Description:** Create interactive flashcards, display posts dynamically, and showcase team members with engaging animations directly within the WordPress block editor. Perfect for educational websites, online courses, interactive content, and professional presentations.  
**Version:** 1.0.0  
**Requires at least:** 5.8  
**Tested up to:** 6.4  
**Requires PHP:** 7.4  
**License:** GPL-2.0+  
**License URI:** http://www.gnu.org/licenses/gpl-2.0.txt  
**Text Domain:** smart-flashcards  
**Domain Path:** /languages  

[![Flashcard Set Block in Gutenberg Editor](https://go.screenpal.com/watch/cTnuFzn12WM)](https://go.screenpal.com/watch/cTnuFzn12WM)
*Flashcard Set Block in Gutenberg Editor*

[![Flashcard Block in Gutenberg Editor](https://go.screenpal.com/watch/cTnuFAn12WW)](https://go.screenpal.com/watch/cTnuFAn12WW)
*Flashcard Block in Gutenberg Editor*

## Description

Smart Flashcards is a comprehensive WordPress plugin that empowers you to create interactive learning experiences and dynamic content displays using the modern Gutenberg block editor. Perfect for educational websites, online courses, team showcases, content curation, and interactive presentations.

## Key Features

### 🎴 **Interactive Flashcard System**
- **Flashcard Set Block:** Create organized sets of flashcards with intuitive navigation
- **Individual Flashcard Blocks:** Each flashcard has dedicated front and back sides
- **Multiple Display Modes:**
  - **Slide Mode:** Carousel-style navigation with smooth transitions
  - **Stack Mode:** Stacked cards with peek effect for depth
  - **Grid Mode:** Display all flashcards simultaneously
- **GSAP-Powered Animations:** Smooth flip animations and transitions
- **Border Styles:** Choose from Default, Vintage, and Moroccan border designs
- **Navigation Controls:** Customizable Previous/Next buttons with color options
- **Shuffle Feature:** Randomize flashcard order for varied learning experiences

### 📄 **Single Post Display Block**
- **Universal Post Support:** Display any post from any post type (posts, pages, custom post types)
- **Flexible Content Options:** Show/hide title, content, excerpt, featured image, meta information
- **Author & Date Display:** Configurable author information and publication dates
- **Featured Image Sizes:** Multiple image size options (thumbnail, medium, large, full)
- **Read More Links:** Customizable read more buttons with alignment options
- **REST API Integration:** Real-time post data fetching and display

### 👥 **Member Block**
- **Team Showcase:** Display user profiles and team member information
- **Avatar Display:** Configurable avatar sizes and visibility
- **Contact Information:** Show/hide email addresses and website links
- **Biography Display:** User bio and description support
- **Social Media Links:** Facebook, Twitter, LinkedIn, Instagram integration
- **User Role Support:** Works with all WordPress user roles and custom user fields

### 🎨 **Design & Customization**
- **Responsive Design:** Optimized for all screen sizes and devices
- **Color Customization:** Custom button colors and styling options
- **Border Styles:** Elegant preset border designs for flashcards
- **Typography Support:** Full WordPress typography controls
- **Spacing Controls:** Configurable padding and margin options
- **Accessibility Ready:** ARIA labels, keyboard navigation, and screen reader support

### ⚡ **Technical Excellence**
- **Modern React Architecture:** Built with latest WordPress block development standards
- **Gutenberg Native:** Seamless integration with the block editor
- **REST API Enhanced:** Extended REST API support for all post types
- **Server-Side Rendering:** Optimized performance and SEO-friendly output
- **Webpack Build Process:** Optimized asset compilation and delivery
- **Internationalization Ready:** Translation-ready with .pot files
- **WordPress Coding Standards:** Follows all WordPress development best practices

## Installation

### **Automatic Installation**
1. **Navigate** to your WordPress admin dashboard
2. **Go to** Plugins > Add New
3. **Search** for "Smart Flashcards"
4. **Click** "Install Now" and then "Activate"

### **Manual Installation**
1. **Download** the plugin zip file
2. **Upload** the `smart-flashcards` folder to `/wp-content/plugins/`
3. **Activate** the plugin through the 'Plugins' menu in WordPress

## Development Setup

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn
- WordPress development environment

### **Getting Started**
```bash
# Clone the repository
git clone [repository-url] smart-flashcards
cd smart-flashcards

# Install dependencies
npm install

# Build for production
npm run build

# Start development mode
npm run start
```

### **Available Scripts**
- `npm run build` - Build the plugin for production
- `npm run start` - Start development mode with hot reloading
- `npm run format` - Format code using WordPress coding standards
- `npm run lint:css` - Lint SCSS/CSS files
- `npm run lint:js` - Lint JavaScript files
- `npm run packages-update` - Update npm packages
- `npm run plugin-zip` - Create a distribution zip file

## Project Structure

```
smart-flashcards/
├── src/                          # Source files
│   ├── blocks/                   # Gutenberg blocks
│   │   ├── flashcard/           # Main flashcard block
│   │   ├── flashcard-front/     # Front side block
│   │   ├── flashcard-back/      # Back side block
│   │   ├── flashcard-set/       # Container block
│   │   ├── single-post-display/ # Post display block
│   │   └── member/              # Member profile block
│   └── utils/                   # Utility functions
│       ├── animations.js        # GSAP animation helpers
│       └── constants.js         # Block configuration constants
├── inc/                         # PHP backend
│   ├── classes/                 # Main plugin classes
│   │   ├── class-smart-flashcards.php
│   │   ├── class-single-post-display-block.php
│   │   └── class-member-block.php
│   ├── helpers/                 # Helper functions
│   └── traits/                  # PHP traits
├── build/                       # Compiled assets (generated)
├── templates/                   # Template files
├── languages/                   # Translation files
└── webpack.config.js           # Webpack configuration
```

## Usage Guide

### **Creating Flashcard Sets**
1. **Add Block:** In any post or page, add a "Flashcard Set" block
2. **Configure Display:** Choose from Slide, Stack, or Grid display modes
3. **Add Flashcards:** Insert "Flashcard" blocks inside the set
4. **Create Content:** Add content to "Flashcard Front" and "Flashcard Back" blocks
5. **Customize:** Use the sidebar settings to configure colors, navigation, and styling

### **Using Single Post Display**
1. **Add Block:** Insert a "Single Post Display" block
2. **Select Post:** Choose any post from any post type
3. **Configure Display:** Toggle content elements (title, excerpt, image, meta)
4. **Customize:** Set image sizes, read more text, and alignment options

### **Adding Team Members**
1. **Add Block:** Insert a "Member" block
2. **Select User:** Choose from existing WordPress users
3. **Configure Display:** Toggle avatar, bio, contact information, and social links
4. **Customize:** Set avatar size and information visibility

### **Advanced Features**
- **Shuffle Mode:** Enable random flashcard ordering
- **Custom Borders:** Apply Vintage or Moroccan border styles
- **Navigation Styling:** Customize button colors and positioning
- **Responsive Behavior:** All blocks automatically adapt to screen sizes

## Block Reference

### **Flashcard Set Block (`smfcs/flashcard-set`)**
**Purpose:** Container for multiple flashcards with navigation
**Attributes:**
- `displayMode`: slide | stack | grid
- `enableShuffle`: boolean
- `showNavigation`: boolean
- `buttonBackgroundColor`: string
- `buttonTextColor`: string

### **Flashcard Block (`smfcs/flashcard`)**
**Purpose:** Individual flashcard with front/back sides
**Features:** Flip animation, accessibility support

### **Flashcard Front/Back Blocks (`smfcs/flashcard-front`, `smfcs/flashcard-back`)**
**Purpose:** Content areas for flashcard sides
**Features:** Border styling, rich content support, inner blocks

### **Single Post Display Block (`smfcs/single-post-display`)**
**Purpose:** Display any WordPress post
**Attributes:**
- `postId`: number
- `postType`: string
- `showTitle`, `showContent`, `showExcerpt`: boolean
- `showFeaturedImage`, `showMeta`: boolean
- `imageSize`: string
- `readMoreText`: string

### **Member Block (`smfcs/member`)**
**Purpose:** Display user profiles
**Attributes:**
- `userId`: number
- `showName`, `showAvatar`, `showBio`: boolean
- `showEmail`, `showWebsite`, `showSocialLinks`: boolean
- `avatarSize`: number

## Frequently Asked Questions

### **Q: What content can I add to flashcards?**
**A:** Flashcards support all Gutenberg blocks including text, images, videos, buttons, lists, quotes, and even other Smart Flashcards blocks for nested content.

### **Q: Are the blocks responsive?**
**A:** Yes, all blocks are fully responsive and optimized for mobile, tablet, and desktop viewing.

### **Q: Can I use custom post types?**
**A:** Absolutely! The Single Post Display block automatically supports all public post types and extends REST API support as needed.

### **Q: How do the animations work?**
**A:** The plugin uses GSAP (GreenSock Animation Platform) for smooth, hardware-accelerated animations that work across all modern browsers.

### **Q: Can I customize the styling?**
**A:** Yes, the plugin provides built-in styling options, and you can add custom CSS for further customization.

### **Q: Is the plugin accessible?**
**A:** Yes, all blocks include proper ARIA labels, keyboard navigation support, and screen reader compatibility.

### **Q: Does it work with other page builders?**
**A:** Smart Flashcards is designed specifically for the Gutenberg block editor. For compatibility with other page builders, consider using shortcode implementations (future feature).

## Performance & Compatibility

- **WordPress:** 5.8+ (Gutenberg required)
- **PHP:** 7.4+ (8.0+ recommended)
- **Browsers:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile:** iOS Safari, Chrome Mobile, Samsung Internet
- **Performance:** Optimized assets, lazy loading, minimal JavaScript footprint

## Changelog

### **1.0.0 (2025-01-20)**
- ✨ Initial release of Smart Flashcards plugin
- 🎴 Complete flashcard system with front/back content blocks
- 📱 Three display modes: Slide, Stack, and Grid
- 📄 Single Post Display block with full post type support
- 👥 Member block for team showcases
- 🎨 Multiple border styles and customization options
- ⚡ GSAP-powered animations and transitions
- 🔧 REST API extensions for enhanced functionality
- ♿ Full accessibility and keyboard navigation support
- 📱 Responsive design for all devices
- 🌐 Internationalization ready

## Credits

**Developed by:** [BuddyLMS Inc](https://buddylms.com/)  
**Animation Library:** GSAP (GreenSock)  
**Icons:** WordPress Dashicons  
**Architecture:** WordPress Block API, React, Webpack  

## License

Smart Flashcards is released under the GPL-2.0+ license.
[https://www.gnu.org/licenses/gpl-2.0.txt](https://www.gnu.org/licenses/gpl-2.0.txt)

## Support & Contributions

- **Documentation:** [Plugin Documentation](https://buddylms.com/smart-flashcards/docs/)
- **Support:** [Support Forum](https://buddylms.com/support/)
- **Bug Reports:** [GitHub Issues](https://github.com/buddylms/smart-flashcards/issues)
- **Feature Requests:** [Feature Request Form](https://buddylms.com/smart-flashcards/features/)

## Tags

flashcards, interactive content, learning, education, gutenberg blocks, animation, post display, team members, carousel, blocks, widgets, GSAP, responsive, accessibility
