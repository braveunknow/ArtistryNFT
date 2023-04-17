import {
  useGlobalState,
  setGlobalState,
  setLoadingMsg,
  setAlert,
} from '../store'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { create } from 'ipfs-http-client'
import { mintNFT } from '../Blockchain.Services'

const auth =
  'Basic ' +
  Buffer.from(
    // '2Nzed3xrYA9lmIPDdjP8h2EenGJ' + ':' + "48a2ed60bb6cfd966517cdc2fc52cef5",
    '2OYxcm8UQ7DWu4amecW2QuJ61qf' + ':' + '808adbac1d84ae94c3e04c6fc8f77235',
  ).toString('base64')

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})

const CreateNFT = () => {
  const [modal] = useGlobalState('modal')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [imgBase64, setImgBase64] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !price || !description) return

    setGlobalState('modal', 'scale-0')
    setGlobalState('loading', { show: true, msg: 'Uploading IPFS data...' })

    try {
      const created = await client.add(fileUrl)
      const metadataURI = `https://bn-artistrynft.infura-ipfs.io/ipfs/${created.path}`
      const nft = { title, price, description, metadataURI }

      setLoadingMsg('Intializing transaction...')
      setFileUrl(metadataURI)
      await mintNFT(nft)

      resetForm()
      setAlert('Minting completed...', 'green')
      window.location.reload()
    } catch (error) {
      console.log('Error uploading file: ', error)
      setAlert('Minting failed...', 'red')
    }
  }

  const changeImage = async (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])

    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result
      setImgBase64(file)
      setFileUrl(e.target.files[0])
    }
  }

  const closeModal = () => {
    setGlobalState('modal', 'scale-0')
    resetForm()
  }

  const resetForm = () => {
    setFileUrl('')
    setImgBase64(null)
    setTitle('')
    setPrice('')
    setDescription('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 z-[150] ${modal}`}
    >
      <div className="bg-[#f9f9f9] shadow-sm rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-xl text-black-400">Add NFT</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-black-400" />
            </button>
          </div>

          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                alt="NFT"
                className="h-full w-full object-cover cursor-pointer"
                src={
                  imgBase64 ||
                  "https://dailyhodl.com/wp-content/uploads/2021/12/ross-sells-nft.jpg?w=1024"
                }
              />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center bg-[#E4E6E7] rounded-xl mt-5">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg, image/webp"
                className="block w-full text-sm text-black-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#E4E6E7] file:text-black-400
                  cursor-pointer focus:ring-0 focus:outline-none "
                onChange={changeImage}
                required
              />
            </label>
          </div>

          <div className="flex flex-row justify-between items-center bg-[#E4E6E7] rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-black-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-[#E4E6E7] rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-black-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="price"
              placeholder="Price (Eth)"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-[#E4E6E7] rounded-xl mt-5">
            <textarea
              className="block w-full text-sm resize-none
                text-black-500 bg-transparent border-0
                focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-card flex flex-row justify-center items-center
              w-full text-white text-md  py-2 px-5 rounded-full
              drop-shadow-sm border border-transparent
            
              focus:outline-none focus:ring mt-5"
          >
            Mint Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateNFT
