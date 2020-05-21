import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from "@material-ui/core/styles";
import styles from './styles/ColorPickerStyles';


class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newColorName: '',
            currentColor: 'black'
        }
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorUnique', value =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
        ValidatorForm.addValidationRule('isNameUnique', value =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    changeColor = (newColor) => {
        this.setState({ currentColor: newColor.hex });
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor);
        this.setState({
            newColorName: '',
            currentColor: 'black'
        });
    }

    render() {
        const { isPaletteFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;
        return (
            <div>
                <ChromePicker
                    color={currentColor}
                    onChange={this.changeColor}
                    disableAlpha
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
                    <TextValidator
                        value={newColorName}
                        name="newColorName"
                        variant='filled'
                        margin='normal'
                        placeholder="Color Name"
                        className={classes.colorName}
                        onChange={this.handleChange}
                        validators={['required', 'isNameUnique', 'isColorUnique']}
                        errorMessages={['This field is required', 'Color name must be unique', 'Color must be unique']}
                    />
                    <Button
                        variant='contained'
                        type='submit'
                        color='primary'
                        className={classes.addColor}
                        disabled={isPaletteFull}
                        style={{ backgroundColor: isPaletteFull ? 'grey' : currentColor }}
                    >
                        {isPaletteFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPicker);
