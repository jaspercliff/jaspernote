import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Java',
    emoji: '☕',
    description: (
      <>
        从青铜到大神的 Java 五阶段成长路线，涵盖 Core Java、工程化、Spring 全家桶、分布式架构与 AI 赋能
      </>
    ),
    // 整体 Java 卡片点击可跳转到 Roadmap 总览页
    link: '/docs/java/roadmap',
  },
  {
    title: 'Kotlin',
    emoji: '🟣',
    description: (
      <>
        Kotlin 基础语法、函数式编程、集合操作等核心知识点
      </>
    ),
    link: '/docs/kotlin',
  },
  {
    title: 'Python',
    emoji: '🐍',
    description: (
      <>
        Python 基础语法、数据类型、函数、虚拟环境管理等学习笔记
      </>
    ),
    link: '/docs/python',
  },
  {
    title: '数据结构与算法',
    emoji: '📊',
    description: (
      <>
        常见数据结构、算法实现、设计模式等计算机科学基础知识
      </>
    ),
    link: '/docs/dataStructure',
  },
  {
    title: '前端技术',
    emoji: '⚛️',
    description: (
      <>
        React、Node.js、JavaScript 等前端技术的学习和实践
      </>
    ),
    link: '/docs/front',
  },
  {
    title: '基础设施',
    emoji: '🏗️',
    description: (
      <>
        Docker、K8s、Nginx、系统设计等 DevOps 和基础设施相关技术
      </>
    ),
    link: '/docs/infrastructure',
  },
  {
    title: '数据层',
    emoji: '💾',
    description: (
      <>
        MySQL、Redis、分库分表、连接池等数据存储和处理技术
      </>
    ),
    link: '/docs/dataLayer',
  },
  {
    title: '工具与技巧',
    emoji: '🛠️',
    description: (
      <>
        Git、Vim、Neovim、JMeter 等开发工具的使用技巧和最佳实践
      </>
    ),
    link: '/docs/utils',
  },
];

function Feature({title, emoji, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--3', styles.featureCard)}>
      <Link to={link} className={styles.featureLink}>
        <div className={styles.featureIcon}>{emoji}</div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          技术栈导航
        </Heading>
        <p className={styles.sectionSubtitle}>
          涵盖多个技术领域的学习内容，从基础到进阶
        </p>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
