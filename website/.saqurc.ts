import { defineConfig } from 'saqu';
import autoCreateRoutes from '@saqu/auto-create-routes';
import autoCreateEnter from "@saqu/auto-create-enter"

export default defineConfig({
  entry: '!src/.cache/main.jsx',
  plugins: [
    new autoCreateRoutes(),
    new autoCreateEnter({
      rootRoutes: "@/routes"
    })
  ],
  module: {
    rules: [
      {
        test: /\.md$/,
        use: ['@saqu/loader-md-react-preview'],
        type: 'typescript',
      },
    ],
  },
});
