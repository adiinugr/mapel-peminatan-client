import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import Head from "../../components/Head"

function Status() {
  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const onSubmit = (data) => {
    router.push(`/status/${data.nis}`)
  }

  return (
    <>
      <Head />
      <section className="px-6 py-10 bg-dark h-screen flex flex-col items-center justify-center text-light font-poppins">
        <div className="max-w-xl text-center mb-10">
          <p className="text-3xl font-semibold mb-4">
            Lihat status pemilihan mapel peminatan!
          </p>
          <p>
            Kamu dapat meihat paket mapel yang sudah kamu pilih dengan
            memasukkan NIS pada inputan di bawah ini
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-primary p-8 rounded-xl flex flex-col max-w-lg">
            <div className="text-center">
              <p className="text-xl font-semibold mb-5">
                Silakan masukkan NIS kamu!{" "}
              </p>
              {errors.nis?.type === "required" && (
                <p className="text-red-500 mb-2">NIS harus diisi!</p>
              )}
              <input
                {...register("nis", { required: true })}
                className="w-full py-2 px-3 rounded-md text-dark focus:outline-primary"
                type="number"
              />
            </div>
            <button
              type="submit"
              className="bg-secondary px-5 py-2 rounded-md text-white font-semibold mt-8 ml-auto"
            >
              Cek Status
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Status
