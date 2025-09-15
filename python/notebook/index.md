# jupyter notebook

Jupyter Notebook 是一个**交互式计算环境**，主要用于数据分析、机器学习、科学计算和教学。它的特点是既能运行代码，又能展示文本、图表、公式，非常适合做实验、
写教程或记录研究过程。

---

## 📌 核心特点

1. **交互式执行代码**

    * 支持逐行/分块运行代码，不需要整个程序一次性运行。
    * 默认内核是 **Python**，但也支持 **R、Julia、Java、Kotlin** 等多种语言。

2. **丰富的展示形式**

    * 不仅能展示运行结果，还能插入 **Markdown** 文本、图片、公式（LaTeX）、表格。
    * 很适合写“可执行的文档”。

3. **数据可视化支持**

    * 与 `matplotlib`、`seaborn`、`plotly` 等库结合，可以直接生成交互式图表。

4. **扩展生态**

    * 可以安装插件（如 JupyterLab、nbextensions）。
    * 可以通过 `voila` 转换为交互式 Web 应用。

---

## 🚀 常见使用场景

* 数据分析与探索 (Exploratory Data Analysis)
* 机器学习模型训练与调试
* 学术研究（实验记录）
* 教学与课程讲义
* 快速原型开发

---

## ⚙️ 安装方式

使用uv安装 

```shell
uv tool install notebook
```


## compare

## 1️⃣ Jupyter Notebook
```bash
jupyter notebook
```
## 2️⃣ JupyterLab
```bash
jupyter lab
```
---

## 3️⃣ 对比总结

| 特性    | Jupyter Notebook | JupyterLab |
|-------|------------------|------------|
| 界面    | 简单、单页面           | IDE 风格、多窗口 |
| 多文件操作 | 不方便              | 方便         |
| 插件支持  | 基本 nbextensions  | 丰富扩展生态     |
| 使用难度  | 低                | 中等         |
| 适合    | 小型分析、教学          | 复杂项目、大数据分析 |
