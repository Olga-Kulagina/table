import {Dispatch} from 'redux';
import {tableAPI} from '../api/api';
import {UserType} from '../components/UsersTable/UsersTable';

type SetTableDataType = ReturnType<typeof setTableData>
type SetIsTableLoadingType = ReturnType<typeof setIsTableLoading>
type SetTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
type SetDisplayTableDataType = ReturnType<typeof setDisplayTableData>
type SearchType = ReturnType<typeof search>
type SetSelectedUserDataType = ReturnType<typeof setSelectedUserData>
type SetIsDataSelectedType = ReturnType<typeof setIsDataSelected>
type AddNewUserType = ReturnType<typeof addNewUser>
type SetIsAddNewUserFormVisibleType = ReturnType<typeof setIsAddNewUserFormVisible>
type SetSomeErrorType = ReturnType<typeof setSomeError>

type ActionsType =
    SetTableDataType
    | SetIsTableLoadingType
    | SetTotalUsersCountType
    | SetCurrentPageType
    | SetDisplayTableDataType
    | SearchType
    | SetSelectedUserDataType
    | SetIsDataSelectedType
    | AddNewUserType
    | SetIsAddNewUserFormVisibleType
    | SetSomeErrorType
export type TableReducerStateType = typeof initialState

const initialState = {
    //Вся таблица
    tableData: [] as Array<UserType>,
    //Часть таблицы, отображаемая на странице
    displayTableData: [] as Array<UserType>,
    isTableLoading: false,
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    //Строка поиска
    search: '',
    //@ts-ignore выбранный пользователь отображается под таблицей
    selectedUserData: null as UserType,
    //Выбран ли набор данных, загружаемый с сервера (маленький или большой)
    isDataSelected: false,
    isAddNewUserFormVisible: false,
    someError: false
}

export const tableReducer = (state: TableReducerStateType = initialState, action: ActionsType): TableReducerStateType => {
    switch (action.type) {
        case 'SET_TABLE_DATA': {
            return {...state, tableData: action.tableData}
        }
        case 'SET_IS_DATA_SELECTED': {
            return {...state, isDataSelected: action.isDataSelected}
        }
        case 'SET_DISPLAY_TABLE_DATA': {
            let tableData = [...state.tableData]
            //Если передаем массив юзеров (только при поиске), то разбиваем на страницы его, если ничего не передаем, то разбиваем на страницы исходный массив данных
            let newD = action.newDisplayTableData ? action.newDisplayTableData.slice((state.currentPage - 1) * state.pageSize, ((state.currentPage - 1) * state.pageSize + state.pageSize))
            : tableData.slice((state.currentPage - 1) * state.pageSize, ((state.currentPage - 1) * state.pageSize + state.pageSize))
            return {...state, displayTableData: newD }
        }
        case 'SET_IS_TABLE_LOADING': {
            return {...state, isTableLoading: action.isTableLoading}
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.TotalUsersCount}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SEARCH': {
            return {...state, search: action.search, currentPage: 1}
        }
        case 'SET_SELECTED_USER_DATA': {
            return {...state, selectedUserData: action.user}
        }
        case 'IS_ADD_NEW_USER_FORM_VISIBLE': {
            return {...state, isAddNewUserFormVisible: action.isAddNewUserFormVisible}
        }
        case 'ADD_NEW_USER': {
            let newUser: UserType = {
                id: Number(action.newUser.id),
                firstName: action.newUser.firstName,
                lastName: action.newUser.lastName,
                email: action.newUser.email,
                phone: action.newUser.phone,
                address: {
                    streetAddress: '',
                    city: '',
                    state: '',
                    zip: ''
                },
                description: ''
            }
            let newTableData = [newUser, ...state.tableData]
            let newDisplayTableData = newTableData.slice((state.currentPage - 1) * state.pageSize, ((state.currentPage - 1) * state.pageSize + state.pageSize))
            return {
                ...state, tableData: newTableData, totalUsersCount: state.totalUsersCount + 1,
                displayTableData: newDisplayTableData
            }
        }
        case 'SET_SOME_ERROR': {
            return {...state, someError: action.error}
        }
        default:
            return state;
    }
}

export const setTableData = (tableData: Array<UserType>) => {
    return {type: 'SET_TABLE_DATA', tableData} as const
}
export const setDisplayTableData = (newDisplayTableData?: Array<UserType>) => {
    return {type: 'SET_DISPLAY_TABLE_DATA', newDisplayTableData} as const
}
export const setIsTableLoading = (isTableLoading: boolean) => {
    return {type: 'SET_IS_TABLE_LOADING', isTableLoading} as const
}
export const setTotalUsersCount = (TotalUsersCount: number) => {
    return {type: 'SET_TOTAL_USERS_COUNT', TotalUsersCount} as const
}
export const setCurrentPage = (currentPage: number) => {
    return {type: 'SET_CURRENT_PAGE', currentPage} as const
}
export const search = (search: string) => {
    return {type: 'SEARCH', search} as const
}
export const setSelectedUserData = (user: UserType) => {
    return {type: 'SET_SELECTED_USER_DATA', user} as const
}
export const setIsDataSelected = (isDataSelected: boolean) => {
    return {type: 'SET_IS_DATA_SELECTED', isDataSelected} as const
}
export const setIsAddNewUserFormVisible = (isAddNewUserFormVisible: boolean) => {
    return {type: 'IS_ADD_NEW_USER_FORM_VISIBLE', isAddNewUserFormVisible} as const
}

type NewUserType = {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
}

export const addNewUser = (newUser: NewUserType) => {
    return {type: 'ADD_NEW_USER', newUser} as const
}

export const setSomeError = (error: boolean) => {
    return {type: 'SET_SOME_ERROR', error} as const
}

export const getSmallTableThunkCreator = () => (dispatch: Dispatch) => {
    dispatch(setIsTableLoading(true))
    tableAPI.getSmallTable()
        .then((res) => {
            dispatch(setTableData(res.data))
            dispatch(setTotalUsersCount(res.data.length))
            dispatch(setDisplayTableData())
        })
        .catch((err) => {
            dispatch(setSomeError(true))
        })
        .finally(() => {
            dispatch(setIsTableLoading(false))
        })
}

export const getBigTableThunkCreator = () => (dispatch: Dispatch) => {
    dispatch(setIsTableLoading(true))
    tableAPI.getBigTable()
        .then((res) => {
            dispatch(setTableData(res.data))
            dispatch(setTotalUsersCount(res.data.length))
            dispatch(setDisplayTableData())
        })
        .catch((err) => {
            dispatch(setSomeError(true))
        })
        .finally(() => {
            dispatch(setIsTableLoading(false))
        })
}

