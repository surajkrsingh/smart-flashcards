# Smart Flashcards

**Contributors:** SurajWP 

**Plugin Name:** Smart Flashcards

**Plugin URI:** https://surajwp.com/smart-flashcards/

**Description:** Create interactive flashcards and card stacks with engaging animations directly within the WordPress block editor. Enhance your website with dynamic learning tools, quizzes, and visually appealing content using flashcard sets and animated card stacks.
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

Smart Flashcards is a WordPress plugin that empowers you to create interactive and visually appealing flashcards using the Gutenberg block editor. Engage your audience with dynamic content perfect for educational websites, online courses, interactive quizzes, or simply to present information in a fun and memorable way.

**Key Features:**

*   **Flashcard Set Block:**
    *   Create sets of flashcards with intuitive navigation.
    *   Carousel style display for easy browsing through flashcards.
    *   Ideal for vocabulary learning, question-answer pairs, and step-by-step guides.
*   **Flashcard Block:**
    *   Individual flashcard block to create front and back content.
    *   Engaging flip animation on click or tap.
    *   Supports rich content including text, images, videos, and more within flashcards.
*   **Gutenberg Block Editor Integration:**
    *   Seamlessly integrated into the WordPress block editor.
    *   User-friendly interface for creating and customizing flashcards.
    *   Live preview within the editor.
*   **Customizable Design:**
    *   Control over colors, spacing, and styling options to match your website's design.
    *   Responsive design ensures optimal viewing on all devices.

## Installation

1.  **Upload:** Upload the `smart-flashcards` folder to the `/wp-content/plugins/` directory.
2.  **Activate:** Activate the "Smart Flashcards" plugin through the 'Plugins' menu in WordPress.

## Development Setup

To set up the development environment for this plugin:

1. **Clone the repository:**
   ```
   git clone [repository-url] smart-flashcards
   cd smart-flashcards
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Build the plugin:**
   ```
   npm run build
   ```

4. **Start development mode:**
   ```
   npm run start
   ```

### Available Scripts

- `npm run build` - Build the plugin for production
- `npm run start` - Start development mode with hot reloading
- `npm run format` - Format code using WordPress coding standards
- `npm run lint:css` - Lint CSS files
- `npm run lint:js` - Lint JavaScript files
- `npm run packages-update` - Update npm packages
- `npm run plugin-zip` - Create a zip file of the plugin

## Project Structure

- `/src` - Source files for JavaScript and SCSS
  - `/blocks` - Block editor components
    - `/flashcard` - Main flashcard block
    - `/flashcard-front` - Front side of flashcard
    - `/flashcard-back` - Back side of flashcard
    - `/flashcard-set` - Container for multiple flashcards
  - `/utils` - Utility functions
- `/inc` - PHP classes and functions
  - `/classes` - Main plugin classes
  - `/helpers` - Helper functions
  - `/traits` - PHP traits
- `/build` - Compiled assets (generated by webpack)
- `/templates` - Template files
- `/languages` - Translation files

## Usage

Once activated, you can find the "Smart Flashcards" blocks within the Gutenberg block editor.

1.  **Adding Blocks:**
    *   In a post or page, click the "+" icon to add a new block.
    *   Search for "Smart Flashcards" or browse the "Widgets" category.
    *   Choose "Flashcard Set" block to start.

2.  **Flashcard Set Block:**
    *   Add "Flashcard" blocks inside the "Flashcard Set" block to create individual cards in the set.
    *   Use navigation buttons (Previous/Next) to browse through the flashcards on the front-end.

3.  **Flashcard Block:**
    *   Insert "Flashcard Front" and "Flashcard Back" blocks inside the "Flashcard" block.
    *   Add your content (text, images, etc.) to the "Flashcard Front" and "Flashcard Back" blocks.
    *   Click or tap on the flashcard on the front-end to see the flip animation and reveal the back content.

## Frequently Asked Questions

**Q: Can I add images and videos to flashcards?**  
**A:** Yes, you can add any content supported by Gutenberg blocks, including images, videos, headings, paragraphs, lists, buttons, and more, to both the front and back of your flashcards.

**Q: Are the flashcards responsive?**  
**A:** Yes, flashcards are designed to be fully responsive and will adapt to different screen sizes.

**Q: Can I customize the appearance of the flashcards?**  
**A:** Yes, basic styling for flashcards is provided, and you can further customize using custom CSS if needed.

**Q: Does this plugin work with Classic Editor or Elementor?**  
**A:** Currently, Smart Flashcards is designed to work exclusively with the Gutenberg Block Editor. Support for Classic Editor and Elementor may be added in future updates.

## Screenshots

**1. Flashcard Set Block in Gutenberg Editor:**
[![Flashcard Set Block in Gutenberg Editor](https://go.screenpal.com/watch/cTnuFzn12WM)](https://go.screenpal.com/watch/cTnuFzn12WM)

**2. Flashcard Block in Gutenberg Editor:**
[![Flashcard Block in Gutenberg Editor](https://go.screenpal.com/watch/cTnuFAn12WW)](https://go.screenpal.com/watch/cTnuFAn12WW)

## Changelog

*   **1.0.0 (2023-02-28)**
    *   Initial release of Smart Flashcards plugin.
    *   Includes Flashcard Set block with navigation.
    *   Includes Flashcard block with flip animation.
    *   Includes Flashcard Front and Back blocks for content.

## Credits

Developed by [SurajWP](https://surajwp.com/)

## License

Smart Flashcards is released under the GPL-2.0+ license.

[https://www.gnu.org/licenses/gpl-2.0.txt](https://www.gnu.org/licenses/gpl-2.0.txt)

## Tags

flashcards, interactive content, learning, education, gutenberg blocks, animation, carousel, blocks, widgets
