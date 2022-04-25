import ProjectList from '@components/ProjectList';
import { Theme } from '@customTypes/theme';
import { SearchInput } from '@design/inputs';
import Layout from '@design/layouts/Layout';
import Space from '@design/Space';
import useDebounce from '@hooks/useDebounce';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { resetSearch, search } from '@store/projects/actions';
import { ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
    const projects = useSelector((state) => state.projects.search);
    const dispatch = useThunkDispatch();
    const { register } = useForm();
    const [params] = useSearchParams();

    const debouncedSearch = useDebounce((value: string) => {
        dispatch(search(value));
    }, 300);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value.length === 0) {
            dispatch(resetSearch());
        }
        if (value.length > 3) {
            debouncedSearch(value);
        }
    };

    useEffect(() => {
        // retrieve serch from search param "search"
        const urlSearch = params.get('search');
        if (urlSearch) {
            dispatch(search(urlSearch));
        }
    }, []);

    return (
        <Layout backgroundClassName='bg-primary'>
            <Space px={80} />
            <form className='w-full'>
                <SearchInput
                    className='text-3xl pl-14 pb-1'
                    name='search'
                    onChange={onInputChange}
                    placeholder='Recherche'
                    register={register}
                    theme={Theme.Dark}
                    type='search'
                />
            </form>
            <Space px={24} />
            <div className='flex w-full'>
                <ProjectList className='w-1/3' projects={projects} />
            </div>
        </Layout>
    );
};

export default Search;
