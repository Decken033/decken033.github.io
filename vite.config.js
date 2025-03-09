// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   base: '/react-portfolio-template/',
//   plugins: [react()],
//   css: {
//     preprocessorOptions: {
//       scss: {
//         silenceDeprecations: ['mixed-decls'],
//       },
//     },
//   },
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // 修改为根路径
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['mixed-decls'],
      },
    },
  },
});


