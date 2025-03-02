// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Card from "./components/Card.vue";
import CardList from "./components/CardList.vue";
import { h } from 'vue'
import Giscus from "./components/Giscus.vue";

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Giscus)
    })
  },
  enhanceApp({ app, router, siteData }) {
      app.component('Card', Card);
    app.component('CardList', CardList);
  }
}
