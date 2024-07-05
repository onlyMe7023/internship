import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "50ch",
      },
    },
  })
);
const FillForm = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();
  const classes = useStyles();
  const submitHandler = () => {
    const chackEmail = validator.isEmail(`${email}`);
    const isValidPhoneNumber = validator.isMobilePhone(phone);

    if (!chackEmail || !isValidPhoneNumber || !name) {
      setOpen(true);
      return;
    }
    localStorage.setItem("UserName", JSON.stringify(name));
    localStorage.setItem("UserEmail", JSON.stringify(email));
    localStorage.setItem("UserPhone", JSON.stringify(phone));
    navigate("/department");
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="bg-white max-w-6xl w-84 m-10	border-solid	rounded-3xl	 shadow-[1px_1px_80px_1px_rgba(0,0,0,0.1)] flex flex-col items-center justify-around p-10 md:max-w-4xl md:flex-row">
      <div className="flex w-1/2 bg-white h-full items-center justify-center">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="phone"
            label="Phone No."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <Stack spacing={2}>
          <Button variant="contained" color="success" onClick={submitHandler}>
            Login
          </Button>
        </Stack>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}>
          something Wrong
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FillForm;
