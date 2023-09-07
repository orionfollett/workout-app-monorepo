import { Button, ToggleButtonGroup } from "@mui/joy";
import "./nav.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

export function Nav() {
  const navigate = useNavigate();
  function track() {
    navigate("/track");
  }
  function plan() {
    navigate("/plan");
  }
  function analyze() {
    navigate("/analyze");
  }

  return (
    <>
      <Outlet />
      <ToggleButtonGroup
        variant="solid"
        size="lg"
        color="primary"
        className="btn-group"
        sx={{ "--ButtonGroup-radius": "0px" }}
      >
        <Button
          component="button"
          value="track"
          className="single-button"
          onClick={track}
        >
          Track
        </Button>
        <Button
          component="button"
          value="analyze"
          className="single-button"
          onClick={analyze}
        >
          Analyze
        </Button>
        <Button
          component="button"
          value="plan"
          className="single-button"
          onClick={plan}
        >
          Plan
        </Button>
      </ToggleButtonGroup>
    </>
  );
}
