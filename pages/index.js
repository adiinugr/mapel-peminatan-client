import Link from "next/link"

import {fetchAPI} from '../lib/api'

import Head from "../components/Head"
import Label from "../components/Label"
import Countdown from "../components/Countdown"

 function Home({deadline}) {
  return (
    <>
      <Head />

      <section className="relative overflow-hidden px-6 pb-10 pt-24 xl:py-10 bg-dark min-h-screen flex flex-col items-center justify-center text-light font-poppins">
        <Label />
        <Countdown deadlineDate={deadline} />


        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <img
            className="h-28 w-28"
            src="/logo-sma10.png"
            alt="Logo SMAN 10 Surabaya"
          />
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-semibold text-center mb-4">
              Selamat datang!
            </h1>
            <h2 className="text-lg text-center">
              Portal pemilihan mapel peminatan SMAN 10 Surabaya Tahun Pelajaran
              2022/2023{" "}
            </h2>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-primary p-8 rounded-xl flex flex-col justify-between items-center max-w-lg">
            <div>
              <p className="text-xl font-semibold mb-3">
                Sudah memilih mapel peminatan!
              </p>
              <p>Lihat statusmu melalui link di bawah ini!</p>
            </div>
            <Link className="self-end" href="/status">
              <button className="bg-secondary px-5 py-2 rounded-md text-white font-medium">
                Lihat Status
              </button>
            </Link>
          </div>
          <div className="bg-primary p-8 rounded-xl flex flex-col justify-between items-center max-w-lg">
            <div>
              <p className="text-xl font-semibold mb-3">
                Belum memilih mapel peminatan!
              </p>
              <p>
                {" "}
                Segera lakukan pemilihan mapel melalui tombol di bawah ini!
                Setiap mapel mempunyai kuota yang terbatas.
              </p>
            </div>

            <Link className="self-end" href="/submit">
              <button className="bg-secondary px-5 py-2 rounded-md text-white font-medium">
                Pilih Mapel
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const countdown = await fetchAPI("/countdown")

  return {
    props: {
      deadline: countdown.data.attributes.deadline
    },
    revalidate: 1
  }
}

export default Home