import React from 'react'
import { styled } from '@mui/material/styles';
import { InputAdornment, TextField, Badge, Avatar, Divider } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

// styles
import { ReactComponent as Send } from "../../assets/icons/send.svg";
import { ReactComponent as Search } from "../../assets/dashboard/search.svg";
import avatar from '../../assets/header/avatar.png'
import styles from './chat.module.scss'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#66B1B4',
      color: '#66B1B4',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
    }
}));

const ChatBox = () => {
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.searchWrapper}>
        <h4>Darren Till - Civil</h4>
        <TextField
            className={styles.searchBar}
            id="application-search"
            placeholder="Search"
            variant="outlined"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <Search />
                </InputAdornment>
                ),
            }}
        />
      </div>

      <div className={styles.usersChat}>
        <div className={styles.messagesWrapper}>
            <div className={`${styles.messageWrapper} ${styles.receiver}`}>      
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="Remy Sharp" src={avatar} />
                </StyledBadge>
                <div>
                    <div className={styles.details}>
                        <h5>Orlando Diggs</h5>
                        Friday 2:20pm
                    </div>
                    <div className={styles.message}>
                        Thanks everyone! Almost there.
                    </div>
                </div>
            </div>
            <div className={`${styles.messageWrapper} ${styles.receiver}`}>      
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="Remy Sharp" src={avatar} />
                </StyledBadge>
                <div>
                    <div className={styles.details}>
                        <h5>Lana Steiner</h5>
                        Friday 2:20pm
                    </div>
                    <div className={styles.message}>
                        Hey team, I’ve finished with the requirements doc!
                    </div>
                </div>
            </div>
            <div className={styles.messageWrapper}>
                <div>
                    <div className={styles.details}>
                        <h5>You</h5>
                        Friday 2:20pm
                    </div>
                    <div className={styles.message}>
                        Awesome! Thanks.
                    </div>
                </div>
            </div>
            <Divider>Today</Divider>
            <div className={`${styles.messageWrapper} ${styles.receiver}`}>      
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="Remy Sharp" src={avatar} />
                </StyledBadge>
                <div>
                    <div className={styles.details}>
                        <h5>Phoenix Baker</h5>
                        Friday 2:20pm
                    </div>
                    <div className={styles.message}>
                        Hey Olivia, can you please review the latest design when you can?
                    </div>
                </div>
            </div>
            <div className={styles.messageWrapper}>
                <div>
                    <div className={styles.details}>
                        <h5>You</h5>
                        Friday 2:20pm
                    </div>
                    <div className={styles.message}>
                        Sure thing, I’ll have a look today.
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className={styles.sendForm}>  
        <TextField
            className={styles.sendInput}
            placeholder="Message"
            variant="outlined"
        />
        <LoadingButton className={styles.sendButton} variant="contained">
            <Send />
        </LoadingButton>
      </div>
    </div>
  )
}

export default ChatBox
