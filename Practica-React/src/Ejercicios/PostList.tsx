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
    <div>
      <h2>Hook Personalizado</h2>

      {loading && <p>⏳ Cargando posts...</p>}
      {error && <p>{error}</p>}

      <div>
        {posts?.map((post) => (
          <article key={post.id}>
            <h3>
              {post.title}
            </h3>
            <p>{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostList;
