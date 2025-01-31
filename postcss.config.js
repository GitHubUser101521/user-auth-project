// postcss.config.js or postcss.config.mjs
import tailwindcss from 'tailwindcss'; // Import for core Tailwind functionality (may not be strictly needed)
import autoprefixer from 'autoprefixer';
import postcss from '@tailwindcss/postcss'; // The crucial import

export default {
  plugins: [
    tailwindcss, // You might be able to remove this if your framework handles it
    autoprefixer,
    postcss, // This is the most important line!
  ],
};
