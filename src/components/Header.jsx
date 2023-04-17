import timelessLogo from '../assets/artistry.png'
import { connectWallet } from '../Blockchain.Services'
import { useGlobalState, truncate } from '../store'
import { Link } from 'react-router-dom'
import About from './About'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 80) {
      document.querySelector('.nav-wrap').classList.add("shadow");
      document.querySelector('.logo-img').classList.add("logo");
    }
    else {
      document.querySelector('.nav-wrap').classList.remove("shadow");
      document.querySelector('.logo-img').classList.remove("logo");
    
    }
    
  });
  
  return (
    
    <div className='nav-wrap stick '>
    <nav className=" navbar w-4/5 flex justify-between items-center py-3 mx-auto ">
      <div className="md:flex flex-initial ">
        <img
          className="w-4/6 cursor-pointer logo-img"
          src={timelessLogo}
          alt="Timeless Logo"
        />
      </div>

      <ul
        className="md:flex-[0.5] text-black font-semibold md:flex
        hidden list-none items-center flex-row flex-end"
      >
        <li className="mx-5 cursor-pointer"><a href="/">Home</a> </li>
        <li className="mx-5 cursor-pointer"><Link to={About}>About</Link> </li>
        <li className="mx-5 cursor-pointer truncate">Our Team</li>
        <li className="mx-5 cursor-pointer"><a href="https://metamask.io/" target='_blank'>Metamask</a> </li>
        <li className='mx-5'>
        {connectedAccount ? (
        <button
          className="drop-shadow-2xl rounded-2xl shadow-inner text-white
          btn-clr 
           cursor-pointer p-4 "
        >
          {truncate(connectedAccount, 6, 6, 15)}
        </button>
      ) : (
        <button
          className="drop-shadow-2xl rounded-2xl shadow-inner text-white
          btn-clr
           cursor-pointer p-4 truncate "
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
        </li>
      </ul>

     
    </nav>

    </div>
    
  )
}

export default Header
