import Link from "next/link"
import Head from "../components/Head"

export default function Home() {
  return (
    <>
      <Head />
      <section className="px-6 py-10 bg-dark min-h-screen flex flex-col items-center justify-center text-light font-poppins">
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
              Portal pemilihan jurusan SMAN 10 Surabaya Tahun Pelajaran
              2022/2023{" "}
            </h2>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-primary p-8 rounded-xl flex flex-col justify-between items-center max-w-lg">
            <div>
              <p className="text-xl font-semibold mb-3">
                Belum memilih mapel peminatan!
              </p>
              <p>Lihat statusmu melalui link di bawah ini!</p>
            </div>
            <button className="bg-secondary px-5 py-2 rounded-md self-end text-white font-semibold">
              <Link href="/status">Lihat Status</Link>
            </button>
          </div>
          <div className="bg-primary p-8 rounded-xl flex flex-col justify-between items-center max-w-lg">
            <div>
              <p className="text-xl font-semibold mb-3">
                Sudah memilih mapel peminatan!
              </p>
              <p>
                {" "}
                Segera lakukan pemilihan mapel melalui tombol di bawah ini!
                Setiap mapel mempunyai kuota yang terbatas.
              </p>
            </div>
            <button className="bg-secondary px-5 py-2 rounded-md self-end text-white font-semibold">
              <Link href="/submit">Pilih Mapel</Link>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
