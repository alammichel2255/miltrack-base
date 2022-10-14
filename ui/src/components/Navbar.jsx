import React, { useContext, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';
//import { SidebarData } from './SidebarData';
import './Navbar.css';
import { AppContext } from '../AppContext';



function Navbar() {
  const { loggedUser, loggedUser2, user, setLoggedUser2, setUser, setLoggedUser, setServiceMember, serviceMember} = useContext(AppContext)
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const SidebarData = [
    {
      title: 'My Profile',
      path: loggedUser[0] === undefined ? '/' : `/${loggedUser[0].username}`,
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text',
      action: () => {setServiceMember(loggedUser[0])}
    },
    {
      title: 'Subordinate Dashboard',
      path: '/dashboard',
      icon: <IoIcons.IoIosPeople />,
      cName: 'nav-text'

    },
    {
      title: 'logout',
      path: '/',
      icon: <IoIcons.IoIosPaper />,
      cName: 'nav-text',
      action: () => {setLoggedUser([])}
    }
  ]

  return (
    <div className='header'>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars style={{ color: '#1c464c'}} onClick={showSidebar} />
          </Link>
          <img className='title' src={'../../Miltracklogo.png'} alt='Miltrack Logo' />
       </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose style={{ color: '#1c464c'}} className="x"/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li  onClick={item.action !== undefined ? item.action : null } key={index} className={item.cName}>
                  <Link to={item.path} >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <div className="links-container">
            <h2  className="quick-link"
            style={{ color: '#1c464c', textDecorationLine: 'underline'}}>
                Quick Links
            </h2>
            <ul className="indiv-link">
                <li><a href="https://federation.eams.army.mil/pool/sso/authenticate/l/15?f=c&m=GET&p=8051&r=f&u=https%3A%2F%2Fauthentication.mods.army.mil%2Fidentityserver%2FDODCAC%2Fconnect%2Fauthorize%3Fclient_id%3DCommanderPortal%26redirect_uri%3Dhttps%253a%252f%252fmedpros.mods.army.mil%252fPortal%252f%26response_mode%3Dform_post%26response_type%3Dcode+id_token+token%26scope%3Dopenid+profile+offline_access+readinessportalapi+uicapi+mrcapi+mrctrendapi+profileapi+deployabilityapi+messagingapi+remindersapi+readinessreportingapi+readinessuserapi+healthmgmtapi+readinessmhaapi%26state%3DOpenIdConnect.AuthenticationProperties%253dA9NvskCG8LLcOpFMfTzPVDqApbJyUSKuFSvLlKOBRaL6rEQ0pWLF4_Afv3oW-WxWHr5q2ON9mZhfF664Bdv-wdalNpRDmEDIfHqrtDqgmevnQJOikOs_m_uQHNcczV1n65U-Uld6iDIcCfBCUMiMWH84OPbG3Act2_sCAk1HadcCldqZd9Il5BC8hq2igq2IduMvo7TNHcsG4GUz_WYN6vGehhLnWbVYG-visCTukmg%26nonce%3D638000610789852549.ODVmM2MxMjItYzI4MS00MTgxLTgyYTAtZjExYjY4MDUzZmIwMzU4OGMyNTQtNzcxMS00MjljLThlYjItNzdjNTg4OTAwMTYz%26acr_values%3DadditionalApplicationsForRole%253aeProfileNew%252cMEDPROSPortal%252cMEDPROSHomePortal%252cMEDPROSAdminPortal%252cMEDPROSHealthCarePortal%252cMEDPROSSysAdminPortal%26x-client-SKU%3DID_NET%26x-client-ver%3D1.0.40306.1554&x=true" target="_blank">Medpros</a></li>
                <li><a href="https://medpros.mods.army.mil/portal" target="_blank">PHA</a></li>
                <li><a href="https://milconnect.dmdc.osd.mil/milconnect/" target="_blank">SGLI/DD93</a></li>
                <li><a href="https://jkodirect.jten.mil/" target="_blank">JKO</a></li>
                <li><a href="https://medpros.mods.army.mil/portal" target="_blank">SRB/ORB</a></li>
                <li><a href="https://federation.eams.army.mil/pool/sso/authenticate/l/15?f=c&m=GET&p=8378&r=f&u=https%3A%2F%2Fwww.lms.army.mil%2Flearnerview%2F&x=true" target="_blank">ALMS</a></li>
                <li><a href="https://iperms.hrc.army.mil/login/" target="_blank">iPerms</a></li>
                <li><a href="https://actnow.army.mil/" target="_blank">Army Career Tracker</a></li>
            </ul>
            </div>
          </ul>
        </nav>
    </div>
  );
}

export default Navbar;