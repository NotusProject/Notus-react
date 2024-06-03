import {Outlet, Navigate} from 'react-router-dom';
import {useAuth} from './useAuth';
/* usage
<ProtectedRoute>
   <Component />
</ProtectedRoute>
*/
export default function ProtectedRoute() {
   const {user} = useAuth();
   return user ? <Outlet/> : <Navigate to="/login"/>;
}