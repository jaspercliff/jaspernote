# plantuml

```
npm install markdown-it-textual-uml
```

```
export default defineConfig({
    // ...
    markdown: {
        config: (md) => {
            // 使用更多的 Markdown-it 插件！
            md.use(markdownItTextualUml);
        }
    }
})
```