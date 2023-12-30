
import React from 'react';
import { UserData } from '../types/type';


interface UserTableProps {
    data: UserData[];
}

const UserTable: React.FC<UserTableProps> = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full  bg-white border border-gray-300">
                <thead className="dark:bg-gray-800 bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-white text-black uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-white text-black uppercase tracking-wider">
                            Full Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-white text-black uppercase tracking-wider">
                            Email
                        </th>
                    </tr>
                </thead>
                <tbody className="dark:bg-gray-800 bg-gray-50 divide-y divide-gray-200">
                    {data.length === 0 ? <tr><td colSpan={3} className="text-center">No User Available</td></tr> : data.map(({ _id, fullName, email }) => (
                        <tr key={_id}>
                            <td className="px-6 py-4 whitespace-nowrap dark:text-white text-black ">{_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap dark:text-white text-black ">{fullName}</td>
                            <td className="px-6 py-4 whitespace-nowrap dark:text-white text-black ">{email}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    );
};

export default UserTable;