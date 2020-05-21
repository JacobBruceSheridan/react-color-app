import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';


class MiniPalette extends PureComponent {
    constructor(props) {
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    deletePalette(e) {
        e.stopPropagation();
        e.preventDefault()
        this.props.openDialog(this.props.id);
    }

    handleClick() {
        this.props.goToPalette(this.props.id);
    }

    render() {
        const { classes, paletteName, colors } = this.props;
        const miniColorBoxes = colors.map(color => (
            <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name} />
        ));
        return (
            <div className={classes.root} onClick={this.handleClick} >
                <DeleteIcon onClick={this.deletePalette} className={classes.deleteIcon} />
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>{paletteName}</h5>
            </ div>
        )
    }
}

export default withStyles(styles)(MiniPalette);