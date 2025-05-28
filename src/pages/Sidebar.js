// src/pages/Sidebar.jsx
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Tooltip,
  AppBar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import { Edit } from '@mui/icons-material';

const drawerWidth = 240;
const collapsedWidth = 60;

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => navigate(path);

  const toggleDrawer = () => setOpen(!open);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Add', icon: <Edit />, path: '/addTransaction' },
    { text: 'Expenses', icon: <ReceiptIcon />, path: '/transactionList' },
    { text: 'Profile', icon: <AccountBoxIcon />, path: '/profile' },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      action: () => {
        localStorage.clear();
        navigate('/login');
      },
    },
  ];

  return (
    <>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#1976d2' }}
      >
        <Toolbar sx={{ minHeight: 48, px: 1 }}>
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            edge="start"
            onClick={toggleDrawer}
            size="large"
            sx={{
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'rotate(90deg)' },
            }}
          >
            <MenuIcon />
          </IconButton>
          {open && (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ ml: 2, fontWeight: 'bold', letterSpacing: 1 }}
            >
              Expense Tracker
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
            overflowX: 'hidden',
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            borderRight: '1px solid #ddd',
          },
        }}
      >
        <Toolbar sx={{ minHeight: 48 }} />
        <List sx={{ padding: 0, margin: 0 }}>
          {menuItems.map(({ text, icon, path, action }) => {
            const isActive = location.pathname === path;
            return (
              <Tooltip key={text} title={!open ? text : ''} placement="right" arrow>
                <ListItem
                  button
                  onClick={action ? action : () => handleNav(path)}
                  sx={{
                    py: 2,
                    px: open ? 3 : 1.5,
                    justifyContent: open ? 'initial' : 'center',
                    bgcolor: isActive ? '#1976d2' : 'transparent',
                    color: isActive ? '#fff' : 'inherit',
                    '&:hover': {
                      bgcolor: isActive ? '#1565c0' : '#e3f2fd',
                      color: isActive ? '#fff' : '#1976d2',
                      '& svg': { color: isActive ? '#fff' : '#1976d2', transform: 'scale(1.2)' },
                    },
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                      color: isActive ? '#fff' : '#1976d2',
                      transition: 'transform 0.2s ease, color 0.3s ease',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={text}
                      sx={{
                        fontWeight: isActive ? 'bold' : 'normal',
                      }}
                    />
                  )}
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
