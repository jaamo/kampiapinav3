import { since } from "../helpers/since";
import { YouTubeVideo } from "../pages/index";

interface YouTubeThumbnailProps {
  video: YouTubeVideo;
  visibleOnDesktop: boolean;
}

export default function YouTubeThumbnail(props: YouTubeThumbnailProps) {
  const { video, visibleOnDesktop } = props;
  return (
    <a
      key={video.id}
      className={`rounded-sm shadow-md overflow-hidden ${
        visibleOnDesktop ? "hidden sm:block" : ""
      }`}
      target="_blank"
      rel="noopener noreferrer"
      href={`https://www.youtube.com/watch?v=${video.id}`}
    >
      <div
        className="w-full bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${video.image})`, paddingTop: "56.25%" }}
      ></div>
      <div className="p-4 font-serif">
        <div className="text-gray-900 font-bold leading-none mb-2">
          {video.title}
        </div>
        <div className="text-gray-600 text-xs">
          {since(new Date(video.published))} ago
        </div>
      </div>
    </a>
  );
}
