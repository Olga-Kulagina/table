import {Dispatch} from 'redux';
import {tableAPI} from '../api/api';
import {UserType} from '../components/Table/Table';

type SetTableDataType = ReturnType<typeof setTableData>
type SetIsTableLoadingType = ReturnType<typeof setIsTableLoading>
type SetTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
type SetDisplayTableDataType = ReturnType<typeof setDisplayTableData>

type ActionsType = SetTableDataType | SetIsTableLoadingType | SetTotalUsersCountType | SetCurrentPageType | SetDisplayTableDataType
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
}

export const tableReducer = (state: TableReducerStateType = initialState, action: ActionsType): TableReducerStateType => {
    switch (action.type) {
        case 'SET_TABLE_DATA': {
            return {...state, tableData: action.tableData}
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

export const getSmallTableThunkCreator = () => (dispatch: Dispatch) => {
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

