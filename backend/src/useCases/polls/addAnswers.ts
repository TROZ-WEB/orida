import { Poll } from '../../domain/Poll';
import { Post } from '../../domain/Post';
import { User } from '../../domain/User';

const hasAnswered = (poll: Poll, user: User): boolean => {
    const usersWithAnAnswer = poll.responses.map((response) => response.user.id);

    return usersWithAnAnswer.includes(user.id);
};

interface HasAnsweredProps {
    posts: Post[];
    user: User;
}

// given a list of posts, add the value of answered for a given user
const addAnswers = ({ posts, user }: HasAnsweredProps): Post[] => posts.map((post) => {
    if (!post.poll) {
        return post;
    }

    return {
        ...post,
        poll: {
            ...post.poll,
            answered: hasAnswered(post.poll, user),
        },
    };
});

export default addAnswers;
