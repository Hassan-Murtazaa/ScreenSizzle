import { Navigate } from "react-router-dom";

const PrivateRoutes = () => {

    const auth = true;

    if (auth === false) {
        return <Navigate to="/" />;
    }

    else if (auth === true){
        return (
            <Navigate to="/home" />
        )
    }
    
}

export default PrivateRoutes