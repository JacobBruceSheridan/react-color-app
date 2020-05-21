import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from './DraggableColorList';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPicker from './ColorPicker';
import styles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';


class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            colors: seedColors[0].colors,
        };
        this.removeColor = this.removeColor.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor = (newColor) => {
        this.setState({ colors: [...this.state.colors, newColor], newColorName: '' });
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit = (newPalette) => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
        newPalette.colors = this.state.colors;
        this.props.savePalette(newPalette);
        this.props.history.push('/');
    }

    removeColor(colorName) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    }

    clearColors = () => {
        this.setState({ colors: [] });
    }

    addRandomColor = () => {
        // const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        // this.setState({ currentColor: `#${randomColor.toString()}` })
        const allColors = this.props.palettes.map(p => p.colors).flat();
        let rand;
        let randomColor;
        let isDuplicateColor = true;
        while (isDuplicateColor) {
            rand = Math.floor(Math.random() * allColors.length);
            randomColor = allColors[rand];
            isDuplicateColor = this.state.colors.some(
                color => color.name === randomColor.name
            );
        }
        this.setState({ colors: [...this.state.colors, randomColor] });
    }

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const isPaletteFull = colors.length >= maxColors;

        return (
            <div className={classes.root}>
                <PaletteFormNav classes={classes} open={open} palettes={palettes} handleDrawerOpen={this.handleDrawerOpen} handleSubmit={this.handleSubmit} />
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
                        <div className={classes.btns}>
                            <Button variant='contained' className={classes.button} color='secondary' onClick={this.clearColors} >
                                Clear Palette
                        </Button>
                            <Button variant='contained' className={classes.button} color='primary' disabled={isPaletteFull} onClick={this.addRandomColor}>
                                Random Color
                        </Button>
                        </div>
                        <ColorPicker isPaletteFull={isPaletteFull} addNewColor={this.addNewColor} colors={colors} />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList colors={colors} removeColor={this.removeColor} axis="xy" onSortEnd={this.onSortEnd} distance={10} />
                </main>
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);