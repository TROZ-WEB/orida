import React from 'react';
import PropTypes from 'prop-types';

interface SpaceProps {
    horizontal?: boolean;
    px: number;
}

const Space = ({ horizontal, px }: SpaceProps) => {
    const style = horizontal ? { width: `${px}px` } : { height: `${px}px` };

    return (<div style={style} />);
};

Space.propTypes = {
    px: PropTypes.number.isRequired,
    horizontal: PropTypes.bool,
};

export default Space;
