interface SpaceProps {
    horizontal?: boolean;
    px: number;
}

const Space = ({ horizontal, px }: SpaceProps) => {
    const style = horizontal ? { width: `${px}px` } : { height: `${px}px` };

    return <div style={style} />;
};

export default Space;
