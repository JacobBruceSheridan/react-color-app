import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';


export default class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 'form',
            newPaletteName: ''
        }
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    showEmojiPicker = () => {
        //Uncomment line 44 and comment lines 45-48 to enable emoji-picker
        // this.setState({ stage: 'emoji' })
        this.props.handleSubmit({
            paletteName: this.state.newPaletteName,
            emoji: '🎨'
        })
    }

    savePalette = (emoji) => {
        this.props.handleSubmit({
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        });
        this.setState({ stage: '' })
    }

    render() {
        const { stage, newPaletteName } = this.state;
        const { hideForm, handleSubmit } = this.props;
        return (
            <div>
                <Dialog open={stage === 'emoji'}>
                    <DialogTitle>Pick a Palette Emoji</DialogTitle>
                    <Picker onSelect={this.savePalette} title="Pick a Palette Emoji" />
                </Dialog>
                <Dialog open={stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for the palette. Make sure it is unique.
                        </DialogContentText>
                            <TextValidator
                                value={newPaletteName}
                                label="Palette Name"
                                name="newPaletteName"
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Palette name required', 'Name already used']}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideForm} color="primary">
                                Cancel
                        </Button>
                            <Button variant='contained' color="primary" type="submit">Save Palette</Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}
