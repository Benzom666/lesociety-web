export const drowdownStyles = {
    indicatorsContainer: (provided, state) => { 
        // if (state?.selectProps?.withIcon) {
        //     return {
        //         ...provided,
        //         color: 'hsl(0, 0%, 90%) !important',
        //         width: '50px',
        //         height: '50px',
        //         justifyContent: 'center',
        //         "svg": {
        //             height: '24px',
        //             width: '24px'
        //         },
        //         "div": {
        //             color: 'hsl(0, 0%, 90%) !important',
        //         }
        //     } 
        // } else {
        //     return {
        //         ...provided,
        //         color: 'hsl(0, 0%, 90%) !important',
        //         width: '50px',
        //         height: '50px',
        //         justifyContent: 'center',
        //         display: 'none',
        //         "div": {
        //             color: 'hsl(0, 0%, 90%) !important',
        //         }
        //     }
        // }
        return { 
            display: 'none'
        }
    },
    indicatorSeparator: (provided, state) => ({
        ...provided,
            display: 'none',
        marginBottom: "0px",
        marginTop: "0px",
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    }),
    control: (provided, state) => {
        const isMobile = typeof window  !== "undefined" && window.matchMedia('only screen and (max-width: 760px)').matches;
        return {
        ...provided,
        minHeight: '50px',
        height: "50px",
        backgroundColor: '#151515',
        border: state.menuIsOpen && !state?.selectProps?.withIcon ? '1px solid rgba(255, 255, 255, 0.2)' : !state.menuIsOpen && state?.selectProps.touched && state?.selectProps.error  ? "3px solid #F24462" : '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: state.menuIsOpen ? '8px 8px 0px 0px' : '8px',
        color: '#d0d0d0',
        outline: 'none',
        webkitBoxShadow: 'none',
        boxShadow: 'none',
        fontSize: isMobile ? "16px" : '14px',
        fontFamily: "Helvetica-Light",
        ":hover": {
            border: state.menuIsOpen && !state?.selectProps?.withIcon ? '1px solid rgba(255, 255, 255, 0.2)' : !state.menuIsOpen && state?.selectProps.touched && state?.selectProps.error  ? "3px solid #F24462" : '1px solid rgba(255, 255, 255, 0.2) !important',
        }
    }},
    menuList: (provided, state) => {
        const isMobile = window !== "undefined" && window.matchMedia('only screen and (max-width: 760px)').matches;
        return { ...provided,
        minHeight: '55px',
        backgroundColor: '#151515',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        // borderRadius: state?.selectProps?.withIcon ? '0px 0px 8px 8px' : "8px",
        borderRadius: '0px 0px 8px 8px',
        color: '#d0d0d0',
        outline: 'none',
        webkitBoxShadow: 'none',
        boxShadow: 'none',
        fontSize: isMobile ? "16px" : '14px',
        fontFamily: "Helvetica-Light"}
    },
    menu: (provided, state) => { 
        return {
        ...provided,
        borderRadius: '8px',
        color: '#d0d0d0',
        borderRadius: '0px 0px 8px 8px',
        marginTop: '-1px'
        // borderRadius: state?.selectProps?.withIcon ? '0px 0px 8px 8px' : "8px",
        // marginTop: state?.selectProps?.withIcon ?  '-1px' : '4px'
    }},
    singleValue: (provided, state) => ({
        ...provided,
        color: '#d0d0d0',
    }),
    option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
        ...provided,
        backgroundColor: "#151515",
        ':active': {
            backgroundColor: '#272c33'
        },
        ':hover': {
            backgroundColor: '#151515"'
        },
        ':focus': {
            backgroundColor: '#151515"'
        },
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
    }),
    input: provided => ({
        ...provided,
        color: "#d0d0d0"
    }),
};