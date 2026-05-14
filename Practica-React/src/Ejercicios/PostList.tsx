import { useFetch } from "../hooks/useFetch";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostList = () => {
  const { data: posts, loading, error } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );

  return (
    <div className="exercise-container">
      <h2>14. Hook Personalizado (useFetch)</h2>

      {loading && <p>⏳ Cargando posts...</p>}
      {error && <p className="error-text">{error}</p>}

      <div style={{ textAlign: 'left' }}>
        {posts?.map((post) => (
          <article key={post.id} style={{ 
            marginBottom: '15px', 
            padding: '10px', 
            background: 'rgba(255,255,255,0.05)', 
            borderRadius: '8px' 
          }}>
            <h3 style={{ color: '#646cff', fontSize: '1.1rem', margin: '0 0 5px 0' }}>
              {post.title}
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostList;
