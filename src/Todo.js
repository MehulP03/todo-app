import React, {useState} from 'react';
import './Todo.css';
import {Button, Container, List, makeStyles, Modal} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import db from './firebase';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const updateTodo = () => {
        // update the todo with the new input text 

        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true });

        setOpen(false);
    }
    return (
        //Open update modal
        <>
        <Modal
        open={open}
        onClose={e => setOpen(false)}
        >
            <div className={classes.paper}>
                <h1>I am a model</h1>
                <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                <Button type='submit' onClick={updateTodo} variant="outlined" color="primary">Update Todo</Button>
            </div>
        </Modal>
        
        
        <List>  
        <Container maxWidth="sm">  
        <Card>   
        <CardContent>
        {props.todo.todo} 
        </CardContent>        
        <CardActions>
            <EditIcon onClick={e =>setOpen(true)}/>
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
      </CardActions>
                
        
                
        </Card>
        </Container>
        </List>
        
        </>
    )
}

export default Todo
