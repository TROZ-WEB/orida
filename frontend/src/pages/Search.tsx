import Layout from '@components/Layout';
import { SearchInput } from '@design/inputs';
import Space from '@design/Space';
import useDebounce from '@hooks/useDebounce';
import React, { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

const Search = () => {
    const { register } = useForm();
    const onInputChange = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value.length > 3) {
            console.info(value);
        }
    }, 300);

    return (
        <Layout backgroundClassName="bg-primary">
            <Space px={80} />
            <form className="w-full">
                <SearchInput
                    className="text-3xl pl-14 pb-1"
                    name="search"
                    onChange={onInputChange}
                    placeholder="Recherche"
                    register={register}
                    theme="dark"
                    type="search"
                />
            </form>
        </Layout>
    );
};

export default Search;
