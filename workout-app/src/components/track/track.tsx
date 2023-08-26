import { Button, Typography } from "@mui/joy";
export function Track(){

    return <>
        <Typography level="h1">Track</Typography>
        <Button onClick={() => console.log("hello frmo react")}>New Workout</Button>
    </>
}