import Layout from '@design/layouts/Layout';
import { H1 } from '@design/titles';
import { Widget } from '@typeform/embed-react';
import { GET } from '@utils/http';
import { useEffect, useState } from 'react';

// const TestPoll = () => {
//     return (
//         <Button>
//             <PopupButton id='D5sLKQEP' style={{ fontSize: 20 }}>
//                 Répondre au sondage
//             </PopupButton>
//         </Button>
//     );
// };

const Inline = () => {
    return <Widget id='D5sLKQEP' style={{ width: '50%', height: '420px' }} />;
};

interface PollResponse {
    label: string;
    id: string;
    count: number;
}

const PollTestPage = () => {
    const [responses, setResponses] = useState<number>(0);
    const [details, setDetails] = useState<PollResponse[]>([]);

    useEffect(() => {
        GET<any>('/api/polls/').then((response) => {
            setResponses(response.total);
            setDetails(response.values);
        });
    });

    return (
        <Layout>
            <H1>Poll test page</H1>
            <Inline />
            Responses: {responses}
            <div>
                {details.map((d) => (
                    <div>{`${d.label} : ${d.count}`}</div>
                ))}
            </div>
        </Layout>
    );
};

export default PollTestPage;
