import Head from "next/head";
import YouTubeThumbnail from "../components/YouTubeThumbnail";

const YOUTUBE_CHANNEL_VIDEOS: string =
  "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_API_KEY: string = process.env.YOUTUBE_API_KEY;

export async function getServerSideProps() {
  // Load content from YouTube
  const res: Response = await fetch(
    `${YOUTUBE_CHANNEL_VIDEOS}?&part=snippet,id&order=date&maxResults=20&channelId=UC2Prp3t7Ol-a041FXTyCzNQ&key=${YOUTUBE_API_KEY}`
  );
  const rawVideos: any = await res.json();
  const videos: YouTubeVideo[] = [];
  rawVideos.items.map((video: any) => {
    if (video.id.kind == "youtube#video") {
      videos.push({
        id: video.id.videoId,
        title: video.snippet.title,
        item: video,
        image: video.snippet.thumbnails.high.url,
        published: video.snippet.publishedAt,
      });
    }
  });

  // Load blog posts
  const wpRespose: Response = await fetch(
    `http://www.kampiapina.com/blogi/wp-json/wp/v2/posts?per_page=100`
  );
  const rawPosts: any = await wpRespose.json();
  const posts: BlogPost[] = [];
  rawPosts.map((rawPost: any) => {
    posts.push({
      id: rawPost.id,
      title: rawPost.title.rendered,
      link: rawPost.link,
    });
  });

  return {
    props: {
      videos: videos,
      latestVideo: videos.length > 0 ? videos[0] : undefined,
      posts,
    },
  };
}

export interface YouTubeVideo {
  id: string;
  title: string;
  image: string;
  published: string;
  item: any;
}

interface BlogPost {
  id: string;
  title: string;
  link: string;
}

interface HomeProps {
  videos: YouTubeVideo[];
  latestVideo: YouTubeVideo;
  posts: BlogPost[];
}

export default function Home(props: HomeProps) {
  console.log(props.videos);
  return (
    <div className="container w-full max-w-none">
      <Head>
        <title>Kampiapina</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <style jsx>{`
        .video-container {
          position: relative;
          padding-bottom: 56.25%;
          padding-top: 30px;
          height: 0;
          overflow: hidden;
        }
        .video-container iframe,
        .video-container object,
        .video-container embed {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>

      <div className="grid h-screen w-screen place-content-center bg-apinared">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full absolute object-cover"
        >
          <source src="/hero2.mp4" />
        </video>
        <img src="/logo.png" className="relative w-96" />
        <h1>YouTuben kovin pyöräilykanava</h1>
      </div>
      <div className="w-full bg-white p-10">
        <h1 className="color-black font-serif center font-bold text-center text-6xl mt-10">
          Uusimmat videot
        </h1>
        <div className="grid relative w-full bg p-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {props.videos.slice(0, 8).map((video: YouTubeVideo, i: number) => (
            <YouTubeThumbnail
              video={video}
              visibleOnDesktop={i >= 4}
            ></YouTubeThumbnail>
          ))}
        </div>
      </div>
      <div className="grid w-full bg-black p-10">
        <h2 className="text-white">Posts</h2>
        {props.posts.map((post: BlogPost) => (
          <a
            className="text-white"
            href={post.link}
            target="_blank"
            rel=""
            key={post.id}
          >
            {post.title}
          </a>
        ))}
      </div>
    </div>
  );
}
