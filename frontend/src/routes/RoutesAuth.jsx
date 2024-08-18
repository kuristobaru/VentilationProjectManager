import { Route, Routes, useLocation } from 'react-router-dom'
import { Sidebar, NavBar } from '../pages/components'
import { Scenario } from '../pages'
import { Container, Grid } from '@mui/material'
import { useEffect } from 'react'
import { useAuthSotre } from '../store/auth-store'
import { useProjectStore } from '../store/project'
import { RoutesProjects } from './RoutesProjects'

export const RoutesAuth = () => {
  const path = useLocation().pathname
  const user_id = useAuthSotre((state) => state.uid)
  const getProjects = useProjectStore((state) => state.getProjects)
  useEffect(() => {
    getProjects(user_id)
  }, [path === '/VentilationProjectManager/projects'])
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
      }}
    >
      <Sidebar />
      <NavBar />
      <Grid item sx={{ mt: 5, width: '100%' }}>
        <Routes>
          {/* <Route path='/*' element={<Navigate to={'projects'} />} /> */}
          <Route path='project/:id' element={<RoutesProjects />} />
          <Route path='projects' element={<Scenario />} />
        </Routes>
      </Grid>
    </Container>
  )
}
