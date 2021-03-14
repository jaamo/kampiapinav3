import Head from "next/head";
import Link from "next/link";
import "tailwindcss/tailwind.css";

const YOUTUBE_CHANNEL_VIDEOS: string =
  "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_API_KEY: string = process.env.YOUTUBE_API_KEY;

export async function getServerSideProps() {
  const res = await fetch(
    `${YOUTUBE_CHANNEL_VIDEOS}?&part=snippet,id&order=date&maxResults=20&channelId=UC2Prp3t7Ol-a041FXTyCzNQ&key=${YOUTUBE_API_KEY}`
  );
  const videos = await res.json();
  return {
    props: {
      videos: videos.items,
    },
  };
}

export default function Home({ videos }) {
  return (
    <div className="container">
      <Head>
        <title>Kampiapina</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
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
        </div>
        {/* {videos.map((video) => (
          <p key={video.id.videoId}>
            <a
              target="_blank"
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            >
              {video.snippet.title}
            </a>
          </p>
        ))} */}
      </main>
    </div>
  );
}
