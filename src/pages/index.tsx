import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import useGlobalData from '@docusaurus/useGlobalData';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            📚 技术学习笔记
          </Heading>
          <p className={styles.heroSubtitle}>
            记录编程路上的点点滴滴
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/java">
              开始学习 📖
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/blog"
              style={{ marginLeft: '1rem' }}>
              查看博客 ✍️
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function LatestBlogPosts() {
  try {
    const globalData = useGlobalData();
    const blogData = globalData['docusaurus-plugin-content-blog']?.['default'];
    const blogList = blogData?.blogListPaginated;
    const blogPosts = blogList?.posts || [];
    const recentPosts = blogPosts.slice(0, 6);

    if (recentPosts.length === 0) {
      return (
        <section className={styles.latestPosts}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              最新文章
            </Heading>
            <div className={styles.emptyState}>
              <p>暂无博客文章，快去写一篇吧！</p>
              <Link to="/blog" className="button button--primary">
                查看博客 →
              </Link>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className={styles.latestPosts}>
        <div className="container">
          <Heading as="h2" className={styles.sectionTitle}>
            最新文章
          </Heading>
          <div className={styles.postsGrid}>
            {recentPosts.map((post: any) => (
              <article key={post.id} className={styles.postCard}>
                <Link to={post.permalink} className={styles.postLink}>
                  <div className={styles.postHeader}>
                    {post.frontMatter?.image && (
                      <img
                        src={post.frontMatter.image}
                        alt={post.title}
                        className={styles.postImage}
                      />
                    )}
                    <div className={styles.postMeta}>
                      <time className={styles.postDate}>
                        {new Date(post.date).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      {post.readingTime && (
                        <span className={styles.readingTime}>
                          {Math.ceil(post.readingTime)} 分钟阅读
                        </span>
                      )}
                    </div>
                  </div>
                  <Heading as="h3" className={styles.postTitle}>
                    {post.title}
                  </Heading>
                  {post.description && (
                    <p className={styles.postDescription}>
                      {post.description}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className={styles.postTags}>
                      {post.tags.slice(0, 3).map((tag: any) => (
                        <span key={tag.label} className={styles.tag}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link to="/blog" className="button button--outline button--secondary">
              查看所有文章 →
            </Link>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    return (
      <section className={styles.latestPosts}>
        <div className="container">
          <Heading as="h2" className={styles.sectionTitle}>
            最新文章
          </Heading>
          <div className={styles.emptyState}>
            <Link to="/blog" className="button button--primary">
              查看博客 →
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - 技术学习笔记`}
      description="技术学习笔记，记录编程路上的点点滴滴，涵盖 Java、Kotlin、Python、前端、数据结构、设计模式等多个技术领域">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <LatestBlogPosts />
      </main>
    </Layout>
  );
}
