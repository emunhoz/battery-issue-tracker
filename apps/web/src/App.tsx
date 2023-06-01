import './App.css'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import { HomePage } from './pages/home/Home.page'
import { ReportDetailsPage } from './pages/report-details/ReportDetails.page'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="report/:id" element={<ReportDetailsPage />} />
    </Route>
  )
)

function App() {
  return (
    <main className="main">
      <h1 className="main-title">Battery issue report</h1>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
