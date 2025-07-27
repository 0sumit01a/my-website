import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../styles/BlogDetails.module.css";

export default function BlogDetails() {
  const { idAndSlug } = useParams();
  const blogId = idAndSlug?.split("-")[0];
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    fetch("https://edunexsys.com/backend/api/get-blogs.php", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer samDixa@2511@eduX",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setAllBlogs(data.data);
          const found = data.data.find((b) => b.blog_id === blogId);
          setBlog(found);
        }
      });
  }, [blogId]);

  if (!blog) return <p>Loading blog...</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.navGap}></div>

      <div className={styles.blogDetailContainer}>
        {/* Main Blog Section */}
        <div className={styles.blogLeft}>
          <h1>{blog.blog_title}</h1>
          <p className={styles.date}>
            Published on{" "}
            {new Date(blog.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <div 
            className={styles.blogContent}
            dangerouslySetInnerHTML={{ __html: blog.blog_description }}
          />
        </div>

        {/* Sidebar with Blog Links */}
        <div className={styles.blogRight}>
          <h3 className={styles.sidebarTitle}>📚 More Blogs</h3>
          <ul className={styles.sidebarList}>
            {allBlogs
              .filter((b) => b.blog_id !== blog.blog_id)
              .map((b) => (
                <li key={b.blog_id}>
                  <Link
                    className={styles.sidebarLink}
                    to={`/blog/${b.blog_id}-${b.slug}`}
                  >
                    {b.blog_title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
