/* global NodeJS */
import { Category } from '../domain/Category';
import { Organization } from '../domain/Organization';
import { Poll } from '../domain/Poll';
import { Post } from '../domain/Post';
import { Project } from '../domain/Project';
import { ProjectStatus } from '../domain/ProjectStatus';
import { Thread } from '../domain/Thread';
import { User } from '../domain/User';

export const mapUser = (user: User) => ({
    email: user.email,
    fullname: user.fullname,
    id: user.id,
    lastname: user.lastname,
    role: user.role,
});

export const mapProjectStatus = (status: ProjectStatus) => ({
    id: status.id,
    label: status.label,
});

export const mapPoll = (poll: Poll) => ({
    id: poll.id,
    post: poll.post,
    externalPollId: poll.externalPollId,
    answered: poll.responses.length !== 0,
});

export const mapThread = (thread: Thread) => ({
    id: thread.id,
    subject: thread.subject,
    createdAt: thread.createdAt,
});

export const mapPost = (post: Post) => ({
    id: post.id,
    type: post.type,
    poll: post.poll ? mapPoll(post.poll) : undefined,
    thread: post.thread ? mapThread(post.thread) : undefined,
    date: post.date,
});

export const mapProject = (project: Project) => ({
    createdAt: project.createdAt,
    budget: project.budget,
    description: project.description,
    id: project.id,
    images: [
        'https://placekitten.com/177/177?1',
        'https://placekitten.com/177/177?2',
        'https://placekitten.com/177/177?3',
        'https://placekitten.com/177/177?4',
    ], //! MOCK
    location: project.location,
    participatoryBudgetYear: project.participatoryBudgetYear,
    startDate: project.startDate,
    status: mapProjectStatus(project.status),
    title: project.title,
    categories: project.categories,
    posts: project.posts.map((post) => mapPost(post)),
});

export const mapCategory = (category: Category) => ({
    id: category.id,
    label: category.label,
    color: category.color,
    projects: category.projects,
});

export const mapOrganization = (organization: Organization) => ({
    id: organization.id,
    name: organization.name,
    type: organization.type,
    description: organization.description,
    site: organization.site,
    email: organization.email,
    phone: organization.phone,
    facebook: organization.facebook,
    twitter: organization.twitter,
    linkedin: organization.linkedin,
    instagram: organization.instagram,
    projects: organization.projects,
    parentOrganizations: organization.parentOrganizations,
});

export const mapEnvironment = (env: NodeJS.ProcessEnv) => ({
    googleMapsKey: env.GOOGLE_MAPS_KEY,
});
