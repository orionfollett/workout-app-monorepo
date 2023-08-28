import { Button, ToggleButtonGroup } from "@mui/joy";
import React from "react";
import { Plan } from "../plan/plan";
import { Analyze } from "../analyze/analyze";
import { Track } from "../track/track";
import "./nav.css";

export function Nav() {
  const [navState, setValue] = React.useState<string | null>("Plan");

  return (
    <>
      <ToggleButtonGroup
        value={navState}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        variant="solid"
        size="lg"
        color="primary"
        className="btn-group"
        sx={{ "--ButtonGroup-radius": "0px" }}
      >
        <Button className="single-button" value="Track">
          Track
        </Button>
        <Button className="single-button" value="Plan">
          Plan
        </Button>
        <Button className="single-button" value="Analyze">
          Analyze
        </Button>
      </ToggleButtonGroup>

      {navState == "Track" && <Track />}
      {navState == "Plan" && <Plan />}
      {navState == "Analyze" && <Analyze />}
    </>
  );
}
