// Animation configuration to match agglayer.dev style
export const animationConfig = {
  // Default transition matching agglayer.dev nav (400ms, ease)
  default: {
    type: "tween",
    duration: 0.4,
    ease: "easeInOut"
  },
  
  // Fast transitions for hover states
  fast: {
    type: "tween", 
    duration: 0.2,
    ease: "easeOut"
  },
  
  // Smooth transitions for page elements
  smooth: {
    type: "tween",
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1] // Custom cubic-bezier for smooth feel
  },
  
  // Spring animation for interactive elements
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30
  }
}

// Common animation variants
export const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: animationConfig.default
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: animationConfig.fast
  }
}

export const fadeIn = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: animationConfig.default
  },
  exit: { 
    opacity: 0,
    transition: animationConfig.fast
  }
}

export const scaleIn = {
  initial: { 
    opacity: 0, 
    scale: 0.95 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: animationConfig.smooth
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: animationConfig.fast
  }
}

export const slideInLeft = {
  initial: { 
    opacity: 0, 
    x: -20 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: animationConfig.default
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: animationConfig.fast
  }
}

export const slideInRight = {
  initial: { 
    opacity: 0, 
    x: 20 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: animationConfig.default
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: animationConfig.fast
  }
}

// Stagger children animations
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: animationConfig.default
  }
}

// Hover animations
export const hoverScale = {
  whileHover: { 
    scale: 1.05,
    transition: animationConfig.fast
  },
  whileTap: { 
    scale: 0.95,
    transition: animationConfig.fast
  }
}

export const hoverGlow = {
  whileHover: {
    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
    transition: animationConfig.fast
  }
}

// Page transitions
export const pageTransition = {
  initial: { 
    opacity: 0,
    y: 30
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      ...animationConfig.smooth,
      when: "beforeChildren"
    }
  },
  exit: { 
    opacity: 0,
    y: -30,
    transition: animationConfig.default
  }
}

// Loading animation
export const loadingPulse = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}