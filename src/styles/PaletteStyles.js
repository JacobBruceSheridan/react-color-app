import sizes from './Sizes';

export default {
    Palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    colors: {
        height: '90%',
        [sizes.down('lg')]: {
            overflowY: 'scroll'
        }
    },
    goBack: {
        width: '20%',
        height: '50%',
        margin: 'auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-4px',
        opacity: 1,
        backgroundColor: 'black',
        '& a': {
            color: 'white',
            width: '100px',
            height: '30px',
            position: 'absolute',
            display: 'inline-block',
            top: '50%',
            left: '50%',
            marginTop: '-15px',
            marginLeft: '-50px',
            textAlign: 'center',
            outline: 'none',
            background: 'rgba(255,255,255,0.3)',
            fontSize: '1rem',
            lineHeight: '30px',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
        },
        [sizes.down('lg')]: {
            width: '25%',
            height: '50%'
        },
        [sizes.down('me')]: {
            width: '50%',
            height: '25%',
        },
        [sizes.down('xs')]: {
            width: '100%',
            height: '10%',
        }
    }
}