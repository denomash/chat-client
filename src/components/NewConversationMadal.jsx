import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const NewConversationMadal = ({
  chatBuddy,
  modalOpen,
  handleClose,
  setChatBuddy,
  handleCreateConversation,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter username of the user you wish to chat
        </Typography>
        <TextField
          id="filled-basic"
          label="Chat buddy"
          variant="filled"
          required
          style={{ width: "100%", marginTop: 20 }}
          value={chatBuddy}
          onChange={(e) => setChatBuddy(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: 10 }}
          disabled={!chatBuddy}
          onClick={handleCreateConversation}
        >
          start Conversation
        </Button>
      </Box>
    </Modal>
  );
};

export default NewConversationMadal;
