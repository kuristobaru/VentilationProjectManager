import { Box, Drawer, Button, Typography, IconButton, Menu, MenuItem } from '@mui/material'
import { Settings } from '@mui/icons-material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import globalPng from '../../assets/glopalGraphs.png'
import areaPng from '../../assets/areaGraph.png'
import activityPng from '../../assets/activityGraph.png'
import { useProjectStore } from '../../store/project'
import { AddModal } from './AddModal'
import { AddModal2 } from './AddModal2'
import { AddModal3 } from './AddModal3'
import { AddModal4 } from './AddModal4'
import { SettingModal } from './SettingModal'

export const NavBar = () => {
  const [navbar, setNavbar] = useState(1)
  const { project } = useProjectStore((state) => state)

  // States for the settings menu
  const [anchorEl, setAnchorEl] = useState(null)
  const [openSettingModal, setOpenSettingModal] = useState(false)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenSettingModal = () => {
    setOpenSettingModal(true)
  }

  const handleCloseSettingModal = () => {
    setOpenSettingModal(false)
  }

  return (
    <Box component='nav' sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            display: 'flex',
            flexDirection: 'row',
            boxSizing: 'border-box',
            width: '91%',
            height: '50px',
            background: '#0B5394',
            ml: 21,
            zIndex: 90,
          },
        }}
      >
        <Button
          sx={{
            color: 'white',
            ...(navbar === 1 && { bgcolor: '#2a87db' }),
            '&:hover': {
              bgcolor: '#1d4b8f', // Cambia el color del hover aquí
            },
          }}
          onClick={() => setNavbar(1)}
        >
          <Link
            to={`projects/project/${project}/home`}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Vector
          </Link>
        </Button>
        {navbar === 1 && (
          <Box component='nav'>
            <Drawer
              variant='permanent'
              open
              sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': {
                  display: 'flex',
                  flexDirection: 'row',
                  boxSizing: 'border-box',
                  width: '91%',
                  height: '100px',
                  background: '#2a87db',
                  ml: 21,
                  mt: 'calc(50px)',
                },
              }}
            >
              <AddModal />
              <AddModal2 />
              <AddModal4 />
              <AddModal3 />
              <Typography
                sx={{
                  color: 'white',
                  position: 'absolute',
                  left: 0,
                  transform: 'translateY(81px) translateX(151px)',
                  zIndex: 10,
                  fontSize: '13px',
                }}
              >
                Create Vector
              </Typography>
            </Drawer>
          </Box>
        )}
        <Button
          sx={{
            color: 'white',
            ...(navbar === 2 && { bgcolor: '#2a87db' }),
            '&:hover': {
              bgcolor: '#1d4b8f', // Cambia el color del hover aquí
            },
          }}
          onClick={() => setNavbar(2)}
        >
          <Link
            to={`projects/project/${project}/export-report`}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Report
          </Link>
        </Button>
        <Button
          sx={{
            color: 'white',
            ...(navbar === 3 && { bgcolor: '#2a87db' }),
            '&:hover': {
              bgcolor: '#1d4b8f', // Cambia el color del hover aquí
            },
          }}
          onClick={() => setNavbar(3)}
        >
          <Link
            to={`projects/project/${project}/global-graph`}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Graphs
          </Link>
        </Button>
        {navbar === 3 && (
          <Box component='nav'>
            <Drawer
              variant='permanent'
              open
              sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': {
                  display: 'flex',
                  flexDirection: 'row',
                  boxSizing: 'border-box',
                  width: '91%',
                  height: '100px',
                  background: '#2a87db',
                  ml: 21,
                  mt: 'calc(50px)',
                },
              }}
            >
              <Button>
                <Link
                  to={`projects/project/${project}/global-graph`}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <img src={globalPng} width={80} />
                </Link>
              </Button>
              <Button>
                <Link
                  to={`projects/project/${project}/area-graph`}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <img src={areaPng} width={80} />
                </Link>
              </Button>
              <Button>
                <Link
                  to={`projects/project/${project}/activity-graph`}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <img src={activityPng} width={80} />
                </Link>
              </Button>
            </Drawer>
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }} /> {/* This will push the menu to the right */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            sx={{ color: 'white' }}
            onClick={handleClick}
          >
            <Settings />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: 200,
                mt: 1, // Add margin top for positioning
              },
            }}
          >
            <MenuItem onClick={() => handleOpenSettingModal()}>Settings</MenuItem>
          </Menu>
          <SettingModal
            open={openSettingModal}
            onClose={handleCloseSettingModal}
          />
        </Box>
      </Drawer>
    </Box>
  )
}
