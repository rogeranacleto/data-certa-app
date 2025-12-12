import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './App'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import { UpdateProvider } from './contexts/UpdateContext'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')!).render(
  <StrictMode>  
    <AuthProvider>
      <UpdateProvider>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={10}
          containerStyle={{
            padding: '10',
          }}
          toasterId="default"
          toastOptions={{
            className: '', 
            duration: 5000,
            removeDelay: 1000,
            style: {
              border: '1px solid #F3F4F633',
              background: '#0344f8',      
              color: '#fff',          
              borderRadius: '10px',   
              boxShadow: '0 4px 12px #fff', 
              padding: '16px 25px',   
              fontFamily: 'sans-serif',
            },
            success: {
              duration: 5000,
              iconTheme: {
                primary: 'green',
                secondary: 'white',
              },
            },
          }}
        />
          <RouterProvider router={router}/>
      </UpdateProvider>
    </AuthProvider>
  </StrictMode>,
)
