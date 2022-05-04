import { SubmitButton } from '@design/buttons';
import { TextInput } from '@design/inputs';
import Space from '@design/Space';
import PollService from '@services/polls';
import { useForm } from 'react-hook-form';

type Inputs = {
    question: string;
    responses: string;
};

interface PollCreateFormProps {
    projectId: string;
    onSubmit: () => void;
}

const PollCreateForm = ({ projectId, onSubmit }: PollCreateFormProps) => {
    const { register, handleSubmit } = useForm<Inputs>();

    const onCreate = async (data: Inputs) => {
        await PollService.create({
            project: projectId,
            question: data.question,
            responses: data.responses.split(','),
        });
        onSubmit();
    };

    return (
        <form className='max-w-[500px]' onSubmit={handleSubmit(onCreate)}>
            <TextInput
                label='Question'
                name='question'
                placeholder='Quel emplacement pour le street workout ?'
                register={register}
                required
            />
            <Space px={16} />
            <TextInput
                label='Réponses (séparées par une virgule)'
                name='responses'
                placeholder='rue nationale, place saint marc, avenue de la paix'
                register={register}
                required
            />
            <Space px={8} />
            <SubmitButton
                className='bg-secondary hover:bg-secondary-hover'
                value='Créer le sondage'
            />
        </form>
    );
};

export default PollCreateForm;
