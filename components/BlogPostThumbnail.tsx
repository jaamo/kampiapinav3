import { since } from "../helpers/since";
import { BlogPost, YouTubeVideo } from "../pages/index";

interface BlogPostThumbnailProps {
  post: BlogPost;
}

export default function BlogPostThumbnail(props: BlogPostThumbnailProps) {
  const { post } = props;
  const date: Date = new Date(post.date);
  return (
    <a
      key={post.id}
      className=""
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="">
        <div className="text-gray-400">
          {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
        </div>
        <div className="text-gray-200 leading-none">{post.title}</div>
      </div>
    </a>
  );
}
