import React from 'react';
import { Menu, Icon, Popover } from 'antd';
import styles from './main.less';
import Menus from './Menus';
import logo from '../../assets/logo.png'

import { Link } from 'dva/router';

const SubMenu = Menu.SubMenu;

function Header ({loginUser, logout, tokenUrl,switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover}) {
	let handleClickMenu = e =>{
		e.key === 'logout' && logout();
		e.key === 'switch' && logout();
	}
	const menusProps = {
		siderFold: false,
		darkTheme: false,
		isNavbar,
		handleClickNavMenu: switchMenuPopover,
		location
	};
	return (
		<div className={styles.header}>
			<img className={styles.logo} src={logo} />
			<iframe style={{"display":"none"}} src={tokenUrl}></iframe>
			<Menu mode='horizontal' className='headermenu' onClick={handleClickMenu} theme={'dark'}>
				<Menu.Item key="1">
			        <Link to="/homePage"><Icon type="home" />Home</Link>
			    </Menu.Item>
			    <Menu.Item key="2">
			        <Link to="/homePage"><Icon type="home" />Home</Link>
			    </Menu.Item>
			    <Menu.Item key="3">
			        <Link to="/homePage"><Icon type="home" />Home</Link>
			    </Menu.Item>

			    <Menu.Item key="4">
			        <Link to="/orders"><Icon type="home" />Home</Link>
			    </Menu.Item>
			</Menu>			
		</div>
	);
}

export default Header;


