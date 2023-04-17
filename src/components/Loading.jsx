import { useGlobalState } from '../store'

const Loading = () => {
  const [loading] = useGlobalState('loading')

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen
      flex items-center justify-center bg-black  z-[150]
      bg-opacity-50 transform transition-transform
      duration-300 ${loading.show ? 'scale-100' : 'scale-0'}`}
    >
      <div
        className="flex flex-col justify-center
        items-center bg-[#ffffff] shadow-sm
        rounded-xl 
        min-w-min px-10 pb-5"
      >
        <div className="flex flex-row justify-center items-center">
          <div className="lds-dual-ring scale-50"></div>
          <p className="text-lg text-black">Processing...</p>
        </div>
        <small className="text-black">{loading.msg}</small>
      </div>
    </div>
  )
}

export default Loading
