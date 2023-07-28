import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store/store'
import './index.css'
import AppLayout from './AppLayout'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { Provider } from 'react-redux'
import UserProfile from './components/Routes/User/UserProfile'
import Login from './components/Routes/Login/Login'
import Error from './components/Routes/Error/Error'
import About from './components/Routes/About/About'
import FAQ from './components/Routes/FAQ/FAQ'
import SalonHomeList from './components/Routes/SalonHomeList/SalonHomeList'
import Register from './components/Register/Register'
import Landing from './components/Screen/LandingPage/Landing'
import LandingLayout from './LandingLayout'
import SalonPage from './components/IndividualSalon/SalonPage'
import AddSalon from './components/AddSalon/AddSalon'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}
const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<SalonHomeList />} />
      <Route path="/salon/:id" element={<SalonPage />} />
      <Route path="/salon/add" element={<AddSalon />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/userprofile/" element={<UserProfile />} />
      <Route path="/landing" element={<LandingLayout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Route>,
  ),
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>,
)
