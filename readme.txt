=== Smart Flashcards ===
Contributors: BuddyLMS Inc
Plugin Name: Smart Flashcards
Plugin URI: https://buddylms.com/smart-flashcards/
Description: Create interactive flashcards, display posts dynamically, and showcase team members with engaging animations directly within the WordPress block editor. Perfect for educational websites, online courses, interactive content, and professional presentations.
Version: 1.0.0
Requires at least: 5.8
Tested up to: 6.8
Requires PHP: 7.4
License: GPL-2.0+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt
Text Domain: smart-flashcards
Domain Path: /languages
Tags: flashcards, interactive content, learning, education, gutenberg blocks, animation, post display, team members, carousel, blocks, widgets, GSAP, responsive, accessibility

== Description ==

Smart Flashcards is a comprehensive WordPress plugin that empowers you to create interactive learning experiences and dynamic content displays using the modern Gutenberg block editor. Perfect for educational websites, online courses, team showcases, content curation, and interactive presentations.

**🎴 Interactive Flashcard System:**

*   **Flashcard Set Block:** Create organized sets of flashcards with intuitive navigation
*   **Individual Flashcard Blocks:** Each flashcard has dedicated front and back sides
*   **Multiple Display Modes:**
    *   **Slide Mode:** Carousel-style navigation with smooth transitions
    *   **Stack Mode:** Stacked cards with peek effect for depth
    *   **Grid Mode:** Display all flashcards simultaneously
*   **GSAP-Powered Animations:** Smooth flip animations and transitions
*   **Border Styles:** Choose from Default, Vintage, and Moroccan border designs
*   **Navigation Controls:** Customizable Previous/Next buttons with color options
*   **Shuffle Feature:** Randomize flashcard order for varied learning experiences

**📄 Single Post Display Block:**

*   **Universal Post Support:** Display any post from any post type (posts, pages, custom post types)
*   **Flexible Content Options:** Show/hide title, content, excerpt, featured image, meta information
*   **Author & Date Display:** Configurable author information and publication dates
*   **Featured Image Sizes:** Multiple image size options (thumbnail, medium, large, full)
*   **Read More Links:** Customizable read more buttons with alignment options
*   **REST API Integration:** Real-time post data fetching and display

**👥 Member Block:**

*   **Team Showcase:** Display user profiles and team member information
*   **Avatar Display:** Configurable avatar sizes and visibility
*   **Contact Information:** Show/hide email addresses and website links
*   **Biography Display:** User bio and description support
*   **Social Media Links:** Facebook, Twitter, LinkedIn, Instagram integration
*   **User Role Support:** Works with all WordPress user roles and custom user fields

**🎨 Design & Customization:**

*   **Responsive Design:** Optimized for all screen sizes and devices
*   **Color Customization:** Custom button colors and styling options
*   **Border Styles:** Elegant preset border designs for flashcards
*   **Typography Support:** Full WordPress typography controls
*   **Spacing Controls:** Configurable padding and margin options
*   **Accessibility Ready:** ARIA labels, keyboard navigation, and screen reader support

**⚡ Technical Excellence:**

*   **Modern React Architecture:** Built with latest WordPress block development standards
*   **Gutenberg Native:** Seamless integration with the block editor
*   **REST API Enhanced:** Extended REST API support for all post types
*   **Server-Side Rendering:** Optimized performance and SEO-friendly output
*   **Webpack Build Process:** Optimized asset compilation and delivery
*   **Internationalization Ready:** Translation-ready with .pot files
*   **WordPress Coding Standards:** Follows all WordPress development best practices

== Installation ==

**Automatic Installation:**

1.  Navigate to your WordPress admin dashboard
2.  Go to Plugins > Add New
3.  Search for "Smart Flashcards"
4.  Click "Install Now" and then "Activate"

**Manual Installation:**

1.  Download the plugin zip file
2.  Upload the `smart-flashcards` folder to `/wp-content/plugins/`
3.  Activate the plugin through the 'Plugins' menu in WordPress

== Usage ==

**Creating Flashcard Sets:**

1.  **Add Block:** In any post or page, add a "Flashcard Set" block
2.  **Configure Display:** Choose from Slide, Stack, or Grid display modes
3.  **Add Flashcards:** Insert "Flashcard" blocks inside the set
4.  **Create Content:** Add content to "Flashcard Front" and "Flashcard Back" blocks
5.  **Customize:** Use the sidebar settings to configure colors, navigation, and styling

**Using Single Post Display:**

1.  **Add Block:** Insert a "Single Post Display" block
2.  **Select Post:** Choose any post from any post type
3.  **Configure Display:** Toggle content elements (title, excerpt, image, meta)
4.  **Customize:** Set image sizes, read more text, and alignment options

**Adding Team Members:**

1.  **Add Block:** Insert a "Member" block
2.  **Select User:** Choose from existing WordPress users
3.  **Configure Display:** Toggle avatar, bio, contact information, and social links
4.  **Customize:** Set avatar size and information visibility

**Advanced Features:**

*   **Shuffle Mode:** Enable random flashcard ordering
*   **Custom Borders:** Apply Vintage or Moroccan border styles
*   **Navigation Styling:** Customize button colors and positioning
*   **Responsive Behavior:** All blocks automatically adapt to screen sizes

== Block Reference ==

**Flashcard Set Block (smfcs/flashcard-set):**
Container for multiple flashcards with navigation controls, display modes (slide/stack/grid), shuffle options, and customizable button styling.

**Flashcard Block (smfcs/flashcard):**
Individual flashcard with front/back sides, flip animations, and accessibility support.

**Flashcard Front/Back Blocks (smfcs/flashcard-front, smfcs/flashcard-back):**
Content areas for flashcard sides with border styling, rich content support, and inner blocks capability.

**Single Post Display Block (smfcs/single-post-display):**
Display any WordPress post with configurable content elements, image sizes, meta information, and read more options.

**Member Block (smfcs/member):**
Display user profiles with avatar, bio, contact information, and social media links.

== Frequently Asked Questions ==

= What content can I add to flashcards? =

Flashcards support all Gutenberg blocks including text, images, videos, buttons, lists, quotes, and even other Smart Flashcards blocks for nested content.

= Are the blocks responsive? =

Yes, all blocks are fully responsive and optimized for mobile, tablet, and desktop viewing.

= Can I use custom post types? =

Absolutely! The Single Post Display block automatically supports all public post types and extends REST API support as needed.

= How do the animations work? =

The plugin uses GSAP (GreenSock Animation Platform) for smooth, hardware-accelerated animations that work across all modern browsers.

= Can I customize the styling? =

Yes, the plugin provides built-in styling options, and you can add custom CSS for further customization.

= Is the plugin accessible? =

Yes, all blocks include proper ARIA labels, keyboard navigation support, and screen reader compatibility.

= Does it work with other page builders? =

Smart Flashcards is designed specifically for the Gutenberg block editor. For compatibility with other page builders, consider using shortcode implementations (future feature).

= What are the system requirements? =

WordPress 5.8+, PHP 7.4+, and a modern browser. The plugin works on all devices and screen sizes.

= Can I translate the plugin? =

Yes, the plugin is internationalization ready with .pot files included for easy translation.

= Is there support available? =

Yes, visit our support forum at https://buddylms.com/support/ for assistance.

== Screenshots ==

1. Flashcard Set Block in Gutenberg Editor with Slide Mode
2. Flashcard Block with Front and Back Content Areas
3. Single Post Display Block Configuration Options
4. Member Block with User Profile Display
5. Multiple Display Modes: Slide, Stack, and Grid
6. Border Style Options: Default, Vintage, and Moroccan
7. Mobile Responsive Flashcard Display
8. Accessibility Features and Keyboard Navigation

== Performance & Compatibility ==

*   **WordPress:** 5.8+ (Gutenberg required)
*   **PHP:** 7.4+ (8.0+ recommended)
*   **Browsers:** Chrome, Firefox, Safari, Edge (latest 2 versions)
*   **Mobile:** iOS Safari, Chrome Mobile, Samsung Internet
*   **Performance:** Optimized assets, lazy loading, minimal JavaScript footprint

== Changelog ==

= 1.0.0 (2025-01-20) =
*   ✨ Initial release of Smart Flashcards plugin
*   🎴 Complete flashcard system with front/back content blocks
*   📱 Three display modes: Slide, Stack, and Grid
*   📄 Single Post Display block with full post type support
*   👥 Member block for team showcases
*   🎨 Multiple border styles and customization options
*   ⚡ GSAP-powered animations and transitions
*   🔧 REST API extensions for enhanced functionality
*   ♿ Full accessibility and keyboard navigation support
*   📱 Responsive design for all devices
*   🌐 Internationalization ready

== Development ==

**Built with:**
*   WordPress Block API
*   React and Modern JavaScript
*   GSAP Animation Library
*   Webpack Build Process
*   SCSS Styling
*   REST API Extensions

**Developer Features:**
*   Modern development workflow
*   Hot reloading in development mode
*   WordPress coding standards compliance
*   Comprehensive documentation
*   Extensible architecture

== Credits ==

Developed by BuddyLMS Inc - https://buddylms.com/
Animation Library: GSAP (GreenSock)
Icons: WordPress Dashicons
Architecture: WordPress Block API, React, Webpack

== License ==

Smart Flashcards is released under the GPL-2.0+ license.
https://www.gnu.org/licenses/gpl-2.0.txt

== Support & Links ==

*   **Documentation:** https://buddylms.com/smart-flashcards/docs/
*   **Support Forum:** https://buddylms.com/support/
*   **Feature Requests:** https://buddylms.com/smart-flashcards/features/
*   **Developer Site:** https://buddylms.com/

== Upgrade Notice ==

= 1.0.0 =
Initial release of Smart Flashcards with complete flashcard system, post display, and member blocks. Full Gutenberg integration with GSAP animations.
