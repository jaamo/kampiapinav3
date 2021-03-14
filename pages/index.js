import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Kampiapina.com</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <h1 className="title">Kampiapina V3</h1>
      </main>
    </div>
  );
}
