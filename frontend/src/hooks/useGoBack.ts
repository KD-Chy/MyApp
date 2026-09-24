import { useNavigate } from "react-router-dom";

export default function useGoBack() {
  const navigate = useNavigate();

  function goBack() {
    if (window.history.state.idx > 0) {
      navigate(-1); // Go back to the previous page
    }
    else {
      navigate("/"); // Redirect to home if no history exists
    }
  }

  return goBack;
}