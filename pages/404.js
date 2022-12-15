import Link from "next/link"

import Head from "../components/Head"

function NotFound() {
  return (
    <>
      <Head />
      <section className="px-6 py-10 bg-dark h-screen flex flex-col items-center justify-center text-light font-poppins">
        <div className="max-w-xl text-center mb-10">
          <p className="text-3xl font-semibold mb-4">
            OOPS! Data tidak ditemukan!
          </p>
          <p>
            Jika kamu belum melakukan pemilihan mapel peminatan, silakan klik
            link di bawah ini!
          </p>
          <button className="bg-secondary px-5 py-2 rounded-md self-end text-white font-semibold mt-6">
            <Link href="/submit">Pilih Mapel</Link>
          </button>
        </div>
      </section>
    </>
  )
}

export default NotFound
