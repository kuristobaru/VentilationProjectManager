import { Route, Routes } from 'react-router-dom'
import { AreaGraphs, Home } from '../pages'
import { GlobalGraph } from '../pages/components/GlobalGraph'
import { ActivityGraph } from '../pages/components/ActivityGraph'
import { ExportReport } from '../pages/components/ExportReport'

export const RoutesProjects = () => {
  return (
    <Routes>
      <Route path='project/:id/home' element={<Home />} />
      <Route path='project/:id/area-graph' element={<AreaGraphs />} />
      <Route path='project/:id/global-graph' element={<GlobalGraph />} />
      <Route path='project/:id/activity-graph' element={<ActivityGraph />} />
      <Route path='project/:id/export-report' element={<ExportReport />} />
    </Routes>
  )
}
