export const drowdownStyles = {
    control: (provided, state) => {
        console.log('Style', state)
        return {
        ...provided,
        minHeight: '50px',
        backgroundColor: '#151515',
        border: state.menuIsOpen ? '3px solid #272c33' : '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        color: '#d0d0d0',
        outline: 'none',
        webkitBoxShadow: 'none',
        boxShadow: 'none',
        fontSize: '14px',
        fontFamily: "Helvetica-Light",
        ":hover": {
            border: state.menuIsOpen ? '3px solid #272c33' : '1px solid rgba(255, 255, 255, 0.2) !important',
        }
    }},
    menuList: (provided, state) => ({
        ...provided,
        minHeight: '50px',
        backgroundColor: '#151515',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        color: '#d0d0d0',
        outline: 'none',
        webkitBoxShadow: 'none',
        boxShadow: 'none',
        fontSize: '14px',
        fontFamily: "Helvetica-Light"
    }),
    menu: (provided, state) => ({
        ...provided,
        borderRadius: '8px',
        color: '#d0d0d0'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: '#d0d0d0',
    }),
    option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
        ...provided,
        backgroundColor: "#151515",
        ':active': {
            backgroundColor: '#F24462'
        },
        ':hover': {
            backgroundColor: '#151515"'
        },
        ':focus': {
            backgroundColor: '#151515"'
        }
    }),
    input: provided => ({
        ...provided,
        color: "#d0d0d0"
    }),
};