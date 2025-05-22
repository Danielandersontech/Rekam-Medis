// pages/ErrorPage.jsx
import { useRouteError, useNavigate } from "react-router-dom";
import Error400 from "./Error400";
import Error401 from "./Error401";
import Error403 from "./Error403";
import Error404 from "./Error404";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  
  // Determine which error component to render
  const renderErrorComponent = () => {
    switch(error?.status) {
      case 400: return <Error400 />;
      case 401: return <Error401 />;
      case 403: return <Error403 />;
      case 404: return <Error404 />;
      default: return <Error400 />;
    }
  };

  return (
    <div>
      {renderErrorComponent()}
      <button onClick={() => navigate(-1)}>Go Back</button>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
}