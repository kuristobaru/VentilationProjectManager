import { Button, Grid, Snackbar, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useEffect, useState } from 'react'
import { DragTableGlobal } from './components/DragTableGlobal'
import { DragTableArea } from './components/DragTableArea'
import { DragTableActivity } from './components/DragTableActivity'
import { useActivityStore } from '../store/activity-store'
import { useAreaStore } from '../store/area-store'
import { useSubAreaStore } from '../store/sub-area-store'
import { useCriteriaStore } from '../store/criteria-store'
import { useVectorStore } from '../store/vector-store'

export const Home = () => {
  const VIEWS = {
    GLOBAL: 0,
    AREA: 1,
    ACTIVITY: 2
  }

  const viewNames = {
    [VIEWS.GLOBAL]: 'Global',
    [VIEWS.AREA]: 'Area',
    [VIEWS.ACTIVITY]: 'Activity'
  }

  const [vista, setVista] = useState(VIEWS.GLOBAL)
  const [showSnackbar, setShowSnackbar] = useState(false)

  const getActivys = useActivityStore((state) => state.getActivys)
  const getAreas = useAreaStore((state) => state.getAreas)
  const getSubAreas = useSubAreaStore((state) => state.getSubAreas)
  const getCriteria = useCriteriaStore((state) => state.getCriteria)
  const getVectors = useVectorStore((state) => state.getVectors)

  const handleClickIzquierda = () => {
    setVista(vista === VIEWS.GLOBAL ? VIEWS.ACTIVITY : vista - 1)
  }

  const handleClickDerecha = () => {
    setVista(vista === VIEWS.ACTIVITY ? VIEWS.GLOBAL : vista + 1)
  }

  useEffect(() => {
    getVectors()
    getCriteria()
    getAreas()
    getActivys()
    getSubAreas()
  }, [])

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 'calc(115px)',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <Snackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* Aquí podrías manejar los mensajes de éxito o error */}
      </Snackbar>
      <Grid
        item
        sx={{
          mt: 3,
          boxShadow: 3, // Sombra sutil
          p: 2,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
          textAlign: 'center',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)'
          },
          color: '#2b364a'
        }}
      >
        <Typography variant='h4'>Ventilation Project Manager</Typography>
      </Grid>
      <Grid container sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'row',
            border: `solid ${'#21a3a3'} 1px`,
            borderRadius: '5px',
            boxShadow: 3,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}
        >
          <Button
            variant='contained'
            onClick={handleClickIzquierda}
            aria-label="Anterior"
            sx={{
              borderRadius: '0 0 0 5px',
              backgroundColor: '#7375a5',
              color: '#fff',
              boxShadow: 1,
              transition: 'background-color 0.2s ease, transform 0.2s ease',
              '&:hover': {
                backgroundColor: '#6cf3d5',
                transform: 'scale(1.1)'
              }
            }}
          >
            <ArrowBackIcon />
          </Button>
          <Typography
            sx={{
              p: 1,
              lineHeight: '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#2b364a',
              backgroundColor: '#13c8b5',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#21a3a3'
              }
            }}
          >
            {viewNames[vista]}
          </Typography>
          <Button
            variant='contained'
            onClick={handleClickDerecha}
            aria-label="Siguiente"
            sx={{
              borderRadius: '0 5px 5px 0',
              backgroundColor: '#7375a5',
              color: '#fff',
              boxShadow: 1,
              transition: 'background-color 0.2s ease, transform 0.2s ease',
              '&:hover': {
                backgroundColor: '#6cf3d5',
                transform: 'scale(1.1)'
              }
            }}
          >
            <ArrowForwardIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          mt: 3,
          p: 2,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: '#fafafa',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)'
          },
          color: '#2b364a'
        }}
      >
        {vista === VIEWS.GLOBAL && <DragTableGlobal />}
        {vista === VIEWS.AREA && <DragTableArea />}
        {vista === VIEWS.ACTIVITY && <DragTableActivity />}
      </Grid>
    </Grid>
  )
}
