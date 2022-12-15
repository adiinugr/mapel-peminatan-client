import { useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from "react-toastify"

import { fetchAPI } from "../lib/api"

import Head from "../components/Head"
import Modal from "../components/Modal"

import "react-toastify/dist/ReactToastify.css"
import Link from "next/link"

function Submit({ subjectOptions }) {
  const [openModal, setOpenModal] = useState(false)
  const [userData, setUserData] = useState({})

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const onSubmit = (data) => {
    setOpenModal(true)
    setUserData(data)
  }

  const handleSubmitData = async () => {
    setOpenModal(false)
    setIsLoading(true)

    const { nis, name, email, classroom, subjectOption } = userData

    try {
      const matchingSubjectOption = await fetchAPI("/subject-options", {
        filters: { code: subjectOption }
      })

      const matchingStudentSubject = await fetchAPI("/student-subjects", {
        filters: { nis }
      })

      if (matchingStudentSubject.data.length > 0) {
        toast.error("NIS yang kamu masukkan sudah terdaftar!")
        setIsLoading(false)

        return
      }

      const postDataRes = await fetchAPI("/student-subjects", null, {
        method: "POST",
        body: JSON.stringify({
          data: {
            nis,
            name,
            email,
            classroom,
            subject_option: matchingSubjectOption.data[0].id
          }
        })
      })

      setIsLoading(false)

      toast.success("Berhasil submit data")

      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      setIsLoading(false)
      toast.error("Gagal submit data. Silakan coba lagi!")
    }
  }

  return (
    <>
      <Head />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitData={handleSubmitData}
        isLoading={isLoading}
      />
      <section className="bg-dark min-h-screen px-6 py-10 md:p-28 text-light font-poppins">
        <Link className="grid place-content-end" href="/">
          <button className="bg-secondary px-5 py-2 rounded-md text-white font-semibold mb-6">
            Home
          </button>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-16">
            <h2 className="text-xl font-semibold mb-2">Bagian 1</h2>
            <p className="mb-10">Pilih salah satu paket di bawah ini!</p>
            {errors.subjectOption?.type === "required" && (
              <p className="text-red-500 mb-2">Paket mapel harus dipilih!</p>
            )}
            <ul className="grid gap-6 w-full sm:grid-cols-2 xl:grid-cols-3">
              {subjectOptions.map((option) => (
                <li key={option.id}>
                  <input
                    {...register("subjectOption", { required: true })}
                    type="radio"
                    id={option.attributes.code}
                    value={option.attributes.code}
                    className="hidden peer"
                    disabled={
                      option.attributes.quota ==
                      option.attributes.student_subjects.data.length
                    }
                  />
                  <label
                    htmlFor={option.attributes.code}
                    className={`inline-flex justify-between items-center p-8 w-full text-light ${
                      option.attributes.quota ==
                      option.attributes.student_subjects.data.length
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-primary hover:bg-primary/60"
                    } rounded-lg cursor-pointer peer-checked:border-2 peer-checked:border-white peer-checked:text-blue-600 peer-checked:bg-primary/60`}
                  >
                    <div className="block text-light w-full">
                      <p className="w-full text-lg font-semibold mb-6">
                        {option.attributes.name}
                      </p>
                      <p className="w-full">{option.attributes.subject1}</p>
                      <p className="w-full">{option.attributes.subject2}</p>
                      <p className="w-full">{option.attributes.subject3}</p>
                      <p className="w-full">{option.attributes.subject4}</p>

                      <div className="flex mt-6 justify-between w-full font-semibold">
                        <div className="flex mr-10">
                          <p className="mr-5">Kuota</p>
                          <p>{`: ${option.attributes.quota}`}</p>
                        </div>
                        <div className="flex">
                          <p className="mr-5">Terisi</p>
                          <p
                            className={
                              option.attributes.quota ==
                              option.attributes.student_subjects.data.length
                                ? "text-red-400"
                                : ""
                            }
                          >
                            {option.attributes.quota ==
                            option.attributes.student_subjects.data.length
                              ? `: ${option.attributes.student_subjects.data.length} (full)`
                              : `: ${option.attributes.student_subjects.data.length}`}
                          </p>
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

export async function getStaticProps() {
  const subjectOptionsRes = await fetchAPI("/subject-options", {
    populate: "*",
    sort: ["code"]
  })

  return {
    props: {
      subjectOptions: subjectOptionsRes.data
    },
    revalidate: 1
  }
}

export default Submit
