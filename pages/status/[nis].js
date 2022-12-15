import Link from "next/link"
import Head from "../../components/Head"
import { fetchAPI } from "../../lib/api"

function StatusDinamic({ studentSubject }) {
  const {
    name,
    nis,
    classroom,
    email,
    subject_option: {
      data: { attributes: subject }
    }
  } = studentSubject.attributes

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
                    <td className="w-1/3 text-left py-2">: {name}</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 text-left py-2">NIS</td>
                    <td className="w-1/3 text-left py-2">: {nis}</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 text-left py-2">Kelas</td>
                    <td className="w-1/3 text-left py-2">: {classroom}</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 text-left py-2">Email</td>
                    <td className="w-1/3 text-left py-2">: {email}</td>
                  </tr>
                  <tr>
                    <td className="text-left py-2 flex w-full">
                      Mapel yang dipilih
                    </td>
                    <td className="w-1/3 text-left py-2">
                      {`: ${subject.name} (${subject.subject1}, ${subject.subject2}, ${subject.subject3},
                      ${subject.subject4})`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Link className="self-end" href="/">
            <button className="bg-secondary px-6 py-2 rounded-md text-white font-semibold">
              Home
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}

export async function getStaticPaths() {
  const studentSubjectsRes = await fetchAPI("/student-subjects", {
    fields: ["nis"]
  })

  return {
    paths: studentSubjectsRes.data.map((studentSubjects) => ({
      params: {
        nis: studentSubjects.attributes.nis.toString()
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const matchingStudentSubjects = await fetchAPI("/student-subjects", {
    filters: { nis: params.nis },
    populate: "*"
  })

  return {
    props: {
      studentSubject: matchingStudentSubjects.data[0]
    },
    revalidate: 1
  }
}

export default StatusDinamic
