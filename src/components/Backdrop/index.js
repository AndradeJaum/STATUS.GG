import { Backdrop } from "@mui/material";
import CircularIndeterminate from "../Loader";

export default function SimpleBackdrop({ open }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularIndeterminate color="inherit" />
    </Backdrop>
  );
}
