import './Header.css'
import { AiOutlineBell } from 'react-icons/ai'
import { BsBrightnessAltHigh } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'
export default function Header() {
  let url = useLocation()
  return (
    <div className={`header ${url.pathname === "/login" && 'd-none'}`}>
      <div className="admin-profile">
        <img src="" alt="Adimn Profile" />
        <div>
          <h1> سهیل منصوری </h1>
          <h3> برنامه نویس فول استک </h3>
        </div>
      </div>

      <div className="header-left-section">
        <div className="search-box">
          <input type="text" placeholder='جستجو کنید ...' />
          <button>جستجو</button>
        </div>
        <button className='header-left-icon'>
          <AiOutlineBell />
        </button>
        <button className='header-left-icon'>
          <BsBrightnessAltHigh />
        </button>
      </div>

    </div>
  )
}
