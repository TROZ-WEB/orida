export interface PollAdapterCreateProps {
    question: string;
    responses: string[];
}

export interface PollAdapterCreateResponse {
    id: string;
}

interface Response {
    id: string;
    label: string;
}

interface Choice {
    id: string;
    label: string;
}

export interface PollResults {
    question: string;
    total: number;
    choices: Choice[],
    responses: Response[];
}

export interface TypeformResultItemAnswer {
    field: {
        id: string;
        ref: string;
        type: string;
    };
    type: string;
    choice: {
        id: string;
        ref: string;
        label: string;
    };
}

export interface TypeformResultItem {
    landing_id: string;
    token: string;
    response_id: string;
    landed_at: Date;
    submitted_at: Date;
    metadata: {
        user_agent: string;
        platform: string;
        referer: string;
        network_id: string;
        browser: string
    };
    hidden: Record<string, string>;
    calculated: {
        score: number;
    };
    answers: TypeformResultItemAnswer[];
}

export interface TypeformResult {
    total_items: number;
    page_count: number;
    items: TypeformResultItem[];
}

export interface TypeformSettings {
    title: string;
    type: string;
    hidden: string[];
    fields: {
        properties: {
            allow_multiple_selection: boolean;
            allow_other_choice: boolean;
            choices: {
                label: string;
                ref: string;
            }[]
            description: string,
            randomize: boolean;
            vertical_alignment: boolean;
        },
        ref: string;
        title: string,
        type: string;
        validations: {
            required: boolean;
        },
    }[],
    workspace: {
        href: string;
    },
    thankyou_screens: {
        properties: {
            show_button: boolean;
            share_icons: boolean;
        },
        title: string;
    }[],
}

export interface TypeformForm {
    id: string;
    type: string;
    title: string;
    workspace: {
        href: string;
    };
    theme: {
        href: string;
    };
    settings: {
        language: string;
        progress_bar: string;
        meta: {
            allow_indexing: boolean
        };
        hide_navigation: boolean;
        is_public: true;
        is_trial: boolean;
        show_progress_bar: boolean;
        show_typeform_branding: boolean;
        are_uploads_public: boolean;
        show_time_to_complete: boolean;
        show_number_of_submissions: boolean;
        show_cookie_consent: boolean;
        pro_subdomain_enabled: boolean;
        capabilities: {
            e2e_encryption: {
                enabled: boolean;
                modifiable: boolean;
            };
        };
    },
    thankyou_screens: {
        id: string,
        ref: string,
        title: string,
        properties: {
            show_button: boolean,
            share_icons: false,
            button_mode: string,
            button_text: string
        },
        attachment: {
            type: string,
            href: string
        }
    }[],
    fields: [
        {
            id: string;
            title: string;
            ref: string;
            properties: {
                randomize: false,
                allow_multiple_selection: false,
                allow_other_choice: false,
                vertical_alignment: boolean,
                choices: {
                    id: string;
                    ref: string;
                    label: string;
                }[];
            },
            validations: {
                required: boolean
            },
            type: string
        }
    ],
    hidden: string[],
    _links: {
        display: string;
    }
}
