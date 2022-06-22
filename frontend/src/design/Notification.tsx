import Icon from '@design/Icon';
import { Paragraph } from '@design/texts';
import colors from '@styles/colors';
import classnames from '@utils/classnames';
import ReactHtmlParser from 'html-react-parser';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';
import Divider from './Divider';

interface NotificationProps {
    className?: string;
    link: string;
    text: string;
    isNew: boolean;
    imageURL?: string;
}

const classes = {
    content: 'flex py-2 px-4 hover:bg-background-hover',
    iconBackground: 'rounded-full bg-primary w-8 h-8 flex items-center justify-center shrink-0',
    imageWrapper: 'relative w-8 h-8 mr-3',
    newNotification:
        'absolute h-3 w-3 bg-error rounded-full bottom-0 right-0 translate-x-[25%] translate-y-[25%]',
    text: 'text-ellipsis line-clamp-3',
};

const Notification = ({
    className,
    link,
    text,
    isNew,
    imageURL,
}: PropsWithChildren<NotificationProps>) => {
    return (
        <Link to={link}>
            <div className={classnames(classes.content, className)}>
                <div className={classes.imageWrapper}>
                    {imageURL ? (
                        <Avatar pictureURL={imageURL} size={32} />
                    ) : (
                        <div className={classes.iconBackground}>
                            <Icon color={colors.default} name='bell' />
                        </div>
                    )}
                    {isNew && <span className={classes.newNotification} />}
                </div>
                <Paragraph className={classes.text}>{ReactHtmlParser(text)}</Paragraph>
            </div>
            <Divider />
        </Link>
    );
};

export default Notification;
