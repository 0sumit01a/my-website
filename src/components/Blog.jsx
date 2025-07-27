import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Blog.module.css";

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [mainBlog, setMainBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://edunexsys.com/backend/api/get-blogs.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer samDixa@2511@eduX",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setBlogs(data.data);
          setMainBlog(data.data[0]);
        }
      })
      .catch((err) => console.error("Error fetching blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.navGap}></div>

      {/* Hero Section */}
      {mainBlog && (
        <section className={`${styles.section} ${styles.section1}`}>
          <div className={styles.heroContainer}>
            <h1>{mainBlog?.blog_title}</h1>
            <p className={styles.date}>
              Online Education |{" "}
              {new Date(mainBlog.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <Link
              to={`/blog/${mainBlog.blog_id}-${slugify(mainBlog.blog_title)}`}
            >
              <button className={styles.readMore}>Read More</button>
            </Link>
          </div>
        </section>
      )}

      {/* Blog List + Tags */}
      <section className={`${styles.section} ${styles.section3}`}>
        <div className={styles.cardWrapper}>
          {/* Left - Blog Cards */}
          <div className={styles.left}>
            {loading ? (
              <p>Loading content...</p>
            ) : (
              blogs
                .filter((blog) => blog.blog_id !== mainBlog?.blog_id)
                .map((blog) => (
                  <div key={blog.blog_id} className={styles.blogCard}>
                    <h2>{blog.blog_title}</h2>
                    <p className={styles.date}>
                      {new Date(blog.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className={styles.snippet}>
                      {blog.blog_description
                        ?.replace(/<[^>]+>/g, "")
                        .slice(0, 200)}
                      ...
                    </p>
                    <Link
                      to={`/blog/${blog.blog_id}-${slugify(blog.blog_title)}`}
                    >
                      <button className={styles.readMore}>Read More</button>
                    </Link>
                  </div>
                ))
            )}
          </div>

          {/* Right - Tags List */}
          <aside className={styles.right}>
            <div className={styles.tagsBox}>
              <h3>Tags</h3>
              <ul className={styles.tagsList}>
                {blogs.map((blog) => (
                  <li key={blog.blog_id}>
                    <Link
                      to={`/blog/${blog.blog_id}-${slugify(blog.blog_title)}`}
                    >
                      {blog.blog_title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
