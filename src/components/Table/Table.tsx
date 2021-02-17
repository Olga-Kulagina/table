import {Spin, Table} from 'antd';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    getSmallTableThunkCreator,
    search,
    setCurrentPage,
    setDisplayTableData, setSelectedUserData,
    setTotalUsersCount
} from '../../redux/tableReducer';
import {AppRootStateType} from '../../redux/redux-store';
import {Paginator} from '../Paginator/Paginator';
import {TableSearch} from '../Search/TableSearch';
import {UserInfo} from '../UserInfo/UserInfo';
import {DataSelector} from '../DataSelector/DataSelector';

type AddressType = {
    streetAddress: string
    city: string
    state: string
    zip: string
}

export type UserType = {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    address: AddressType
    description: string
}


export const UsersTable = () => {
    const dispatch = useDispatch()

//Тестовые пользователи для таблицы
    let testData: Array<UserType> = [
        {
            "id": 274,
            "firstName": "Sangita",
            "lastName": "Jessica",
            "email": "GCoggins@lacus.org",
            "phone": "(888)759-1115",
            "address": {
                "streetAddress": "2122 Adipiscing Ct",
                "city": "Philadelphia",
                "state": "IL",
                "zip": "11243"
            },
            "description": "ipsum facilisis consequat magna nec amet nullam mi convallis ac vitae velit nec augue massa vel elit malesuada eget nunc lacus mattis dolor lacus nullam pharetra mattis libero vel lorem aliquam augue"
        },
        {
            "id": 638,
            "firstName": "Corey",
            "lastName": "Maddalone",
            "email": "PWilliamson@vestibulum.ly",
            "phone": "(371)506-4152",
            "address": {
                "streetAddress": "754 Placerat St",
                "city": "New Port Richey",
                "state": "IA",
                "zip": "25145"
            },
            "description": "convallis amet amet nullam placerat sit vestibulum dolor tellus massa vitae nec mattis hendrerit tellus hendrerit elit tincidunt et sit convallis et at at lacus molestie ipsum aenean ipsum odio amet sapien"
        }
    ]

    let tableData = useSelector<AppRootStateType, Array<UserType>>(state => state.table.tableData)

    let isTableLoading = useSelector<AppRootStateType, boolean>(state => state.table.isTableLoading)
//Сортировка с помощью метода массива sort
    const stringSorterFunction = (a: string, b: string) => {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a: UserType, b: UserType) => a.id - b.id,
        },
        {
            title: 'First name',
            dataIndex: 'firstName',
            key: 'firstName',
            sorter: (a: UserType, b: UserType) => {
                return stringSorterFunction(a.firstName, b.firstName)
            }
        },
        {
            title: 'Last name',
            dataIndex: 'lastName',
            key: 'lastName',
            sorter: (a: UserType, b: UserType) => {
                return stringSorterFunction(a.lastName, b.lastName)
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a: UserType, b: UserType) => {
                return stringSorterFunction(a.email, b.email)
            }
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a: UserType, b: UserType) => {
                return stringSorterFunction(a.phone, b.phone)
            }
        },
    ]

    let displayTableData = useSelector<AppRootStateType, Array<UserType>>(state => state.table.displayTableData)

    let totalUsersCount = useSelector<AppRootStateType, number>(state => state.table.totalUsersCount)
    let pageSize = useSelector<AppRootStateType, number>(state => state.table.pageSize)
    let currentPage = useSelector<AppRootStateType, number>(state => state.table.currentPage)

    let selectedUserData = useSelector<AppRootStateType, UserType>(state => state.table.selectedUserData)

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber))
//Выбор части таблицы
        let newDisplayTableData = tableData.slice((pageNumber - 1) * pageSize, ((pageNumber - 1) * pageSize + pageSize))
        dispatch(setDisplayTableData(newDisplayTableData))
    }
//Фильтрация по подстроке
    const onSearch = (value: string) => {
        dispatch(search(value))
        let newDisplayTableData = tableData.filter(user => {
            return user.firstName.toLowerCase().includes(value.toLowerCase())
                || user.lastName.toLowerCase().includes(value.toLowerCase())
                || user.email.toLowerCase().includes(value.toLowerCase())
                || user.phone.includes(value)
        })
        //Изменение количества пользователей(строк таблицы) для пересчета кнопок в пагинации
        dispatch(setTotalUsersCount(newDisplayTableData.length))
        dispatch(setDisplayTableData(newDisplayTableData))
    }

    let isDataSelected = useSelector<AppRootStateType, boolean>(state => state.table.isDataSelected)

    if (!isDataSelected) {
        return <DataSelector/>
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {isTableLoading ?
                <Spin style={{marginTop: '100px'}}/> :
                <div>
                    <TableSearch onSearch={onSearch}/>
                    <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                               currentPage={currentPage} onPageChanged={onPageChanged}
                               portionSize={5}
                    />
                    <Table dataSource={displayTableData} columns={columns} rowKey={'phone'} pagination={false}
                           onRow={(record, rowIndex) => {
                               return {
                                   onClick: event => {
                                       dispatch(setSelectedUserData(record))
                                   },
                               };
                           }}/>
                    {selectedUserData ?
                        <UserInfo userData={selectedUserData}/>
                        : ''
                    }
                </div>
            }
        </div>
    );
}