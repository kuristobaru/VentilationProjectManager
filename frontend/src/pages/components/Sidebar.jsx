import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthSotre } from '../../store/auth-store'
import { InputArea } from './InputArea'

export const Sidebar = () => {
  const { user_name, resetUser } = useAuthSotre((state) => state)
  const nav = useNavigate()

  const onClickLogout = () => {
    localStorage.clear()
    resetUser()
    nav('/login')
  }

  return (
    <Box component='nav'>
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 170,
            background: '#2b364a',
            zIndex: 90,
          },
        }}
      >
        <Toolbar>
          <IconButton color='error' onClick={onClickLogout}>
            <LogoutIcon />
          </IconButton>
          <Link to={'home'} style={{ textDecoration: 'none' }}>
            <Typography
              variant='h6'
              color={'white'}
              noWrap
              component='div'
              sx={{
                '&:hover': {
                  color: '#7375a5', // Cambia a tu color deseado en hover
                },
              }}
            >
              {user_name}
            </Typography>
          </Link>
        </Toolbar>

        <Divider />
        <InputArea />
        <Divider />
        <Link
          to={'projects'}
          style={{
            textDecoration: 'none',
            color: 'white',
            textAlign: 'center',
            fontSize: '1.2rem',
          }}
          sx={{
            '&:hover': {
              color: '#7375a5', // Cambia a tu color deseado en hover
            },
          }}
        >
          Projects
        </Link>
        <Divider />
      </Drawer>
    </Box>
  )
}
