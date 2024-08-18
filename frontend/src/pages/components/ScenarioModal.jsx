import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useAuthSotre } from '../../store/auth-store'
import { useProjectStore } from '../../store/project'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 90,
}
const formData = {
  unit: true,
  leakage: true,
  value_leakage: 0,
  period: 0,
  m3kw: 0,
  project_name: '',
}

export const ScenarioModal = () => {
  const uid = useAuthSotre((state) => state.uid)
  const createProject = useProjectStore((state) => state.createProject)
  const {
    unit,
    leakage,
    value_leakage,
    period,
    m3kw,
    project_name,
    onInputChange,
    formState,
  } = useForm(formData)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleCheckboxChange = (name) => {
    onInputChange({ target: { name, value: !formState[name] } })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const setting = {
      unit: formState.unit,
      leakage: formState.leakage,
      value_leakage: formState.value_leakage,
      period: formState.period,
      m3kw: formState.m3kw,
      project_name: formState.project_name,
      user_id: uid,
    }
    createProject(setting, handleClose)
  }
  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          bgcolor: 'white',
          color: '#0C5294',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: '#f0f0f0',
            color: '#0C5294',
          },
        }}
      >
        Create new project
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <form onSubmit={onSubmit}>
            <Box sx={style}>
              <Typography sx={{ mb: 4, textAlign: 'center' }} variant='h5'>
                New Project
              </Typography>

              <TextField
                sx={{ width: '70%', mt: 1 }}
                name={'project_name'}
                type={'text'}
                value={project_name}
                label={'Project'}
                onChange={onInputChange}
              />
              <Grid>
                <Grid
                  container
                  spacing={6}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '90%',
                  }}
                >
                  <Grid
                    item
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography sx={{ mr: 2 }}>Unit</Typography>
                    <Grid
                      item
                      sx={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <FormControlLabel
                        label='Metrica'
                        control={
                          <Checkbox
                            checked={unit}
                            onChange={() => handleCheckboxChange('unit')}
                          />
                        }
                      />
                      <FormControlLabel
                        label='Imperial'
                        control={
                          <Checkbox
                            checked={!unit}
                            onChange={() => handleCheckboxChange('unit')}
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Grid
                      item
                      sx={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <FormControlLabel
                        label='Global'
                        control={
                          <Checkbox
                            checked={leakage}
                            onChange={() => handleCheckboxChange('leakage')}
                          />
                        }
                      />
                      <FormControlLabel
                        label='Vector'
                        control={
                          <Checkbox
                            checked={!leakage}
                            onChange={() => handleCheckboxChange('leakage')}
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
                  >
                    <FormControl sx={{ width: '90px' }} variant='outlined'>
                      <InputLabel>Leakage</InputLabel>
                      <OutlinedInput
                        sx={{
                          pl: '10px',
                          '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                            {
                              '-webkit-appearance': 'none',
                              margin: 0,
                            },
                          '& input[type=number]': {
                            '-moz-appearance': 'textfield',
                          },
                        }}
                        type='number'
                        name='value_leakage'
                        value={value_leakage}
                        onChange={onInputChange}
                        label='Leakage'
                        inputProps={{ min: 0, max: 100 }}
                        endAdornment={
                          <InputAdornment position='end'>%</InputAdornment>
                        }
                      />
                    </FormControl>
                    <FormControl sx={{ width: '130px ' }} variant='outlined'>
                      <InputLabel>Equipment Requeriment</InputLabel>
                      <OutlinedInput
                        sx={{
                          pl: '10px',
                          '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                            {
                              '-webkit-appearance': 'none',
                              margin: 0,
                            },
                          '& input[type=number]': {
                            '-moz-appearance': 'textfield',
                          },
                        }}
                        type='number'
                        name='m3kw'
                        value={m3kw}
                        onChange={onInputChange}
                        label={'Equipment Vector'}
                        endAdornment={
                          <InputAdornment position='end'>m3/kW</InputAdornment>
                        }
                      />
                    </FormControl>

                    <FormControl variant='outlined' sx={{ width: '80px' }}>
                      <InputLabel>Period</InputLabel>
                      <OutlinedInput
                        sx={{
                          pl: '10px',
                          '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                            {
                              '-webkit-appearance': 'none',
                              margin: 0,
                            },
                          '& input[type=number]': {
                            '-moz-appearance': 'textfield',
                          },
                        }}
                        type='number'
                        name='period'
                        value={period}
                        onChange={onInputChange}
                        label={'Period'}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button type='submit' variant='contained'>
                  Save
                </Button>
                <Button
                  color='warning'
                  variant='contained'
                  onClick={() => setOpen(!open)}
                >
                  Cancel
                </Button>
              </Grid>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
