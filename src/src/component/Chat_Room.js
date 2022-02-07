import { Button, Container, TextField } from "@mui/material";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { firebaseConfig } from "../firebase.config";

function Chat(){

    const[input, setInput] = useState();
    const[messages, setMessages] = useState([]);
    useEffect(() => {
        db.collection("messages")
            .orderBy("timestamp")
            .onSnapshot((snapshot) =>{
                setMessages(
                    snapshot.doc.map((doc) => ({
                        id: doc.uid,
                        message: doc.data().message,
                    }))
                );
            });
    },[]);

    const addMessage = (event) =>{
        event.preventDefault();
        db.collection("messages").add({
            message: input,
            timestamp: firestore.fieldValue.serverTimestamp(),
        });
        setInput("");
        
    }
    return(
        <>
        <h3>You are in chat Room</h3>
        <Container maxWidth="sm">
        <TextField id="standard-basic" label="Type Something" variant="standard" value={input} onChange={(event) => setInput(event.target.value)} />
            <Button type="submit" onClick={addMessage} variant="contained">Send</Button>
        </Container>
        </>
    );
    
};
export default Chat;
