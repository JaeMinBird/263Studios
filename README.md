# 263 STUDIOS - Modern Fashion E-Commerce
- **Author**: [Jae Birdsall](https://jaebirdsall.com)
- **Date**: March 6 - 17th 2025

## Overview
263 STUDIOS is a minimalist fashion e-commerce platform focused on delivering a premium shopping experience with a clean, sophisticated design aesthetic. The project combines modern web technologies with thoughtful UI/UX design principles to create an intuitive shopping experience that works seamlessly across all devices.

## Design Philosophy
At the core of 263 STUDIOS is a commitment to minimalist design and typography-focused aesthetics. The project embraces negative space, monochromatic color schemes, and subtle animations to create an elegant shopping environment that puts the focus on the fashion products.

### Brand Identity
![Brand Video Demo](/videos/brand.mp4)

The landing page features a full-screen brand video with a minimalist overlay, communicating the brand's identity through visual storytelling rather than excessive text explanations.

### Key Features
1. Responsive design optimized for both mobile and desktop
2. Custom cursor implementation for enhanced interactivity
3. Minimalist monochromatic interface
4. Smooth animations and transitions
5. Intuitive product categorization and navigation

## Architecture

### Frontend Stack
- React 19
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS 4
- Framer Motion for animations

### Backend Architecture (Branch Implemented)

#### Database & ORM
- **PostgreSQL Database**
  - AWS-hosted PostgreSQL instance for production
  - Prisma ORM for type-safe database access
  - Database schema with relationships for:
    - Products, Styles, and Sizes
    - Shopping Cart and Cart Items
    - Orders and Order Processing
    - Shipping Information

#### Payment Processing
- **Stripe Integration**
  - Secure checkout process
  - Payment intent creation
  - Webhook handling for order fulfillment
  - Client-side Elements for card processing

#### API Structure
- **RESTful API Routes**
  - Product listing and filtering
  - Cart management
  - Order processing
  - Checkout functionality
  - Webhook handlers

### Frontend Architecture

#### Component Structure
- **Layout Components**
  - Responsive Navbar with scroll hiding
  - SideCart for persistent cart access
  - Custom cursor with interactive hover states
  - Product category navigation
  
- **Page Components**
  - Home/Landing page with video background
  - Shop page with category sections
  - Product detail pages
  - Cart management
  - Checkout process

#### UI/UX Implementation
- **Typography System**
  - Primary font: Courier Prime for the monospaced aesthetic
  - Supporting fonts: Geist, Geist Mono, Space Mono
  - Consistent lowercase styling for navigation and buttons
  
- **Animation System**
  - Spring physics for the custom cursor
  - Hover state transitions
  - Scroll-based interactions
  - Expand/collapse animations for mobile menus

#### Responsive Design
The application implements a sophisticated responsive design approach:

- **Desktop**
  - Split-screen layouts with fixed sidebars
  - Hover-based interactions
  - Hidden navbar on scroll
  - 3-column product grid

- **Mobile**
  - Single-column layouts
  - Bottom-fixed cart summary
  - Touch-optimized controls
  - Collapsible elements for space efficiency
  - 2-column product grid

## Component Architecture

### Core Components

#### Navbar
The navbar features a minimal design with three key navigation points ("shop", "263 STUDIOS", "cart") housed in semi-transparent containers. On desktop, it intelligently hides when scrolling down and reappears when scrolling up.

#### SideCart
A persistent cart component that shows:
- Current number of items in cart
- Subtotal price
- Options to view cart or proceed to checkout
- Adapts between desktop (left sidebar) and mobile (bottom bar) layouts

#### CustomCursor
A custom cursor implementation using Framer Motion that:
- Follows mouse movement with spring physics
- Scales up when hovering over interactive elements
- Provides subtle visual feedback to enhance user experience

#### Product Displays
Product components include:
- ItemWindow: Grid-based product preview with hover effects
- ClothingHeaders: Category navigation that updates based on scroll position
- CartItem: Detailed product representation in the cart with quantity controls

## Page Structure

### Homepage
Minimalist landing page featuring:
- Full-screen brand video
- Interactive shop link overlay
- About section with dictionary-style brand definition

### Shop Page
Multi-section product browsing with:
- Side navigation for product categories (jackets, shirts, pants)
- Intersection Observer implementation for active section tracking
- Responsive grid layouts that adjust based on screen size
- Persistent cart access

### Product Detail Page
Focused product presentation with:
- Product image
- Style selector with visual swatches
- Size and quantity selectors
- Add to cart functionality
- Detailed product description

### Cart Page
Clean cart management interface:
- List of cart items with quantity controls
- Subtotal calculation
- Options to continue shopping or proceed to checkout
- Responsive layout for both mobile and desktop

### Checkout Page
Comprehensive checkout process with:
- Contact information collection
- Shipping details
- Delivery method selection
- Payment options (credit card/PayPal)
- Order summary
- Mobile-optimized expandable sections

## Data Flow

### Cart Management
1. User adds product to cart
2. Cart context updates state and persists to database
3. Cart total updates automatically
4. User can modify quantities or remove items
5. Changes sync with the AWS-hosted database

### Checkout Process
1. User enters shipping and payment information
2. Stripe payment intent is created
3. User completes payment with Stripe Elements
4. Order confirmation via webhook from Stripe
5. Order details stored in PostgreSQL database
6. Confirmation page with order summary

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Philosophy
263 STUDIOS embraces minimalism not just in design but in implementation:
- Focused component architecture
- Thoughtful state management
- Performance-optimized animations
- Semantic HTML structure
- Accessibility considerations

The project demonstrates how modern web technologies can be used to create a premium digital shopping experience that balances aesthetics with functionality.
