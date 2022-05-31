import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
import '../../asset/boxicons-2.0.7/css/boxicons.min.css'
import logo from '../../asset/image/logo.png'
import sidebar_items from '../../asset/JsonData/sidebar_routes.json'
import { useLocation } from "react-router-dom"

const SidebarItem = props => {

    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = () => {

    const sampleLocation = useLocation();
    const activeItem = sidebar_items.findIndex(item => item.route === sampleLocation.pathname)

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <span className="sidebar-Logo"> <img src={logo} alt="sidebar-Logo" className="sidebar-Avatar" /> <span className="sidebar-Title"> SafeNet</span></span>
            </div>
            {
                sidebar_items.map((item, index) => (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                        />
                    </Link>
                ))
            }
        </div>
    )
}

export default Sidebar
