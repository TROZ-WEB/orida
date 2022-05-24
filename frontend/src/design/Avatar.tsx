import classnames from '@utils/classnames';

const classes = {
    wrapper: `
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

interface Props {
    initials: string;
    pictureURL?: string | null;
    size?: number;
    className?: string;
}

const Avatar = ({ initials, pictureURL, size = 40, className }: Props) => (
    <div
        className={classnames(classes.wrapper, className)}
        style={{ width: `${size}px`, height: `${size}px` }}
    >
        {pictureURL ? (
            <img alt='user avatar' className={classes.picture} src={pictureURL} />
        ) : (
            `${initials}`
        )}
    </div>
);

export default Avatar;
