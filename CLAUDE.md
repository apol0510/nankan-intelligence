# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NANKAN Intelligence is a Japanese horse racing prediction platform focused on 南関競馬 (Nankan horse racing - local Tokyo metropolitan area tracks including Oi, Funabashi, Urawa, and Kawasaki). The platform uses AI and machine learning for race analysis and predictions.

## Architecture

### Frontend Structure
- **Single Page Application (SPA)**: Vanilla HTML/CSS/JavaScript implementation
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Modular JavaScript**: Object-oriented design with classes for different functionality areas
- **Real-time Updates**: Intersection Observer API for animations and lazy loading

### Core Components
- **Navigation System**: Smooth scrolling single-page navigation
- **Race Prediction Engine**: Display and interaction for race predictions with confidence levels
- **Statistics Dashboard**: Animated performance metrics and venue-specific analysis
- **Profile System**: Analyst information and methodology display
- **Premium/Freemium Model**: Conversion tracking and A/B testing capabilities

### Key JavaScript Classes
- `RaceData`: Manages race information and predictions
- `ProfileManager`: Handles analyst profile data and display
- `ConversionTracker`: Tracks user engagement and premium conversion events
- `ABTestManager`: Implements A/B testing for premium features

## Development Commands

This is a static website with no build process:

```bash
# Serve locally (any HTTP server)
python -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000

# View in browser
open http://localhost:8000
```

## Code Architecture Notes

### Data Management
- Race data is stored in `race-data.json` with structured information about horses, jockeys, predictions
- Real-time data updates handled through JavaScript classes rather than external APIs
- Statistics and performance data embedded within the JSON structure

### Styling Approach
- CSS custom properties for theming
- Gradient backgrounds and modern visual design
- Japanese font stack prioritization
- Animation-heavy interface with smooth transitions

### JavaScript Patterns
- Event-driven architecture with DOM manipulation
- Intersection Observer for performance-optimized animations
- Modular function organization by feature area
- Local storage simulation for user interaction tracking

### Premium Features
- Freemium model with teaser content for non-premium users
- A/B testing infrastructure for conversion optimization
- Modal-based premium content previews
- Conversion funnel tracking

## File Structure

- `index.html` - Main HTML structure with embedded sections
- `styles.css` - Complete CSS styling with responsive design
- `script.js` - All JavaScript functionality including classes and utilities
- `race-data.json` - Structured data for races, predictions, and statistics
- `data/` - Image assets (screenshots and racing-related images)

## Content Management

### Adding New Predictions
1. Update `race-data.json` with new race information
2. Ensure prediction confidence levels (65-88 range typical)
3. Include detailed reasoning and trainer comments
4. Update archive section with historical data

### Updating Statistics
- Monthly performance data in `race-data.json`
- Venue-specific win rates and specialties
- Jockey and trainer analysis data
- Real-time ROI and hit rate calculations

## Technical Considerations

### Performance
- Intersection Observer used for scroll-triggered animations
- Image optimization needed for data folder assets
- JavaScript runs efficiently with minimal DOM queries

### Localization
- Entirely in Japanese language
- Horse racing terminology specific to Japanese racing
- Currency in Japanese yen

### Analytics Integration
- Built-in conversion tracking system
- A/B testing framework ready for expansion
- User engagement metrics collection

## Security & Compliance

- Static site with no server-side processing
- No user authentication or payment processing
- Age verification notices for gambling content
- Disclaimer text regarding prediction accuracy

## Browser Compatibility

- Modern browser features used (Intersection Observer, CSS Grid)
- Mobile-responsive design
- Japanese font rendering considerations