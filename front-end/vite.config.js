import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



const ip="http://127.0.0.1"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {

    host: true,
    strictPort: true,
    port: 3000,
    //get rid of CORS error
    proxy:{
      "/api/users":{
        target:`${ip}:3001`,
        changeOrigin:true,
        secure:true
      },
      "/api/posts":{
        target:`${ip}:3002`,
        changeOrigin:true,
        secure:true
      },
      "/api/like":{
        target:`${ip}:3003`,
        changeOrigin:true,
        secure:true
      },
      "/api/follow":{
        target:`${ip}:3004`,
        changeOrigin:true,
        secure:true
      }
    }
  }
})
