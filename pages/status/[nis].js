import Link from "next/link"
import Head from "../../components/Head"

function StatusDinamic() {
  return (
    <>
      <Head />
      <section className="px-6 py-10 bg-dark h-screen flex flex-col items-center justify-center text-light font-poppins">
        <div className="max-w-xl text-center mb-10">
          <p className="text-3xl font-semibold mb-4">
            Status pemilihan mapel peminatan!
          </p>
          <p>
            Berikut ini adalah identitasmu dan paket mapel apa yang sudah kamu
            pilih. Pilihan mapel bersifat mutlak dan tidak bisa diubah.
          </p>
        </div>
        <div className="bg-primary p-8 rounded-xl flex flex-col justify-between items-center max-w-[600px]">
          <div className="w-full mb-6">
            <div className="overflow-hidden rounded">
              <table className="min-w-full">
                <tbody className="text-light">
                  <tr>
                    <td className="w-1/3 text-left py-2">Nama Lengkap</td>
                    <td className="w-1/3 text-left py-2">: Adi Nugroho</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 text-left py-2">NIS</td>
                    <td className="w-1/3 text-left py-2">: 20192</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 text-left py-2">Kelas</td>
                    <td className="w-1/3 text-left py-2">: X-A</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 text-left py-2">Email</td>
                    <td className="w-1/3 text-left py-2">
                      : adi@sma10sby.sch.id
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left py-2 flex w-full">
                      Mapel yang dipilih
                    </td>
                    <td className="w-1/3 text-left py-2">
                      : Paket Mapel 1 (Matematika, Informatika, Sejarah,
                      Ekonomi)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button className="bg-secondary px-6 py-2 rounded-md text-white font-semibold self-end">
            <Link href="/">Home</Link>
          </button>
        </div>
      </section>
    </>
  )
}

export default StatusDinamic
