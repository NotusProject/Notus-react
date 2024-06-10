// ProtectedRoute.tsx
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

export default function ProtectedRoute() {
    const {user, loading} = useAuth();
    
    console.log('User:', user);
    console.log('Loading:', loading);
    
    if (user === null) {
        return <Navigate to="/login"/>
    } else if (loading) {
        return <div>Loading</div>;
    }
    
    return user ? <Outlet/> : <Navigate to="/login"/>;
}
