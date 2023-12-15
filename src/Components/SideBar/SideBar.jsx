import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { BsBagCheck, BsCurrencyDollar } from 'react-icons/bs'
import './SideBar.css'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function SideBar() {
  let url = useLocation()
  return (
    <div className={`side-bar ${url.pathname === '/login' && 'd-none'}`}>
      <h1 className='side-bar-title'> به داشبورد خود خوش آمدید </h1>
      <div className='side-bar-links'>

        <Link to='/products'>
          <AiOutlineHome className='icon' />
          صفحه اصلی
        </Link>

        <NavLink to='/products'>
          <MdProductionQuantityLimits className="icon" />
          محصولات
        </NavLink>

        <NavLink to='/comments'>
          <BiCommentDetail className='icon' />
          کامنت ها
        </NavLink>

        <NavLink to='/users'>
          <FiUsers className="icon" />
          کاربران
        </NavLink>

        <NavLink to='/orders'>
          <BsBagCheck className="icon" />
          سفارشات
        </NavLink>

        <NavLink to='/offs'>
          <BsCurrencyDollar className="icon" />
          تخفیف ها
        </NavLink>

      </div>
    </div>
  )
}
