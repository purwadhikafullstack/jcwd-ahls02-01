const INITIAL_STATE = {
    transaction: [],
    transactionAdminView: [],
    uservalidasiresep: [],
    usermenunggupembayaran: [],
    usermenunggukonfirmasi: [],
    userdiproses: [],
    userdikirim: [],
    userpesanandikonfirmasi: [],
    userdibatalkan: [],
    adminvalidasiresep: [],
    adminmenunggupembayaran: [],
    adminmenunggukonfirmasi: [],
    admindiproses: [],
    admindikirim: [],
    adminpesanandikonfirmasi: [],
    admindibatalkan: []
}

export const transactionReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SAVED_TRANSACTION":
            console.log("HOLA ~ INI ISI DATA TRANSACTION DR TRANSACTION REDUCERS", action.payload)
            return { ...state, transaction: action.payload };

        case "SAVED_TRANSACTION_ADMIN":
            console.log("HOLA ~ INI ISI DATA TRANSACTION DR TRANSACTION REDUCERS KHUSUS ADMIN", action.payload)
            return { ...state, transactionAdminView: action.payload };

        case "USER_VALIDASI_RESEP":
            console.log(`user validasi resep -- transactionReducers`)
            return { ...state, uservalidasiresep: action.payload };

        case "USER_MENUNGGU_PEMBAYARAN":
            console.log(`user menunggu pembayaran -- transactionReducers`)
            return { ...state, usermenunggupembayaran: action.payload };

        default:
            return state
    }
}