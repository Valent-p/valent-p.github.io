"use client";

import { useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import blogData from "@/data/blog.json";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: number;
  image: string | null;
  url: string;
  featured: boolean;
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set((blogData as BlogPost[]).map((post) => post.category)));

  const filteredPosts = selectedCategory
    ? (blogData as BlogPost[]).filter((post) => post.category === selectedCategory)
    : (blogData as BlogPost[]);

  const featuredPosts = (blogData as BlogPost[]).filter((post) => post.featured).slice(0, 2);
  const otherPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <section id="blog" className="py-24 container mx-auto px-8">
      <h2 className="section-title mb-12">
        Latest <span>Articles</span>
      </h2>

      {/* Category Filter */}
      <div className="flex gap-3 flex-wrap mb-12">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            selectedCategory === null
              ? "bg-primary text-slate-900"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === category
                ? "bg-primary text-slate-900"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Posts */}
      {selectedCategory === null && featuredPosts.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-slate-300">Featured</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="glass overflow-hidden flex flex-col group hover:-translate-y-1 transition-all"
              >
                {post.image && (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex gap-2 flex-wrap mb-3">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-slate-400 mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex gap-4 text-sm text-slate-500 mb-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime} min read
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/5">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
                    >
                      Read Article
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* All Articles */}
      <div>
        {selectedCategory !== null && <h3 className="text-2xl font-bold mb-8 text-slate-300">{selectedCategory} Articles</h3>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post) => (
            <article key={post.id} className="glass p-6 flex flex-col group hover:border-primary/50 transition-all">
              {post.image && (
                <div className="relative h-32 w-full -m-6 mb-4 overflow-hidden bg-slate-800">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}

              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 font-bold uppercase tracking-wider w-fit mb-3">
                {post.category}
              </span>

              <h4 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h4>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

              <div className="flex gap-3 text-xs text-slate-500 mb-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime} min
                </div>
              </div>

              <div className="mt-auto pt-3 border-t border-white/5">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold text-sm hover:underline"
                >
                  Read →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
