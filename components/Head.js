import Head from "next/head"

function CustomHead() {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>SMADASA - Pemilihan Mapel Peminatan TP 2022/2023</title>
      <meta
        name="title"
        content="SMADASA - Pemilihan Mapel Peminatan TP 2022/2023"
      />
      <meta
        name="description"
        content="Portal pemilihan mata pelajaran peminatan siswa SMAN 10 Surabaya Tahun Pelajaran 2022/2023"
      />
      <meta property="og:image" content="meta-image.png"></meta>
      <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
    </Head>
  )
}

export default CustomHead
