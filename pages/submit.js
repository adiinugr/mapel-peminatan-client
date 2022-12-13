import { useState } from "react"
import { useForm } from "react-hook-form"
import Head from "../components/Head"
import Modal from "../components/Modal"

const optionSubjectData = [
  {
    id: 1,
    code: "paket-mapel-1",
    name: "Paket Mapel 1",
    subject1: "Matematika Tk Lanjut",
    subject2: "Biologi",
    subject3: "Kimia",
    subject4: "Fisika",
    quota: 60
  },
  {
    id: 2,
    code: "paket-mapel-2",
    name: "Paket Mapel 2",
    subject1: "Matematika Tk Lanjut",
    subject2: "Kimia",
    subject3: "Bahasa Inggris Tk Lanjut",
    subject4: "Ekonomi",
    quota: 80
  },
  {
    id: 3,
    code: "paket-mapel-3",
    name: "Paket Mapel 3",
    subject1: "Biologi",
    subject2: "Fisika",
    subject3: "Ekonomi",
    subject4: "Sosiologi",
    quota: 70
  },
  {
    id: 4,
    code: "paket-mapel-4",
    name: "Paket Mapel 4",
    subject1: "Fisika",
    subject2: "Bahasa Inggris Tk Lanjut",
    subject3: "Bahasa Indonesia Tk Lanjut",
    subject4: "Ekonomi",
    quota: 36
  },
  {
    id: 5,
    code: "paket-mapel-5",
    name: "Paket Mapel 5",
    subject1: "Biologi",
    subject2: "Fisika",
    subject3: "Bahasa Indonesia Tk Lanjut",
    subject4: "Geografi",
    quota: 36
  }
]

function Submit() {
  const [openModal, setOpenModal] = useState(false)
  const [userData, setUserData] = useState({})

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const onSubmit = (data) => {
    setOpenModal(true)
    setUserData(data)
  }

  const handleSubmitData = () => {
    setOpenModal(false)
    console.log(userData)
  }

  return (
    <>
      <Head />
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitData={handleSubmitData}
      />
      <section className="bg-dark min-h-screen px-6 py-10 md:p-28 text-light font-poppins">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-16">
            <h2 className="text-xl font-semibold mb-2">Bagian 1</h2>
            <p className="mb-10">Pilih salah satu paket di bawah ini!</p>
            {errors.subjectOption?.type === "required" && (
              <p className="text-red-500 mb-2">Paket mapel harus dipilih!</p>
            )}
            <ul className="grid gap-6 w-full md:grid-cols-3">
              {optionSubjectData.map((option) => (
                <li key={option.id}>
                  <input
                    {...register("subjectOption", { required: true })}
                    type="radio"
                    id={option.code}
                    value={option.code}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={option.code}
                    className="inline-flex justify-between items-center p-8 w-full text-light bg-primary rounded-lg cursor-pointer peer-checked:border-2 peer-checked:border-white peer-checked:text-blue-600 peer-checked:bg-primary/60 hover:bg-primary/60"
                  >
                    <div className="block text-light w-full">
                      <p className="w-full text-lg font-semibold mb-6">
                        {option.name}
                      </p>
                      <p className="w-full">{option.subject1}</p>
                      <p className="w-full">{option.subject2}</p>
                      <p className="w-full">{option.subject3}</p>
                      <p className="w-full">{option.subject4}</p>

                      <div className="flex mt-6 justify-between w-full font-semibold">
                        <div className="flex mr-10">
                          <p className="mr-6">Kuota</p>
                          <p>{option.quota}</p>
                        </div>
                        <div className="flex">
                          <p className="mr-6">Terisi</p>
                          <p>24</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Bagian 2</h2>
            <p className="mb-10">Isi identitasmu secara lengkap!</p>

            <div className="max-w-[600px]">
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-light"
              >
                Nama Lengkap
              </label>
              {errors.name?.type === "required" && (
                <p className="text-red-500 mb-2">Nama harus diisi!</p>
              )}
              <input
                {...register("name", { required: true })}
                type="text"
                id="name"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-dark rounded-lg focus:outline-primary focus:border-primary block w-full p-2.5"
                placeholder="John Doe"
              />
              <p
                id="helper-text-explanation"
                className="mt-2 text-gray-500 dark:text-gray-400"
              >
                Isi nama sesuai dengan yang ada di lembar absensi
              </p>

              <label
                htmlFor="nis"
                className="block mb-2 font-medium text-light mt-6"
              >
                NIS
              </label>
              {errors.nis?.type === "required" && (
                <p className="text-red-500 mb-2">NIS harus diisi!</p>
              )}
              <input
                {...register("nis", { required: true })}
                type="number"
                id="nis"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-dark rounded-lg focus:outline-primary focus:border-primary block w-full p-2.5"
                placeholder="123422"
              />

              <label
                htmlFor="classroom"
                className="block mb-2 font-medium text-light mt-6"
              >
                Kelas
              </label>
              {errors.classroom?.type === "required" && (
                <p className="text-red-500 mb-2">Kelas harus diisi!</p>
              )}
              <select
                {...register("classroom", { required: true })}
                id="classroom"
                className="bg-gray-50 border border-gray-300 text-dark rounded-lg focus:outline-primary focus:border-primary block w-full p-2.5 "
              >
                <option>X-A</option>
                <option>X-B</option>
                <option>X-C</option>
                <option>X-D</option>
                <option>X-E</option>
                <option>X-F</option>
                <option>X-G</option>
                <option>X-H</option>
                <option>X-I</option>
                <option>X-J</option>
                <option>X-K</option>
              </select>

              <label
                htmlFor="email"
                className="block mb-2 font-medium text-light mt-6"
              >
                Email
              </label>
              {errors.email?.type === "required" && (
                <p className="text-red-500 mb-2">Email harus diisi!</p>
              )}
              <input
                {...register("email", { required: true })}
                type="email"
                id="email"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-dark rounded-lg focus:outline-primary focus:border-primary block w-full p-2.5"
                placeholder="joe@sma10sby.sch.id"
              />
              <p
                id="helper-text-explanation"
                className="mt-2 text-gray-500 dark:text-gray-400"
              >
                Masukkan email sekolah (@sma10sby.sch.id)
              </p>

              <label
                htmlFor="reason"
                className="block mb-2 font-medium text-light mt-6"
              >
                Alasan memilih paket tersebut
              </label>
              <textarea
                id="reason"
                rows="5"
                className="block p-2.5 w-full text-dark bg-gray-50 rounded-lg border border-gray-300 focus:outline-primary focus:border-primary"
                placeholder="Jelaskan alasanmu..."
              ></textarea>
              <input
                type="submit"
                className="bg-secondary px-6 py-3 rounded-md text-white font-semibold mt-16 cursor-pointer hover:bg-secondary/95"
                value="Submit Data"
              />
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default Submit
