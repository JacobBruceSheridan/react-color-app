import sizes from './Sizes';
import bg from './bg.svg';

export default {
    '@global': {
        '.fade-exit': {
            opacity: 1
        },
        '.fade-exit-active': {
            opacity: 0,
            transition: 'opacity 500ms ease-out'
        }
    },
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#394bad',
        backgroundImage: `url(${bg})`,
        /* background by SVGBackgrounds.com */
        overflow: 'scroll',
        overflowX: 'hidden'
    },
    heading: {
        fontSize: '2rem'
    },
    container: {
        width: '60%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        [sizes.down('lg')]: {
            width: '80%'
        },
        [sizes.down('xs')]: {
            width: '75%'
        }
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: 'white',
        alignItems: 'center',
        '& a': {
            color: 'white'
        }
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '1.5rem',
        marginBottom: '30px',
        [sizes.down('me')]: {
            gridTemplateColumns: 'repeat(2,50%)'
        },
        [sizes.down('xs')]: {
            gridTemplateColumns: 'repeat(1,100%)'
        }
    }
}