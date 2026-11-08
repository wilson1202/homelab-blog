import { defineClientConfig } from "vuepress/client";
import ChartJS from "/home/ub001/homelab/node_modules/.pnpm/@vuepress+plugin-markdown-chart@2.0.0-rc.137_@vuepress+bundler-vite@2.0.0-rc.31_@types+_8185143d488558b38bfb9644b0d7c162/node_modules/@vuepress/plugin-markdown-chart/dist/client/components/ChartJS.js";
import ECharts from "/home/ub001/homelab/node_modules/.pnpm/@vuepress+plugin-markdown-chart@2.0.0-rc.137_@vuepress+bundler-vite@2.0.0-rc.31_@types+_8185143d488558b38bfb9644b0d7c162/node_modules/@vuepress/plugin-markdown-chart/dist/client/components/ECharts.js";
import FlowChart from "/home/ub001/homelab/node_modules/.pnpm/@vuepress+plugin-markdown-chart@2.0.0-rc.137_@vuepress+bundler-vite@2.0.0-rc.31_@types+_8185143d488558b38bfb9644b0d7c162/node_modules/@vuepress/plugin-markdown-chart/dist/client/components/FlowChart.js";
import MarkMap from "/home/ub001/homelab/node_modules/.pnpm/@vuepress+plugin-markdown-chart@2.0.0-rc.137_@vuepress+bundler-vite@2.0.0-rc.31_@types+_8185143d488558b38bfb9644b0d7c162/node_modules/@vuepress/plugin-markdown-chart/dist/client/components/MarkMap.js";
import Mermaid from "/home/ub001/homelab/node_modules/.pnpm/@vuepress+plugin-markdown-chart@2.0.0-rc.137_@vuepress+bundler-vite@2.0.0-rc.31_@types+_8185143d488558b38bfb9644b0d7c162/node_modules/@vuepress/plugin-markdown-chart/dist/client/components/Mermaid.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ChartJS", ChartJS)
    app.component("ECharts", ECharts);
    app.component("FlowChart", FlowChart);
    app.component("MarkMap", MarkMap);
    app.component("Mermaid", Mermaid);
  },
});
