import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Dashboard from './pages/admin/Dashboard'
import CreateTask from './pages/admin/CreateTask'
import ManageTask from './pages/admin/ManageTask'
import ManageUser from './pages/admin/ManageUser'
import PrivateRoute from './routes/PrivateRoute'
const App = () => {
  return (
    <div className="text-primary">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          /*Admin Routes*/
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/tasks" element={<ManageTask />} />
            <Route path="/admin/users" element={<ManageUser />} />
          </Route>
          
          /*User Routes*/
          <Route element={<PrivateRoute allowedRoles={['user']} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route path="/user/task-details/:id" element={<TaskDetails />} />



          </Route>

        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App