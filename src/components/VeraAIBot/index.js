import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, TextField, Drawer } from '@mui/material';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import { ReactComponent as BotIcon } from '../../assets/icons/bot-icon.svg';
import { ReactComponent as Logo } from '../../assets/nav-vera-icon.svg'
import { ReactComponent as Mic } from '../../assets/icons/microphone-r.svg'
import { ReactComponent as Image } from '../../assets/icons/Image-r.svg'
import { ReactComponent as Send } from '../../assets/icons/PaperPlaneRight-r.svg'
import botProfile from '../../assets/icons/chat-profile.png'
import axios from 'axios';

// style
import styles from './aiBot.module.scss'

const VeraAiBot = () => {
    const [open, setOpen] = useState(null);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    // https://aa0b-39-53-157-90.ngrok-free.app/api/chat/chats/

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const sendMessage = async () => {
        setLoading(true);
        setChat((prev) => [...prev, {
            message: message,
            role: 'user'
        }]);
        setMessage('');
        await axios.post('https://aa0b-39-53-157-90.ngrok-free.app/api/chat/chats/', {
            "message": message,
            // "chat_id": 3
        }).then((res) => {
            let result = res.data;
            console.log('res', result);
            setChat((prev) => [...prev, {
                message: result.message,
                role: 'bot'
            }]);
        }).catch((error) => {
            console.log("error", error);
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        if(scrollRef.current){
            console.log('called', scrollRef.current)
            let scrollContainer = scrollRef?.current;
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [chat]);
    
    useEffect(() => {
        const keyDownHandler = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if(message && !loading){
                sendMessage();
            }
        }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [message]);

    return (
        <Box className={styles.veraBot}>
            <Fab color="primary" onClick={handleClick}>
                <BotIcon />
            </Fab>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={handleClose}
                className={styles.chatWrapper}
                sx={{ zIndex: '9999999999 !important',}}
            >
                <Box className={styles.header}>
                    <Logo />
                    <h4>Vera AI Bot</h4>
                </Box>
                <Box className={styles.messageWrapper}>
                    <Box className={styles.chatMessage} ref={scrollRef}>
                        <Box className={styles.messageWrap}>
                            <img src={botProfile} alt="bot profile" />
                            <Box className={styles.message}>
                                <b>Operator</b>
                                Hi there 👋<br />
                                What brings you to Intercom today?
                            </Box>
                        </Box>
                        {chat.map((item, i) => (    
                            <Box key={i} className={item.role === 'bot' ? styles.messageWrap : styles.messageWrapRight}>
                                {item.role === 'bot' && (<img src={botProfile} alt="bot profile" />)}
                                <Box className={styles.message}>
                                    {item.message}
                                </Box>
                            </Box>
                        ))}

                        {/* <Box className={styles.messageWrapRight}>
                            <Box className={styles.message}>
                                I'm new and want to learn about Vera.
                            </Box>
                        </Box>
                        <Box className={styles.messageWrapRight}>
                            <Box className={styles.message}>
                                I’m a current customer with a question.
                            </Box>
                        </Box>
                        <Box className={styles.messageWrapRight}>
                            <Box className={styles.message}>
                                Just browsing!
                            </Box>
                        </Box> */}
                    </Box>
                    <Box className={styles.messageSender}>
                        <IconButton color="primary" aria-label="mic" component="label">
                            <Mic />
                        </IconButton>
                        <IconButton color="primary" aria-label="image" component="label">
                            <Image />
                        </IconButton>

                        <TextField 
                            name="message"
                            fullWidth
                            value={message}
                            variant="outlined" 
                            placeholder="Type message" 
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Box className={styles.sendBtnWrapper}>
                            {loading ? (
                                <CircularProgress
                                    size={24}
                                    sx={{color: '#006766'}}
                                />
                            ) : (
                                <IconButton 
                                    onClick={sendMessage} 
                                    color="primary" 
                                    aria-label="send" 
                                    component="label"
                                    disabled={!message}
                                >
                                    <Send />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                </Box>

            </Drawer>
        </Box>
    )
}

export default VeraAiBot
