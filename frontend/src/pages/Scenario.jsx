import {
  Grid,
  Typography,
  Box,
  CardContent,
  CardActions,
  Card,
  Button,
} from '@mui/material'
import { ScenarioModal } from './components'
import { useProjectStore } from '../store/project'
import '../index.css'
import { useAuthSotre } from '../store/auth-store'
import { useNavigate } from 'react-router-dom'
export const Scenario = () => {
  const { projects, deleteProject, projectSelected } = useProjectStore(
    (state) => state
  )
  const user_id = useAuthSotre((state) => state.uid)
  const nav = useNavigate()
  const handleselectProject = (id) => () => {
    projectSelected(id)
    nav(`project/${id}/home`)
  }
  const handleDeleteProject = (id) => () => {
    deleteProject(id, user_id)
  }

  return (
    <Grid
      container
      sx={{
        bgcolor: '#0B5394',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '600px',
          padding: '1rem',
          boxSizing: 'border-box',
        }}
      >
        <Typography variant='h5' sx={{ color: 'white', marginBottom: '1rem' }}>
          Please select a project
        </Typography>
        <ScenarioModal />
        <Box
          className='custom-scrollbar'
          sx={{
            width: '50%',
            maxHeight: '500px',
            overflowY: 'auto',
            bgcolor: 'white',
            borderRadius: '4px',
            padding: '1rem',
            marginTop: '1rem',
          }}
        >
          <ul
            style={{
              padding: 0,
              margin: 0,
              listStyleType: 'none',
            }}
          >
            {projects.length > 0 ? (
              projects.map((project) => (
                <Card
                  key={project.id}
                  sx={{
                    borderRadius: '4px',
                    border: '2px solid #0C5294',
                    mt: '1rem',
                    width: '100%',
                    bgcolor: '#0B5394',
                    height: '50%',
                  }}
                >
                  <CardContent
                    key={project.id}
                    style={{ marginBottom: '0.5rem' }}
                  >
                    <Typography variant='h6' sx={{ color: 'white' }}>
                      {project.project_name}
                    </Typography>
                    <Typography variant='subtitle2' sx={{ color: 'white' }}>
                      {project.user.user_name}
                    </Typography>
                    <Typography variant='subtitle2' sx={{ color: 'white' }}>
                      vectors: {project.vectors.length}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button
                      size='small'
                      color='error'
                      variant='contained'
                      onClick={handleDeleteProject(project.id)}
                    >
                      delete
                    </Button>
                    <Button
                      size='small'
                      color='success'
                      variant='contained'
                      onClick={handleselectProject(project.id)}
                    >
                      select
                    </Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <li>No projects</li>
            )}
          </ul>
        </Box>
      </Grid>
    </Grid>
  )
}
