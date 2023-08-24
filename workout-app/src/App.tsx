import {  CssBaseline, CssVarsProvider } from "@mui/joy";
import { Nav } from "./components/nav/nav";
export default function App() {
  return <CssVarsProvider>
    <CssBaseline/>
    <main>
    <Nav></Nav>
    </main>
  </CssVarsProvider>;
}

/* 
    <Sheet sx={{
      margin:'auto',
      maxWidth:400,
      
      padding: 2,

     display: 'flex',
     flexDirection: 'column',
     gap: 2,
     borderRadius: 'sm',
     boxShadow: 'md',}}>
      <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.
            </Typography>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" placeholder="janedoe@example.com"/>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" placeholder="password"/>
            </FormControl>
            <Button sx={{mt:1}}>Log In</Button>
      </div>
    </Sheet> */