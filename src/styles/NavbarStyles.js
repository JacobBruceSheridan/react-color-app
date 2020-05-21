import sizes from './Sizes';

export default {
    slider: {
        width: '340px',
        margin: '0 10px',
        display: 'inline-block',
        '& .rc-slider-track': {
            backgroundColor: 'transparent'
        },
        [sizes.down('me')]: {
            width: '200px'
        }
    },
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '6vh'
    },
    logo: {
        marginRight: '15px',
        padding: '0 13px',
        fontSize: '22px',
        background: '#eceff1',
        fontFamily: 'Roboto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: 'black'
        },
        [sizes.down('xs')]: {
            display: 'none'
        }
    },
    selectContainer: {
        marginLeft: 'auto',
        marginRight: '1rem'
    }
}