import { FiDownload } from 'react-icons/fi'

const DownloadButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
    >
      <FiDownload className="mr-2" />
      Download PDF
    </button>
  )
}

export default DownloadButton