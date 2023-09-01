
import '../styles/admin-nav.css';
import React, {useRef, useEffect} from 'react'

import {Container, Row} from "reactstrap";
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../custom-hooks/useAuth';
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify';
import logo from '../assets/images/simp.jpeg';

const admin__nav = [

  {
    display: 'Dashboard',
    path: '/dashboard'
  },
  {
    display: 'All-Products',
    path: '/dashboard/all-products'
  },
  {
    display: 'Add-Products',
    path: '/dashboard/add-products'
  },
  {
    display: 'Users',
    path: '/dashboard/users'
  },
  {
    display: 'Add-User',
    path: '/dashboard/add-user'
  },
  {
    display: 'Edit-Product',
    path: '/dashboard/edit-product/:id'
  },
]

const nav__links = [
  {
    path: 'home',
    display: 'Home',
  },
  {
    path: 'shop',
    display: 'Shop',
  },
  {
    path: 'cart',
    display: 'Cart',
  },
];

const AdminNav = () => {

  const headerRef = useRef(null);
  const profileActionRef = useRef(null)

  const menuRef = useRef(null);

  const navigate = useNavigate()

  const {currentUser} = useAuth()

  const stickyHeaderFunc = () =>{
    window.addEventListener('scroll', () =>{
      if (
        document.body.scrollTop > 80 || 
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('sticky__header');
      } else{
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logged out');
        navigate('/home')
    }).catch(err => {
      toast.error(err.message)
    })
  }

  useEffect(() => {
    stickyHeaderFunc();

    return()=> window.removeEventListener('scroll', stickyHeaderFunc);
});

const menuToggle =  ()=> menuRef.current.classList.toggle('active__menu');

const navigateToCart = () => {
  navigate('/cart');

};

const toggleProfileActions = ()=> profileActionRef.current.classList.toggle('show__profileActions')




  return (
    <>

    <header className='admin__header' ref={headerRef}>
    <div className='admin__nav-top'>
      <Container>
          <div className='nav__wrapper'>
            <div className="logo">
              <img src= {logo} alt="logo" />
              <div>
                <h1> <Link to='/home'> Renllugs Building Resources </Link> </h1>
              </div>
            </div>

            <div className='navigation' ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                    <li className='nav__item' key={index}>
                      <NavLink 
                        to={item.path} 
                        className={(navClass)=> 
                          navClass.isActive ? 'nav__active': ''}>
                          {item.display}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="nav__icons">
              <div className='profile'>
                <div 
                  className="profile__actions" 
                  ref={profileActionRef} 
                  onClick={toggleProfileActions} >
                  {currentUser ? (
                  <span onClick={logout}> Logout </span> 
                  ) : ( 
                    <div className=' d-flex align-items-center justify-content-center flex-column'>
                      <Link to='/login'>Login</Link>
                  </div>
                  )}
                </div>
              </div> 

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i class="ri-menu-line"></i>
                  </span>
              </div>
            </div>

          </div>
      </Container>
    </div>

  </header>

  <section className="admin__menu p-0">
    <Container>
      <Row>
        <div className="admin__navigation">
          <ul className="admin__menu-list">
            {
              admin__nav.map((item, index) => (
                <li className="admin__menu-item" key={index}>
                  <NavLink 
                  to={item.path} 
                  className={navClass => 
                    navClass.isActive ? 'active__admin-menu ' : ''
                    } 
                  >
                    {item.display} 
                  </NavLink>
                </li>
              ))
            }

          </ul>
        </div>
      </Row>
    </Container>
  </section>
  </>
  );
};

export default AdminNav