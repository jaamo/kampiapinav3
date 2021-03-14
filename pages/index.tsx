import Head from "next/head";
import Link from "next/link";
import "tailwindcss/tailwind.css";

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
      console.log(video);
      videos.push({
        id: video.id.videoId,
        title: video.snippet.title,
        item: video,
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

interface YouTubeVideo {
  id: string;
  title: string;
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
      <div className="grid w-full place-content-center bg-black p-10">
        <div className="video-container h-screen w-screen">
          <iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${props.latestVideo.id}`}
            frameBorder="0"
          ></iframe>
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
