import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NavbarStyles';


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            format: 'hex',
            open: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    handleChange(evt) {
        this.setState({ format: evt.target.value, open: true });
        this.props.handleChange(evt.target.value);
    }
    closeSnackbar() {
        this.setState({ open: false });
    }

    render() {
        const { level, changeLevel, classes } = this.props;
        const { format, open } = this.state;
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>Color App</Link>
                </div>
                {this.props.showingAllColors && (
                    <div>
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider defaultValue={level} min={100} max={900} step={100} onChange={changeLevel} />
                        </div>
                    </div>
                )}
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleChange}>
                        <MenuItem value="hex">Hex - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={open}
                    autoHideDuration={3000}
                    message={<span>Format Changed</span>}
                    ContentProps={{
                        "aria-describedby": "messege-id"
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton color='inherit' key='close' aria-label='close'>
                            <CloseIcon onClick={this.closeSnackbar} />
                        </IconButton>
                    ]}
                />
            </header>
        )
    }
}

export default withStyles(styles)(Navbar);
