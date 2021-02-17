import {Dispatch} from 'redux';
import {tableAPI} from '../api/api';
import {UserType} from '../components/Table/Table';

type SetTableDataType = ReturnType<typeof setTableData>
type SetIsTableLoadingType = ReturnType<typeof setIsTableLoading>
type SetTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
type SetDisplayTableDataType = ReturnType<typeof setDisplayTableData>
type SearchType = ReturnType<typeof search>
type SetSelectedUserDataType = ReturnType<typeof setSelectedUserData>
type SetIsDataSelectedType = ReturnType<typeof setIsDataSelected>

type ActionsType =
    SetTableDataType
    | SetIsTableLoadingType
    | SetTotalUsersCountType
    | SetCurrentPageType
    | SetDisplayTableDataType
    | SearchType
    | SetSelectedUserDataType
    | SetIsDataSelectedType
type TableReducerStateType = typeof initialState

const initialState = {
    //Вся таблица
    tableData: [] as Array<UserType>,
    //Часть таблицы, отображаемая на странице
    displayTableData: [] as Array<UserType>,
    isTableLoading: false,
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    search: '',
    //@ts-ignore
    selectedUserData: null as UserType,
    isDataSelected: false
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
            return {...state, displayTableData: action.displayTableData}
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
        default:
            return state;
    }
}

export const setTableData = (tableData: Array<UserType>) => {
    return {type: 'SET_TABLE_DATA', tableData} as const
}
export const setDisplayTableData = (displayTableData: Array<UserType>) => {
    return {type: 'SET_DISPLAY_TABLE_DATA', displayTableData} as const
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

export const getSmallTableThunkCreator = () => (dispatch: Dispatch) => {
    dispatch(setIsTableLoading(true))
    tableAPI.getSmallTable()
        .then((res) => {
            dispatch(setTableData(res.data))
            dispatch(setTotalUsersCount(res.data.length))
            dispatch(setDisplayTableData([...res.data].slice(0, 50)))
        })
        .catch((err) => {
            console.error('Some error occur')
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
            dispatch(setDisplayTableData([...res.data].slice(0, 50)))
        })
        .catch((err) => {
            console.error('Some error occur')
        })
        .finally(() => {
            dispatch(setIsTableLoading(false))
        })
}

