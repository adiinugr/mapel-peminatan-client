import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import {DocumentArrowDownIcon} from "@heroicons/react/24/outline"

import { fetchAPI } from "../lib/api"

import Head from "../components/Head"
import Label from "../components/Label"


const columns = [
  {
    name: "Kelas",
    selector: (row) => row.classroom,
    sortable: true
  },
  {
    name: "NIS",
    selector: (row) => row.nis,
    sortable: true
  },
  {
    name: "Nama",
    selector: (row) => row.name,
    sortable: true
  },
  {
    name: "Email",
    selector: (row) => row.email
  },
  {
    name: "Alasan",
    selector: (row) => row.reason
  },
  {
    name: "Paket Mapel",
    selector: (row) => row.chosenPackage
  },
  {
    name: "Mapel 1",
    selector: (row) => row.subject1
  },
  {
    name: "Mapel 2",
    selector: (row) => row.subject2
  },
  {
    name: "Mapel 3",
    selector: (row) => row.subject3
  },
  {
    name: "Mapel 4",
    selector: (row) => row.subject4
  }
]

const customData = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988"
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984"
  }
]

function convertArrayOfObjectsToCSV(array) {
  let result

  const columnDelimiter = ","
  const lineDelimiter = "\n"
  const keys = Object.keys(array[0])

  result = ""
  result += keys.join(columnDelimiter)
  result += lineDelimiter

  array.forEach((item) => {
    let ctr = 0
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter

      result += item[key]

      ctr++
    })
    result += lineDelimiter
  })

  return result
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array) {
  const link = document.createElement("a")
  let csv = convertArrayOfObjectsToCSV(array)
  if (csv == null) return

  const filename = "export.csv"

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`
  }

  link.setAttribute("href", encodeURI(csv))
  link.setAttribute("download", filename)
  link.click()
}

const Export = ({ onExport }) => (

  <button className="bg-secondary flex justify-center items-center px-6 py-3 rounded-md text-white text-sm mb-4 block ml-auto" onClick={(e) => onExport(e.target.value)}>

    <DocumentArrowDownIcon className="h-5 w-5 mr-2"/>
    Export CSV</button>
)

function ResultComponent({ studentSubject }) {
  const [data, setData] = useState([])

  const mappedStudentSubjectData = studentSubject.map((student) => {
    return {
      classroom: student.attributes.classroom,
      nis: student.attributes.nis,
      name: student.attributes.name,
      email: student.attributes.email,
      reason: student.attributes.reason,
      chosenPackage: student.attributes.subject_option.data.attributes.name,
      subject1: student.attributes.subject_option.data.attributes.subject1,
      subject2: student.attributes.subject_option.data.attributes.subject2,
      subject3: student.attributes.subject_option.data.attributes.subject3,
      subject4: student.attributes.subject_option.data.attributes.subject4
    }
  })

  useEffect(() => {
    setData(mappedStudentSubjectData)
  }, [])

  return (
    <>
      <Head />
      <section className="relative px-6 py-10 bg-dark h-screen flex flex-col items-center justify-center text-light font-poppins">
        <Label/>
        <div className="max-w-xl text-center mb-10">
          <p className="text-3xl font-semibold mb-4">
           Data Pemilihan Mapel Peminatan
          </p>
          <p>
            Data bisa bisa di-export dalam format CSV.
          </p>
        </div>
        <div className="p-8 md:px-28 w-screen">
          {data.length == 0 ? (
            <p>No Data</p>
          ) : (
            <>
              <Export onExport={() => downloadCSV(data)} />
              <div className="rounded-lg overflow-hidden">
                <DataTable columns={columns} data={data} pagination dense />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const matchingStudentSubjects = await fetchAPI("/student-subjects", {
    populate: "*"
  })

  return {
    props: {
      studentSubject: matchingStudentSubjects.data
    },
    revalidate: 1
  }
}

export default ResultComponent
