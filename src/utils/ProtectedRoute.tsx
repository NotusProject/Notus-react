import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth.tsx';
/* usage
<ProtectedRoute>
   <Component />
</ProtectedRoute>
*/
export default function ProtectedRoute() {
    const auth = useAuth();

    if (auth.loading) {
        return <div>Loading</div>;
    }
    console.log(auth);
    return auth.user ? <Outlet/> : <Navigate to="/login"/>;
}
