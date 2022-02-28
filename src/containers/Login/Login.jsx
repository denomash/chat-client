import { useState } from "react";
// import history from "history";
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
import usePersistData from "../../hooks/usePersistData";

const Login = () => {
  const history = useHistory();

  const [username, setUserName] = useState("");
  const [usernameKey, setUserNameKey] = usePersistData("username");

  const handleLogin = async () => {
    if (!username) return;
    setUserNameKey(username);

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    history.push("/chat");
  };

  return (
    <Container maxWidth="sm">
      {usernameKey}
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
