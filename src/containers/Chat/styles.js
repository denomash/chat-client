import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  messagesContainer: {
    flexGrow: 1,
    overflow: "auto",
  },
  messages: {
    display: "flex",
    flexDirection: "column",
    padding: "0 16px 0 16px",
    justifyContent: "end",
    height: "100%",
  },
  message: {
    padding: 10,
    borderRadius: 4,
  },
  sender: {
    fontSize: 14,
    color: "gray",
  },
  textArea: {
    width: "88%",
    margin: "0 0 6px 6px",
    padding: 16,
    resize: "none",
  },
  button: {
    margin: "0 6px 6px 6px",
    padding: 12,
    resize: "none",
  },
});
