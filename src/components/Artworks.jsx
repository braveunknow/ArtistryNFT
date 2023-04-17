import { useEffect, useState } from 'react'
import { setGlobalState, useGlobalState } from '../store'

const Artworks = () => {
  const [nfts] = useGlobalState('nfts')
  const [end, setEnd] = useState(4)
  const [count] = useState(4)
  const [collection, setCollection] = useState([])

  const getCollection = () => {
    return nfts.slice(0, end)
  }

  useEffect(() => {
    setCollection(getCollection())
  }, [nfts, end])


  const getImg = async (url)=>{
    const res= await fetch(url);
    console.log(res);
    return "https://ipfs.io/ipfs/QmfWscPCQwM2QEWPwxg8HAN44B13xa8Xp6YvDdTGRvisPG";
  }

  return (
    <div className="py-10 gradient-bg-artworks">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-black text-5xl pb-8 font-bold text-gradient">
          {collection.length > 0 ? 'NFT Collections' : 'No Artworks Yet'}
        </h4>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap- md:gap-4 lg:gap-6 py-2.5">
          {collection.map((nft, i) => (
            <Card key={i} nft={nft} />
          ))}
        </div>

        {collection.length > 0 && nfts.length > collection.length ? (
          <div className="text-center my-5">
            <button
              className="drop-shadow-2xl rounded-2xl shadow-inner text-white
              btn-card mt-4
               cursor-pointer p-4"
              onClick={() => setEnd(end + count)}
            >
              Load More
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const Card = ({ nft }) => {
  const setNFT = () => {
    setGlobalState('nft', nft)
    setGlobalState('showModal', 'scale-100')
  }

  return (
    <div className="w-full zoom shadow-sm bg-[#def4ff] shadow-black rounded-md overflow-hidden mx-2 p-3">
      <div className='overflow-hidden'>

      <img
        src={
          nft.metadataURI
        }
        alt={nft.title}
        className="zoom-img  h-60 w-full object-cover  border-black rounded-lg mb-3"
      />
      </div>
      <h4 className="text-black font-semibold">{nft.title}</h4>
      <p className="text-black-400 text-xs my-1">{nft.description}</p>
      <div className="flex justify-between items-center mt-3 text-black">
        <div className="flex flex-col">
          <small className="text-xs">Current Price</small>
          <p className="text-sm font-semibold">{nft.cost} ETH</p>
        </div>

        <button
          className=" drop-shadow-2xl rounded-2xl shadow-inner text-white
          btn-card 
           cursor-pointer p-3 font-semibold text-sm"
          onClick={setNFT}
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default Artworks
