import timelessLogo from '../assets/artistry.png'

const Footer = () => (
  <div className="w-full flex flex-col md:justify-center justify-between items-center py-10">
    <img className='w-1/6' src={timelessLogo} alt="" />
    <ul
        className="md:flex-[0.5] text-black font-semibold md:flex
        hidden list-none items-center flex-row flex-end py-8"
      >
      <li className="mx-5 cursor-pointer"><a href="/">Home</a> </li>
        <li className="mx-5 cursor-pointer">About</li>
        <li className="mx-5 cursor-pointer truncate">Our Team</li>
        <li className="mx-5 cursor-pointer"><a href="https://metamask.io/" target='_blank'>Metamask</a> </li>
    
    </ul>
    <p className='text-black font-semibold pt-5'>Developed by:
     <a className='ml-2 link-clr' href="https://www.linkedin.com/in/nikita-dhumal-2973741a4/" target='_blank'>Nikita Dhumal</a>
     <a className='ml-2 link-clr' href="https://www.linkedin.com/in/bhushan-mayekar-9b4736161/" target='_blank'>Bhushan Mayekar</a> 
     <a className='ml-2 link-clr' href="https://www.linkedin.com/in/umangjatwala/" target='_blank'>Umang Jatwala</a> 
     <a className='ml-2 link-clr' href="https://www.linkedin.com/in/divesh-kolhe-436401235/" target='_blank'>Divesh Kolhe</a> </p>
  </div>
)

export default Footer
