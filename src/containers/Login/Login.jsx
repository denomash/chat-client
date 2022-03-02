import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Divider,
  Button,
  FormControl,
} from "@mui/material";


const Login = () => {
  const history = useHistory();

  const [username, setUserName] = useState("");

  const handleLogin = async () => {
    if (!username) return;

    history.push(`/chat?id=${username}`);
  };

  return (
    <Container maxWidth="sm">
      <Box
        height="100vh"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex" flexDirection="column">
          <Box style={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight={500}>
              Login
            </Typography>
          </Box>

          <Divider
            variant="middle"
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <FormControl>
            <TextField
              id="filled-basic"
              label="Username"
              variant="filled"
              required
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: 10 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
