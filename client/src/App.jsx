import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { 
  HomePage, PageNotFound,
  Report, Login
} from './pages'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { AuthContext, AuthContextProvider } from '@src/context/AuthContext'
import { ExpenseContext, ExpenseContextProvider } from '@src/context/ExpenseContext'

function App() {

  return (
    <AuthContextProvider>
      <ExpenseContextProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

              <Route element={<ProtectedRoutes />}>
                  <Route path="" element={<HomePage />} />
                  <Route path='/report' element={<Report />} />
              </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ExpenseContextProvider>          
    </AuthContextProvider>
  )
}

export default App
