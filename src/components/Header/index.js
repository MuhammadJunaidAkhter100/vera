import React, { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Assets
import { ReactComponent as Logo } from "../../assets/nav-vera-icon.svg";
import { ReactComponent as Folder } from "../../assets/header/folder.svg";
import { ReactComponent as Bell } from "../../assets/header/bell.svg";
import avatar from "../../assets/header/avatar.png";

// style
import styles from "./header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    localStorage.removeItem("LoggedInObj");
    localStorage.removeItem("token");
    navigate("/login");
    setAnchorEl(null);
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          <Logo className={styles.logo} />
        </div>
        <div className={styles.headerRight}>
          <IconButton>
            <Folder className={styles.icon} />
          </IconButton>
          <IconButton>
            <Bell className={styles.icon} />
          </IconButton>

          <IconButton
            id="logout-button"
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ p: 0 }}
          >
            <Avatar alt="user" src={avatar} />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            MenuListProps={{
              "aria-labelledby": "logout-button",
            }}
          >
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
