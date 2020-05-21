import chroma from 'chroma-js';

import sizes from './Sizes';

const styles = {
    root: {
        width: '20%',
        height: '25%',
        margin: 'auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-1px',
        marginTop: '-4px',
        '&:hover svg': {
            transform: 'scale(1.5)'
        },
        [sizes.down('lg')]: {
            width: '25%'
        },
        [sizes.down('me')]: {
            width: '50%',
            height: '10%'
        },
        [sizes.down('sm')]: {
            width: '100%',
            height: '10%'
        },
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0px',
        padding: '10px',
        color: props => chroma(props.color).luminance() <= 0.08 ? 'white' : 'black',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '10px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out'
    }
}

export default styles;