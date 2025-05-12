import { Route, Routes } from 'react-router-dom'
import Main from './page/main'
import Credit from './page/credit'
import Auth from './page/auth'

function App() {
 
  return (
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/login'element={<Auth/>}/>
      <Route path='/main'element={<Main/>}/>
      <Route path='/credit'element={<Credit/>}/>
    </Routes>
  )
}

export default App
