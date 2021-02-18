import {
    addNewUser,
    search,
    setCurrentPage, setIsAddNewUserFormVisible, setIsDataSelected,
    setIsTableLoading, setSelectedUserData, setSomeError,
    setTotalUsersCount,
    tableReducer,
    TableReducerStateType
} from './tableReducer';
import {UserType} from '../components/UsersTable/UsersTable';

let startState: TableReducerStateType
beforeEach(() => {
    startState = {
        tableData: [{
            "id": 764,
            "firstName": "Eamon",
            "lastName": "Shute",
            "email": "RDeno@convallis.org",
            "phone": "(998)805-0740",
            "address": {
                "streetAddress": "2570 Pulvinar St",
                "city": "Paw Paw",
                "state": "RI",
                "zip": "59706"
            },
            "description": "aliquam placerat aenean molestie pharetra pretium mattis massa rutrum mattis eros tortor et lacus molestie lacus dolor etiam rutrum sed pharetra elementum aliquam quis ante tincidunt pretium convallis dolor et ac fringilla"
        },
            {
                "id": 700,
                "firstName": "Haidi",
                "lastName": "Tveter",
                "email": "JMoccio@nec.gov",
                "phone": "(252)398-3755",
                "address": {
                    "streetAddress": "8271 Sit Ct",
                    "city": "Franklin",
                    "state": "CT",
                    "zip": "12678"
                },
                "description": "eros molestie consequat nec magna et malesuada nec lectus sit orci vitae pretium ante sit aliquam sed velit dui lacus vestibulum sit nullam nec rutrum morbi dolor placerat dolor sit at donec"
            },
            {
                "id": 141,
                "firstName": "Latisha",
                "lastName": "Teixeira",
                "email": "DGerver@consectetur.ly",
                "phone": "(351)824-6104",
                "address": {
                    "streetAddress": "2389 Aenean Rd",
                    "city": "Brookville",
                    "state": "NV",
                    "zip": "14816"
                },
                "description": "adipiscing hendrerit ipsum suspendisse pretium dui tincidunt at neque vitae amet ipsum odio dolor eget nunc elementum lectus neque augue malesuada lacus eros fringilla ipsum velit sed porttitor mattis malesuada etiam turpis"
            }] as Array<UserType>,
        displayTableData: [] as Array<UserType>,
        isTableLoading: false,
        pageSize: 50,
        totalUsersCount: 3,
        currentPage: 1,
        search: '',
        //@ts-ignore
        selectedUserData: null as UserType,
        isDataSelected: false,
        isAddNewUserFormVisible: false,
        someError: false
    }
});


test('isTableLoading should be changed correct', () => {
    const action = setIsTableLoading(true)

    const endState = tableReducer(startState, action)

    expect(endState.isTableLoading).toBeTruthy()
})
test('totalUsersCount should be changed correct', () => {
    const action = setTotalUsersCount(5)

    const endState = tableReducer(startState, action)

    expect(endState.totalUsersCount).toBe(5)
})
test('currentPage should be changed correct', () => {
    const action = setCurrentPage(2)

    const endState = tableReducer(startState, action)

    expect(endState.currentPage).toBe(2)
})
test('search should be changed correct', () => {
    const action = search('Bob')

    const endState = tableReducer(startState, action)

    expect(endState.search).toBe('Bob')
})
test('selectedUserData should be changed correct', () => {
    const action = setSelectedUserData({
        "id": 803,
        "firstName": "Fernando",
        "lastName": "Ingle",
        "email": "JBently@odio.io",
        "phone": "(343)043-7158",
        "address": {
            "streetAddress": "7515 Sagittis St",
            "city": "Macomb",
            "state": "KS",
            "zip": "63977"
        },
        "description": "fringilla augue neque id malesuada aliquam massa ac massa amet vel tortor elementum lectus dui ac pulvinar sed dolor convallis lacus curabitur suspendisse at velit curabitur magna lectus sit facilisis tortor ipsum"
    },)

    const endState = tableReducer(startState, action)

    expect(endState.selectedUserData.firstName).toBe('Fernando')
    expect(endState.selectedUserData.lastName).toBe('Ingle')
    expect(endState.selectedUserData.phone).toBe('(343)043-7158')
    expect(endState.selectedUserData.id).toBe(803)
})
test('isDataSelected should be changed correct', () => {
    const action = setIsDataSelected(true)

    const endState = tableReducer(startState, action)

    expect(endState.isDataSelected).toBeTruthy()
})
test('isAddNewUserFormVisible should be changed correct', () => {
    const action = setIsAddNewUserFormVisible(true)

    const endState = tableReducer(startState, action)

    expect(endState.isAddNewUserFormVisible).toBeTruthy()
})
test('someError should be changed correct', () => {
    const action = setSomeError(true)

    const endState = tableReducer(startState, action)

    expect(endState.someError).toBeTruthy()
})
test('addNewUser should works correct', () => {
    const action = addNewUser({
        "id": '308',
        "firstName": "Kristina",
        "lastName": "Contreras",
        "email": "MMorris@vestibulum.net",
        "phone": "(799)420-7972",
    })

    const endState = tableReducer(startState, action)

    expect(endState.tableData.length).toBe(4)
    expect(endState.totalUsersCount).toBe(4)
    expect(endState.tableData[0].firstName).toBe('Kristina')
})
