import './App.css'
import { UserProvider } from './context/UserContext'
import { useUser } from './hooks/useUser'
import Navbar from './components/Navbar'
import { LoginButton, LogoutButton } from './components/AuthButtons'
import UserProfile from './components/UserProfile'
import ProtectedView from './components/ProtectedView'

const MainContent = () => {
  const { user, error } = useUser();

  return (
    <div>
      <Navbar />
      
      {error && <p>{error}</p>}

      {!user ? (
        <LoginButton />
      ) : (
        <LogoutButton />
      )}

      <hr />

      <UserProfile />

      <hr />

      <ProtectedView>
        <div>
          <h4>Secreto</h4>
          <p>Iniciado sesión correctamente.</p>
        </div>
      </ProtectedView>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <main>
        <h1>Ejercicio Context API</h1>
        <MainContent />
      </main>
    </UserProvider>
  )
}

export default App
