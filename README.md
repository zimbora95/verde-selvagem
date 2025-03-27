# Verde Selvagem - Plant Maintenance & Garden Cleaning Website

A modern, responsive website for Verde Selvagem, a company specializing in indoor plant maintenance and garden cleaning.

## Features

- Modern, plant-themed UI with green color palette
- Responsive design (mobile, tablet, desktop)
- Dark and light mode toggle
- Interactive gallery with filtering
- Testimonials slider
- Plant care tips with modal popups
- Interactive plant assistant character
- Animated statistics and scroll effects
- Contact form

## Project Structure

```
/
├── index.html                 # Main HTML file
├── image-resources.html       # Resource page with image downloads
├── download-images.ps1        # PowerShell script to download images (Windows)
├── download-images.sh         # Bash script to download images (Linux/macOS)
├── src/
│   ├── css/
│   │   ├── styles.css         # Main stylesheet
│   │   └── darkmode.css       # Dark mode specific styles
│   ├── js/
│   │   └── main.js            # JavaScript functionality
│   └── img/                   # Image assets (SVGs, webp, etc.)
└── README.md                  # This file
```

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd verde-selvagem
```

2. Download the necessary images:
   - **Option 1**: Open `image-resources.html` in your browser and download each image manually
   - **Option 2**: For Windows users, run the PowerShell script: `.\download-images.ps1`
   - **Option 3**: For Linux/macOS users, run the Bash script: `./download-images.sh`

3. Open the project in your code editor.

4. Open the `index.html` file in your browser to view the website.

For development, you can use a local server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VS Code.

## Image Resources

All images used in this project are from [Pexels](https://www.pexels.com/) and are free for commercial use. Attribution is appreciated but not required.

The website requires various images that are referenced in the code:
- Hero image
- About image
- Gallery images (6 total)
- Testimonial avatars (3 total)
- Plant care tip images (3 total)
- Plant assistant image (alternatively, we use the SVG version)

To download these images automatically, use one of the provided scripts:
- Windows users: Run `.\download-images.ps1`
- Linux/macOS users: Run `./download-images.sh` (make sure it's executable with `chmod +x download-images.sh`)

## Design Decisions

- **Color Palette**: Green shades (primary: #2e7d32, secondary: #81c784) to reinforce the plant-focused brand identity
- **Typography**: Poppins for body text (clean, modern) and Playfair Display for headings (elegant, distinctive)
- **Interactive Elements**: Subtle animations and transitions for a dynamic but not overwhelming user experience
- **Dark Mode**: Enhanced user experience with a thoughtful dark color scheme that preserves brand identity
- **Plant Assistant**: Virtual character that provides a unique, memorable way for users to navigate the site
- **Responsive Design**: Mobile-first approach ensuring excellent experience across all devices

## Development Notes

- Built with vanilla HTML, CSS, and JavaScript (no frameworks)
- SVG icons used for better scaling and smaller file sizes
- CSS variables for consistent theming and easier maintenance
- JavaScript organized by feature for better maintainability

---

© 2025 Verde Selvagem. All rights reserved. 