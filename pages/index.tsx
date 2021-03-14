import Head from "next/head";
import Link from "next/link";

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
        <title>Kampiapina.com</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <h1 className="title">Kampiapina videos</h1>
        {videos.map((video) => (
          <p key={video.id.videoId}>
            <a
              target="_blank"
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            >
              {video.snippet.title}
            </a>
          </p>
        ))}
      </main>
    </div>
  );
}
