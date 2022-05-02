import { Role } from '@customTypes/role';
import { ToggleSwitch } from '@design/inputs';
import Layout from '@design/layouts/Layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@design/table';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { User } from '@services/users';
import { getAllUsers, updateRole } from '@store/admin/actions';
import { useEffect } from 'react';

const AccountsPage = () => {
    const dispatch = useThunkDispatch();
    const accounts = useSelector((state) => state.admin.users);
    const me = useSelector((state) => state.auth.data);

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    const onRoleChange = (user: User, value: boolean) => {
        const newRole = value ? Role.Manager : Role.None;
        dispatch(updateRole(user, newRole));
    };

    return (
        <Layout>
            <Table className='mt-2'>
                <Thead>
                    <Tr>
                        <Th>Admin</Th>
                        <Th>Gestionnaire ?</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {accounts.map((user) => (
                        <Tr key={user.id}>
                            <Td>{user.email}</Td>
                            <Td>
                                <ToggleSwitch
                                    checked={[Role.Manager, Role.Admin].includes(user.role)}
                                    disabled={user.id === me.id}
                                    id={user.id}
                                    name='toggle'
                                    onChange={(newValue) => onRoleChange(user, newValue)}
                                    optionLabels={['oui', 'non']}
                                    small
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Layout>
    );
};

export default AccountsPage;
