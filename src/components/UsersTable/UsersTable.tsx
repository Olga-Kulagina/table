import {Button, Result, Spin, Table} from 'antd';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    search,
    setCurrentPage,
    setDisplayTableData, setIsAddNewUserFormVisible, setIsDataSelected, setSelectedUserData, setSomeError,
    setTotalUsersCount
} from '../../redux/tableReducer';
import {AppRootStateType} from '../../redux/redux-store';
import {Paginator} from '../Paginator/Paginator';
import {TableSearch} from '../Search/TableSearch';
import {UserInfo} from '../UserInfo/UserInfo';
import {DataSelector} from '../DataSelector/DataSelector';
import {AddNewUserForm} from '../AddNewUserForm/AddNewUserForm';

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

    let someError = useSelector<AppRootStateType, boolean>(state => state.table.someError)

//Если таблица загружается, показывается крутилка
    let isTableLoading = useSelector<AppRootStateType, boolean>(state => state.table.isTableLoading)

//Данные для таблицы (пропсы AntDesign)
    let tableData = useSelector<AppRootStateType, Array<UserType>>(state => state.table.tableData)
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
//Отображаемые строки таблицы (максимум 50)
    let displayTableData = useSelector<AppRootStateType, Array<UserType>>(state => state.table.displayTableData)
//Даные для рассчета кнопок пагинации
    let totalUsersCount = useSelector<AppRootStateType, number>(state => state.table.totalUsersCount)
    let pageSize = useSelector<AppRootStateType, number>(state => state.table.pageSize)
    let currentPage = useSelector<AppRootStateType, number>(state => state.table.currentPage)
//Выбранный пользователь (отображается внизу таблицы)
    let selectedUserData = useSelector<AppRootStateType, UserType>(state => state.table.selectedUserData)

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

//При нажатии на кнопку страницы пагинатора
    const onPageChanged = useCallback((pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber))
        dispatch(setDisplayTableData())
    }, [dispatch])

//Фильтрация по подстроке при нажатии на поиск
    const onSearch = useCallback((value: string) => {
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
    }, [dispatch, tableData])

//Форма для добавления новой строки показывается по нажатию кнопки
    let isAddNewUserFormVisible = useSelector<AppRootStateType, boolean>(state => state.table.isAddNewUserFormVisible)

    const onAddUserClick = useCallback(() => {
        dispatch(setIsAddNewUserFormVisible(!isAddNewUserFormVisible))
    }, [dispatch, isAddNewUserFormVisible])

//Таблица отображается только после выбора набора данных
    let isDataSelected = useSelector<AppRootStateType, boolean>(state => state.table.isDataSelected)
    if (!isDataSelected) {
        return <DataSelector/>
    }

    const onBackHomeClick = () => {
        dispatch(setSomeError(false))
        dispatch(setIsDataSelected(false))
    }

    if (someError) {
        return <Result
            status="500"
            subTitle="Sorry, something went wrong."
            extra={<Button type="primary" onClick={onBackHomeClick}>Back Home</Button>}
        />
    }


    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {isTableLoading ?
                <Spin style={{marginTop: '100px'}}/> :
                <div>
                    <TableSearch onSearch={onSearch}/>
                    <Button onClick={onAddUserClick}>Add User</Button>
                    {isAddNewUserFormVisible ? <AddNewUserForm/> : ''}
                    <Table dataSource={displayTableData} columns={columns} rowKey={'phone'} pagination={false}
                           onRow={(record, rowIndex) => {
                               return {
                                   onClick: event => {
                                       dispatch(setSelectedUserData(record))
                                   },
                               };
                           }}/>
                    <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                               currentPage={currentPage} onPageChanged={onPageChanged}
                               portionSize={5}
                    />
                    {selectedUserData ?
                        <UserInfo userData={selectedUserData}/>
                        : ''
                    }
                </div>
            }
        </div>
    );
}