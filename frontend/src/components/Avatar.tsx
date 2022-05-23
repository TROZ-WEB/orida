import classnames from '@utils/classnames';
import { CSSProperties } from 'react';

const classes = {
    wrapper: `
        border-2
        border-background
        flex
        items-center
        justify-center
        rounded-full
        bg-primary
        text-white
        overflow-hidden
    `,
    picture: `
        w-full
    `,
};

interface AvatarProps {
    className?: string;
    initials?: string;
    pictureURL?: string | null;
    size?: number;
    style?: CSSProperties;
}

const Avatar = ({ className, initials, pictureURL, size = 40, style }: AvatarProps) => (
    <div
        className={classnames(classes.wrapper, className)}
        style={{ ...style, width: `${size}px`, height: `${size}px` }}
    >
        {pictureURL ? (
            <img alt='user avatar' className={classes.picture} src={pictureURL} />
        ) : (
            `${initials}`
        )}
    </div>
);

export default Avatar;
