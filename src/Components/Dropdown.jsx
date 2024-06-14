import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useContextGlobal } from "../Context/GlobalContext";

const DropDown = ({ isAuth }) => {
  const avatar = isAuth == null ? "" : isAuth[0].toUpperCase();
  const { logout } = useContextGlobal();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigator = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleChange = () => {
    navigator("/login");
    logout();
    // window.location.reload();
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          id="bg__button"
          ref={anchorRef}
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}>
          {avatar}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"

                    onKeyDown={handleListKeyDown}>
                    <NavLink to="/profile" className="styles">
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </NavLink>
                    <NavLink to="/favs" className="styles">
                      <MenuItem onClick={handleClose}>Favs</MenuItem>
                    </NavLink>
                    <NavLink to="/login" onClick={handleChange} className="styles">
                      <MenuItem onClick={handleClose}>Cerrar Sesion</MenuItem>
                    </NavLink>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
};

export default DropDown;
