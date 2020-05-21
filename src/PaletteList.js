import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';


class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDeleteDialog: false,
            deleteId: ''
        };
        this.goToPalette = this.goToPalette.bind(this);
    }

    openDialog = (id) => {
        this.setState({ openDeleteDialog: true, deleteId: id });
    }
    closeDialog = () => {
        this.setState({ openDeleteDialog: false, deleteId: '' });
    }
    handleDelete = () => {
        this.props.deletePalette(this.state.deleteId);
        this.closeDialog();
    }

    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    render() {
        const { palettes, classes } = this.props;
        const { openDeleteDialog } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors App</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(p => (
                            <CSSTransition key={p.id} classNames='fade' timeout={500}>
                                <Link to={`/palette/${p.id}`}>
                                    <MiniPalette {...p} key={p.id} id={p.id} goToPalette={this.goToPalette} openDialog={this.openDialog} />
                                </Link>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog open={openDeleteDialog} aria-labelledby='delete-dialog-title' onClose={this.closeDialog}>
                    <DialogTitle id='delete-dialog-title'>Delete this Pelette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Delete' />
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Cancel' />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);
