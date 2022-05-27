import BlogPosts from '@/pages/BlogPosts';
import Head from 'next/head'

import styles from '@/styles/index.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>BlogPosts</title>
        <meta name="description" content="BlogPosts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title} role={'heading'}>
          Welcome to BlogPost!
        </h1>
        <BlogPosts />
      </main>
      <footer className={styles.footer} role={'footer'}>
        Developed by Kartik Gevariya
      </footer>
    </div>
  )
}

export default Home;
